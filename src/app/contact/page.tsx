import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContact } from "@/components/sections/home/SectionContact";

export const metadata: Metadata = {
  title: "Contact & Consultation | GS-Softwares",
  description:
    "Start a project, request an architectural consultation, or discuss your digital requirements with GS-Softwares engineers.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />
      <main className="pt-20">
        <SectionContact />
      </main>
      <Footer />
    </div>
  );
}
