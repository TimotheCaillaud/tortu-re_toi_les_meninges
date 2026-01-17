import React from "react";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <section id="contact" className="py-16 px-4 bg-[#fffcf6]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#3f1f03] mb-12">
          Contactez-moi
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
