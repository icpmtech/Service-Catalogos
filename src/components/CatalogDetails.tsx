import { CATALOG_VERSION } from '../constants';
import * as Icons from 'lucide-react';

interface CatalogDetailsProps {
  item: any;
}

export default function CatalogDetails({ item }: CatalogDetailsProps) {
  if (!item) {
    return (
      <div className="p-8 text-center text-zinc-500">
        <p>Selecione um serviço no menu lateral para ver os detalhes.</p>
      </div>
    );
  }

  const IconComponent = (Icons as any)[item.icon] || Icons.HelpCircle;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-zinc-900 text-white rounded-xl">
            <IconComponent className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900">{item.name}</h1>
        </div>
        <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-sm font-medium rounded-full">
          Versão: {CATALOG_VERSION}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Descrição</h2>
          <p className="text-zinc-600 mb-4">{item.description}</p>
          <p className="text-sm text-zinc-500 italic">{item.details}</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Funcionalidades</h2>
          <ul className="space-y-2">
            {item.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-center gap-2 text-zinc-600">
                <Icons.CheckCircle className="w-4 h-4 text-emerald-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {item.responsible && (
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-2">Responsável</h2>
            <p className="text-zinc-600 font-medium">{item.responsible.name}</p>
            <p className="text-zinc-500 text-sm">{item.responsible.email}</p>
          </div>
        )}
        {item.securityRequirements && (
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900 mb-2">Requisitos de Segurança</h2>
            <ul className="list-disc list-inside text-zinc-600 text-sm">
              {item.securityRequirements.map((req: string, index: number) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 bg-zinc-900 text-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">SLA (Service Level Agreement)</h2>
        <p className="text-zinc-300">Tempo de resposta garantido: <span className="font-bold text-white">{item.sla}</span></p>
      </div>
    </div>
  );
}
