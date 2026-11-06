export type StatusLevel = 'normal' | 'warning' | 'critical';

export interface ChartData {
    time: string;
    vibration: number;
    baseline: number;
}

export interface Alert {
    id: number;
    motor: string;
    level: StatusLevel;
    message: string;
    aiDiagnosis: string;
    time: string;
}

export interface Motor {
    id: string;
    name: string;
    status: StatusLevel;
    vibration: string;
}