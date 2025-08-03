import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';



export default function CreatePatient() {
    const [formData, setFormData] = useState({
        name: '',
        date_of_birth: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        medical_history: '',
        allergies: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post('/patients', formData, {
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            },
            onSuccess: () => {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <AppShell>
            <Head title="Register New Patient - SIMRS" />
            
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={() => router.get('/patients')}
                    >
                        ← Back to Patients
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">👤 Register New Patient</h1>
                        <p className="text-gray-600 mt-1">Add a new patient to the system</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>ℹ️</span>
                                <span>Basic Information</span>
                            </CardTitle>
                            <CardDescription>
                                Essential patient information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="Enter patient's full name"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date_of_birth">Date of Birth *</Label>
                                    <Input
                                        id="date_of_birth"
                                        type="date"
                                        value={formData.date_of_birth}
                                        onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                                        className={errors.date_of_birth ? 'border-red-500' : ''}
                                    />
                                    {errors.date_of_birth && <p className="text-sm text-red-600">{errors.date_of_birth}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender *</Label>
                                    <Select onValueChange={(value) => handleInputChange('gender', value)}>
                                        <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">👨 Male</SelectItem>
                                            <SelectItem value="female">👩 Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.gender && <p className="text-sm text-red-600">{errors.gender}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        placeholder="Enter phone number"
                                        className={errors.phone ? 'border-red-500' : ''}
                                    />
                                    {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="Enter email address"
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    placeholder="Enter patient's address"
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Emergency Contact */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>🚨</span>
                                <span>Emergency Contact</span>
                            </CardTitle>
                            <CardDescription>
                                Emergency contact information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="emergency_contact_name">Contact Name</Label>
                                    <Input
                                        id="emergency_contact_name"
                                        value={formData.emergency_contact_name}
                                        onChange={(e) => handleInputChange('emergency_contact_name', e.target.value)}
                                        placeholder="Emergency contact name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="emergency_contact_phone">Contact Phone</Label>
                                    <Input
                                        id="emergency_contact_phone"
                                        value={formData.emergency_contact_phone}
                                        onChange={(e) => handleInputChange('emergency_contact_phone', e.target.value)}
                                        placeholder="Emergency contact phone"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Medical Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>🏥</span>
                                <span>Medical Information</span>
                            </CardTitle>
                            <CardDescription>
                                Medical history and allergies
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="medical_history">Medical History</Label>
                                <Textarea
                                    id="medical_history"
                                    value={formData.medical_history}
                                    onChange={(e) => handleInputChange('medical_history', e.target.value)}
                                    placeholder="Previous medical conditions, surgeries, etc."
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="allergies">Allergies</Label>
                                <Textarea
                                    id="allergies"
                                    value={formData.allergies}
                                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                                    placeholder="Known allergies to medications, foods, etc."
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get('/patients')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isSubmitting ? 'Registering...' : '✅ Register Patient'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}