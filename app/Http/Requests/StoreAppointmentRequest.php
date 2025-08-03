<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAppointmentRequest extends FormRequest
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
            'appointment_date' => 'required|date|after_or_equal:today',
            'appointment_time' => 'required|date_format:H:i',
            'type' => 'required|in:general_checkup,specialized_checkup,follow_up,emergency',
            'doctor_name' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
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
            'appointment_date.required' => 'Appointment date is required.',
            'appointment_date.after_or_equal' => 'Appointment date cannot be in the past.',
            'appointment_time.required' => 'Appointment time is required.',
            'appointment_time.date_format' => 'Please provide a valid time format (HH:MM).',
            'type.required' => 'Appointment type is required.',
        ];
    }
}