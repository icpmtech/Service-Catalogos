/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CatalogDetails from './components/CatalogDetails';
import DashboardChart from './components/DashboardChart';
import MenuGraph from './components/MenuGraph';

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'catalog' | 'chart' | 'graph'>('catalog');

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setView={setView} />
      <div className="flex flex-1 overflow-hidden">
        {view === 'catalog' && (
          <Sidebar onSelect={setSelectedItem} selectedId={selectedItem?.id} searchQuery={searchQuery} />
        )}
        <main className="flex-1 overflow-y-auto">
          {view === 'catalog' ? (
            <CatalogDetails item={selectedItem} />
          ) : view === 'chart' ? (
            <DashboardChart />
          ) : (
            <MenuGraph />
          )}
        </main>
      </div>
    </div>
  );
}
