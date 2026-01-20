"use client";

import Script from "next/script";

export default function GHLBookingCalendar() {
    return (
        <>
            <div className="w-full h-full min-h-[800px] bg-white rounded-xl overflow-hidden">
                <iframe
                    src="https://api.leadconnectorhq.com/widget/booking/UVJZDIMa19ikY1Ir9y7y"
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        overflow: "hidden",
                        minHeight: "800px"
                    }}
                    scrolling="no"
                    id="UVJZDIMa19ikY1Ir9y7y_1768787288754"
                    title="Free Pest Inspection"
                />
            </div>
            <Script
                src="https://api.leadconnectorhq.com/js/form_embed.js"
                strategy="lazyOnload"
            />
        </>
    );
}
