import { Bell, AlertOctagon, AlertTriangle, Cpu } from 'lucide-react';
import type { Alert } from '../types';

export function AlarmPanel({ alerts }: { alerts: Alert[] }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Bell size={20} className="text-slate-600" />
                    Painel de Alarmes e Diagnósticos (IA)
                </h2>
                <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded text-xs font-medium">Últimas 24h</span>
            </div>

            <div className="divide-y divide-slate-100">
                {alerts.map((alert) => (
                    <div key={alert.id} className={`p-4 flex gap-4 hover:bg-slate-50 transition-colors ${alert.level === 'critical' ? 'bg-red-50/30' : ''}`}>
                        <div className="flex-shrink-0 mt-1">
                            {alert.level === 'critical'
                                ? <div className="bg-red-100 p-2 rounded-full text-red-600"><AlertOctagon size={20} /></div>
                                : <div className="bg-yellow-100 p-2 rounded-full text-yellow-600"><AlertTriangle size={20} /></div>
                            }
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-slate-800">{alert.motor}</h4>
                                <span className="text-xs text-slate-500 font-medium">{alert.time}</span>
                            </div>
                            <p className="text-sm text-slate-600 mt-1">{alert.message}</p>

                            <div className="mt-3 bg-slate-900 rounded-lg p-3 border border-slate-700 shadow-inner flex items-start gap-3">
                                <Cpu size={18} className="text-cyan-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-cyan-400 font-semibold mb-1 uppercase tracking-wider">Diagnóstico IA Futurae</p>
                                    <p className="text-sm text-slate-200">{alert.aiDiagnosis}</p>
                                </div>
                            </div>

                            <div className="mt-3 flex gap-2">
                                <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-md text-xs font-medium hover:bg-slate-50 shadow-sm transition-colors">
                                    Reconhecer Alarme
                                </button>
                                <button className="px-3 py-1.5 bg-cyan-600 text-white rounded-md text-xs font-medium hover:bg-cyan-700 shadow-sm transition-colors">
                                    Abrir Ordem de Manutenção
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}