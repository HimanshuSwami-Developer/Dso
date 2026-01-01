document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

document.querySelectorAll('.project-preview').forEach(preview => {
    preview.addEventListener('click', () => {

        // Stop already playing videos
        document.querySelectorAll('.project-preview.playing').forEach(p => {
            p.classList.remove('playing');
            p.innerHTML = `
                <img src="https://img.youtube.com/vi/${p.dataset.videoId}/hqdefault.jpg" class="video-thumb">
                <div class="preview-overlay">
                    <i class="fa-solid fa-play"></i>
                </div>
            `;
        });

        const videoId = preview.dataset.videoId;
        preview.classList.add('playing');

        preview.innerHTML = `
            <iframe
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&playsinline=1"
                frameborder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowfullscreen>
            </iframe>
        `;
    });
});

    // --- Sticky Scroll Animation Setup ---

    // Service Data Configuration
    const serviceData = {
        app: {
            title: "App Development",
            icon: "fa-mobile-screen",
            tags: ["Flutter", "React Native", "iOS & Android"],
            color: "var(--accent-primary)" // Purple
        },
        web: {
            title: "Web Development",
            icon: "fa-code",
            tags: ["React.js", "Next.js", "Node.js", "Three.js"],
            color: "var(--accent-secondary)" // Cyan
        },
        wordpress: {
            title: "WordPress Solutions",
            icon: "fa-wordpress",
            tags: ["Custom Themes", "Plugins", "Elementor", "WooCommerce"],
            color: "#21759b" // WP Blue
        },
        shopify: {
            title: "Shopify Stores",
            icon: "fa-shopify",
            tags: ["Liquid", "Store Setup", "Dropshipping", "App Dev"],
            color: "#95bf47" // Shopify Green
        }
    };

    const serviceItems = document.querySelectorAll('.service-item');
    const visualCard = document.querySelector('.visual-card');
    const visualIcon = visualCard.querySelector('.visual-icon i');
    const visualTitle = visualCard.querySelector('.visual-content h3');
    const visualTags = visualCard.querySelector('.visual-tags');
    const visualGlow = visualCard.querySelector('.visual-bg-glow');

    // Observer to detect active service in view
    const stickyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Highlight the text section
                serviceItems.forEach(item => item.classList.remove('active'));
                entry.target.classList.add('active');

                // Update the sticky visual
                const serviceId = entry.target.dataset.id;
                updateVisual(serviceId);
            }
        });
    }, {
        threshold: 0.5, // Trigger when 50% of the item is visible
        rootMargin: "-10% 0px -10% 0px"
    });

    serviceItems.forEach(item => stickyObserver.observe(item));

    function updateVisual(id) {
        const data = serviceData[id];
        if (!data) return;

        // Animate Out
        visualCard.style.opacity = '0.7';
        visualCard.style.transform = 'scale(0.95)';

        setTimeout(() => {
            // Update Content
            visualIcon.className = `fa-brands ${data.icon}`;
            // Fix for solid icons (some are fa-solid)
            if (data.icon.includes('mobile') || data.icon.includes('code')) {
                visualIcon.className = `fa-solid ${data.icon}`;
            }

            visualTitle.textContent = data.title;
            visualIcon.style.color = data.color;
            visualGlow.style.background = `radial-gradient(circle, ${data.color} 0%, transparent 70%)`;

            // Update Tags
            visualTags.innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join('');

            // Animate In
            visualCard.style.opacity = '1';
            visualCard.style.transform = 'scale(1)';
        }, 200);
    }

    // Initial Trigger for the first item
    if (serviceItems.length > 0) {
        serviceItems[0].classList.add('active');
    }

    // --- End Sticky Scroll Logic ---

    // --- Stats Counter Animation ---
    const statsSection = document.querySelector('.stats-section');
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                startCounting();
                hasCounted = true;
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function startCounting() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS

            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
    }

    // 3D Tilt Effect for Visual Card (Preserved from previous logic but applied to new card)
    visualCard.addEventListener('mousemove', (e) => {
        const rect = visualCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        visualCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    visualCard.addEventListener('mouseleave', () => {
        visualCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });


    // Simple smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    /* Scroll-Driven 3D Carousel Logic */
    const scrollWrapper = document.querySelector('.carousel-scroll-wrapper');
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.carousel-scene .project-card');

    // Config: Radius based on card width (450) + gap
    const radius = 650;

    if (track && cards.length > 0 && scrollWrapper) {
        const cardCount = cards.length;
        const theta = 360 / cardCount;

        // Initialize Card Positions
        cards.forEach((card, index) => {
            const angle = theta * index;
            // Rotate card to face outward
            card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        });

     const updateTrack = (angle) => {
    track.style.transform =
        `translateZ(-${radius}px) rotateY(${angle}deg)`;
};

// Scroll Listener
window.addEventListener('scroll', () => {
    const rect = scrollWrapper.getBoundingClientRect();
    const wrapperTop = rect.top;
    const windowHeight = window.innerHeight;

    // Calculate how far into the wrapper we are
    const totalScrollableDistance = rect.height - windowHeight;
    let scrolled = -wrapperTop;

    // Clamping
    if (scrolled < 0) scrolled = 0;
    if (scrolled > totalScrollableDistance) scrolled = totalScrollableDistance;

    // Map 0..1 progress to 0..360 degrees (Negative for Right/Clockwise rotation)
    const progress = scrolled / totalScrollableDistance;
    const angle = -progress * 360;

    updateTrack(angle);
});
        // Initial update
        updateTrack(0);
    }

    // --- Dynamic Scroll Arrow Button ---
    const scrollArrowBtn = document.getElementById('scrollToBottom');
    const arrowIcon = scrollArrowBtn ? scrollArrowBtn.querySelector('i') : null;

    if (scrollArrowBtn && arrowIcon) {
        // Function to check if user is near bottom
        const isNearBottom = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Consider "near bottom" if within 300px of the bottom
            return (scrollTop + windowHeight) >= (documentHeight - 300);
        };

        // Function to update arrow direction
        const updateArrowDirection = () => {
            if (isNearBottom()) {
                arrowIcon.className = 'fa-solid fa-arrow-up';
            } else {
                arrowIcon.className = 'fa-solid fa-arrow-down';
            }
        };

        // Click handler - scroll to bottom or top based on current position
        scrollArrowBtn.addEventListener('click', () => {
            if (isNearBottom()) {
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Scroll to bottom
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });

        // Update arrow on scroll
        window.addEventListener('scroll', updateArrowDirection);

        // Initial update
        updateArrowDirection();
    }

    // --- Team Member Profile Modal ---
    const teamData = {
        'alex-morgan': {
            name: 'Alex Morgan',
            designation: 'Lead Developer',
            bio: 'Passionate full-stack developer with 8+ years of experience in building scalable web applications. Specializes in React, Node.js, and cloud architecture. Led development teams on 50+ successful projects.',
            hobbies: ['Coding', 'Gaming', 'Photography', 'Hiking'],
            email: 'alex.morgan@desilentorder.com',
            gradient: 'linear-gradient(135deg, #FF6B6B, #556270)',
            social: {
                linkedin: 'https://linkedin.com/in/alexmorgan',
                twitter: 'https://twitter.com/alexmorgan',
                github: 'https://github.com/alexmorgan'
            }
        },
        'sarah-jenkins': {
            name: 'Sarah Jenkins',
            designation: 'UI/UX Designer',
            bio: 'Award-winning designer with a keen eye for detail and user experience. Creates beautiful, intuitive interfaces that users love. 6 years of experience in digital product design with expertise in Figma, Adobe XD, and user research.',
            hobbies: ['Design', 'Art', 'Travel', 'Coffee'],
            email: 'sarah.jenkins@desilentorder.com',
            gradient: 'linear-gradient(135deg, #4ECDC4, #556270)',
            social: {
                linkedin: 'https://linkedin.com/in/sarahjenkins',
                dribbble: 'https://dribbble.com/sarahjenkins',
                instagram: 'https://instagram.com/sarahjenkins'
            }
        },
        'michael-chen': {
            name: 'Michael Chen',
            designation: 'Tech Lead',
            bio: 'Innovative tech leader with expertise in system architecture and team mentorship. 10+ years of experience in software engineering, specializing in microservices, DevOps, and agile methodologies. Passionate about building high-performing teams.',
            hobbies: ['Chess', 'Reading', 'Cycling', 'Music'],
            email: 'michael.chen@desilentorder.com',
            gradient: 'linear-gradient(135deg, #A855F7, #556270)',
            social: {
                linkedin: 'https://linkedin.com/in/michaelchen',
                twitter: 'https://twitter.com/michaelchen',
                email: 'mailto:michael.chen@desilentorder.com'
            }
        }
    };

    const modal = document.getElementById('teamModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const teamCards = document.querySelectorAll('.team-card');

    // Function to open modal with team member data
    function openModal(memberId) {
        const member = teamData[memberId];
        if (!member) return;

        // Populate modal content
        document.getElementById('modalName').textContent = member.name;
        document.getElementById('modalDesignation').textContent = member.designation;
        document.getElementById('modalBio').textContent = member.bio;
        document.getElementById('modalEmail').href = `mailto:${member.email}`;
        document.getElementById('modalEmail').innerHTML = `<i class="fa-solid fa-envelope"></i> ${member.email}`;

        // Update avatar gradient
        const modalAvatar = document.getElementById('modalAvatar');
        modalAvatar.style.background = member.gradient;

        // Update hobbies
        const hobbiesContainer = document.getElementById('modalHobbies');
        hobbiesContainer.innerHTML = member.hobbies.map(hobby => `<span>${hobby}</span>`).join('');

        // Update social links
        const socialContainer = document.getElementById('modalSocial');
        socialContainer.innerHTML = '';

        if (member.social.linkedin) {
            socialContainer.innerHTML += `<a href="${member.social.linkedin}" target="_blank"><i class="fa-brands fa-linkedin"></i></a>`;
        }
        if (member.social.twitter) {
            socialContainer.innerHTML += `<a href="${member.social.twitter}" target="_blank"><i class="fa-brands fa-twitter"></i></a>`;
        }
        if (member.social.github) {
            socialContainer.innerHTML += `<a href="${member.social.github}" target="_blank"><i class="fa-brands fa-github"></i></a>`;
        }
        if (member.social.dribbble) {
            socialContainer.innerHTML += `<a href="${member.social.dribbble}" target="_blank"><i class="fa-brands fa-dribbble"></i></a>`;
        }
        if (member.social.instagram) {
            socialContainer.innerHTML += `<a href="${member.social.instagram}" target="_blank"><i class="fa-brands fa-instagram"></i></a>`;
        }
        if (member.social.email) {
            socialContainer.innerHTML += `<a href="${member.social.email}"><i class="fa-solid fa-envelope"></i></a>`;
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Add click handlers to team cards
    teamCards.forEach((card, index) => {
        const memberIds = ['alex-morgan', 'sarah-jenkins', 'michael-chen'];
        card.addEventListener('click', () => {
            openModal(memberIds[index]);
        });
    });

    // Close modal on overlay click
    modalOverlay.addEventListener('click', closeModal);

    // Close modal on close button click
    modalClose.addEventListener('click', closeModal);

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- Contact Form Handler ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Here you would normally send the data to a server
            console.log('Form submitted:', formData);

            // Show success message
            const submitButton = contactForm.querySelector('.submit-button');
            const originalContent = submitButton.innerHTML;

            submitButton.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
            submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            // Reset form after 2 seconds
            setTimeout(() => {
                contactForm.reset();
                submitButton.innerHTML = originalContent;
                submitButton.style.background = '';
            }, 2000);
        });
    }

});
