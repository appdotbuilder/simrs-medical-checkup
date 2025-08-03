<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\Appointment;
use App\Models\ExaminationResult;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        // Get statistics
        $totalPatients = Patient::count();
        $newPatientsThisMonth = Patient::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
        
        $upcomingAppointments = Appointment::upcoming()->count();
        $todayAppointments = Appointment::today()->count();
        
        $recentResults = ExaminationResult::with(['patient', 'appointment'])
            ->latest('examination_date')
            ->limit(5)
            ->get();
        
        $upcomingAppointmentsList = Appointment::with('patient')
            ->upcoming()
            ->orderBy('appointment_date')
            ->orderBy('appointment_time')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalPatients' => $totalPatients,
                'newPatientsThisMonth' => $newPatientsThisMonth,
                'upcomingAppointments' => $upcomingAppointments,
                'todayAppointments' => $todayAppointments,
            ],
            'recentResults' => $recentResults,
            'upcomingAppointments' => $upcomingAppointmentsList,
        ]);
    }
}