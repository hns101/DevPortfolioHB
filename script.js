const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalCloseButton = document.getElementById('modal-close');

// Function to open the modal and populate it with data
const openModal = (card) => {
    // Get data from the card's data attributes
    const title = card.dataset.title;
    const image = card.dataset.image;
    const description = card.dataset.description;
    const tech = card.dataset.tech.split(',');
    const liveUrl = card.dataset.liveUrl;
    const githubUrl = card.dataset.githubUrl;

    // Populate the modal elements
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-image').src = image;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-live-link').href = liveUrl;
    document.getElementById('modal-github-link').href = githubUrl;

    // Create and append tech tags
    const techStackContainer = document.getElementById('modal-tech-stack');
    techStackContainer.innerHTML = ''; // Clear previous tags
    tech.forEach(techName => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = techName;
        techStackContainer.appendChild(tag);
    });

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