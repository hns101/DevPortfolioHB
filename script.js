document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalCloseButton = document.getElementById('modal-close');

    // Store the GitHub SVG icon markup in a constant for reuse
    const githubIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;

    // Function to open the modal and populate it with data
    const openModal = (card) => {
        // Get data from the card's data attributes
        const title = card.dataset.title;
        const images = card.dataset.images.split(',');
        const description = card.dataset.description;
        const tech = card.dataset.tech.split(',');

        // Data for the links
        const liveUrl = card.dataset.liveUrl;
        const liveText = card.dataset.liveText || 'Live Demo'; // Default text is 'Live Demo'
        const githubUrl = card.dataset.githubUrl;
        const githubUrlFrontend = card.dataset.githubUrlFrontend;
        const githubUrlBackend = card.dataset.githubUrlBackend;

        // Populate the static modal elements
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-description').textContent = description;

        // Create and append gallery images
        const galleryContainer = document.getElementById('modal-gallery');
        galleryContainer.innerHTML = ''; // Clear previous images
        images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl.trim();
            img.alt = title;
            galleryContainer.appendChild(img);
        });

        // Create and append tech tags
        const techStackContainer = document.getElementById('modal-tech-stack');
        techStackContainer.innerHTML = ''; // Clear previous tags
        tech.forEach(techName => {
            const tag = document.createElement('span');
            tag.className = 'modal-tech-tag';
            tag.textContent = techName.trim();
            techStackContainer.appendChild(tag);
        });

        // Dynamically create the link buttons
        const linksContainer = document.getElementById('modal-links-container');
        linksContainer.innerHTML = ''; // Clear previous links

        // 1. Create the Live Demo / Visit Website button
        if (liveUrl) {
            const liveLink = document.createElement('a');
            liveLink.href = liveUrl;
            liveLink.target = '_blank';
            liveLink.rel = 'noopener noreferrer';
            liveLink.className = 'modal-link primary';
            liveLink.textContent = liveText;
            linksContainer.appendChild(liveLink);
        }

        // 2. Create the GitHub Repo button(s)
        if (githubUrlFrontend && githubUrlBackend) {
            // Case for Project 1: Two repo links
            const frontendLink = document.createElement('a');
            frontendLink.href = githubUrlFrontend;
            frontendLink.target = '_blank';
            frontendLink.rel = 'noopener noreferrer';
            frontendLink.className = 'modal-link secondary';
            frontendLink.innerHTML = `${githubIconSvg} Frontend Repo`;
            linksContainer.appendChild(frontendLink);

            const backendLink = document.createElement('a');
            backendLink.href = githubUrlBackend;
            backendLink.target = '_blank';
            backendLink.rel = 'noopener noreferrer';
            backendLink.className = 'modal-link secondary';
            backendLink.innerHTML = `${githubIconSvg} Backend Repo`;
            linksContainer.appendChild(backendLink);

        } else if (githubUrl) {
            // Case for Projects 2 & 3: One repo link
            const githubLink = document.createElement('a');
            githubLink.href = githubUrl;
            githubLink.target = '_blank';
            githubLink.rel = 'noopener noreferrer';
            githubLink.className = 'modal-link secondary';
            githubLink.innerHTML = `${githubIconSvg} GitHub Repo`;
            linksContainer.appendChild(githubLink);
        }

        // Show the modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Function to close the modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    };

    // Add click event listeners to each project card
    projectCards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    // Add click event listeners for closing the modal
    modalCloseButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        // Close modal if the overlay (background) is clicked
        if (event.target === modal) {
            closeModal();
        }
    });

    // Add keydown event listener to close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
