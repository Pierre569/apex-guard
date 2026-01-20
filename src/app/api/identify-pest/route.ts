import { NextResponse } from 'next/server';
import { identifyPest } from '@/lib/gemini';
import { crossReferencePest } from '@/lib/intelligence';

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        if (!image) {
            return NextResponse.json({ error: "No image data provided" }, { status: 400 });
        }

        // Call Gemini 1.5 Pro to identify
        const result = await identifyPest(image);

        // Enterprise: Cross-Reference with "Community Sightings"
        // Note: In production, we would pass the text from the image metadata or user input
        const communityAlert = await crossReferencePest(result.pest, '28403');

        return NextResponse.json({ ...result, communityAlert });

    } catch (error) {
        console.error("Bug ID API Error:", error);
        return NextResponse.json({ error: "Identification failed" }, { status: 500 });
    }
}
