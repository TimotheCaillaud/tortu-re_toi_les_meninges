import React from "react";
import { Card } from "@/components/ui/Card";
import { MapPin, Phone, Mail, Clock, MapPinned } from "lucide-react";

export const ContactInfo: React.FC = () => {
  return (
    <Card title="Informations" icon={MapPin}>
      <div className="space-y-4">
        <div className="flex items-start">
          <Phone className="text-[#733706] mr-3 mt-1" size={20} />
          <div>
            <p className="font-semibold">Téléphone</p>
            <p>+33 7 82 40 56 72</p>
          </div>
        </div>
        <div className="flex items-start">
          <Mail className="text-[#733706] mr-3 mt-1" size={20} />
          <div>
            <p className="font-semibold">Email</p>
            <p>torturetoilesmeninges@gmail.com</p>
          </div>
        </div>
        <div className="flex items-start">
          <MapPinned className="text-[#733706] mr-3 mt-1" size={20} />
          <div>
            <p className="font-semibold">Adresse</p>
            <p>91300 Massy</p>
          </div>
        </div>
        <div className="flex items-start">
          <Clock className="text-[#733706] mr-3 mt-1" size={20} />
          <div>
            <p className="font-semibold">Horaires période scolaire</p>
            <p>Ven: 18h-22h</p>
            <p>Sam-Dim: 9h-22h</p>
            <p className="font-semibold">Horaires hors période scolaire</p>
            <p>Lun-Dim: 9h-22h</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
