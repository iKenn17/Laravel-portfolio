<section id="projects" class="w-[85%] lg:w-[65%] mx-auto">
    <div class="flex justify-between items-center my-8">
        <h1 class="text-xl font-semibold text-white">Projects</h1>
        <a href="{{ route('projects.index') }}" class="px-4 py-2 text-xs font-semibold tracking-wider border border-teal-500 text-teal-400 rounded-lg hover:bg-teal-500 hover:text-white hover:border-white transition-all duration-300 hover:scale-105 cursor-pointer">
            MANAGE
        </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
        @forelse ($projects as $project)
            <div class="project-card flex flex-col gap-3 p-4 border border-teal-500 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-neutral-900 cursor-pointer group"
                data-date="{{ $project->project_date?->format('F Y') }}">
                
                @if ($project->image)
                    <img src="{{ asset('storage/' . $project->image) }}" alt="{{ $project->title }}" class="w-full h-40 rounded-lg border border-gray-600 object-cover object-center group-hover:border-teal-400 transition-colors">
                @endif

                <div class="flex items-center justify-between">
                    <h2 class="text-base font-bold text-white group-hover:text-teal-400 transition-colors">{{ $project->title }}</h2>
                    <span class="text-[10px] text-gray-400 bg-neutral-900 border border-gray-700 px-2 py-0.5 rounded-full shrink-0 ml-2">Click to view</span>
                </div>

                @if ($project->project_date)
                    <p class="text-[11px] text-gray-400">{{ $project->project_date->format('F Y') }}</p>
                @endif

                <p class="project-description text-xs text-gray-300 leading-relaxed">
                    <span class="font-semibold text-white">Description: </span>{{ $project->description }}
                </p>

                <div class="project-badges flex flex-wrap items-center gap-2 mt-auto pt-2">
                    @foreach (array_filter(array_map('trim', explode(',', $project->technologies ?? ''))) as $tech)
                        <div class="flex items-center gap-1.5 border border-gray-600 rounded-full px-2.5 py-1 w-fit bg-neutral-900">
                            <span class="text-xs text-white">{{ $tech }}</span>
                        </div>
                    @endforeach
                </div>
            </div>
        @empty
            <p class="text-sm text-gray-400 col-span-full">No projects yet.</p>
        @endforelse
    </div>
</section>

<div id="project-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    <div id="modal-card" class="relative bg-neutral-950 border border-gray-700 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-white">
        <!-- Close Button -->
        <button id="modal-close-btn" aria-label="Close Modal" class="absolute top-4 right-4 text-gray-400 hover:text-white bg-neutral-900 border border-gray-700 hover:border-gray-500 rounded-full w-8 h-8 flex items-center justify-center transition">
            ✕
        </button>

        <!-- Full Screenshot Preview -->
        <div class="w-full flex justify-center bg-black/70 rounded-xl border border-gray-800 p-2.5">
            <img id="modal-image" src="" alt="Project Full View" class="max-h-[50vh] w-auto max-w-full rounded-lg object-contain shadow-lg">
        </div>

        <!-- Title & Description -->
        <div class="flex flex-col gap-1.5">
            <h3 id="modal-title" class="text-xl font-bold text-white"></h3>
            <p id="modal-desc" class="text-xs sm:text-sm text-gray-300 leading-relaxed"></p>
        </div>

        <!-- Date -->
        <div class="flex flex-col gap-1.5">
            <h3 id="modal-title" class="text-xl font-bold text-white"></h3>
            <p id="modal-date" class="text-xs text-teal-400 hidden"></p>
            <p id="modal-desc" class="text-xs sm:text-sm text-gray-300 leading-relaxed"></p>
        </div>

        <!-- Technologies Section -->
        <div class="pt-2 border-t border-gray-800">
            <p class="text-xs uppercase font-semibold text-gray-400 tracking-wider mb-2">Technologies Used</p>
            <div id="modal-tech-list" class="flex flex-wrap items-center gap-2">
                <!-- Populated dynamically -->
            </div>
        </div>
    </div>
</div>