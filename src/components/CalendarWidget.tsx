"use client";

import Script from "next/script";

export default function CalendarWidget() {
    return (
        <div className="w-full h-full min-h-[800px] bg-white rounded-xl overflow-hidden animate-in fade-in zoom-in duration-500">
            <div className="p-4 bg-apex-navy text-center">
                <h3 className="text-white font-bold text-lg">Select a Time for Your Inspection</h3>
                <p className="text-white/70 text-sm">Our experts will arrive within a 2-hour window of your selected time.</p>
            </div>
            <iframe
                src="https://api.leadconnectorhq.com/widget/booking/5gyRLCMeUACczBvHsSby" // NOTE: Ensure this is the correct Calendar ID, distinct from the Form ID if possible
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    minHeight: "800px"
                }}
                id="booking-calendar-widget"
                title="Booking Calendar"
            />
            <Script
                src="https://link.msgsndr.com/js/form_embed.js"
                strategy="lazyOnload"
            />
        </div>
    );
}
