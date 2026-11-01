import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function Home({ projects = [], auth }) {
    const [activeSection, setActiveSection] = useState('about');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // Close modal on Escape
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Escape' && selectedProject) {
                setSelectedProject(null);
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedProject]);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [selectedProject]);

    const navItems = [
        { id: 'about', label: 'ABOUT ME' },
        { id: 'education', label: 'EDUCATION' },
        { id: 'skills', label: 'SKILLS' },
        { id: 'projects', label: 'PROJECTS' },
        { id: 'contact', label: 'CONTACTS' },
    ];

    return (
        <div className="bg-neutral-900 min-h-screen text-white font-sans">
            <Head title="Gleianne Kenn Suratos - Portfolio" />

            {/* Navbar */}
            <nav className="flex flex-row px-4 py-4 border-b-2 border-gray-600 bg-neutral-900/90 sticky top-0 z-40 backdrop-blur-md justify-between items-center">
                <a href="#" className="font-sans text-xl text-teal-500 font-semibold">
                    GKS
                </a>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex gap-8 text-xs font-semibold items-center text-white list-none">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                onClick={() => setActiveSection(item.id)}
                                className={`inline-block pb-2 border-b-2 transition duration-300 ${
                                    activeSection === item.id
                                        ? 'border-teal-500 text-teal-500'
                                        : 'border-transparent text-white hover:text-teal-400'
                                }`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                    {auth?.user ? (
                        <li>
                            <Link
                                href={route('dashboard')}
                                className="px-3 py-1.5 rounded-lg border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-black transition text-xs"
                            >
                                DASHBOARD
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link
                                href={route('login')}
                                className="px-3 py-1.5 rounded-lg border border-gray-600 text-gray-300 hover:border-teal-400 hover:text-white transition text-xs"
                            >
                                LOG IN
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation"
                    className="md:hidden text-white hover:text-teal-400 focus:outline-none p-1 transition cursor-pointer"
                >
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden flex flex-col bg-neutral-950 border-b border-gray-700 px-6 py-4 space-y-3">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={() => {
                                setActiveSection(item.id);
                                setMobileMenuOpen(false);
                            }}
                            className={`text-sm font-semibold transition ${
                                activeSection === item.id ? 'text-teal-400' : 'text-gray-300 hover:text-white'
                            }`}
                        >
                            {item.label}
                        </a>
                    ))}
                    {auth?.user ? (
                        <Link
                            href={route('dashboard')}
                            className="text-sm font-semibold text-teal-400 pt-2 border-t border-gray-800"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="text-sm font-semibold text-gray-300 pt-2 border-t border-gray-800"
                        >
                            Log In
                        </Link>
                    )}
                </div>
            )}

            {/* Hero Section */}
            <section id="hero" className="w-[85%] lg:w-[65%] mx-auto my-12">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
                    {/* Profile Avatar */}
                    <div className="relative shrink-0 group">
                        <div className="p-1 rounded-full bg-gradient-to-tr from-teal-500 via-gray-400 to-teal-400 shadow-xl shadow-teal-500/10">
                            <img
                                src="/assets/me.jpg"
                                alt="Gleianne Kenn Suratos"
                                className="w-56 h-56 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-black transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Intro Content */}
                    <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-3">
                            👋 Welcome to my portfolio
                        </div>

                        <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                            Gleianne Kenn <span className="text-teal-400">Suratos</span>
                        </h1>

                        <p className="text-sm sm:text-base text-gray-300 font-medium mt-2">
                            BSIT <span className="text-teal-500">•</span> Full Stack Web Developer{' '}
                            <span className="text-teal-500">•</span> Software Developer
                        </p>

                        {/* Location & Studies Badges */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mt-4 text-xs text-gray-300">
                            <div className="flex items-center gap-2 bg-neutral-900/80 border border-gray-700 px-3 py-1.5 rounded-lg">
                                <span>Calamansi St., Coral, Mapandan, Pangasinan</span>
                            </div>
                            <div className="flex items-center gap-2 bg-neutral-900/80 border border-gray-700 px-3 py-1.5 rounded-lg">
                                <span>Studies at Urdaneta City University</span>
                            </div>
                        </div>

                        {/* Hobbies Section */}
                        <div className="mt-5 w-full">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                Interests & Hobbies
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-xs">
                                <span className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-gray-700 text-gray-300 flex items-center gap-1.5 hover:border-teal-400 hover:text-white transition duration-200 cursor-pointer">
                                    Video Games (Valorant, CS2, LoL)
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-gray-700 text-gray-300 flex items-center gap-1.5 hover:border-teal-400 hover:text-white transition duration-200 cursor-pointer">
                                    Movies, Anime & K-drama
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-gray-700 text-gray-300 flex items-center gap-1.5 hover:border-teal-400 hover:text-white transition duration-200 cursor-pointer">
                                    Music
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-gray-700 text-gray-300 flex items-center gap-1.5 hover:border-teal-400 hover:text-white transition duration-200 cursor-pointer">
                                    Manhwa & Manga
                                </span>
                            </div>
                        </div>

                        {/* Call to action buttons */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-6 pt-1">
                            <a
                                href="#about"
                                onClick={() => setActiveSection('about')}
                                className="px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider bg-teal-500 text-black hover:bg-teal-400 transition-all duration-300 shadow-md shadow-teal-500/20 hover:-translate-y-0.5"
                            >
                                DISCOVER MY STORY
                            </a>
                            <a
                                href="#skills"
                                onClick={() => setActiveSection('skills')}
                                className="px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider border border-gray-600 bg-neutral-900/60 text-white hover:border-white hover:bg-neutral-900 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                EXPLORE SKILLS
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="w-[85%] lg:w-[75%] mx-auto border-gray-600" />

            {/* About Section */}
            <section id="about" className="w-[85%] lg:w-[65%] mx-auto">
                <div className="flex my-8">
                    <h1 className="text-xl font-semibold text-white">About Me</h1>
                </div>

                <div className="border border-teal-500 rounded-xl p-6 sm:p-8 flex flex-col gap-5 hover:bg-neutral-900 hover:border-white cursor-pointer my-8 transition-colors">
                    <p className="text-white text-base leading-relaxed">
                        Hello! I am <span className="font-semibold text-white">Gleianne Kenn Suratos</span>, a 21-year-old 3rd-year college student taking{' '}
                        <span className="font-semibold text-white">Bachelor of Science in Information Technology</span> at Urdaneta City University, residing in Coral, Mapandan, Pangasinan.
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        My passion for technology began during my childhood—spending hours playing computer games, repairing devices, and tinkering with DIY projects. That natural curiosity inspired me to pursue BSIT, where I specialize in Full Stack Web and Software Development.
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        I am driven to create fully functional, high-performance websites and software applications that solve real problems. Above all, every skill I develop and project I build is fueled by dedication and the ambition to honor and repay my parents' sacrifices.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-700/60 mt-1">
                        <div className="bg-black/50 border border-gray-700 rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-400">Current Status</p>
                            <p className="text-sm font-semibold text-white">3rd Year BSIT</p>
                        </div>
                        <div className="bg-black/50 border border-gray-700 rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-400">University</p>
                            <p className="text-sm font-semibold text-white">UCU</p>
                        </div>
                        <div className="bg-black/50 border border-gray-700 rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-400">Specialization</p>
                            <p className="text-sm font-semibold text-white">Full Stack Dev</p>
                        </div>
                        <div className="bg-black/50 border border-gray-700 rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-400">Location</p>
                            <p className="text-sm font-semibold text-white">Pangasinan, PH</p>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="w-[85%] lg:w-[75%] mx-auto border-gray-600" />

            {/* Education Section */}
            <section id="education" className="w-[85%] lg:w-[65%] mx-auto">
                <div className="flex my-8">
                    <h1 className="text-xl font-semibold text-white">Education</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                    <div className="border border-teal-500 rounded-xl p-4 flex flex-row gap-4 items-center transition-all duration-300 hover:scale-105 hover:bg-neutral-900 hover:border-white cursor-pointer">
                        <img src="/assets/mnhs-logo.png" alt="MNHS Logo" className="w-12 h-12 shrink-0 object-contain" />
                        <p className="text-white text-sm">
                            Mapandan National High School (A.Y 2017-2021) <br />
                            Junior High School
                        </p>
                    </div>
                    <div className="border border-teal-500 rounded-xl p-4 flex flex-row gap-4 items-center transition-all duration-300 hover:scale-105 hover:bg-neutral-900 hover:border-white cursor-pointer">
                        <img src="/assets/mnhs-logo.png" alt="MNHS Logo" className="w-12 h-12 shrink-0 object-contain" />
                        <p className="text-white text-sm">
                            Mapandan National High School (A.Y 2021-2023) <br />
                            Senior High School | Track: ICT (Computer Systems Servicing)
                        </p>
                    </div>
                    <div className="border border-teal-500 rounded-xl p-4 flex flex-row gap-4 items-center transition-all duration-300 hover:scale-105 hover:bg-neutral-900 hover:border-white cursor-pointer">
                        <img src="/assets/ucu-logo.png" alt="UCU Logo" className="w-12 h-12 shrink-0 object-contain" />
                        <p className="text-white text-sm">
                            Urdaneta City University (A.Y 2023-2028) <br />
                            Bachelor of Science in Information Technology
                        </p>
                    </div>
                </div>
            </section>

            <hr className="w-[85%] lg:w-[75%] mx-auto border-gray-600" />

            {/* Skills Section */}
            <section id="skills" className="w-[85%] lg:w-[65%] mx-auto">
                <div className="flex my-8">
                    <h1 className="text-xl font-semibold text-white">Skills</h1>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 my-8">
                    {/* HTML */}
                    <div className="border border-teal-500 rounded-full p-2 flex gap-3 items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-neutral-900 hover:border-white cursor-pointer">
                        <svg role="img" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-white">
                            <title>HTML5</title>
                            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
                        </svg>
                        <p className="text-white text-xs">HTML</p>
                    </div>

                    {/* CSS */}
                    <div className="border border-teal-500 rounded-full p-2 flex gap-3 items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-neutral-900 hover:border-white cursor-pointer">
                        <svg role="img" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-white">
                            <title>CSS</title>
                            <path d="M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63" />
                        </svg>
                        <p className="text-white text-xs">CSS</p>
                    </div>

                    {/* JavaScript */}
                    <div className="border border-teal-500 rounded-full p-2 flex gap-3 items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-neutral-900 hover:border-white cursor-pointer">
                        <svg role="img" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-white">
                            <title>JavaScript</title>
                            <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                        </svg>
                        <p className="text-white text-xs">JavaScript</p>
                    </div>

                    {/* Flutter */}
                    <div className="border border-teal-500 rounded-full p-2 flex gap-3 items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-neutral-900 hover:border-white cursor-pointer">
                        <svg role="img" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-white">
                            <title>Flutter</title>
                            <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
                        </svg>
                        <p className="text-white text-xs">Flutter</p>
                    </div>

                    {/* Laravel */}
                    <div className="border border-teal-500 rounded-full p-2 flex gap-3 items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-neutral-900 hover:border-white cursor-pointer">
                        <svg role="img" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-white">
                            <title>Laravel</title>
                            <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z" />
                        </svg>
                        <p className="text-white text-xs">Laravel</p>
                    </div>

                    {/* Firebase */}
                    <div className="border border-teal-500 rounded-full p-2 flex gap-3 items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-neutral-900 hover:border-white cursor-pointer">
                        <svg role="img" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-white">
                            <title>Firebase</title>
                            <path d="M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z" />
                        </svg>
                        <p className="text-white text-xs">Firebase</p>
                    </div>
                </div>
            </section>

            <hr className="w-[85%] lg:w-[75%] mx-auto border-gray-600" />

            {/* Projects Section */}
            <section id="projects" className="w-[85%] lg:w-[65%] mx-auto">
                <div className="flex justify-between items-center my-8">
                    <h1 className="text-xl font-semibold text-white">Projects</h1>
                    <Link
                        href={route('projects.index')}
                        className="px-4 py-2 text-xs font-semibold tracking-wider border border-teal-500 text-teal-400 rounded-lg hover:bg-teal-500 hover:text-white hover:border-white transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                        MANAGE
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
                    {projects && projects.length > 0 ? (
                        projects.map((project) => {
                            const techList = (project.technologies || '')
                                .split(',')
                                .map((t) => t.trim())
                                .filter(Boolean);

                            return (
                                <div
                                    key={project.id}
                                    onClick={() => setSelectedProject(project)}
                                    className="flex flex-col gap-3 p-4 border border-teal-500 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-neutral-900 cursor-pointer group"
                                >
                                    {project.image && (
                                        <img
                                            src={`/storage/${project.image}`}
                                            alt={project.title}
                                            className="w-full h-40 rounded-lg border border-gray-600 object-cover object-center group-hover:border-teal-400 transition-colors"
                                        />
                                    )}

                                    <div className="flex items-center justify-between">
                                        <h2 className="text-base font-bold text-white group-hover:text-teal-400 transition-colors">
                                            {project.title}
                                        </h2>
                                        <span className="text-[10px] text-gray-400 bg-neutral-900 border border-gray-700 px-2 py-0.5 rounded-full shrink-0 ml-2">
                                            Click to view
                                        </span>
                                    </div>

                                    {project.project_date && (
                                        <p className="text-[11px] text-gray-400">{formatDate(project.project_date)}</p>
                                    )}

                                    <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                                        <span className="font-semibold text-white">Description: </span>
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
                                        {techList.map((tech, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-1.5 border border-gray-600 rounded-full px-2.5 py-1 w-fit bg-neutral-900"
                                            >
                                                <span className="text-xs text-white">{tech}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-sm text-gray-400 col-span-full">No projects yet.</p>
                    )}
                </div>
            </section>

            {/* Project Modal */}
            {selectedProject && (
                <div
                    onClick={() => setSelectedProject(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative bg-neutral-950 border border-gray-700 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-white"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            aria-label="Close Modal"
                            className="absolute top-4 right-4 text-gray-400 hover:text-white bg-neutral-900 border border-gray-700 hover:border-gray-500 rounded-full w-8 h-8 flex items-center justify-center transition cursor-pointer"
                        >
                            ✕
                        </button>

                        {/* Full Screenshot Preview */}
                        {selectedProject.image && (
                            <div className="w-full flex justify-center bg-black/70 rounded-xl border border-gray-800 p-2.5">
                                <img
                                    src={`/storage/${selectedProject.image}`}
                                    alt={selectedProject.title}
                                    className="max-h-[50vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
                                />
                            </div>
                        )}

                        {/* Title, Date & Description */}
                        <div className="flex flex-col gap-1.5">
                            <h3 className="text-xl font-bold text-white">{selectedProject.title}</h3>
                            {selectedProject.project_date && (
                                <p className="text-xs text-teal-400">{formatDate(selectedProject.project_date)}</p>
                            )}
                            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                                {selectedProject.description}
                            </p>
                        </div>

                        {/* Technologies Section */}
                        {selectedProject.technologies && (
                            <div className="pt-2 border-t border-gray-800">
                                <p className="text-xs uppercase font-semibold text-gray-400 tracking-wider mb-2">
                                    Technologies Used
                                </p>
                                <div className="flex flex-wrap items-center gap-2">
                                    {selectedProject.technologies
                                        .split(',')
                                        .map((t) => t.trim())
                                        .filter(Boolean)
                                        .map((tech, i) => (
                                            <span
                                                key={i}
                                                className="border border-gray-600 rounded-full px-2.5 py-1 text-xs text-white bg-neutral-900"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <hr className="w-[85%] lg:w-[75%] mx-auto border-gray-600" />

            {/* Contacts Section */}
            <section id="contact" className="w-[85%] lg:w-[65%] mx-auto">
                <div className="flex my-8">
                    <h1 className="text-xl text-white font-semibold">Contacts</h1>
                </div>

                <div className="flex flex-wrap gap-4 p-2 sm:p-4 my-8">
                    <a
                        href="https://www.facebook.com/kenn.suratos"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="flex justify-evenly border border-teal-500 p-2 rounded-full items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-neutral-900 hover:border-white cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook text-white" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                            </svg>
                            <p className="text-xs text-teal-500">Gleianne Kenn Suratos</p>
                        </div>
                    </a>

                    <a
                        href="https://github.com/iKenn17"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="flex justify-evenly border border-teal-500 p-2 rounded-full items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-neutral-900 hover:border-white cursor-pointer">
                            <svg role="img" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-white">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                            <p className="text-xs text-teal-500">iKenn17</p>
                        </div>
                    </a>

                    <a
                        href="https://www.instagram.com/thinkaboutkenn11/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="flex justify-evenly border border-teal-500 p-2 rounded-full items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-neutral-900 hover:border-white cursor-pointer">
                            <svg role="img" fill="currentColor" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-white">
                                <title>Instagram</title>
                                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                            </svg>
                            <p className="text-xs text-teal-500">@thinkaboutkenn</p>
                        </div>
                    </a>

                    <a
                        href="https://www.tiktok.com/@thinkaboutkenn11"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="flex justify-evenly border border-teal-500 p-2 rounded-full items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-neutral-900 hover:border-white cursor-pointer">
                            <svg role="img" fill="currentColor" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-white">
                                <title>TikTok</title>
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                            </svg>
                            <p className="text-xs text-teal-500">@thinkaboutkenn11</p>
                        </div>
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-10 text-white">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold">Gleianne Kenn Suratos</h2>
                        <p className="mt-2 text-sm text-gray-400">
                            BSIT Student | Aspiring Web Developer and Software Engineer
                        </p>
                    </div>

                    <nav className="mb-6 flex flex-wrap gap-5 text-sm">
                        <a href="#hero" className="hover:text-teal-400">
                            Home
                        </a>
                        <a href="#about" className="hover:text-teal-400">
                            About
                        </a>
                        <a href="#skills" className="hover:text-teal-400">
                            Skills
                        </a>
                        <a href="#projects" className="hover:text-teal-400">
                            Projects
                        </a>
                        <a href="#contact" className="hover:text-teal-400">
                            Contact
                        </a>
                    </nav>

                    <div className="border-t border-gray-700 pt-5 text-center">
                        <p className="text-sm text-gray-400">
                            &copy; 2026 Gleianne Kenn Suratos. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

