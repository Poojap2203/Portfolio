// Pooja Pawar Portfolio Interactions Script

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mobile Navigation Menu Toggle
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            
            // Toggle toggle button icon
            const toggleIcon = mobileToggle.querySelector('i');
            if (toggleIcon) {
                if (isActive) {
                    toggleIcon.setAttribute('data-lucide', 'x');
                } else {
                    toggleIcon.setAttribute('data-lucide', 'menu');
                }
                // Re-initialize Lucide icon
                lucide.createIcons();
            }
        });
        
        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const toggleIcon = mobileToggle.querySelector('i');
                    if (toggleIcon) {
                        toggleIcon.setAttribute('data-lucide', 'menu');
                        lucide.createIcons();
                    }
                }
            });
        });
    }

    /* ==========================================================================
       2. Scroll Spy (Highlight active navigation link based on scroll position)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust threshold to fire slightly before entering section fully
            if (window.scrollY >= (sectionTop - 120)) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       3. Modals Manager (Certificates & Projects)
       ========================================================================== */
       
    // Certificate Viewer Modal
    const certModal = document.getElementById('cert-modal');
    const certModalTitle = document.getElementById('modal-title');
    const certModalContent = document.getElementById('modal-content-area');
    const certModalClose = document.getElementById('modal-close');
    const certCards = document.querySelectorAll('.cert-card');
    
    if (certModal && certModalTitle && certModalContent && certModalClose) {
        
        // Function to open certificate modal
        certCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.getAttribute('data-cert-title');
                const file = card.getAttribute('data-cert-file');
                const type = card.getAttribute('data-cert-type');
                
                certModalTitle.textContent = title;
                certModalContent.innerHTML = ''; // Clear previous content
                
                if (type === 'pdf') {
                    // Embed PDF in modal
                    const pdfHTML = `
                        <div class="modal-pdf-wrapper">
                            <object data="${file}" type="application/pdf">
                                <iframe src="${file}" title="${title}">
                                    <p>Your browser does not support viewing PDFs. <a href="${file}" target="_blank">Download Certificate</a> instead.</p>
                                </iframe>
                            </object>
                        </div>
                    `;
                    certModalContent.innerHTML = pdfHTML;
                } else if (type === 'image') {
                    // Display image
                    const imgHTML = `
                        <div class="modal-img-wrapper">
                            <img src="${file}" alt="${title}">
                        </div>
                    `;
                    certModalContent.innerHTML = imgHTML;
                } else if (type === 'verified') {
                    // For certs without actual file, render a premium verified badge
                    const verifiedHTML = `
                        <div class="verified-status-box">
                            <div class="verified-icon-glow">
                                <i data-lucide="shield-check"></i>
                            </div>
                            <h4>Coursework Verified</h4>
                            <p>This verification statement confirms the completion of professional coursework in <strong>C and C++ Programming Languages</strong> during academic studies, covering procedural paradigms, object-oriented concepts, template libraries, pointers, and memory architecture.</p>
                            <span class="badge"><i data-lucide="check-circle-2"></i> Verified Academic Record</span>
                        </div>
                    `;
                    certModalContent.innerHTML = verifiedHTML;
                    lucide.createIcons();
                }
                
                certModal.classList.add('active');
                certModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Disable page scrolling
            });
        });
        
        // Function to close certificate modal
        const closeCertModal = () => {
            certModal.classList.remove('active');
            certModal.setAttribute('aria-hidden', 'true');
            certModalContent.innerHTML = '';
            document.body.style.overflow = ''; // Re-enable page scrolling
        };
        
        certModalClose.addEventListener('click', closeCertModal);
        
        // Close modal when clicking outside container
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeCertModal();
            }
        });
    }
    
    // Project Details Modal
    const projectModal = document.getElementById('project-modal');
    const projectModalBtn = document.getElementById('btn-project-details');
    const projectModalClose = document.getElementById('project-modal-close');
    
    if (projectModal && projectModalBtn && projectModalClose) {
        projectModalBtn.addEventListener('click', () => {
            projectModal.classList.add('active');
            projectModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
        
        const closeProjectModal = () => {
            projectModal.classList.remove('active');
            projectModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };
        
        projectModalClose.addEventListener('click', closeProjectModal);
        
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    /* ==========================================================================
       4. Contact Form Validation and Submission (Visual Mock)
       ========================================================================== */
    const contactForm = document.getElementById('portfolio-contact-form');
    const formStatus = document.getElementById('form-status-message');
    const submitBtn = document.getElementById('btn-submit-form');
    
    if (contactForm && formStatus && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Set sending status
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = `Sending... <i data-lucide="loader" class="icon-spin"></i>`;
            lucide.createIcons();
            
            formStatus.className = 'form-status';
            formStatus.textContent = '';
            
            // Simulate API request (1.5 seconds)
            setTimeout(() => {
                // Success State
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `<i data-lucide="check-circle-2" style="display:inline-block; vertical-align:middle; margin-right:6px; width:18px; height:18px;"></i> Message sent successfully! I will get back to you soon.`;
                lucide.createIcons();
                
                // Reset button and form fields
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.className = 'form-status';
                        formStatus.textContent = '';
                        formStatus.style.opacity = '1';
                    }, 300);
                }, 5000);
                
            }, 1500);
        });
    }
});
