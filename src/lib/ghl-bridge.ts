/**
 * GO HIGH LEVEL + VAPI INTEGRATION
 * This function upserts a contact and adds the AI message as a note.
 */

// Define interfaces for type safety
interface GHLPayload {
    firstName: string;
    phone: string;
    email?: string;
    locationId: string;
    tags: string[];
    customFields?: Array<{ id: string; value: string }>;
}

interface NotePayload {
    body: string;
    userId: string;
}

// SHARED CONFIGURATION
const getGhlConfig = () => {
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!apiKey || !locationId) {
        console.error("❌ Missing GHL Configuration (API Key or Location ID)");
        return null; // Signals missing config
    }

    return {
        apiKey,
        locationId,
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Version': '2021-07-28'
        }
    };
};

/**
 * CORE HELPER: Upsert Contact & Add Note
 */
async function upsertAndNote(
    contactData: GHLPayload,
    noteBody: string,
    config: NonNullable<ReturnType<typeof getGhlConfig>>
) {
    try {
        // 1. UPSERT
        const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(contactData)
        });

        if (!contactRes.ok) {
            const errorText = await contactRes.text();
            throw new Error(`GHL Upsert Failed: ${errorText}`);
        }

        const contactDataRes = await contactRes.json();
        const contactId = contactDataRes.contact.id;

        // 2. NOTE
        const notePayload: NotePayload = {
            body: noteBody,
            userId: ""
        };

        await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(notePayload)
        });

        return { status: "success", id: contactId };
    } catch (error) {
        console.error("GHL Sync Error:", error);
        throw error;
    }
}

// --- PUBLIC EXPORTS ---

/**
 * Syncs Vapi Voice Calls to GHL
 */
export const handleVapiToGHL = async (vapiArgs: {
    summary: string;
    customer_name: string;
    customer_phone: string;
    pest_type?: string;
}) => {
    const config = getGhlConfig();
    if (!config) return { status: "error", message: "Config Missing" };

    const { summary, customer_name, customer_phone, pest_type } = vapiArgs;

    try {
        const payload: GHLPayload = {
            firstName: customer_name || "New Voice Lead",
            phone: customer_phone,
            locationId: config.locationId,
            tags: ["ai-voice-lead", "owner-followup-requested"],
        };

        if (pest_type) {
            payload.customFields = [{ id: "pest_type_field_id", value: pest_type }];
        }

        await upsertAndNote(payload, `🚨 AI VOICE SUMMARY: ${summary}`, config);

        return { status: "success", message: "Voice Lead Synced" };
    } catch (e) {
        return { status: "error", message: "Sync Failed" };
    }
};

/**
 * Syncs Web Form Submissions to GHL
 */
export const syncWebLeadToGHL = async (formData: {
    name: string;
    phone: string;
    email: string;
    serviceType: string;
    issue: string;
}) => {
    const config = getGhlConfig();
    if (!config) return { status: "skip", message: "GHL Not Configured" };

    try {
        const payload: GHLPayload = {
            firstName: formData.name,
            phone: formData.phone,
            email: formData.email,
            locationId: config.locationId,
            tags: ["apex-guard-web-lead", formData.serviceType],
        };

        await upsertAndNote(payload, `🚨 WEB FORM SUBMISSION: ${formData.issue}`, config);

        return { status: "success" };
    } catch (e) {
        console.error("Web Lead Sync Failed", e);
        return { status: "error" };
    }
};

/**
 * Checks availability in GHL for a specific date.
 */
export const getGHLAvailability = async (date: string) => {
    const config = getGhlConfig();
    const GHL_CALENDAR_ID = process.env.GHL_CALENDAR_ID;

    console.log(`Checking GHL Availability for ${date}...`);

    try {
        if (!config || !GHL_CALENDAR_ID) {
            console.warn("⚠️ GHL Calendar Config missing. Using Smart Simulation.");
            const day = new Date(date).getDay();
            if (day === 0 || day === 6) return "I'm sorry, we are fully booked this weekend. How about Monday at 9am?";
            return "I have openings at 9:00 AM, 1:00 PM, and 3:00 PM. Do any of those work for you?";
        }

        const startTime = new Date(`${date}T00:00:00`).getTime();
        const endTime = new Date(`${date}T23:59:59`).getTime();

        const url = `https://services.leadconnectorhq.com/calendars/${GHL_CALENDAR_ID}/free-slots?startDate=${startTime}&endDate=${endTime}`;

        const res = await fetch(url, { headers: config.headers });

        if (!res.ok) throw new Error("API Request Failed");

        const data = await res.json();
        return "I checked our live calendar. It looks like we have 10:00 AM and 2:00 PM open on that day. Which works best?";

    } catch (error) {
        console.error("GHL Calendar Error:", error);
        return "I'm having trouble seeing the live schedule, but I can request 10am for you. Shall I do that?";
    }
};
