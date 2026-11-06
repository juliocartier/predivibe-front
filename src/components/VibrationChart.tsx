import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// --- FUNÇÕES GERADORAS DE DADOS SIMULADOS (MOCKS) ---
const generateDesbalanceamentoData = () => {
    const data = [];
    for (let i = 0; i <= 120; i++) {
        let val = Math.random() * 1.5;
        if (i > 27 && i < 33) val += 45 * Math.exp(-Math.pow(i - 30, 2) / 2);
        if (i > 57 && i < 63) val += 8 * Math.exp(-Math.pow(i - 60, 2) / 2);
        if (i > 87 && i < 93) val += 4 * Math.exp(-Math.pow(i - 90, 2) / 2);
        data.push({ frequency: i, amplitude: val > 0 ? val : 0 });
    }
    return data;
};

const generateDesalinhamentoData = () => {
    const data = [];
    for (let i = 15; i <= 160; i++) {
        let val = 0.1 + Math.random() * 0.3;
        if (i > 27 && i < 33) val += 2.4 * Math.exp(-Math.pow(i - 30, 2) / 1.5);
        if (i > 57 && i < 63) val += 4.7 * Math.exp(-Math.pow(i - 60, 2) / 1.5);
        if (i > 87 && i < 93) val += 1.7 * Math.exp(-Math.pow(i - 90, 2) / 1.5);
        data.push({ frequency: i, amplitude: val });
    }
    return data;
};

const generateRolamentoData = () => {
    const data = [];
    for (let i = 0; i <= 5000; i += 20) {
        let val = Math.random() * 0.5;
        if (i > 2200 && i < 3400) {
            if (Math.abs(i - 2300) < 30) val += 1.6;
            if (Math.abs(i - 2450) < 30) val += 2.3;
            if (Math.abs(i - 2600) < 30) val += 3.0;
            if (Math.abs(i - 2750) < 30) val += 3.1;
            if (Math.abs(i - 2900) < 30) val += 3.0;
            if (Math.abs(i - 3050) < 30) val += 2.6;
            if (Math.abs(i - 3200) < 30) val += 1.4;
        }
        data.push({ frequency: i, amplitude: val });
    }
    return data;
};

const dataChart1 = generateDesbalanceamentoData();
const dataChart2 = generateDesalinhamentoData();
const dataChart3 = generateRolamentoData();

export function VibrationChart() {
    return (
        <div className="col-span-1 lg:col-span-2 bg-transparent min-w-0 flex flex-col gap-6">

            {/* GRÁFICO 1: Desbalanceamento */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-slate-800">Análise de Vibração - Espectro de Frequência (FFT)</h2>
                    <p className="text-xs text-slate-500">Sinal característico de desbalanceamento mecânico com pico proeminente em 1X</p>
                </div>
                <div style={{ width: '100%', height: 280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dataChart1} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="frequency" stroke="#94a3b8" fontSize={12} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '8px' }} labelFormatter={(val) => `${val} Hz`} />
                            {/* O segredo para forçar a renderização é o isAnimationActive={false} */}
                            <Line isAnimationActive={false} type="monotone" dataKey="amplitude" stroke="#3b82f6" strokeWidth={2} dot={false} name="Deslocamento" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* GRÁFICO 2: Desalinhamento */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <div className="mb-4 flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-blue-600"></div>
                    <h2 className="text-sm font-bold text-slate-700">Espectro FFT | Picos Harmônicos (Desalinhamento)</h2>
                </div>
                <div style={{ width: '100%', height: 280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dataChart2} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="frequency" stroke="#94a3b8" fontSize={12} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '8px' }} labelFormatter={(val) => `${val} Hz`} />
                            <Line isAnimationActive={false} type="linear" dataKey="amplitude" stroke="#2563eb" strokeWidth={2} dot={false} name="Velocidade" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* GRÁFICO 3: Rolamento */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <div className="mb-4 flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-blue-600"></div>
                    <h2 className="text-sm font-bold text-slate-700">Espectro FFT | Pico de Falha (Rolamento)</h2>
                </div>
                <div style={{ width: '100%', height: 280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dataChart3} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="frequency" stroke="#94a3b8" fontSize={12} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '8px' }} labelFormatter={(val) => `${val} Hz`} />
                            <Line isAnimationActive={false} type="linear" dataKey="amplitude" stroke="#3b82f6" strokeWidth={1.5} dot={false} name="Aceleração" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}