import { TrendingUp } from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import type { ChartData } from '../types';

export function VibrationChart({ data }: { data: ChartData[] }) {
    return (
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-5 min-w-0">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp size={20} className="text-cyan-600" />
                        Análise de Vibração (Série Temporal)
                    </h2>
                    <p className="text-xs text-slate-500">Foco: Motor C3 Exaustor Principal (Alarme Crítico Ativo)</p>
                </div>
                <div className="flex gap-2">
                    <span className="flex items-center text-xs text-slate-500 before:content-[''] before:w-3 before:h-3 before:bg-cyan-500 before:inline-block before:mr-1 before:rounded-sm">Atual</span>
                    <span className="flex items-center text-xs text-slate-500 before:content-[''] before:w-3 before:h-3 before:bg-slate-300 before:inline-block before:mr-1 before:rounded-sm">Baseline (IA)</span>
                </div>
            </div>

            {/* Altura fixa necessária para o ResponsiveContainer funcionar em CSS Grid */}
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit=" mm/s" />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <ReferenceLine y={7.0} label={{ position: 'top', value: 'Limite Crítico', fill: '#ef4444', fontSize: 11 }} stroke="#ef4444" strokeDasharray="3 3" />
                        <ReferenceLine y={4.5} label={{ position: 'insideBottomLeft', value: 'Limite Atenção', fill: '#eab308', fontSize: 11 }} stroke="#eab308" strokeDasharray="3 3" />

                        <Line type="monotone" dataKey="baseline" stroke="#cbd5e1" strokeWidth={2} dot={false} name="Baseline" />
                        <Line
                            type="monotone"
                            dataKey="vibration"
                            stroke="#06b6d4"
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                            activeDot={{ r: 6, fill: '#06b6d4' }}
                            name="Vibração Atual"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}