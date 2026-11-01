import { Head, Link, router, usePage } from '@inertiajs/react';

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Index({ projects = [] }) {
    const { flash, auth } = usePage().props;

    const handleDelete = (project) => {
        if (confirm(`Delete "${project.title}"?`)) {
            router.delete(route('projects.destroy', project.id));
        }
    };

    return (
        <div className="bg-neutral-900 min-h-screen text-white font-sans">
            <Head title="Manage Projects" />

            <div className="w-[90%] lg:w-[75%] mx-auto py-10">
                {/* Header & Navigation */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-xl font-semibold">Manage Projects</h1>
                        {auth?.user && (
                            <p className="text-xs text-gray-400 mt-1">
                                Logged in as <span className="text-teal-400">{auth.user.name}</span>
                            </p>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href={route('dashboard')}
                            className="px-4 py-2 text-xs font-semibold border border-gray-600 rounded-lg hover:border-white transition"
                        >
                            DASHBOARD
                        </Link>
                        <a
                            href="/#projects"
                            className="px-4 py-2 text-xs font-semibold border border-gray-600 rounded-lg hover:border-white transition"
                        >
                            BACK TO PORTFOLIO
                        </a>
                        <Link
                            href={route('projects.create')}
                            className="px-4 py-2 text-xs font-semibold bg-teal-500 text-black rounded-lg hover:bg-teal-400 transition"
                        >
                            + ADD PROJECT
                        </Link>
                    </div>
                </div>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="mb-4 px-4 py-2 text-sm bg-teal-500/10 border border-teal-500/40 text-teal-300 rounded-lg">
                        {flash.success}
                    </div>
                )}

                {/* Projects Table */}
                <div className="overflow-x-auto border border-gray-700 rounded-xl bg-neutral-950/50">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-neutral-950 text-gray-400 text-xs uppercase">
                            <tr>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Technologies</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects && projects.length > 0 ? (
                                projects.map((project) => (
                                    <tr key={project.id} className="border-t border-gray-700 hover:bg-neutral-800/50 transition">
                                        <td className="px-4 py-3">
                                            {project.image ? (
                                                <img
                                                    src={`/storage/${project.image}`}
                                                    alt={project.title}
                                                    className="w-16 h-10 object-cover rounded border border-gray-700"
                                                />
                                            ) : (
                                                <div className="w-16 h-10 rounded bg-neutral-800 flex items-center justify-center text-[10px] text-gray-500">
                                                    No Image
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">
                                            {project.title}
                                        </td>
                                        <td className="px-4 py-3 text-gray-300 max-w-xs truncate">
                                            {project.description}
                                        </td>
                                        <td className="px-4 py-3 text-gray-300">
                                            {project.technologies}
                                        </td>
                                        <td className="px-4 py-3 text-gray-300 whitespace-nowrap">
                                            {formatDate(project.project_date)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('projects.edit', project.id)}
                                                    className="px-3 py-1 text-xs border border-teal-500 text-teal-400 rounded hover:bg-teal-500 hover:text-black transition"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project)}
                                                    className="px-3 py-1 text-xs border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-white transition cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                                        No projects yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

