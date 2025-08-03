import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Patient } from '@/types/medical';

interface Props {
    patient: Patient;
    [key: string]: unknown;
}

export default function ShowPatient({ patient }: Props) {
    const getStatusColor = (status: string) => {
        return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    const getGenderIcon = (gender: string) => {
        return gender === 'male' ? '👨' : '👩';
    };

    const getAppointmentStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };



    return (
        <AppShell>
            <Head title={`${patient.name} - Patient Details`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            onClick={() => router.get('/patients')}
                        >
                            ← Back to Patients
                        </Button>
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
                            {getGenderIcon(patient.gender)}
                        </div>
                        <div>
                            <div className="flex items-center space-x-3">
                                <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
                                <Badge variant="secondary" className={getStatusColor(patient.status)}>
                                    {patient.status}
                                </Badge>
                            </div>
                            <p className="text-gray-600">ID: {patient.patient_number} • Age: {patient.age} years</p>
                        </div>
                    </div>
                    
                    <div className="flex space-x-3 mt-4 md:mt-0">
                        <Link href={`/appointments/create?patient_id=${patient.id}`}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                📅 Schedule Appointment
                            </Button>
                        </Link>
                        <Link href={`/patients/${patient.id}/edit`}>
                            <Button variant="outline">
                                ✏️ Edit Patient
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Patient Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>ℹ️</span>
                                    <span>Basic Information</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                                        <p className="text-gray-900">{patient.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                                        <p className="text-gray-900">{new Date(patient.date_of_birth).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Gender</label>
                                        <p className="text-gray-900 capitalize">{patient.gender}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Age</label>
                                        <p className="text-gray-900">{patient.age} years</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>📞</span>
                                    <span>Contact Information</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Phone</label>
                                        <p className="text-gray-900">{patient.phone || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Email</label>
                                        <p className="text-gray-900">{patient.email || 'Not provided'}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Address</label>
                                    <p className="text-gray-900">{patient.address || 'Not provided'}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Emergency Contact */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>🚨</span>
                                    <span>Emergency Contact</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Contact Name</label>
                                        <p className="text-gray-900">{patient.emergency_contact_name || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Contact Phone</label>
                                        <p className="text-gray-900">{patient.emergency_contact_phone || 'Not provided'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Medical Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>🏥</span>
                                    <span>Medical Information</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Medical History</label>
                                    <p className="text-gray-900 whitespace-pre-wrap">{patient.medical_history || 'No medical history recorded'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Allergies</label>
                                    <p className="text-gray-900 whitespace-pre-wrap">{patient.allergies || 'No known allergies'}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>⚡</span>
                                    <span>Quick Actions</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={`/appointments/create?patient_id=${patient.id}`}>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                        📅 Schedule Appointment
                                    </Button>
                                </Link>
                                <Link href={`/examination-results/create?patient_id=${patient.id}`}>
                                    <Button variant="outline" className="w-full">
                                        🔬 Add Examination Result
                                    </Button>
                                </Link>
                                <Link href={`/patients/${patient.id}/edit`}>
                                    <Button variant="outline" className="w-full">
                                        ✏️ Edit Patient Information
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Upcoming Appointments */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>📋</span>
                                    <span>Upcoming Appointments</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {patient.appointments && patient.appointments.length > 0 ? (
                                    <div className="space-y-3">
                                        {patient.appointments.slice(0, 3).map((appointment) => (
                                            <div key={appointment.id} className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {new Date(appointment.appointment_date).toLocaleDateString()}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {appointment.appointment_time}
                                                </div>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <Badge 
                                                        variant="secondary" 
                                                        className={getAppointmentStatusColor(appointment.status)}
                                                    >
                                                        {appointment.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                        {patient.appointments.length > 3 && (
                                            <Link href={`/appointments?patient_id=${patient.id}`}>
                                                <Button variant="ghost" size="sm" className="w-full">
                                                    View All Appointments
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-gray-500">
                                        <div className="text-3xl mb-2">📅</div>
                                        <p className="text-sm">No upcoming appointments</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Recent Results */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>🔬</span>
                                    <span>Recent Results</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {patient.examination_results && patient.examination_results.length > 0 ? (
                                    <div className="space-y-3">
                                        {patient.examination_results.slice(0, 3).map((result) => (
                                            <div key={result.id} className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {result.examination_type}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {new Date(result.examination_date).toLocaleDateString()}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    By {result.doctor_name}
                                                </div>
                                            </div>
                                        ))}
                                        {patient.examination_results.length > 3 && (
                                            <Link href={`/examination-results?patient_id=${patient.id}`}>
                                                <Button variant="ghost" size="sm" className="w-full">
                                                    View All Results
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-gray-500">
                                        <div className="text-3xl mb-2">🔬</div>
                                        <p className="text-sm">No examination results</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}