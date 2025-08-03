import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Patient } from '@/types/medical';

interface Props {
    patients: {
        data: Patient[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function PatientsIndex({ patients }: Props) {
    const getStatusColor = (status: string) => {
        return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    const getGenderIcon = (gender: string) => {
        return gender === 'male' ? '👨' : '👩';
    };

    return (
        <AppShell>
            <Head title="Patients - SIMRS" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">👥 Patient Management</h1>
                        <p className="text-gray-600 mt-1">Manage patient registrations and information</p>
                    </div>
                    <Link href="/patients/create">
                        <Button className="bg-blue-600 hover:bg-blue-700 mt-4 md:mt-0">
                            ➕ Register New Patient
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-blue-800">Total Patients</p>
                                    <p className="text-2xl font-bold text-blue-900">{patients.total}</p>
                                </div>
                                <div className="text-3xl">👥</div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-green-50 to-green-100">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-green-800">Active Patients</p>
                                    <p className="text-2xl font-bold text-green-900">
                                        {patients.data.filter(p => p.status === 'active').length}
                                    </p>
                                </div>
                                <div className="text-3xl">✅</div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-purple-800">Page</p>
                                    <p className="text-2xl font-bold text-purple-900">
                                        {patients.current_page} of {patients.last_page}
                                    </p>
                                </div>
                                <div className="text-3xl">📄</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Patients List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <span>📋</span>
                            <span>Patient Directory</span>
                        </CardTitle>
                        <CardDescription>
                            All registered patients in the system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {patients.data.length > 0 ? (
                            <div className="space-y-4">
                                {patients.data.map((patient) => (
                                    <div
                                        key={patient.id}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                                                {getGenderIcon(patient.gender)}
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                                                    <Badge variant="secondary" className={getStatusColor(patient.status)}>
                                                        {patient.status}
                                                    </Badge>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    ID: {patient.patient_number} • Age: {patient.age} years
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {patient.phone} {patient.email && `• ${patient.email}`}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            {patient.appointments && patient.appointments.length > 0 && (
                                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                                    📅 {patient.appointments.length} upcoming
                                                </Badge>
                                            )}
                                            <Link href={`/patients/${patient.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">👥</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients registered</h3>
                                <p className="text-gray-600 mb-4">Get started by registering your first patient</p>
                                <Link href="/patients/create">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        ➕ Register Patient
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {patients.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {patients.current_page > 1 && (
                            <Link href={`/patients?page=${patients.current_page - 1}`}>
                                <Button variant="outline">← Previous</Button>
                            </Link>
                        )}
                        
                        <span className="flex items-center px-4 py-2 text-sm text-gray-600">
                            Page {patients.current_page} of {patients.last_page}
                        </span>
                        
                        {patients.current_page < patients.last_page && (
                            <Link href={`/patients?page=${patients.current_page + 1}`}>
                                <Button variant="outline">Next →</Button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </AppShell>
    );
}