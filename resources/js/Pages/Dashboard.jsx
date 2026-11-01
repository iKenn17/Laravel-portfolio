import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Welcome Back!</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            You are logged in to your portfolio management dashboard.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link
                                href={route('projects.index')}
                                className="block p-5 border border-teal-500/30 rounded-xl bg-teal-50 hover:bg-teal-100 transition"
                            >
                                <h4 className="font-semibold text-teal-900 text-base mb-1">
                                    Manage Projects &rarr;
                                </h4>
                                <p className="text-xs text-teal-700">
                                    Add, edit, update, or remove portfolio projects and screenshots.
                                </p>
                            </Link>

                            <Link
                                href={route('home')}
                                className="block p-5 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                            >
                                <h4 className="font-semibold text-gray-900 text-base mb-1">
                                    View Live Portfolio &rarr;
                                </h4>
                                <p className="text-xs text-gray-600">
                                    Check your public portfolio landing page and see your changes live.
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
