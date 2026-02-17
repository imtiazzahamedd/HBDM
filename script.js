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

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        updateCountdown();
        setInterval(updateCountdown, 60000); // Update every minute
    });
} else {
    updateCountdown();
    setInterval(updateCountdown, 60000);
}
