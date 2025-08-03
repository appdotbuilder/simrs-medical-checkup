<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->string('appointment_number')->unique()->comment('Unique appointment number');
            $table->date('appointment_date')->comment('Appointment date');
            $table->time('appointment_time')->comment('Appointment time');
            $table->enum('type', ['general_checkup', 'specialized_checkup', 'follow_up', 'emergency'])->comment('Type of appointment');
            $table->string('doctor_name')->nullable()->comment('Assigned doctor name');
            $table->text('notes')->nullable()->comment('Appointment notes');
            $table->enum('status', ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled'])->default('scheduled')->comment('Appointment status');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('appointment_date');
            $table->index('status');
            $table->index(['patient_id', 'appointment_date']);
            $table->index(['status', 'appointment_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};