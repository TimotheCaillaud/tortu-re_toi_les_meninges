"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message envoyé ! (Simulation)");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card title="Formulaire">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Votre nom"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full px-4 py-2 border-2 border-[#733706] rounded focus:outline-none focus:border-[#3f1f03]"
          required
        />
        <input
          type="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full px-4 py-2 border-2 border-[#733706] rounded focus:outline-none focus:border-[#3f1f03]"
          required
        />
        <input
          type="tel"
          placeholder="Votre téléphone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full px-4 py-2 border-2 border-[#733706] rounded focus:outline-none focus:border-[#3f1f03]"
        />
        <textarea
          placeholder="Votre message"
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border-2 border-[#733706] rounded focus:outline-none focus:border-[#3f1f03]"
          required
        ></textarea>
        {/* <Button variant="secondary" onClick={handleSubmit} className="w-full">
          Envoyer
        </Button> */}
      </div>
    </Card>
  );
};
