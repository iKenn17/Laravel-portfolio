import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        technologies: '',
        project_date: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <div className="bg-neutral-900 min-h-screen text-white font-sans">
            <Head title="Add Project" />

            <div className="w-[90%] lg:w-[50%] mx-auto py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-semibold">Add Project</h1>
                    <Link
                        href={route('projects.index')}
                        className="text-xs text-gray-400 hover:text-white transition"
                    >
                        ← Back to list
                    </Link>
                </div>

                <form onSubmit={submit} className="bg-neutral-950 border border-gray-700 rounded-xl p-6 flex flex-col gap-5">
                    {/* Title */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1 font-medium">
                            Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            maxLength={255}
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={`w-full bg-black rounded-lg px-3 py-2 text-sm text-white outline-none border transition ${
                                errors.title
                                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                    : 'border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                            }`}
                            placeholder="e.g. FitPass Gym App"
                        />
                        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1 font-medium">
                            Description <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            rows={4}
                            required
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className={`w-full bg-black rounded-lg px-3 py-2 text-sm text-white outline-none border transition ${
                                errors.description
                                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                    : 'border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                            }`}
                            placeholder="Describe the project, goals, and key features..."
                        />
                        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Technologies */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1 font-medium">
                            Technologies (comma-separated)
                        </label>
                        <input
                            type="text"
                            maxLength={255}
                            value={data.technologies}
                            onChange={(e) => setData('technologies', e.target.value)}
                            placeholder="Flutter, Firebase, Laravel"
                            className={`w-full bg-black rounded-lg px-3 py-2 text-sm text-white outline-none border transition ${
                                errors.technologies
                                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                    : 'border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                            }`}
                        />
                        {errors.technologies && <p className="text-red-400 text-xs mt-1">{errors.technologies}</p>}
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1 font-medium">Date</label>
                        <input
                            type="date"
                            value={data.project_date}
                            onChange={(e) => setData('project_date', e.target.value)}
                            className={`w-full bg-black rounded-lg px-3 py-2 text-sm text-white outline-none border transition ${
                                errors.project_date
                                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                                    : 'border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                            }`}
                        />
                        {errors.project_date && <p className="text-red-400 text-xs mt-1">{errors.project_date}</p>}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1 font-medium">Image (Max 2MB)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files[0])}
                            className={`text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-neutral-800 file:text-teal-400 hover:file:bg-neutral-700 cursor-pointer ${
                                errors.image ? 'border border-red-500 rounded-lg p-1' : ''
                            }`}
                        />
                        {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-3 border-t border-gray-800">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2 text-xs font-semibold bg-teal-500 text-black rounded-lg hover:bg-teal-400 transition disabled:opacity-50 cursor-pointer"
                        >
                            {processing ? 'SAVING...' : 'SAVE'}
                        </button>
                        <Link
                            href={route('projects.index')}
                            className="px-5 py-2 text-xs font-semibold border border-gray-600 rounded-lg hover:border-white transition"
                        >
                            CANCEL
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

