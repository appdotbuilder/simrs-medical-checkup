import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    canLogin?: boolean;
    canRegister?: boolean;
    [key: string]: unknown;
}

export default function Welcome({ canLogin, canRegister }: Props) {
    return (
        <>
            <Head title="SIMRS Medical Check-up" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">🏥</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">SIMRS</h1>
                                    <p className="text-sm text-blue-600">Medical Check-up System</p>
                                </div>
                            </div>
                            
                            {canLogin && (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/login"
                                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                    >
                                        Login
                                    </Link>
                                    {canRegister && (
                                        <Link href="/register">
                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                                Register
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center">
                            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
                                🩺 Advanced Medical Management System
                            </div>
                            
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Complete
                                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"> Medical </span>
                                Check-up Management
                            </h1>
                            
                            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                                Streamline your healthcare operations with our comprehensive SIMRS platform. 
                                Manage patients, schedule appointments, and track medical histories all in one place.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                {canLogin ? (
                                    <>
                                        <Link href="/login">
                                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
                                                🚀 Get Started
                                            </Button>
                                        </Link>
                                        <Link href="#features">
                                            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-blue-200 hover:bg-blue-50">
                                                📋 Learn More
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <Link href="/dashboard">
                                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
                                            📊 Go to Dashboard
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                🌟 Powerful Features
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Everything you need to manage your medical facility efficiently
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Patient Management</h3>
                                <p className="text-gray-600">Complete patient registration and profile management system</p>
                            </div>
                            
                            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📅</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Appointment Scheduling</h3>
                                <p className="text-gray-600">Easy-to-use appointment booking and management system</p>
                            </div>
                            
                            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🔬</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Examination Results</h3>
                                <p className="text-gray-600">Digital recording and management of medical examination results</p>
                            </div>
                            
                            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Medical History</h3>
                                <p className="text-gray-600">Comprehensive patient medical history tracking and reporting</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistics Section */}
                <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                📈 Why Choose SIMRS?
                            </h2>
                            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                                Trusted by healthcare professionals worldwide
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-white mb-2">99%</div>
                                <div className="text-blue-100 text-lg">Uptime Reliability</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-white mb-2">50K+</div>
                                <div className="text-blue-100 text-lg">Patients Managed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-white mb-2">24/7</div>
                                <div className="text-blue-100 text-lg">Support Available</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            🚀 Ready to Transform Your Medical Practice?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Join thousands of healthcare professionals who trust SIMRS for their daily operations.
                        </p>
                        {canLogin && (
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/login">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
                                        💻 Access System
                                    </Button>
                                </Link>
                                {canRegister && (
                                    <Link href="/register">
                                        <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-blue-200 hover:bg-blue-50">
                                            ✨ Create Account
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">🏥</span>
                                </div>
                                <span className="text-xl font-bold">SIMRS</span>
                            </div>
                            <p className="text-gray-400">
                                © 2024 SIMRS Medical Check-up System. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}