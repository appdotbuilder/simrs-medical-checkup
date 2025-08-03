<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExaminationResultRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'patient_id' => 'required|exists:patients,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'examination_date' => 'required|date|before_or_equal:today',
            'examination_type' => 'required|string|max:255',
            'height' => 'nullable|numeric|min:50|max:300',
            'weight' => 'nullable|numeric|min:1|max:500',
            'blood_pressure_systolic' => 'nullable|integer|min:60|max:300',
            'blood_pressure_diastolic' => 'nullable|integer|min:40|max:200',
            'heart_rate' => 'nullable|integer|min:30|max:250',
            'temperature' => 'nullable|numeric|min:30|max:45',
            'lab_results' => 'nullable|string',
            'diagnosis' => 'nullable|string',
            'recommendations' => 'nullable|string',
            'medications' => 'nullable|string',
            'doctor_name' => 'required|string|max:255',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'patient_id.required' => 'Patient selection is required.',
            'patient_id.exists' => 'Selected patient does not exist.',
            'examination_date.required' => 'Examination date is required.',
            'examination_date.before_or_equal' => 'Examination date cannot be in the future.',
            'examination_type.required' => 'Examination type is required.',
            'doctor_name.required' => 'Doctor name is required.',
            'height.min' => 'Height must be at least 50 cm.',
            'height.max' => 'Height cannot exceed 300 cm.',
            'weight.min' => 'Weight must be at least 1 kg.',
            'weight.max' => 'Weight cannot exceed 500 kg.',
        ];
    }
}