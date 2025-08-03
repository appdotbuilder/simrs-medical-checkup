<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ExaminationResult
 *
 * @property int $id
 * @property int $patient_id
 * @property int|null $appointment_id
 * @property \Illuminate\Support\Carbon $examination_date
 * @property string $examination_type
 * @property float|null $height
 * @property float|null $weight
 * @property int|null $blood_pressure_systolic
 * @property int|null $blood_pressure_diastolic
 * @property int|null $heart_rate
 * @property float|null $temperature
 * @property string|null $lab_results
 * @property string|null $diagnosis
 * @property string|null $recommendations
 * @property string|null $medications
 * @property string $doctor_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Patient $patient
 * @property-read \App\Models\Appointment|null $appointment
 * @property-read float|null $bmi
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult query()
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereAppointmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereBloodPressureDiastolic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereBloodPressureSystolic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereDiagnosis($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereDoctorName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereExaminationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereExaminationType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereHeartRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereLabResults($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereMedications($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult wherePatientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereRecommendations($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereTemperature($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExaminationResult whereWeight($value)
 * @method static \Database\Factories\ExaminationResultFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ExaminationResult extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'patient_id',
        'appointment_id',
        'examination_date',
        'examination_type',
        'height',
        'weight',
        'blood_pressure_systolic',
        'blood_pressure_diastolic',
        'heart_rate',
        'temperature',
        'lab_results',
        'diagnosis',
        'recommendations',
        'medications',
        'doctor_name',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'examination_date' => 'date',
        'height' => 'decimal:2',
        'weight' => 'decimal:2',
        'temperature' => 'decimal:1',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the patient that owns the examination result.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    /**
     * Get the appointment associated with the examination result.
     */
    public function appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class);
    }

    /**
     * Calculate BMI if height and weight are available.
     *
     * @return float|null
     */
    public function getBmiAttribute(): ?float
    {
        if ($this->height && $this->weight) {
            $heightInMeters = $this->height / 100;
            return round($this->weight / ($heightInMeters * $heightInMeters), 1);
        }
        
        return null;
    }
}