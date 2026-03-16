import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  onSelect: (item: any) => void;
  selectedId: string | null;
  searchQuery: string;
}

export default function Sidebar({ onSelect, selectedId, searchQuery }: SidebarProps) {
  const [menuData, setMenuData] = useState<any[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setMenuData(data);
        setExpandedCategories(data.map((c: any) => c.id));
      });
  }, []);

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const filteredData = menuData.map(category => ({
    ...category,
    items: category.items.filter((item: any) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <aside className="w-64 bg-white border-r border-zinc-200 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Catálogo de Serviços</h2>
        {filteredData.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhum serviço encontrado.</p>
        ) : (
          filteredData.map((category) => (
            <div key={category.id} className="mb-6">
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex items-center justify-between w-full text-sm font-medium text-zinc-900 mb-2 hover:text-zinc-700"
              >
                {category.name}
                {expandedCategories.includes(category.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              {expandedCategories.includes(category.id) && (
                <ul className="space-y-1">
                  {category.items.map((item: any) => (
                    <li key={item.id}>
                      <button
                        onClick={() => onSelect(item)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          selectedId === item.id
                            ? 'bg-zinc-100 text-zinc-900 font-medium'
                            : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
