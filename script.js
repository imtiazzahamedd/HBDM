// Intro Sequence Animation - TEMPORARILY DISABLED FOR TESTING
// Uncomment this section when ready to enable the intro animation

/*
const introSequence = document.getElementById('intro-sequence');
const mainContent = document.getElementById('main-content');

// Define all 12 sequence steps
const introTexts = [
    { id: 'intro-text-1', duration: 2500 },
    { id: 'intro-text-2', duration: 3000 },
    { id: 'intro-text-3', duration: 4500 }, // Longer Bengali message
    { id: 'intro-text-4', duration: 2000 },
    { id: 'intro-text-5', duration: 2500 },
    { id: 'intro-text-6', duration: 3000 },
    { id: 'intro-text-7', duration: 3000 },
    { id: 'intro-text-8', duration: 2500 },
    { id: 'intro-text-9', duration: 2000 },
    { id: 'intro-text-10', duration: 3000 },
    { id: 'intro-text-11', duration: 3000 },
    { id: 'intro-text-12', duration: 3500 }
];

// Dynamic animation calculation
let currentDelay = 500;

introTexts.forEach((text, index) => {
    setTimeout(() => {
        const element = document.getElementById(text.id);
        if (element) {
            element.style.opacity = '1';
            element.style.transition = 'opacity 0.8s ease-in';

            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transition = 'opacity 0.5s ease-out';
            }, text.duration);
        }
    }, currentDelay);

    // Increment delay for the next step (duration + buffer)
    currentDelay += text.duration + 800;
});

// Show combined text view after all sequential steps
const totalSequentialTime = currentDelay;

setTimeout(() => {
    const allTexts = document.getElementById('intro-all');
    if (allTexts) {
        allTexts.style.opacity = '1';
        allTexts.style.transition = 'opacity 1s ease-in';
    }
}, totalSequentialTime);

// Hold combined view for 4 seconds, then fade out intro
const totalIntroTime = totalSequentialTime + 4000;

setTimeout(() => {
    if (introSequence) {
        introSequence.style.opacity = '0';
        introSequence.style.transition = 'opacity 1s ease-out';

        setTimeout(() => {
            introSequence.style.display = 'none';
            if (mainContent) {
                mainContent.style.opacity = '1';
            }
        }, 1000);
    }
}, totalIntroTime);

// Lock scrolling during the intro
document.body.style.overflow = 'hidden';
*/

// SKIP INTRO - Show main content immediately for testing
const introSequence = document.getElementById('intro-sequence');
const mainContent = document.getElementById('main-content');
if (introSequence) {
    introSequence.style.display = 'none';
}
if (mainContent) {
    mainContent.style.opacity = '1';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}


// Scroll to surprise function
function scrollToSurprise() {
    const surprise = document.getElementById('surprise');
    const confetti = document.getElementById('confetti');

    // Toggle surprise section visibility
    if (surprise.classList.contains('hidden')) {
        // Show surprise
        surprise.classList.remove('hidden');
        surprise.classList.add('flex');

        // Show confetti
        confetti.classList.remove('hidden');

        // Scroll to surprise section
        surprise.scrollIntoView({ behavior: 'smooth' });

        // Hide confetti after 5 seconds
        setTimeout(() => {
            confetti.classList.add('hidden');
        }, 5000);
    } else {
        // Hide surprise
        surprise.classList.add('hidden');
        surprise.classList.remove('flex');
    }
}

// Add sparkle effect on touch/click - but NOT on heart cards or interactive elements
document.addEventListener('click', (e) => {
    // Don't add sparkles if clicking on heart cards or other interactive elements
    const isHeartCard = e.target.closest('.heart-card');
    const isButton = e.target.closest('button');
    const isGiftBox = e.target.closest('.gift-box-container');

    if (!isHeartCard && !isButton && !isGiftBox) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        sparkle.innerHTML = '✨';
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// Gift Box Opening Function
function openGiftBox() {
    const giftMessage = document.getElementById('gift-message');
    const giftBox = document.querySelector('.gift-box-container');

    if (giftMessage && giftBox) {
        // Hide the gift box
        giftBox.style.display = 'none';

        // Show the message with animation
        giftMessage.classList.remove('hidden');

        // Add confetti effect
        const confetti = document.getElementById('confetti');
        if (confetti) {
            confetti.classList.remove('hidden');
            setTimeout(() => {
                confetti.classList.add('hidden');
            }, 5000);
        }
    }
}

// Countdown Timer - Calculate time together
// Relationship started: September 3, 2024
const relationshipStart = new Date(2024, 8, 3); // September 3, 2024 (month is 0-indexed)

function updateCountdown() {
    const now = new Date();
    const diff = now - relationshipStart;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    const daysEl = document.getElementById('days-count');
    const hoursEl = document.getElementById('hours-count');
    const minutesEl = document.getElementById('minutes-count');

    if (daysEl) daysEl.textContent = days.toLocaleString();
    if (hoursEl) hoursEl.textContent = hours.toLocaleString();
    if (minutesEl) minutesEl.textContent = minutes.toLocaleString();
}

// Interactive Quiz - REMOVED

// Spin the Heart Game
const heartMessages = [
    "You're the most beautiful person I've ever met! 😍",
    "Every moment with you is a treasure! 💎",
    "You make my heart skip a beat! 💓",
    "I fall in love with you more every day! 🌹",
    "You're my dream come true! ✨",
    "Your smile lights up my world! ☀️",
    "I'm so lucky to have you! 🍀",
    "You're absolutely perfect to me! 💝",
    "My love for you is infinite! ♾️",
    "You're my everything! 💕",
    "I can't imagine life without you! 🌟",
    "You're the best thing that ever happened to me! 🎁"
];

let isSpinning = false;

function spinHeart() {
    if (isSpinning) return;

    isSpinning = true;
    const heart = document.getElementById('spin-heart');
    const messageDiv = document.getElementById('heart-message');

    // Add spinning animation
    heart.style.transform = 'rotate(720deg) scale(1.2)';

    setTimeout(() => {
        // Reset rotation and pick random message
        heart.style.transform = 'rotate(0deg) scale(1)';
        const randomMessage = heartMessages[Math.floor(Math.random() * heartMessages.length)];

        messageDiv.innerHTML = `<p class="text-2xl font-bold text-pink-600 animate-fade-in">${randomMessage}</p>`;

        isSpinning = false;
    }, 1000);
}

// Anniversary Countdown
const weddingDate = new Date(2025, 2, 7); // March 7, 2025

function getNextAnniversary() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Try this year's anniversary
    let nextAnniversary = new Date(currentYear, weddingDate.getMonth(), weddingDate.getDate());

    // If this year's anniversary has passed, use next year
    if (nextAnniversary < now) {
        nextAnniversary = new Date(currentYear + 1, weddingDate.getMonth(), weddingDate.getDate());
    }

    return nextAnniversary;
}

function updateAnniversaryCountdown() {
    const now = new Date();
    const nextAnniversary = getNextAnniversary();
    const diff = nextAnniversary - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('anni-days');
    const hoursEl = document.getElementById('anni-hours');
    const minutesEl = document.getElementById('anni-minutes');
    const secondsEl = document.getElementById('anni-seconds');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
}

// Virtual Hug Function
let hugCount = 0;
const hugMessages = [
    "🤗 Sending you the warmest hug! 💕",
    "🫂 Here's a big virtual hug just for you! ✨",
    "💝 Wrapped in love and hugs! 🌟",
    "🤗 A tight squeeze from me to you! 💖",
    "🫂 Hugging you through the screen! 💕",
    "💝 You're getting all my love in this hug! ✨",
    "🤗 The biggest hug for the best person! 💖",
    "🫂 Sending endless hugs your way! 💕"
];

function sendVirtualHug() {
    const hugEmoji = document.getElementById('hug-emoji');
    const hugMessage = document.getElementById('hug-message');
    const hugCountEl = document.getElementById('hug-count');

    // Increment counter
    hugCount++;
    if (hugCountEl) hugCountEl.textContent = hugCount;

    // Animate emoji
    hugEmoji.style.transform = 'scale(1.5) rotate(360deg)';

    setTimeout(() => {
        hugEmoji.style.transform = 'scale(1) rotate(0deg)';
    }, 500);

    // Show random message
    const randomMessage = hugMessages[Math.floor(Math.random() * hugMessages.length)];
    hugMessage.innerHTML = `<p class="text-2xl font-bold text-pink-600 animate-fade-in">${randomMessage}</p>`;

    // Add confetti effect
    const confetti = document.getElementById('confetti');
    if (confetti) {
        confetti.classList.remove('hidden');
        setTimeout(() => {
            confetti.classList.add('hidden');
        }, 3000);
    }
}

// Next Birthday Countdown
// Mitisa's birthday is February 25
const birthdayMonth = 1; // February (0-indexed, so 1 = February)
const birthdayDay = 25;

function getNextBirthday() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Try this year's birthday
    let nextBirthday = new Date(currentYear, birthdayMonth, birthdayDay);

    // If this year's birthday has passed, use next year
    if (nextBirthday < now) {
        nextBirthday = new Date(currentYear + 1, birthdayMonth, birthdayDay);
    }

    return nextBirthday;
}

function updateNextBirthdayCountdown() {
    const now = new Date();
    const nextBirthday = getNextBirthday();
    const diff = nextBirthday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('next-bday-days');
    const hoursEl = document.getElementById('next-bday-hours');
    const minutesEl = document.getElementById('next-bday-minutes');
    const secondsEl = document.getElementById('next-bday-seconds');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        updateCountdown();
        setInterval(updateCountdown, 60000); // Update every minute

        updateAnniversaryCountdown();
        setInterval(updateAnniversaryCountdown, 1000); // Update every second

        updateNextBirthdayCountdown();
        setInterval(updateNextBirthdayCountdown, 1000); // Update every second
    });
} else {
    updateCountdown();
    setInterval(updateCountdown, 60000);

    updateAnniversaryCountdown();
    setInterval(updateAnniversaryCountdown, 1000);

    updateNextBirthdayCountdown();
    setInterval(updateNextBirthdayCountdown, 1000);
}

// Navigation Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Toggle navigation menu
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
    });
}

// Smooth scroll to sections and close menu
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close menu after clicking
            if (navMenu) {
                navMenu.classList.add('hidden');
            }
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.classList.contains('hidden')) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.add('hidden');
        }
    }
});

