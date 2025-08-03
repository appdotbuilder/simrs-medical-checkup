<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Appointment;
use App\Models\Patient;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Appointment>
     */
    protected $model = Appointment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),
            'appointment_number' => Appointment::generateAppointmentNumber(),
            'appointment_date' => fake()->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
            'appointment_time' => fake()->time('H:i'),
            'type' => fake()->randomElement(['general_checkup', 'specialized_checkup', 'follow_up', 'emergency']),
            'doctor_name' => 'Dr. ' . fake()->name(),
            'notes' => fake()->optional()->sentence(),
            'status' => fake()->randomElement(['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled']),
        ];
    }

    /**
     * Indicate that the appointment is upcoming.
     */
    public function upcoming(): static
    {
        return $this->state(fn (array $attributes) => [
            'appointment_date' => fake()->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'status' => fake()->randomElement(['scheduled', 'confirmed']),
        ]);
    }
}