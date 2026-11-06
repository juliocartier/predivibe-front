import { StatusBadge } from './StatusBadge';
import type { Motor } from '../types';

export function MotorsList({ motors }: { motors: Motor[] }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Status dos Equipamentos</h2>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                {motors.map((motor) => (
                    <div key={motor.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                        <div>
                            <p className="text-sm font-semibold text-slate-700">{motor.name}</p>
                            <p className="text-xs text-slate-500">ID: {motor.id} • {motor.vibration}</p>
                        </div>
                        <StatusBadge status={motor.status} />
                    </div>
                ))}
            </div>
            <button className="mt-4 w-full py-2 text-sm font-medium text-cyan-600 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors">
                Ver todos os equipamentos
            </button>
        </div>
    );
}