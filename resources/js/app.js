import './bootstrap';

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll(".nav-link");

        const activeClasses = ["border-teal-500", "text-teal-500"];
        const inactiveClasses = ["border-transparent", "text-white"];

        function setActive(activeLink) {
        links.forEach((link) => {
            link.classList.remove(...activeClasses);
            link.classList.add(...inactiveClasses);
        });
        activeLink.classList.remove(...inactiveClasses);
        activeLink.classList.add(...activeClasses);
        }

        links.forEach((link) => {
        link.addEventListener("click", () => setActive(link));
        });

        // Hamburger Mobile Menu Logic
        const hamburgerBtn = document.getElementById("hamburger-btn");
        const hamburgerIcon = document.getElementById("hamburger-icon");
        const closeIcon = document.getElementById("close-icon");
        const mobileMenu = document.getElementById("mobile-menu");
        const mobileLinks = document.querySelectorAll(".mobile-nav-link");

        if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener("click", () => {
            const isHidden = mobileMenu.classList.contains("hidden");
            if (isHidden) {
            mobileMenu.classList.remove("hidden");
            mobileMenu.classList.add("flex");
            if (hamburgerIcon) hamburgerIcon.classList.add("hidden");
            if (closeIcon) closeIcon.classList.remove("hidden");
            } else {
            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("flex");
            if (hamburgerIcon) hamburgerIcon.classList.remove("hidden");
            if (closeIcon) closeIcon.classList.add("hidden");
            }
        });

        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("flex");
            if (hamburgerIcon) hamburgerIcon.classList.remove("hidden");
            if (closeIcon) closeIcon.classList.add("hidden");

            const targetHref = link.getAttribute("href");
            links.forEach((desktopLink) => {
                if (desktopLink.getAttribute("href") === targetHref) {
                setActive(desktopLink);
                }
            });
            });
        });
        }

        // Project Modal Logic
        const projectCards = document.querySelectorAll(".project-card");
        const projectModal = document.getElementById("project-modal");
        const modalCloseBtn = document.getElementById("modal-close-btn");
        const modalImage = document.getElementById("modal-image");
        const modalTitle = document.getElementById("modal-title");
        const modalDate = document.getElementById('modal-date');
        const modalDesc = document.getElementById("modal-desc");
        const modalTechList = document.getElementById("modal-tech-list");

        function openModal(card) {
        if (!projectModal) return;

        const img = card.querySelector("img");
        const title = card.querySelector("h2");
        const date = card.dataset.date;
        const desc = card.querySelector(".project-description");
        const badges = card.querySelector(".project-badges");

        if (modalImage && img) {
            modalImage.src = img.src;
            modalImage.alt = img.alt;
        }
        if (modalTitle && title) {
            modalTitle.textContent = title.textContent;
        }

        if (modalDate) {
            modalDate.textContent = date || "";
            modalDate.classList.toggle("hidden", !date);
        }
        
        if (modalDesc && desc) {
            modalDesc.innerHTML = desc.innerHTML;
        }
        if (modalTechList && badges) {
            modalTechList.innerHTML = badges.innerHTML;
        }

        projectModal.classList.remove("hidden");
        projectModal.classList.add("flex");
        document.body.classList.add("overflow-hidden");
        }

        function closeModal() {
        if (projectModal) {
            projectModal.classList.add("hidden");
            projectModal.classList.remove("flex");
            document.body.classList.remove("overflow-hidden");
        }
        }

        projectCards.forEach((card) => {
        card.addEventListener("click", () => openModal(card));
        });

        if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            closeModal();
        });
        }

        if (projectModal) {
        // Close when clicking the dark backdrop outside the card
        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) {
            closeModal();
            }
        });
        }

        // Close on Escape key press
        document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal && !projectModal.classList.contains("hidden")) {
            closeModal();
        }
    });
});