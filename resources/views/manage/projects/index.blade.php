@extends('layouts.portfolio')

@section('content')
<div class="bg-neutral-900 min-h-screen text-white">
    <div class="w-[90%] lg:w-[75%] mx-auto py-10">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-xl font-semibold">Manage Projects</h1>
            <div class="flex gap-3">
                <a href="{{ route('home') }}#projects" class="px-4 py-2 text-xs font-semibold border border-gray-600 rounded-lg hover:border-white transition">BACK TO PORTFOLIO</a>
                <a href="{{ route('projects.create') }}" class="px-4 py-2 text-xs font-semibold bg-teal-500 text-black rounded-lg hover:bg-teal-400 transition">+ ADD PROJECT</a>
            </div>
        </div>

        @if (session('success'))
            <div class="mb-4 px-4 py-2 text-sm bg-teal-500/10 border border-teal-500/40 text-teal-300 rounded-lg">
                {{ session('success') }}
            </div>
        @endif

        <div class="overflow-x-auto border border-gray-700 rounded-xl">
            <table class="w-full text-sm text-left">
                <thead class="bg-neutral-950 text-gray-400 text-xs uppercase">
                    <tr>
                        <th class="px-4 py-3">Image</th>
                        <th class="px-4 py-3">Title</th>
                        <th class="px-4 py-3">Description</th>
                        <th class="px-4 py-3">Technologies</th>
                        <th class="px-4 py-3">Date</th>
                        <th class="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($projects as $project)
                        <tr class="border-t border-gray-700 hover:bg-neutral-800/50">
                            <td class="px-4 py-3">
                                @if ($project->image)
                                    <img src="{{ asset('storage/' . $project->image) }}" alt="{{ $project->title }}" class="w-16 h-10 object-cover rounded">
                                @endif
                            </td>
                            <td class="px-4 py-3 font-semibold">{{ $project->title }}</td>
                            <td class="px-4 py-3 text-gray-300 max-w-xs truncate">{{ $project->description }}</td>
                            <td class="px-4 py-3 text-gray-300">{{ $project->technologies }}</td>
                            <td class="px-4 py-3 text-gray-300">{{ $project->project_date?->format('M d, Y') }}</td>
                            <td class="px-4 py-3">
                                <div class="flex justify-end gap-2">
                                    <a href="{{ route('projects.edit', $project) }}" class="px-3 py-1 text-xs border border-teal-500 text-teal-400 rounded hover:bg-teal-500 hover:text-black transition">Edit</a>
                                    <form method="POST" action="{{ route('projects.destroy', $project) }}" onsubmit="return confirm('Delete this project?')">
                                        @csrf
                                        @method('DELETE')
                                        <button class="px-3 py-1 text-xs border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-white transition cursor-pointer">Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="6" class="px-4 py-8 text-center text-gray-400">No projects yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection