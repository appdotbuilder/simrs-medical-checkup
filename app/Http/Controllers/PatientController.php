<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatientRequest;
use App\Models\Patient;
use Inertia\Inertia;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $patients = Patient::with(['appointments' => function ($query) {
            $query->upcoming()->latest('appointment_date');
        }])
        ->latest()
        ->paginate(10);
        
        return Inertia::render('patients/index', [
            'patients' => $patients
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('patients/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientRequest $request)
    {
        $data = $request->validated();
        $data['patient_number'] = Patient::generatePatientNumber();
        
        $patient = Patient::create($data);

        return redirect()->route('patients.show', $patient)
            ->with('success', 'Patient registered successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        $patient->load([
            'appointments' => function ($query) {
                $query->latest('appointment_date');
            },
            'examinationResults' => function ($query) {
                $query->latest('examination_date');
            }
        ]);

        return Inertia::render('patients/show', [
            'patient' => $patient
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        return Inertia::render('patients/edit', [
            'patient' => $patient
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePatientRequest $request, Patient $patient)
    {
        $patient->update($request->validated());

        return redirect()->route('patients.show', $patient)
            ->with('success', 'Patient information updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $patient->delete();

        return redirect()->route('patients.index')
            ->with('success', 'Patient deleted successfully.');
    }
}