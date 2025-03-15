// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // ===== MOBILE MENU FUNCTIONALITY =====
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.querySelector('body');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            
            // Toggle hamburger animation
            const hamburgerBars = document.querySelectorAll('.hamburger span');
            
            if (mobileNav.classList.contains('active')) {
                hamburgerBars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                hamburgerBars[1].style.opacity = '0';
                hamburgerBars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                hamburgerBars[0].style.transform = 'none';
                hamburgerBars[1].style.opacity = '1';
                hamburgerBars[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                
                const hamburgerBars = document.querySelectorAll('.hamburger span');
                hamburgerBars[0].style.transform = 'none';
                hamburgerBars[1].style.opacity = '1';
                hamburgerBars[2].style.transform = 'none';
            }
        });
    }

    // ===== DARK MODE TOGGLE =====
    const darkModeToggle = document.getElementById('darkmode-toggle');

    if (darkModeToggle) {
        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-theme');
            darkModeToggle.checked = true;
        }

        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ===== CONTACT FORM VALIDATION AND SUBMISSION =====
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // If validation passes, show success message
            alert('🎉Thank you for reaching out! 📩 Your message has been received, and I\'ll get back to you as soon as possible.😊');
            
            // Submit the form
            this.submit();
            
            // Reload the page after a short delay
            setTimeout(function() {
                window.location.reload();
            }, 100);
        });
    }

    // ===== AI CHATBOT FUNCTIONALITY =====
    const chatBotToggle = document.querySelector('.chat-bot-toggle');
    const chatBotContainer = document.querySelector('.chat-bot-container');
    const chatBotClose = document.querySelector('.chat-bot-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.querySelector('.chat-bot-messages');

    if (chatBotToggle && chatBotContainer) {
        // Toggle chat bot
        chatBotToggle.addEventListener('click', () => {
            chatBotContainer.classList.toggle('active');
        });

        // Close chat bot
        if (chatBotClose) {
            chatBotClose.addEventListener('click', () => {
                chatBotContainer.classList.remove('active');
            });
        }

        // Send message function
        function sendMessage() {
            const message = chatInput.value.trim();
            
            if (message !== '') {
                // Add user message
                addMessage(message, 'user');
                
                // Clear input
                chatInput.value = '';
                
                // Simulate bot response after a short delay
                setTimeout(() => {
                    const botResponses = [
                        "Thanks for your message! I'll pass it along to Sujan.",
                        "That's an interesting question. Let me help you with that.",
                        "I'm Sujan's AI assistant. I can provide information about his skills and projects.",
                        "Feel free to ask me anything about Sujan's work or experience.",
                        "I'd be happy to connect you with Sujan for more information."
                    ];
                    
                    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                    addMessage(randomResponse, 'bot');
                }, 1000);
            }
        }

        // Add message to chat
        function addMessage(message, sender) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', `${sender}-message`);
            
            messageElement.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                </div>
            `;
            
            chatMessages.appendChild(messageElement);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Send message on button click
        if (chatSend) {
            chatSend.addEventListener('click', sendMessage);
        }

        // Send message on Enter key
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }

    // ===== SCROLL ANIMATIONS =====
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .project-card, .info-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for scroll animation
    const elements = document.querySelectorAll('.card, .project-card, .info-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation for elements in view on page load
    animateOnScroll();

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
});