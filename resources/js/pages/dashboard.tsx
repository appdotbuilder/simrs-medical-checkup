import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardStats, ExaminationResult, Appointment } from '@/types/medical';

interface Props {
    stats: DashboardStats;
    recentResults: ExaminationResult[];
    upcomingAppointments: Appointment[];
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentResults, upcomingAppointments }: Props) {
    const getAppointmentTypeColor = (type: string) => {
        switch (type) {
            case 'emergency': return 'bg-red-100 text-red-800';
            case 'specialized_checkup': return 'bg-purple-100 text-purple-800';
            case 'follow_up': return 'bg-blue-100 text-blue-800';
            default: return 'bg-green-100 text-green-800';
        }
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

    const formatAppointmentType = (type: string) => {
        return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <AppShell>
            <Head title="Dashboard - SIMRS" />
            
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🏥 Medical Dashboard</h1>
                        <p className="text-gray-600 mt-1">Welcome back! Here's your medical center overview.</p>
                    </div>
                    <div className="flex space-x-3 mt-4 md:mt-0">
                        <Link href="/patients/create">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                👤 Add Patient
                            </Button>
                        </Link>
                        <Link href="/appointments/create">
                            <Button variant="outline">
                                📅 Schedule Appointment
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800">Total Patients</CardTitle>
                            <div className="text-2xl">👥</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-900">{stats.totalPatients}</div>
                            <p className="text-xs text-blue-600 mt-1">Registered patients</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-green-800">New This Month</CardTitle>
                            <div className="text-2xl">📈</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-900">{stats.newPatientsThisMonth}</div>
                            <p className="text-xs text-green-600 mt-1">New patients</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-purple-800">Upcoming</CardTitle>
                            <div className="text-2xl">📅</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-purple-900">{stats.upcomingAppointments}</div>
                            <p className="text-xs text-purple-600 mt-1">Scheduled appointments</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-orange-800">Today</CardTitle>
                            <div className="text-2xl">⏰</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-orange-900">{stats.todayAppointments}</div>
                            <p className="text-xs text-orange-600 mt-1">Today's appointments</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Examination Results */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>🔬</span>
                                    <span>Recent Examination Results</span>
                                </CardTitle>
                                <CardDescription>Latest medical check-up results</CardDescription>
                            </div>
                            <Link href="/examination-results">
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {recentResults.length > 0 ? (
                                <div className="space-y-4">
                                    {recentResults.map((result) => (
                                        <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {result.patient?.name}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {result.examination_type} • {result.doctor_name}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {new Date(result.examination_date).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                {result.bmi && (
                                                    <div className="text-sm font-medium">BMI: {result.bmi}</div>
                                                )}
                                                <Link href={`/examination-results/${result.id}`}>
                                                    <Button variant="ghost" size="sm">View</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <div className="text-4xl mb-2">🔬</div>
                                    <p>No examination results yet</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Upcoming Appointments */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>📋</span>
                                    <span>Upcoming Appointments</span>
                                </CardTitle>
                                <CardDescription>Next scheduled appointments</CardDescription>
                            </div>
                            <Link href="/appointments">
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {upcomingAppointments.length > 0 ? (
                                <div className="space-y-4">
                                    {upcomingAppointments.map((appointment) => (
                                        <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {appointment.patient?.name}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {new Date(appointment.appointment_date).toLocaleDateString()} at {appointment.appointment_time}
                                                </div>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <Badge 
                                                        variant="secondary" 
                                                        className={getAppointmentTypeColor(appointment.type)}
                                                    >
                                                        {formatAppointmentType(appointment.type)}
                                                    </Badge>
                                                    <Badge 
                                                        variant="secondary" 
                                                        className={getAppointmentStatusColor(appointment.status)}
                                                    >
                                                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <Link href={`/appointments/${appointment.id}`}>
                                                <Button variant="ghost" size="sm">View</Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <div className="text-4xl mb-2">📅</div>
                                    <p>No upcoming appointments</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <span>⚡</span>
                            <span>Quick Actions</span>
                        </CardTitle>
                        <CardDescription>Common tasks and shortcuts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/patients">
                                <div className="p-4 text-center bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                                    <div className="text-2xl mb-2">👥</div>
                                    <div className="font-medium text-gray-900">Manage Patients</div>
                                    <div className="text-sm text-gray-600">View all patients</div>
                                </div>
                            </Link>
                            
                            <Link href="/appointments">
                                <div className="p-4 text-center bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                                    <div className="text-2xl mb-2">📅</div>
                                    <div className="font-medium text-gray-900">Appointments</div>
                                    <div className="text-sm text-gray-600">Schedule & manage</div>
                                </div>
                            </Link>
                            
                            <Link href="/examination-results">
                                <div className="p-4 text-center bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                                    <div className="text-2xl mb-2">🔬</div>
                                    <div className="font-medium text-gray-900">Results</div>
                                    <div className="text-sm text-gray-600">Examination data</div>
                                </div>
                            </Link>
                            
                            <Link href="/examination-results/create">
                                <div className="p-4 text-center bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer">
                                    <div className="text-2xl mb-2">➕</div>
                                    <div className="font-medium text-gray-900">Add Result</div>
                                    <div className="text-sm text-gray-600">Record examination</div>
                                </div>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}