@csrf

<div class="flex flex-col gap-4">
    <div>
        <label class="block text-xs text-gray-400 mb-1">Title</label>
        <input type="text" name="title" value="{{ old('title', $project->title ?? '') }}" class="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-teal-500 outline-none">
        @error('title') <p class="text-red-400 text-xs mt-1">{{ $message }}</p> @enderror
    </div>

    <div>
        <label class="block text-xs text-gray-400 mb-1">Description</label>
        <textarea name="description" rows="4" class="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-teal-500 outline-none">{{ old('description', $project->description ?? '') }}</textarea>
        @error('description') <p class="text-red-400 text-xs mt-1">{{ $message }}</p> @enderror
    </div>

    <div>
        <label class="block text-xs text-gray-400 mb-1">Technologies (comma-separated)</label>
        <input type="text" name="technologies" value="{{ old('technologies', $project->technologies ?? '') }}" placeholder="Flutter, Firebase" class="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-teal-500 outline-none">
        @error('technologies') <p class="text-red-400 text-xs mt-1">{{ $message }}</p> @enderror
    </div>

    <div>
        <label class="block text-xs text-gray-400 mb-1">Date</label>
        <input type="date" name="project_date" value="{{ old('project_date', ($project->project_date ?? null)?->format('Y-m-d')) }}" class="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-teal-500 outline-none">
        @error('project_date') <p class="text-red-400 text-xs mt-1">{{ $message }}</p> @enderror
    </div>

    <div>
        <label class="block text-xs text-gray-400 mb-1">Image</label>
        @if (!empty($project->image))
            <img src="{{ asset('storage/' . $project->image) }}" class="w-32 h-20 object-cover rounded mb-2">
        @endif
        <input type="file" name="image" class="text-sm text-gray-300">
        @error('image') <p class="text-red-400 text-xs mt-1">{{ $message }}</p> @enderror
    </div>

    <div class="flex gap-3 pt-2">
        <button class="px-5 py-2 text-xs font-semibold bg-teal-500 text-black rounded-lg hover:bg-teal-400 transition cursor-pointer">SAVE</button>
        <a href="{{ route('projects.index') }}" class="px-5 py-2 text-xs font-semibold border border-gray-600 rounded-lg hover:border-white transition">CANCEL</a>
    </div>
</div>