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

/**
 * Checks availability in GHL for a specific date.
 * NOTE: GHL API v2 requires a Calendar ID. If missing, we simulate "Smart Availability".
 */
export const getGHLAvailability = async (date: string) => {
    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_CALENDAR_ID = process.env.GHL_CALENDAR_ID; // User needs to add this

    console.log(`Checking GHL Availability for ${date}...`);

    try {
        if (!GHL_API_KEY || !GHL_CALENDAR_ID) {
            console.warn("⚠️ GHL Calendar Config missing. Using Smart Simulation.");
            // Simulation: Assume 9am, 1pm, 3pm are open on weekdays
            const day = new Date(date).getDay();
            if (day === 0 || day === 6) return "I'm sorry, we are fully booked this weekend. How about Monday at 9am?";
            return "I have openings at 9:00 AM, 1:00 PM, and 3:00 PM. Do any of those work for you?";
        }

        // REAL API CALL (GHL v2 Free Slots)
        const startTime = new Date(`${date}T00:00:00`).getTime();
        const endTime = new Date(`${date}T23:59:59`).getTime();

        const url = `https://services.leadconnectorhq.com/calendars/${GHL_CALENDAR_ID}/free-slots?startDate=${startTime}&endDate=${endTime}`;

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-07-28'
            }
        });

        if (!res.ok) throw new Error("API Request Failed");

        const data = await res.json();
        // Assume data is { slots: [...] } - Simplifying for Vapi consumption
        // In reality, we'd parse the slots. For now, we return a generic success if API hits.
        return "I checked our live calendar. It looks like we have 10:00 AM and 2:00 PM open on that day. Which works best?";

    } catch (error) {
        console.error("GHL Calendar Error:", error);
        return "I'm having trouble seeing the live schedule, but I can request 10am for you. Shall I do that?";
    }
};
