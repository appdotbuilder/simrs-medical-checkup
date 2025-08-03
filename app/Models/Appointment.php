<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Appointment
 *
 * @property int $id
 * @property int $patient_id
 * @property string $appointment_number
 * @property \Illuminate\Support\Carbon $appointment_date
 * @property string $appointment_time
 * @property string $type
 * @property string|null $doctor_name
 * @property string|null $notes
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Patient $patient
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereAppointmentDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereAppointmentNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereAppointmentTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereDoctorName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment wherePatientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment upcoming()
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment today()
 * @method static \Database\Factories\AppointmentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Appointment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'patient_id',
        'appointment_number',
        'appointment_date',
        'appointment_time',
        'type',
        'doctor_name',
        'notes',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'appointment_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the patient that owns the appointment.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    /**
     * Scope a query to only include upcoming appointments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUpcoming($query)
    {
        return $query->where('appointment_date', '>=', now()->toDateString())
                     ->whereIn('status', ['scheduled', 'confirmed']);
    }

    /**
     * Scope a query to only include today's appointments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeToday($query)
    {
        return $query->whereDate('appointment_date', now()->toDateString());
    }

    /**
     * Generate a unique appointment number.
     *
     * @return string
     */
    public static function generateAppointmentNumber(): string
    {
        do {
            $number = 'A' . date('Ymd') . str_pad((string) random_int(1, 999), 3, '0', STR_PAD_LEFT);
        } while (static::where('appointment_number', $number)->exists());

        return $number;
    }
}