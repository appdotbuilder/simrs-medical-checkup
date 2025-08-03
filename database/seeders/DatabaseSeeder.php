<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Patient;
use App\Models\Appointment;
use App\Models\ExaminationResult;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'SIMRS Admin',
            'email' => 'admin@simrs.com',
        ]);

        // Create test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create patients with appointments and examination results
        Patient::factory(25)->active()->create()->each(function ($patient) {
            // Create appointments for each patient
            $appointments = Appointment::factory(random_int(1, 4))
                ->upcoming()
                ->create(['patient_id' => $patient->id]);

            // Create some completed appointments
            Appointment::factory(random_int(0, 3))
                ->create([
                    'patient_id' => $patient->id,
                    'appointment_date' => fake()->dateTimeBetween('-6 months', '-1 week')->format('Y-m-d'),
                    'status' => 'completed'
                ]);

            // Create examination results
            ExaminationResult::factory(random_int(1, 5))
                ->create(['patient_id' => $patient->id]);
        });

        // Create some inactive patients
        Patient::factory(5)->create(['status' => 'inactive']);
    }
}
