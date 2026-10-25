<section id="hero" class="w-[85%] lg:w-[65%] mx-auto my-12">
        <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            <!-- Profile Avatar with glowing border and status pill -->
            <div class="relative shrink-0 group">
                <div class="p-1 rounded-full bg-linear-to-tr from-teal-500 via-gray-400 to-teal-400 shadow-xl shadow-teal-500/10">
                    <img src="{{ asset('assets/me.jpg') }}" alt="Gleianne Kenn Suratos" class="w-56 h-56 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-black transition-transform duration-300 group-hover:scale-105">
                </div>
                
            </div>

            <!-- Intro Content -->
            <div class="flex flex-col text-center lg:text-left items-center lg:items-start">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-3">
                    👋 Welcome to my portfolio
                </div>

                <h1 class="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                    Gleianne Kenn <span class="text-teal-400">Suratos</span>
                </h1>

                <p class="text-sm sm:text-base text-gray-300 font-medium mt-2">
                    BSIT <span class="text-teal-500">•</span> Full Stack Web Developer <span class="text-teal-500">•</span> Software Developer
                </p>

                <!-- Location & Studies Badges -->
                <div class="flex flex-wrap justify-center lg:justify-start gap-2.5 mt-4 text-xs text-gray-300">
                    <div class="flex items-center gap-2 bg-neutral-900/80 border border-gray-700 px-3 py-1.5 rounded-lg">
                        <span class="text-teal-400"></span>
                        <span>Calamansi St., Coral, Mapandan, Pangasinan</span>
                    </div>
                    <div class="flex items-center gap-2 bg-neutral-900/80 border border-gray-700 px-3 py-1.5 rounded-lg">
                        <span class="text-teal-400"></span>
                        <span>Studies at Urdaneta City University</span>
                    </div>
                </div>

                <!-- Hobbies Section as interactive chips -->
                <div class="mt-5 w-full">
                    <p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Interests & Hobbies</p>
                    <div class="flex flex-wrap justify-center lg:justify-start gap-2 text-xs">
                        <span class="px-3 py-1.5 rounded-lg bg-neutral-900 border border-gray-700 text-gray-300 flex items-center gap-1.5 hover:border-teal-400 hover:text-white transition duration-200 cursor-pointer">
                             Video Games (Valorant, CS2, LoL)
                        </span>
                        <span class="px-3 py-1.5 rounded-lg bg-neutral-900 border border-gray-700 text-gray-300 flex items-center gap-1.5 hover:border-teal-400 hover:text-white transition duration-200 cursor-pointer">
                             Movies, Anime & K-drama
                        </span>
                        <span class="px-3 py-1.5 rounded-lg bg-neutral-900 border border-gray-700 text-gray-300 flex items-center gap-1.5 hover:border-teal-400 hover:text-white transition duration-200 cursor-pointer">
                             Music
                        </span>
                        <span class="px-3 py-1.5 rounded-lg bg-neutral-900 border border-gray-700 text-gray-300 flex items-center gap-1.5 hover:border-teal-400 hover:text-white transition duration-200 cursor-pointer">
                             Manhwa & Manga
                        </span>
                    </div>
                </div>

                <!-- Call to action buttons -->
                <div class="flex flex-wrap justify-center lg:justify-start gap-3 mt-6 pt-1">
                    <a href="#about" class="px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider bg-teal-500 text-black hover:bg-teal-400 transition-all duration-300 shadow-md shadow-teal-500/20 hover:-translate-y-0.5">
                        DISCOVER MY STORY
                    </a>
                    <a href="#skills" class="px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider border border-gray-600 bg-neutral-900/60 text-white hover:border-white hover:bg-neutral-900 transition-all duration-300 hover:-translate-y-0.5">
                        EXPLORE SKILLS
                    </a>
                </div>
            </div>
        </div>
</section>