import { CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import type { StatusLevel } from '../types';

export function StatusBadge({ status }: { status: StatusLevel }) {
    switch (status) {
        case 'normal':
            return <span className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-semibold"><CheckCircle size={14} className="mr-1" /> Normal</span>;
        case 'warning':
            return <span className="flex items-center text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-semibold"><AlertTriangle size={14} className="mr-1" /> Atenção</span>;
        case 'critical':
            return <span className="flex items-center text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-semibold"><AlertOctagon size={14} className="mr-1" /> Crítico</span>;
        default:
            return null;
    }
}