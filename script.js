// Intro Sequence Animation
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

// Fade out intro and reveal main content
const introExitDelay = totalSequentialTime + 4000;

setTimeout(() => {
    introSequence.style.opacity = '0';
    introSequence.style.transition = 'opacity 1s ease-out';

    setTimeout(() => {
        introSequence.style.display = 'none';
        mainContent.style.opacity = '1';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }, 1000);
}, introExitDelay);

// Lock scrolling during the intro
document.body.style.overflow = 'hidden';

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

// Flip cards logic - 10 Reasons I Love You
const reasons = [
    "You are my best friend and soulmate 💝",
    "Your smile lights up my entire world ✨",
    "You make me a better person every day 🌟",
    "Your kindness knows no bounds 💖",
    "You support my biggest dreams 🚀",
    "Your laugh is my favorite song 🎵",
    "You are incredibly beautiful, inside and out 🌹",
    "Your strength inspires me daily 💪",
    "You give the best, most warming hugs 🤗",
    "You are my home and my forever 🏠💝"
];

// Function to initialize heart cards
function initializeHeartCards() {
    const grid = document.querySelector('.reasons-grid');
    if (grid && grid.children.length === 0) { // Only initialize if not already done
        reasons.forEach((reason, i) => {
            const card = document.createElement('div');
            card.className = 'heart-card animate-float';
            card.style.animationDelay = `${i * 0.2}s`;
            card.innerHTML = `
                <div class="heart-card-inner">
                    <div class="heart-card-front">
                        <span class="heart-number">${i + 1}</span>
                        💝
                    </div>
                    <div class="heart-card-back">
                        ${reason}
                    </div>
                </div>
            `;

            // Add click event listener
            card.addEventListener('click', function (e) {
                e.stopPropagation(); // Prevent event bubbling
                this.classList.toggle('flipped');
            });

            grid.appendChild(card);
        });
        console.log('Heart cards initialized successfully!');
    }
}

// Initialize when DOM is ready - try both methods for reliability
if (document.readyState === 'loading') {
    // DOM is still loading
    document.addEventListener('DOMContentLoaded', initializeHeartCards);
} else {
    // DOM is already loaded
    initializeHeartCards();
}

