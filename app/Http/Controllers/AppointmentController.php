<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAppointmentRequest;
use App\Models\Appointment;
use App\Models\Patient;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appointments = Appointment::with('patient')
            ->latest('appointment_date')
            ->latest('appointment_time')
            ->paginate(10);
        
        return Inertia::render('appointments/index', [
            'appointments' => $appointments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $patients = Patient::active()
            ->select('id', 'name', 'patient_number')
            ->orderBy('name')
            ->get();

        return Inertia::render('appointments/create', [
            'patients' => $patients
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAppointmentRequest $request)
    {
        $data = $request->validated();
        $data['appointment_number'] = Appointment::generateAppointmentNumber();
        
        $appointment = Appointment::create($data);

        return redirect()->route('appointments.show', $appointment)
            ->with('success', 'Appointment scheduled successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment)
    {
        $appointment->load('patient');

        return Inertia::render('appointments/show', [
            'appointment' => $appointment
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Appointment $appointment)
    {
        $patients = Patient::active()
            ->select('id', 'name', 'patient_number')
            ->orderBy('name')
            ->get();

        return Inertia::render('appointments/edit', [
            'appointment' => $appointment,
            'patients' => $patients
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreAppointmentRequest $request, Appointment $appointment)
    {
        $appointment->update($request->validated());

        return redirect()->route('appointments.show', $appointment)
            ->with('success', 'Appointment updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return redirect()->route('appointments.index')
            ->with('success', 'Appointment deleted successfully.');
    }
}