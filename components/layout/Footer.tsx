import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import React from "react";
import { Instagram } from "lucide-react";


export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#041f1e] text-[#f7dba7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-[#fffcf6] mb-4">
              TORTU&apos;RE TOI LES MÉNINGES
            </h3>
            <div className="flex flex-col gap-3">
              <p className="text-sm">
                L&apos;aventure à domicile pour des moments inoubliables
              </p>
              <a
                key={SITE_CONFIG.social.instagram}
                href={SITE_CONFIG.social.instagram}
                className="flex items-center space-x-2 text-[#f7dba7] hover:text-[#fffcf6] transition-colors duration-300 font-medium"
                >
                <Instagram size={20} />
                <span>Suivez moi sur Instagram</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[#fffcf6] mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {NAV_ITEMS.map((item) => {
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="hover:text-[#fffcf6] transition-colors"
                    >
                      <span>{item.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#fffcf6] mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#fffcf6] transition-colors">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#fffcf6] transition-colors">
                  CGV
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#fffcf6] transition-colors">
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#733706] pt-6 text-center text-sm">
          <p>© 2025 Tortu&apos;re toi les méninges. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
