# Apex Guard - Deployment Guide

## 1. Environment Variables (Critical)

When deploying to Vercel (or `.env.local`), you must define the following keys.

### Vapi (AI Voice Agent)

- `NEXT_PUBLIC_VAPI_PUBLIC_KEY`: Your Vapi Public Key.
- `NEXT_PUBLIC_VAPI_ASSISTANT_ID`: The ID of the "Alex" or "Ryan" assistant.
- `VAPI_SECRET_TOKEN`: (Optional) If you are verifying Vapi webhooks signatures.

### GoHighLevel (CRM Integration)

- `GHL_API_KEY`: Your LeadConnector / GHL API Key (Agency or Location level, usually Location for single site).
- `GHL_LOCATION_ID`: The specific Logic ID for the sub-account.

### Google (AI & Maps)

- `GOOGLE_API_KEY`: For Gemini (Bug ID) and Google Maps (if using Embed API).
- `NEXT_PUBLIC_GOOGLE_MAPS_KEY`: For Service Map client-side rendering.

### Enterprise Features (Optional)

- `WEATHER_API_KEY`: For `tools/weather-alert.js` automation (e.g., OpenWeatherMap).

### Firebase (Database)

- `NEXT_PUBLIC_FIREBASE_API_KEY`: Web API Key.
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: `your-project.firebaseapp.com`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: `your-project-id`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: `your-project.appspot.com`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Sender ID.
- `NEXT_PUBLIC_FIREBASE_APP_ID`: App ID.

## 2. Platform Setup

### Vapi Dashboard

1. **Server URL**: Set your Vapi Server URL to `https://your-domain.com/api/vapi`.
2. **Tools**: Ensure the "Transfer" tool is enabled if you are using the visual builder.
3. **PhoneNumber**: Purchase or attach a phone number to the Assistant.

### GoHighLevel

1. **Custom Fields**: Ensure you have fields for `pest_type` or `summary` if needed, though they usually go to Notes.
2. **Workflows**: Create a workflow triggered by "Contact Tag: owner-followup-requested" to notify the app owner.

## 3. Deployment

1. Push to GitHub.
2. Import project in Vercel.
3. Add all Environment Variables.
4. Deploy.
