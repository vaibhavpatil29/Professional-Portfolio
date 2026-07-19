/**
 * Vaibhav Patil - Professional Portfolio Script
 * Handles Theme Toggling, Typing Animation, Scroll Highlights, Modal management,
 * and Form validation with Formspree integration.
 */

// GETFORM / FORMSPREE CONFIGURATION:
// Put your Getform.io Form ID (e.g., "dxoj8hnzw8w") or Formspree ID here to receive submissions.
// Leave it empty "" to run in offline/simulation mode saving to localStorage.
const FORM_ENDPOINT_ID = "dxoj8hnzw8w";

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       THEME MANAGER
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Retrieve saved theme or default to system preference (or dark mode if none)
    const getSavedTheme = () => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) return localTheme;
        
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return systemPrefersDark ? 'dark' : 'light';
    };

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Initialize Theme
    setTheme(getSavedTheme());

    // Toggle click event
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    /* ==========================================================================
       MOBILE NAVIGATION TOGGLE
       ========================================================================== */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileMenuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        // Prevent body scroll when mobile menu is open
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Sticky header transform on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       HERO TYPING ANIMATION
       ========================================================================== */
    const typewriterElement = document.getElementById('typewriter');
    const roles = [
        "scalable APIs.",
        "backend services.",
        "machine learning models.",
        "secure database architectures."
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Standard typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    };

    // Start typewriter loop
    setTimeout(typeEffect, 1000);

    /* ==========================================================================
       SCROLL OBSERVER: REVEAL ON SCROLL & ACTIVE NAV LINKS
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const scrollReveals = document.querySelectorAll('.scroll-reveal');
    const skillProgressFills = document.querySelectorAll('.progress-fill');

    // Reveal elements on scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it is the skills section, animate the progress bars
                if (entry.target.id === 'skills') {
                    skillProgressFills.forEach(fill => {
                        const width = fill.style.width;
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 100);
                    });
                }
            }
        });
    }, { threshold: 0.15 });

    scrollReveals.forEach(el => revealObserver.observe(el));

    // Track active navigation link highlights
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(sec => navObserver.observe(sec));

    /* ==========================================================================
       PROJECT DETAIL MODAL
       ========================================================================== */
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const openModalButtons = document.querySelectorAll('.open-modal-btn');

    // Rich case study contents
    const projectData = {
        urbancool: {
            title: "UrbanCool – AI-Driven Responsive Cooling System",
            tags: ["Python", "Streamlit", "Machine Learning", "IoT Simulation"],
            description: "UrbanCool is an environmental modeling and intervention planning system designed to counter the Urban Heat Island (UHI) effect. It aggregates IoT climate sensor feeds, mock satellite thermal grids, and crowd spatial-density streams to target architectural cooling interventions dynamically, avoiding the energy waste of uniform cooling grid distributions.",
            challenges: [
                "Processing asynchronous spatial feeds from multi-model sources (weather APIs, simulated thermal cameras, and user crowd indicators).",
                "Constructing a reliable predictive ML framework that estimates cooling loads without heavy compute footprints.",
                "Designing a live interactive Streamlit dashboard mapping dynamic micro-climate heat zones."
            ],
            achievements: [
                "Achieved an estimated 15% reduction in mock municipal energy consumption compared to static, non-responsive cooling setups.",
                "Published and presented the project findings at the IEEE I3CTCON 2026 conference.",
                "Developed a highly interactive real-time dashboard plotting geographic heat maps and recommending precise energy throttling coordinates."
            ],
            architecture: `
+--------------------------------------------------------------+
|                   DATA STREAM LAYERS                         |
|  [Weather API Feed]   [IoT Temperature Grid]   [Crowd Feeds]  |
+------------------------------+-------------------------------+
                               |
                               v (JSON Stream)
+------------------------------+-------------------------------+
|                    PROCESSING BACKEND                        |
|   Python Pandas (EDA) -> Data Imputation & Vectorization     |
+------------------------------+-------------------------------+
                               |
                               v (Feature Vectors)
+------------------------------+-------------------------------+
|                    PREDICTIVE MODEL (ML)                     |
|  Regression Pipeline (Estimates load / isolates heat zones)  |
+------------------------------+-------------------------------+
                               |
                               v (Trigger Flags)
+------------------------------+-------------------------------+
|                  LIVE STREAMLIT INTERFACE                    |
|  Visual Geo Map + Dynamic Micro-Cooling Throttling Actions   |
+--------------------------------------------------------------+`
        },
        chatapp: {
            title: "ChatApp – Real-Time Multi-User Messaging Service",
            tags: ["Flask", "Flask-SocketIO", "WebSockets", "Session Security"],
            description: "ChatApp is a low-latency, scalable real-time messaging application. Built on Flask-SocketIO, it provides secure private and channel-based chat streams, instant sub-second message dispatch, and active connection tracking.",
            challenges: [
                "Optimizing WebSockets overhead to maintain sub-second delivery times across concurrent user flows.",
                "Establishing secure token-based user authentication, role separation, and state preservation across WebSocket disconnect reconnections.",
                "Mitigating race conditions on concurrent database writes to PostgreSQL during peak message volumes."
            ],
            achievements: [
                "Engineered sub-second message delivery latency under simulated concurrent loads.",
                "Implemented secure role-based session handlers protecting chat rooms and administration dashboards.",
                "Implemented ORM connections through SQLAlchemy, indexing messages by timestamp to fetch logs with 20% lower query overhead."
            ],
            architecture: `
+-------------------+              +-------------------+
|   Client App      |  (WebSockets)|   Client App      |
|   (HTML5 / CSS)   |<------------>|   (HTML5 / CSS)   |
+---------+---------+              +---------+---------+
          ^                                  ^
          | HTTP Requests                    | HTTP Requests
          v                                  v
+---------+----------------------------------+---------+
|                  Nginx Reverse Proxy                 |
+--------------------------+---------------------------+
                           |
                           v (WSGI Server Gateway)
+--------------------------+---------------------------+
|               Flask-SocketIO Engine (Python)         |
|   [Auth Session Handlers]       [WebSocket Channels] |
+--------------------------+---------------------------+
                           |
                           v (SQLAlchemy ORM)
+--------------------------+---------------------------+
|               PostgreSQL Relational DB               |
|      Indexed Message Logs  |  User Credentials      |
+------------------------------------------------------+`
        }
    };

    const openModal = (projectId) => {
        const data = projectData[projectId];
        if (!data) return;

        // Construct modal content markup
        const tagsMarkup = data.tags.map(t => `<span class="badge">${t}</span>`).join('');
        const challengesMarkup = data.challenges.map(c => `<li>${c}</li>`).join('');
        const achievementsMarkup = data.achievements.map(a => `<li>${a}</li>`).join('');

        modalContent.innerHTML = `
            <div class="modal-content-wrap">
                <h2>${data.title}</h2>
                <div class="modal-tech">${tagsMarkup}</div>
                
                <div class="modal-block">
                    <h4>Project Overview</h4>
                    <p>${data.description}</p>
                </div>

                <div class="modal-block">
                    <h4>Key Challenges Overcome</h4>
                    <ul class="modal-features-list">${challengesMarkup}</ul>
                </div>

                <div class="modal-block">
                    <h4>Architecture Diagram</h4>
                    <div class="arch-block">${data.architecture}</div>
                </div>

                <div class="modal-block">
                    <h4>Impact & Key Results</h4>
                    <ul class="modal-features-list">${achievementsMarkup}</ul>
                </div>
            </div>
        `;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    };

    const closeModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => {
            modalContent.innerHTML = '';
        }, 300);
    };

    openModalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.getAttribute('data-project');
            openModal(projectId);
        });
    });

    modalClose.addEventListener('click', closeModal);
    
    // Close modal by clicking overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on ESC key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    /* ==========================================================================
       CONTACT FORM VALIDATION & SIMULATION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast-notification');
    const submitBtn = document.getElementById('form-submit-btn');
    const submitBtnText = submitBtn.querySelector('.btn-text');
    const submitBtnSpinner = submitBtn.querySelector('.btn-spinner');

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const showInputError = (inputEl, errorId, show) => {
        const group = inputEl.closest('.form-group');
        if (show) {
            group.classList.add('invalid');
        } else {
            group.classList.remove('invalid');
        }
    };

    // Attach real-time input change listener to reset error highlights
    const formFields = contactForm.querySelectorAll('input:not([type="file"]), textarea');
    formFields.forEach(field => {
        field.addEventListener('input', () => {
            showInputError(field, null, false);
        });
    });

    // Attachment File Name Display logic
    const attachmentField = document.getElementById('attachment');
    const fileNameDisplay = document.getElementById('file-name-display');
    const fileLabelText = document.getElementById('file-label-text');

    attachmentField.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = `Selected File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
            fileNameDisplay.classList.remove('hidden');
            fileLabelText.textContent = "Change File";
        } else {
            fileNameDisplay.textContent = "No file chosen";
            fileNameDisplay.classList.add('hidden');
            fileLabelText.textContent = "Choose file or drag here";
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');

        // Name Check
        if (!nameField.value.trim()) {
            showInputError(nameField, 'name-error', true);
            isValid = false;
        }

        // Email Check
        if (!emailField.value.trim() || !validateEmail(emailField.value)) {
            showInputError(emailField, 'email-error', true);
            isValid = false;
        }

        // Subject Check
        if (!subjectField.value.trim()) {
            showInputError(subjectField, 'subject-error', true);
            isValid = false;
        }

        // Message Check
        if (!messageField.value.trim()) {
            showInputError(messageField, 'message-error', true);
            isValid = false;
        }

        if (!isValid) return;

        // Form is valid. Trigger loading spinner state
        submitBtn.disabled = true;
        submitBtnText.textContent = "Sending...";
        submitBtnSpinner.classList.remove('hidden');

        // Success state handler
        const handleSuccess = () => {
            submitBtn.disabled = false;
            submitBtnText.textContent = "Send Message";
            submitBtnSpinner.classList.add('hidden');

            // Reset form input values
            contactForm.reset();

            // Reset file upload display states
            fileNameDisplay.textContent = "No file chosen";
            fileNameDisplay.classList.add('hidden');
            fileLabelText.textContent = "Choose file or drag here";

            // Display Toast notification
            toast.classList.add('show');

            // Fade toast notification out after 4 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        };

        if (FORM_ENDPOINT_ID && FORM_ENDPOINT_ID.trim() !== "") {
            // Extract form ID if user provided the full URL instead of just the ID hash
            let formId = FORM_ENDPOINT_ID.trim();
            let baseUrl = "https://getform.io/f/";

            if (formId.includes('getform.io/f/')) {
                formId = formId.split('getform.io/f/')[1];
            } else if (formId.includes('formspree.io/f/')) {
                formId = formId.split('formspree.io/f/')[1];
                baseUrl = "https://formspree.io/f/";
            } else if (FORM_ENDPOINT_ID.trim().length <= 8) {
                // Formspree IDs are usually short (8 chars), Getform IDs are longer (11-12 chars)
                baseUrl = "https://formspree.io/f/";
            }

            // Create a FormData object containing all inputs (including file streams)
            const formData = new FormData(contactForm);

            // Actual email dispatch
            fetch(`${baseUrl}${formId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(async response => {
                if (response.ok) {
                    handleSuccess();
                } else {
                    const errText = await response.text();
                    alert(`Submission Failed (Status ${response.status}): ${errText || 'Please verify your form settings.'}`);
                    submitBtn.disabled = false;
                    submitBtnText.textContent = "Send Message";
                    submitBtnSpinner.classList.add('hidden');
                }
            })
            .catch(error => {
                alert(`Network Connection Error: ${error.message || error}`);
                submitBtn.disabled = false;
                submitBtnText.textContent = "Send Message";
                submitBtnSpinner.classList.add('hidden');
            });
        } else {
            // Simulate API post call saving data to localStorage
            setTimeout(() => {
                const messageData = {
                    name: nameField.value.trim(),
                    email: emailField.value.trim(),
                    subject: subjectField.value.trim(),
                    message: messageField.value.trim(),
                    attachment: attachmentField.files[0] ? {
                        name: attachmentField.files[0].name,
                        size: `${(attachmentField.files[0].size / 1024).toFixed(1)} KB`
                    } : null,
                    timestamp: new Date().toISOString()
                };

                // Save message log locally
                const existingMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
                existingMessages.push(messageData);
                localStorage.setItem('contact_messages', JSON.stringify(existingMessages));

                handleSuccess();
            }, 1500);
        }
    });

    /* ==========================================================================
       RESUME & SCROLL TO TOP UTILITIES
       ========================================================================== */
    // Resume download is handled natively by the HTML anchor tag link.

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'all';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
            scrollToTopBtn.style.transform = 'translateY(15px)';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initial transition adjustments for scroll elements
    scrollToTopBtn.style.transition = 'var(--transition-smooth)';
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.pointerEvents = 'none';
    scrollToTopBtn.style.transform = 'translateY(15px)';
});
