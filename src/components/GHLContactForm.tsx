"use client";

import Script from "next/script";

export default function GHLContactForm() {
    return (
        <>
            <div className="w-full h-full min-h-[800px] bg-white rounded-xl overflow-hidden">
                <iframe
                    src="https://api.leadconnectorhq.com/widget/form/5gyRLCMeUACczBvHsSby"
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: "3px",
                        minHeight: "800px" // Fallback height
                    }}
                    id="inline-5gyRLCMeUACczBvHsSby"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Pest Quote Request"
                    data-height="949"
                    data-layout-iframe-id="inline-5gyRLCMeUACczBvHsSby"
                    data-form-id="5gyRLCMeUACczBvHsSby"
                    title="Pest Quote Request"
                />
            </div>
            <Script
                src="https://link.msgsndr.com/js/form_embed.js"
                strategy="lazyOnload"
            />
        </>
    );
}
