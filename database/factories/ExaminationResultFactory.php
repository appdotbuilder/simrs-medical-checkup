<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ExaminationResult;
use App\Models\Patient;
use App\Models\Appointment;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExaminationResult>
 */
class ExaminationResultFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<ExaminationResult>
     */
    protected $model = ExaminationResult::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),
            'appointment_id' => null,
            'examination_date' => fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
            'examination_type' => fake()->randomElement(['General Checkup', 'Blood Test', 'X-Ray', 'ECG', 'Physical Examination']),
            'height' => fake()->numberBetween(150, 200),
            'weight' => fake()->numberBetween(45, 120),
            'blood_pressure_systolic' => fake()->numberBetween(90, 160),
            'blood_pressure_diastolic' => fake()->numberBetween(60, 100),
            'heart_rate' => fake()->numberBetween(60, 100),
            'temperature' => fake()->randomFloat(1, 36.0, 38.5),
            'lab_results' => fake()->optional()->paragraph(),
            'diagnosis' => fake()->optional()->sentence(),
            'recommendations' => fake()->optional()->paragraph(),
            'medications' => fake()->optional()->sentence(),
            'doctor_name' => 'Dr. ' . fake()->name(),
        ];
    }
}