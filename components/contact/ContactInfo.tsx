import React from "react";
import { Card } from "@/components/ui/Card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const ContactInfo: React.FC = () => {
  return (
    <Card title="Informations" icon={MapPin}>
      <div className="space-y-4">
        <div className="flex items-start">
          <Phone className="text-[#733706] mr-3 mt-1" size={20} />
          <div>
            <p className="font-semibold">Téléphone</p>
            <p>06 12 34 56 78</p>
          </div>
        </div>
        <div className="flex items-start">
          <Mail className="text-[#733706] mr-3 mt-1" size={20} />
          <div>
            <p className="font-semibold">Email</p>
            <p>contact@escapehome.fr</p>
          </div>
        </div>
        <div className="flex items-start">
          <Clock className="text-[#733706] mr-3 mt-1" size={20} />
          <div>
            <p className="font-semibold">Horaires</p>
            <p>Lun-Dim: 9h-22h</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
