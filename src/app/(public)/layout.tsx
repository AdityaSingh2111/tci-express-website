import React from "react";
import { PromotionalPopup }      from "@/components/layout/PromotionalPopup";
import { Navbar }                from "@/components/layout/Navbar";
import { Footer }                from "@/components/layout/Footer";
import { MobileBottomNav }       from "@/components/layout/MobileBottomNav";
import { FloatingWhatsAppButton} from "@/components/layout/FloatingWhatsAppButton";
import { ScrollToTopButton }     from "@/components/layout/ScrollToTopButton";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pb-16 md:pb-0">
        {children}
        <Footer />
      </div>
      <MobileBottomNav />
      <FloatingWhatsAppButton />
      <ScrollToTopButton />
      <PromotionalPopup />
    </>
  );
}
