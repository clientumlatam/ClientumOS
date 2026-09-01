import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@clientum/ui';

interface ServiceItem {
  id: string;
  label: string;
  desc: string;
  icon: React.ElementType;
  color: string;
}

interface ServiceGroup {
  key: string;
  title: string;
  accent: string;
  headerColor: string;
  items: ServiceItem[];
}

interface ServicesSectionProps {
  groups: ServiceGroup[];
  activeTab: string;
}

export function ServicesSection({ groups, activeTab }: ServicesSectionProps) {
  const { isPortuguese } = useLanguage();

  if (activeTab !== "servicios") return null;

  return (
    <div className="py-20 px-4 sm:px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            {isPortuguese ? "Nossos Serviços" : "Nuestros Servicios"}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {isPortuguese 
              ? "Transformamos sua empresa com tecnologia, inteligência artificial e processos ágeis."
              : "Transformamos tu empresa con tecnología, inteligencia artificial y procesos ágiles."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {groups.map((group) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`bg-slate-900 border-t-4 ${group.accent} p-8 rounded-2xl`}
            >
              <h3 className={`text-xl font-bold mb-6 ${group.headerColor}`}>
                {group.title}
              </h3>
              <ul className="space-y-6">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id} className="flex gap-4">
                      <div className={`p-3 rounded-xl ${item.color.split(' ')[1]}`}>
                        <Icon className={`w-6 h-6 ${item.color.split(' ')[0]}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{item.label}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button className="mt-8 flex items-center gap-2 text-emerald-400 text-sm font-bold hover:text-emerald-300 transition">
                {isPortuguese ? "Saiba mais" : "Saber más"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
