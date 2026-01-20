/**
 * GO HIGH LEVEL + VAPI INTEGRATION
 * This function upserts a contact and adds the AI message as a note.
 */

// Define interfaces for type safety
interface GHLPayload {
    firstName: string;
    phone: string;
    locationId: string;
    tags: string[];
    customFields?: Array<{ id: string; value: string }>;
}

interface NotePayload {
    body: string;
    userId: string;
}

export const handleVapiToGHL = async (vapiArgs: {
    summary: string;
    customer_name: string;
    customer_phone: string;
    pest_type?: string;
}) => {
    const { summary, customer_name, customer_phone, pest_type } = vapiArgs;

    // These should be set in your .env.local file
    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

    // Guard clause for missing configuration
    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
        console.error("❌ Missing GHL Configuration (API Key or Location ID)");
        return { status: "error", message: "Server configuration error" };
    }

    const headers = {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
    };

    try {
        console.log(`🚀 Sending Lead to GHL: ${customer_name}`);

        // STEP 1: Upsert the Contact (Create or Update)
        const contactPayload: GHLPayload = {
            firstName: customer_name || "New Lead",
            phone: customer_phone,
            locationId: GHL_LOCATION_ID,
            tags: ["ai-voice-lead", "owner-followup-requested"],
        };

        // Add custom field only if pest_type is provided
        if (pest_type) {
            contactPayload.customFields = [{ id: "pest_type_field_id", value: pest_type }];
        }

        const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
            method: 'POST',
            headers,
            body: JSON.stringify(contactPayload)
        });

        if (!contactRes.ok) {
            const errorText = await contactRes.text();
            throw new Error(`GHL Upsert Failed: ${errorText}`);
        }

        const contactData = await contactRes.json();
        const contactId = contactData.contact.id;

        // STEP 2: Add the AI Summary as a Note for the Owner
        const notePayload: NotePayload = {
            body: `🚨 AI VOICE SUMMARY FOR OWNER: ${summary}`,
            userId: "" // Leave empty to assign to system/owner default
        };

        const noteRes = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
            method: 'POST',
            headers,
            body: JSON.stringify(notePayload)
        });

        if (!noteRes.ok) {
            throw new Error("GHL Note Creation Failed");
        }

        return {
            status: "success",
            message: "Lead synced to GHL and Note added."
        };

    } catch (error) {
        console.error("GHL Integration Error:", error);
        // Return a clean error object so Vapi doesn't crash
        return {
            status: "error",
            message: error instanceof Error ? error.message : "Unknown error"
        };
    }
};
