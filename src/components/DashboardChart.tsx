import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Suporte', value: 400 },
  { name: 'Comunicações', value: 300 },
  { name: 'Infraestrutura', value: 200 },
  { name: 'Desenvolvimento', value: 278 },
  { name: 'Formação', value: 189 },
];

export default function DashboardChart() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6">Estatísticas de Serviços</h2>
      <div className="h-96 w-full bg-white p-4 rounded-xl border border-zinc-200">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#18181b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
