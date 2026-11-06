import { useState, useEffect } from 'react';
import { Activity, CheckCircle, AlertTriangle, AlertOctagon, Cpu, Bell, Settings, Clock } from 'lucide-react';
import { VibrationChart } from './components/VibrationChart';
import { MotorsList } from './components/MotorsList';
import { AlarmPanel } from './components/AlarmPanel';
import type { ChartData, Alert, Motor } from './types';

const MOCK_CHART_DATA: ChartData[] = [
  { time: '08:00', vibration: 2.1, baseline: 2.0 },
  { time: '08:01', vibration: 2.3, baseline: 2.0 },
  { time: '08:02', vibration: 2.2, baseline: 2.0 },
  { time: '08:03', vibration: 2.5, baseline: 2.0 },
  { time: '08:04', vibration: 2.1, baseline: 2.0 },
  { time: '08:05', vibration: 3.8, baseline: 2.0 },
  { time: '08:06', vibration: 5.4, baseline: 2.0 },
  { time: '08:07', vibration: 8.2, baseline: 2.0 },
  { time: '08:08', vibration: 7.9, baseline: 2.0 },
  { time: '08:09', vibration: 8.5, baseline: 2.0 },
];

const MOCK_ALERTS: Alert[] = [
  { id: 1, motor: 'Motor C3 - Exaustor Principal', level: 'critical', message: 'Vibração excessiva detectada (8.5 mm/s).', aiDiagnosis: 'Desgaste de rolamento interno (94% de confiança).', time: 'Há 2 minutos' },
  { id: 2, motor: 'Motor B2 - Esteira Transportadora', level: 'warning', message: 'Desvio de padrão harmônico identificado.', aiDiagnosis: 'Desalinhamento de eixos (88% de confiança).', time: 'Há 45 minutos' },
  { id: 3, motor: 'Motor A1 - Bomba Hidráulica', level: 'warning', message: 'Aumento leve na frequência de 1X RPM.', aiDiagnosis: 'Possível desbalanceamento do rotor.', time: 'Há 2 horas' }
];

const MOCK_MOTORS: Motor[] = [
  { id: 'M-A1', name: 'Bomba Hidráulica 01', status: 'normal', vibration: '2.1 mm/s' },
  { id: 'M-A2', name: 'Bomba Hidráulica 02', status: 'normal', vibration: '2.0 mm/s' },
  { id: 'M-B1', name: 'Esteira Linha A', status: 'normal', vibration: '1.8 mm/s' },
  { id: 'M-B2', name: 'Esteira Linha B', status: 'warning', vibration: '5.4 mm/s' },
  { id: 'M-C1', name: 'Compressor 01', status: 'normal', vibration: '2.5 mm/s' },
  { id: 'M-C3', name: 'Exaustor Principal', status: 'critical', vibration: '8.5 mm/s' },
];

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('pt-BR'));

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString('pt-BR')), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalMotors = MOCK_MOTORS.length;
  const normalMotors = MOCK_MOTORS.filter(m => m.status === 'normal').length;
  const warningMotors = MOCK_MOTORS.filter(m => m.status === 'warning').length;
  const criticalMotors = MOCK_MOTORS.filter(m => m.status === 'critical').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-cyan-400" size={28} />
            <span className="text-2xl font-bold tracking-tight">Predi<span className="text-cyan-400">Vibe</span></span>
            <span className="ml-4 text-xs bg-slate-800 text-cyan-400 px-2 py-1 rounded-full border border-slate-700 hidden sm:inline-block">
              IA Preditiva Ativa
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm text-slate-300 flex items-center gap-2 hidden md:flex">
              <Clock size={16} /> {currentTime}
            </div>
            <div className="flex gap-4">
              <button className="text-slate-300 hover:text-white transition-colors relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </button>
              <button className="text-slate-300 hover:text-white transition-colors">
                <Settings size={20} />
              </button>
            </div>
            <div className="h-8 w-8 bg-cyan-600 rounded-full flex items-center justify-center font-bold text-sm border-2 border-slate-700">
              JS
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Visão Geral da Planta</h1>
          <p className="text-slate-500 text-sm">Monitoramento IoT e predição de falhas em tempo real.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center">
            <div className="bg-slate-100 p-3 rounded-lg text-slate-600 mr-4"><Cpu size={24} /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Monitorado</p>
              <h3 className="text-2xl font-bold text-slate-800">{totalMotors} Motores</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center">
            <div className="bg-green-100 p-3 rounded-lg text-green-600 mr-4"><CheckCircle size={24} /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Operação Normal</p>
              <h3 className="text-2xl font-bold text-green-600">{normalMotors} Motores</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600 mr-4"><AlertTriangle size={24} /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Em Atenção</p>
              <h3 className="text-2xl font-bold text-yellow-600">{warningMotors} Motores</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center ring-2 ring-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full -mr-8 -mt-8"></div>
            <div className="bg-red-100 p-3 rounded-lg text-red-600 mr-4"><AlertOctagon size={24} /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Estado Crítico</p>
              <h3 className="text-2xl font-bold text-red-600">{criticalMotors} Motor</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <VibrationChart data={MOCK_CHART_DATA} />
          <MotorsList motors={MOCK_MOTORS} />
        </div>

        <AlarmPanel alerts={MOCK_ALERTS} />
      </main>
    </div>
  );
}