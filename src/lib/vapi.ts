export interface VapiPayload {
    message: {
        type: string;
        call?: {
            id: string;
            customer?: {
                number: string;
            };
        };
        // End of Call Report Fields
        transcript?: string;
        recordingUrl?: string;
        analysis?: {
            summary?: string;
            structuredData?: Record<string, unknown>;
        };
        customer?: {
            number: string;
        };
        // Tool Calls
        toolCalls?: Array<{
            id: string;
            type: string;
            function: {
                name: string;
                arguments: Record<string, unknown>;
            };
        }>;
    };
}

export const VAPI_CONFIG = {
    baseUrl: 'https://api.vapi.ai',
    // will be populated from env
    apiKey: process.env.VAPI_PRIVATE_KEY,
};
