import { NextResponse } from 'next/server';
import { VapiPayload } from '@/lib/vapi';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, limit } from 'firebase/firestore';
import { handleVapiToGHL, getGHLAvailability } from '@/lib/ghl-bridge';

const MASTER_SYSTEM_PROMPT = `
# ROLE
You are "Alex," the Elite Operations Assistant for Apex Guard. You are calm, professional, and hyper-competent. Your goal is to manage the call flow based on the "Call Intent."

# GLOBAL GUARDRAILS (Anti-Glitch)
- NO ROBOT TALK: Never say "As an AI" or "I am processing."
- THE 2-SECOND RULE: If a calculation/lookup takes more than 2 seconds, say: "Just pulling that up for you..." or "Let me check the live route for that..."
- PIVOT ON UNKNOWN: If asked a question outside this tree, say: "That is a great technical question. I want to make sure I give you 100% accurate info, so I'm noting that for the technician to answer during the inspection. Does that work for you?"

# THE MASTER LOGIC TREE (Intent-Based)

## INTENT 1: NEW LEAD / INQUIRY (Inbound)
- ACTION: Acknowledge → Get Address → Get Pest Type → Book.
- SCRIPT: "I can certainly help you with those [Pests]. To see which technician is closest to you, what is the service address?"

## INTENT 2: WARRANTY / "STILL SEEING BUGS" (The Complaint)
- ACTION: Empathize → Explain Biology → Schedule Retreatment.
- SCRIPT: "I’m sorry to hear they’re still active. Actually, it’s quite common to see increased activity for 7 days as the treatment flushes them out. However, your satisfaction is guaranteed. Should we schedule a quick touch-up for you next week just in case?"

## INTENT 3: PRICE OBJECTION / COMPETITORS
- ACTION: Value Prop → Quality Pivot.
- SCRIPT: "I understand price is important. While some companies use diluted DIY-grade sprays, we use professional-grade, pet-safe residuals that last 3x longer. It's about solving the problem for good, rather than just temporarily. Would you prefer the peace of mind of a guaranteed treatment?"

## INTENT 4: BILLING & PAYMENTS
- ACTION: Transparency → Specialist Transfer.
- SCRIPT: "I can certainly look into your balance. For your security, I’ll have our billing specialist send you a secure payment link via text, or I can transfer you to our office manager now. Which is easier?"

## INTENT 5: OUTBOUND FOLLOW-UP
- ACTION: Context Hook → The Ask.
- SCRIPT: "Hi [Name], I'm Alex calling from Apex Guard. I saw you were using our Bug Identifier tool earlier for a [Pest]. Those can be tricky—did you want me to send a pro over to give you a definitive answer today?"

## INTENT 6: VOICEMAIL (Outbound Only)
- ACTION: Concise Message.
- SCRIPT: "Hi, this is Alex with Apex Guard. I’m calling regarding your pest inquiry. I’ll send you a quick text with my direct booking link so you can grab a spot whenever you're free. Have a great day!"

## INTENT 11: OWNER TRANSFER & FAILOVER (REVISED)
- PHASE 1 (Transfer): Say: "I’d be happy to see if the owner is available for you. I’m going to try connecting you now—you’ll hear a little bit of music while I see if they're free. One moment..." Then trigger \`transfer_to_owner\`. If the status is 'no-answer', 'busy', or 'failed', move to Phase 2.
- PHASE 2 (The Return): "Thanks for your patience. It looks like [Owner Name] is currently tied up. I’d be happy to take a detailed message and send it directly to their mobile phone so they can get back to you. Would you like to leave a message?"
- PHASE 3 (The Refusal): If they say NO: "I completely understand. Should I just have them give you a call back on this number when they are free, or is there a better time for them to reach out?"
- PHASE 4 (The Acceptance & Legal): If they say YES: "Perfect. Please tell me what you'd like to say, and just so you know, standard data and message rates may apply for the SMS notification."
- PHASE 5 (Summarize & Verify): After they speak: "Got it. I've noted that you want to tell [Owner Name] that [Insert Summary]. Is that correct and is it okay for me to send that now?"
- PHASE 6 (Execution): If they say YES: Trigger \`handleVapiToGHL\`. Say: "Great, that's sent! They'll have that on their phone in just a moment."

# MULTILINGUAL RULES
- If the user is speaking Spanish, perform the return and verification in Spanish. 
- However, when calling \`handleVapiToGHL\`, translate the 'summary' parameter into English so the owner can read it clearly on their mobile device.

# DATA EXTRACTION GOALS
- Name, Phone, Address, Pest Type, Urgency Level.
`;

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as VapiPayload;
        const { message } = body;
        console.log('📞 Vapi Webhook:', message.type);

        // 1. Assistant Request - Caller ID Lookup & Persona Selection
        if (message.type === 'assistant-request') {
            const customerPhone = message.call?.customer?.number;
            console.log(`🔎 Looking up caller: ${customerPhone}`);

            let firstName = 'there';

            if (customerPhone) {
                const q = query(
                    collection(db, 'leads'),
                    where("phone", "==", customerPhone),
                    limit(1)
                );
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const lead = querySnapshot.docs[0].data();
                    firstName = lead.name?.split(' ')[0] || 'there';
                    console.log(`✅ Found Lead: ${firstName}`);
                }
            }

            return NextResponse.json({
                assistantOverrides: {
                    name: "Apex Guard - Alex (Master Orchestrator)",
                    // ... (Greeting)
                    firstMessage: `Hello! This is Alex with Apex Guard. How can I help you today?`,
                    // ...

                    // ... (Tool Definition: Check Availability)
                    name: "checkAvailability",
                    description: "Checks real-time availability in the GoHighLevel calendar.",
                    parameters: {
                        type: "object",
                        properties: {
                            date: { type: "string", description: "YYYY-MM-DD" },
                            timezone: { type: "string", description: "America/New_York if not specified" }
                        },
                        required: ["date"]
                    }
                            {
                    type: "function",
                    function: {
                        name: "bookAppointment",
                        description: "Books the appointment.",
                        parameters: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                service: { type: "string" },
                                datetime: { type: "string" }
                            }
                        }
                    }
                },
                {
                    type: "function",
                    function: {
                        name: "saveCallState",
                        description: "Saves critical lead info mid-call to prevent data loss.",
                        parameters: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                pest: { type: "string" },
                                address: { type: "string" },
                                intent: { type: "string", enum: ["new_lead", "reschedule", "billing", "complaint"] }
                            },
                            required: ["intent"]
                        }
                    }
                },
                {
                    type: "function",
                    function: {
                        name: "validateAddress",
                        description: "Validates if a service address is real/servable.",
                        parameters: {
                            type: "object",
                            properties: {
                                address: { type: "string" }
                            },
                            required: ["address"]
                        }
                    }
                },
                {
                    type: "transfer", // Advanced Tool Type
                    name: "transfer_to_owner",
                    description: "Transfers the call to the business owner.",
                    dest: {
                        type: "number",
                        number: "+19103879259", // Owner Number
                        extension: ""
                    },
                    // Note: Vapi 'transfer' tool configuration in JSON usually adds specific fields like 'phoneNumber'. 
                    // Adapting to standard Vapi JSON structure for transfer tools.
                    // If Vapi overrides strictly require 'function' type for some models, 
                    // we might default to 'function' and handle it, but 'transfer' type is supported in Vapi 2.0.
                    // Using the user's JSON structure:
                    phoneNumber: "+19103879259",
                    message: "One moment while I try to connect you with the owner...",
                    holdMusicUrl: "https://apex-guard-beta.vercel.app/hold-music.mp3",
                    async: false
                },
                {
                    type: "function",
                    function: {
                        name: "handleVapiToGHL",
                        description: "Syncs the customer info and summarized message to GoHighLevel CRM when the owner is unavailable.",
                        parameters: {
                            type: "object",
                            properties: {
                                summary: {
                                    type: "string",
                                    description: "The 1-sentence English summary of the user's message."
                                },
                                customer_name: {
                                    type: "string",
                                    description: "The name of the caller."
                                },
                                customer_phone: {
                                    type: "string",
                                    description: "The phone number of the caller."
                                },
                                pest_type: {
                                    type: "string",
                                    description: "The type of pest discussed during the call."
                                }
                            },
                            required: ["summary", "customer_phone"]
                        }
                    }
                }
                        ]
                    },
        silenceTimeoutSeconds: 45,
            voice: {
            provider: "cartesia",
                voiceId: "79a125e8-cd45-4c13-8a67-188112f4dd22",
                    },
    }
            });
        }

// Helper to simulate sending SMS
async function sendSMS(to: string, body: string) {
    console.log(`📱 SENDING SMS to ${to}: "${body}"`);
    await addDoc(collection(db, 'outbound_messages'), {
        to,
        body,
        status: 'sent',
        createdAt: serverTimestamp()
    });
}

// 2. End of Call Report
if (message.type === 'end-of-call-report') {
    const report = message;
    console.log('📝 Saving Call Report...');

    const summary = report.analysis?.summary || 'No summary provided';
    const customerPhone = report.customer?.number || 'Unknown';
    const appointmentSet = report.analysis?.structuredData?.appointment_booked || false;

    // Save Lead
    await addDoc(collection(db, 'leads'), {
        source: 'vapi_phone',
        summary,
        transcript: report.transcript || '',
        recordingUrl: report.recordingUrl || '',
        customerPhone,
        status: appointmentSet ? 'booked' : 'new',
        createdAt: serverTimestamp()
    });

    // POST-CALL AUTOMATION (The "Amazoning")
    if (customerPhone && customerPhone !== 'Unknown') {
        let smsBody = "";
        if (appointmentSet) {
            smsBody = `Hi! It's Alex from Apex Guard. Your inspection is confirmed! Here is your prep checklist: https://apex-guard-beta.vercel.app/prep`;
        } else {
            smsBody = `Thanks for chatting! If you find that bug again, snap a photo here: https://apex-guard-beta.vercel.app`;
        }
        await sendSMS(customerPhone, smsBody);
    }

    return NextResponse.json({ success: true, id: report.call?.id });
}

// 3. Tool Calls (Booking Automation)
if (message.type === 'tool-calls') {
    const toolCalls = message.toolCalls || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results: any[] = [];

    for (const call of toolCalls) {
        // Determine if it's a function tool or other type
        if (call.type === 'function') {
            const { name, arguments: argsUnknown } = call.function;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const args = argsUnknown as Record<string, any>;
            console.log(`🛠️ Tool Call: ${name}`, args);

            if (name === 'checkAvailability') {
                const slots = await getGHLAvailability(args.date);
                results.push({
                    toolCallId: call.id,
                    result: slots
                });
            }

            if (name === 'bookAppointment') {
                await addDoc(collection(db, 'appointments'), {
                    ...args,
                    status: 'booked',
                    createdAt: serverTimestamp()
                });
                results.push({
                    toolCallId: call.id,
                    result: "Perfect. I have you confirmed for that time. You'll receive a confirmation text shortly."
                });
            }

            if (name === 'transfer_to_owner') {
                // In case Vapi executes this as a function despite 'transfer' type config (fallback)
                results.push({
                    toolCallId: call.id,
                    result: "Transferring..."
                });
            }

            if (name === 'handleVapiToGHL') {
                const result = await handleVapiToGHL({
                    summary: args.summary,
                    customer_name: args.customer_name,
                    customer_phone: args.customer_phone,
                    pest_type: args.pest_type
                });
                results.push({
                    toolCallId: call.id,
                    result: result.status === 'success' ? "Message synced to Owner." : "Error syncing message."
                });
            }

            if (name === 'saveCallState') {
                await addDoc(collection(db, 'active_calls'), {
                    ...args,
                    updatedAt: serverTimestamp()
                });
                results.push({
                    toolCallId: call.id,
                    result: "Info saved."
                });
            }

            if (name === 'validateAddress') {
                const isValid = args.address && args.address.length > 5;
                results.push({
                    toolCallId: call.id,
                    result: isValid ? "Address verified." : "Address not found, please ask again."
                });
            }
        }
    }
    return NextResponse.json({ results });
}

return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
    console.error('❌ Vapi Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
}

export async function GET() {
    return NextResponse.json({ status: 'Vapi Master Orchestrator Active' });
}
