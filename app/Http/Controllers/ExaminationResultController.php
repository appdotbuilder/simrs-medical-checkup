<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExaminationResultRequest;
use App\Models\ExaminationResult;
use App\Models\Patient;
use App\Models\Appointment;
use Inertia\Inertia;

class ExaminationResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $results = ExaminationResult::with(['patient', 'appointment'])
            ->latest('examination_date')
            ->paginate(10);
        
        return Inertia::render('examination-results/index', [
            'results' => $results
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

        $appointments = Appointment::with('patient')
            ->whereIn('status', ['confirmed', 'in_progress'])
            ->orderBy('appointment_date')
            ->orderBy('appointment_time')
            ->get();

        return Inertia::render('examination-results/create', [
            'patients' => $patients,
            'appointments' => $appointments
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExaminationResultRequest $request)
    {
        $result = ExaminationResult::create($request->validated());

        return redirect()->route('examination-results.show', $result)
            ->with('success', 'Examination result recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ExaminationResult $examinationResult)
    {
        $examinationResult->load(['patient', 'appointment']);

        return Inertia::render('examination-results/show', [
            'result' => $examinationResult
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExaminationResult $examinationResult)
    {
        $patients = Patient::active()
            ->select('id', 'name', 'patient_number')
            ->orderBy('name')
            ->get();

        $appointments = Appointment::with('patient')
            ->whereIn('status', ['confirmed', 'in_progress', 'completed'])
            ->orderBy('appointment_date')
            ->orderBy('appointment_time')
            ->get();

        return Inertia::render('examination-results/edit', [
            'result' => $examinationResult,
            'patients' => $patients,
            'appointments' => $appointments
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreExaminationResultRequest $request, ExaminationResult $examinationResult)
    {
        $examinationResult->update($request->validated());

        return redirect()->route('examination-results.show', $examinationResult)
            ->with('success', 'Examination result updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExaminationResult $examinationResult)
    {
        $examinationResult->delete();

        return redirect()->route('examination-results.index')
            ->with('success', 'Examination result deleted successfully.');
    }
}