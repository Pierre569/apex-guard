import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, email, serviceType, issue } = body;

        console.log('📌 New Booking Request:', { name, phone });

        // 1. Save to Firestore (Source of Truth)
        const docRef = await addDoc(collection(db, 'leads'), {
            name,
            phone,
            email,
            serviceType,
            issue,
            source: 'web_booking_form',
            status: 'new',
            syncedToGHL: false,
            createdAt: serverTimestamp()
        });

        // 2. Post to GoHighLevel (If configured)
        const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL;
        if (ghlWebhookUrl) {
            try {
                console.log('🚀 Syncing to GHL...');
                await fetch(ghlWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        phone,
                        email,
                        tags: ['apex-guard-web-lead', serviceType],
                        message: issue,
                        source: 'apex-guard-website'
                    })
                });
                console.log('✅ GHL Sync Success');
            } catch (ghlError) {
                console.error('❌ GHL Sync Failed:', ghlError);
                // We don't fail the request if GHL fails, just log it.
            }
        }

        // 3. Trigger Immediate Vapi Call (If requested)
        if (body.callMe) {
            console.log('📞 Triggering Instant Callback...');
            try {
                // Call our own internal API to trigger the call safely
                // We use process.env.NEXT_PUBLIC_VERCEL_URL if available, or localhost
                const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
                    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
                    : 'http://localhost:3000';

                await fetch(`${baseUrl}/api/trigger-call`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        phone,
                        name,
                        appointmentTime: "ASAP", // Or derive from logic
                        secret: process.env.VAPI_WEBHOOK_SECRET || 'apex-secret'
                    })
                });
            } catch (callError) {
                console.error('❌ Trigger Call Failed:', callError);
            }
        }

        return NextResponse.json({ success: true, id: docRef.id });

    } catch (error) {
        console.error('❌ Booking Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
