import { useState } from 'react';
import { Menu, X, Search, ChevronDown, BarChart, Network } from 'lucide-react';

const menuItems = [
  { name: 'Serviços Externos', sub: ['Suporte Técnico', 'Comunicações', 'Infraestrutura', 'Desenvolvimento', 'Formação', 'Gestão de Informação'] },
  { name: 'Serviços Internos', sub: ['Acreditação', 'Administração', 'Arquitetura', 'Helpdesk', 'Monitorização'] },
];

export default function Navbar({ searchQuery, setSearchQuery, setView }: { searchQuery: string, setSearchQuery: (q: string) => void, setView: (v: 'catalog' | 'chart' | 'graph') => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setView('catalog')}>
            <span className="text-xl font-bold text-zinc-900">Catálogo TI</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Pesquisar serviços..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-zinc-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <button onClick={() => setView('chart')} className="text-zinc-600 hover:text-zinc-900 flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Estatísticas
            </button>
            <button onClick={() => setView('graph')} className="text-zinc-600 hover:text-zinc-900 flex items-center gap-2">
              <Network className="w-5 h-5" />
              Mapa
            </button>
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <button className="flex items-center text-zinc-600 hover:text-zinc-900 font-medium">
                  {item.name} <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white border border-zinc-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {item.sub.map((sub) => (
                    <a key={sub} href="#" className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">{sub}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
