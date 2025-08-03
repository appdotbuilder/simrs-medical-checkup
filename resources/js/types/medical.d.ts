export interface Patient {
    id: number;
    patient_number: string;
    name: string;
    date_of_birth: string;
    gender: 'male' | 'female';
    phone?: string;
    email?: string;
    address?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    medical_history?: string;
    allergies?: string;
    status: 'active' | 'inactive';
    age: number;
    created_at: string;
    updated_at: string;
    appointments?: Appointment[];
    examination_results?: ExaminationResult[];
}

export interface Appointment {
    id: number;
    patient_id: number;
    appointment_number: string;
    appointment_date: string;
    appointment_time: string;
    type: 'general_checkup' | 'specialized_checkup' | 'follow_up' | 'emergency';
    doctor_name?: string;
    notes?: string;
    status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
    patient?: Patient;
}

export interface ExaminationResult {
    id: number;
    patient_id: number;
    appointment_id?: number;
    examination_date: string;
    examination_type: string;
    height?: number;
    weight?: number;
    blood_pressure_systolic?: number;
    blood_pressure_diastolic?: number;
    heart_rate?: number;
    temperature?: number;
    lab_results?: string;
    diagnosis?: string;
    recommendations?: string;
    medications?: string;
    doctor_name: string;
    bmi?: number;
    created_at: string;
    updated_at: string;
    patient?: Patient;
    appointment?: Appointment;
}

export interface DashboardStats {
    totalPatients: number;
    newPatientsThisMonth: number;
    upcomingAppointments: number;
    todayAppointments: number;
}