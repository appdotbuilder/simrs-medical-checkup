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
        Schema::create('examination_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('appointment_id')->nullable()->constrained()->onDelete('set null');
            $table->date('examination_date')->comment('Date of examination');
            $table->string('examination_type')->comment('Type of examination performed');
            $table->decimal('height', 5, 2)->nullable()->comment('Patient height in cm');
            $table->decimal('weight', 5, 2)->nullable()->comment('Patient weight in kg');
            $table->integer('blood_pressure_systolic')->nullable()->comment('Systolic blood pressure');
            $table->integer('blood_pressure_diastolic')->nullable()->comment('Diastolic blood pressure');
            $table->integer('heart_rate')->nullable()->comment('Heart rate per minute');
            $table->decimal('temperature', 4, 1)->nullable()->comment('Body temperature in Celsius');
            $table->text('lab_results')->nullable()->comment('Laboratory test results');
            $table->text('diagnosis')->nullable()->comment('Medical diagnosis');
            $table->text('recommendations')->nullable()->comment('Medical recommendations');
            $table->text('medications')->nullable()->comment('Prescribed medications');
            $table->string('doctor_name')->comment('Examining doctor name');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('patient_id');
            $table->index('examination_date');
            $table->index(['patient_id', 'examination_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examination_results');
    }
};