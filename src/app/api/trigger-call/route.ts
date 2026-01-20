import { NextResponse } from 'next/server';
import { VAPI_CONFIG } from '@/lib/vapi';

export async function POST(req: Request) {
    try {
        // Authenticate (Basic "Secret" check for security)
        const { secret, phone, name, appointmentTime } = await req.json();
        const expectedSecret = process.env.VAPI_WEBHOOK_SECRET || 'apex-secret'; // Fallback for MVP

        if (secret !== expectedSecret) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log('🗣️ Triggering Vapi Call for:', { name, phone });

        // Call Vapi API to start the call
        const response = await fetch(`${VAPI_CONFIG.baseUrl}/call`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID, // Must be set in .env
                assistantId: process.env.VAPI_ASSISTANT_ID, // We need to get this dynamically or set it in .env
                customer: {
                    number: phone,
                    name: name
                },
                assistantOverrides: {
                    // Override the first message to be specific to this appointment
                    firstMessage: `Hi ${name}, this is Alex from Apex Guard. I'm calling to confirm your appointment for ${appointmentTime}. Does that time still work for you?`
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Vapi API Error: ${errorText}`);
        }

        const data = await response.json();
        return NextResponse.json({ success: true, callId: data.id });

    } catch (error: any) {
        console.error('❌ Trigger Call Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
