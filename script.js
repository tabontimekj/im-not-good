// Array of different font families
const fonts = [
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald',
    'Raleway', 'Merriweather', 'Ubuntu', 'Playfair Display',
    'Source Sans Pro', 'Poppins', 'Roboto Mono', 'Roboto Condensed',
    'Roboto Slab', 'Nunito', 'Work Sans', 'PT Sans', 'Noto Sans',
    'Titillium Web', 'Fira Sans', 'Quicksand'
];

// Command data structure (not used in new flow, kept for completeness)
const commandCategories = [
    { name: "AFK", commands: ["afk ON/OFF"] },
    // ... (rest of your command categories here)
];

// Quote to display with changing fonts
const quote = "If you believe in your dreams, I will prove to you, that you can achieve your dreams just by working hard.";

// Helper: Add spaces between every letter and every word
function spacedText(str) {
    return str
        .split(' ')
        .map(word => word.split('').join(' '))
        .join(' '); // 3 spaces between words
}

// Function to display the quote with changing fonts
function displayQuoteWithChangingFonts(customQuote) {
    const quoteScreen = document.getElementById('quote-screen');
    const quoteText = document.getElementById('quote-text');
    quoteScreen.style.display = 'flex';

    // Use customQuote if provided, else use the default
    const theQuote = customQuote || quote;

    // Split the quote into individual characters
    const characters = theQuote.split('');

    quoteText.innerHTML = '';

    // Create a span for each character with a random font
    characters.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
        quoteText.appendChild(span);
    });

    // Change fonts every 2 seconds
    const fontInterval = setInterval(() => {
        const spans = quoteText.querySelectorAll('span');
        spans.forEach(span => {
            span.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
        });
    }, 2000);

    // After 10 seconds, fade out and show the date sequence
    setTimeout(() => {
        clearInterval(fontInterval);
        quoteScreen.style.opacity = '0';
        quoteScreen.style.transition = 'opacity 2s';
        setTimeout(() => {
            quoteScreen.style.display = 'none';
            displayDateSequence();
        }, 2000);
    }, 10000);
}

// Function to display the date message sequence (looping)
function displayDateSequence() {
    // Hide the command grid and quote screen if they exist
    const commandGrid = document.getElementById('command-grid');
    if (commandGrid) commandGrid.style.display = 'none';
    const quoteScreen = document.getElementById('quote-screen');
    if (quoteScreen) quoteScreen.style.display = 'none';

    // Remove any existing sequence div
    let oldDiv = document.getElementById('omer-sequence');
    if (oldDiv) oldDiv.remove();

    // Only show "1/6/25" with spaces between every character
    const messages = [
        spacedText("1/6/25")
    ];

    // Create the container
    const container = document.createElement('div');
    container.id = 'omer-sequence';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.background = 'black';
    container.style.zIndex = '9999';

    document.body.appendChild(container);

    // Loop through messages forever (only one message here)
    function showMessage(idx) {
        container.innerHTML = ""; // Clear previous

        const msg = messages[idx];
        const msgDiv = document.createElement('div');
        msgDiv.style.display = 'flex';
        msgDiv.style.justifyContent = 'center';
        msgDiv.style.alignItems = 'center';
        msgDiv.style.height = '100%';

        // Create a span for each character with a random font
        for (let char of msg) {
            const span = document.createElement('span');
            span.textContent = char;
            // Keep spaces as spaces, don't apply font
            if (char !== ' ') {
                span.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
                span.style.fontSize = '4vw';
                span.style.color = 'white';
                span.style.transition = 'font-family 0.5s';
            }
            msgDiv.appendChild(span);
        }
        container.appendChild(msgDiv);

        // Animate font changes every 1.5s
        let interval = setInterval(() => {
            for (let span of msgDiv.children) {
                if (span.textContent !== ' ') {
                    span.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
                }
            }
        }, 1500);

        // Show each message for 2.5 seconds, then move to the next (loops)
        setTimeout(() => {
            clearInterval(interval);
            let nextIdx = (idx + 1) % messages.length;
            showMessage(nextIdx);
        }, 2500);
    }

    showMessage(0);
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    // Start with black screen for 2 seconds
    setTimeout(() => {
        // Show the image
        const mainImage = document.getElementById('main-image');
        mainImage.style.display = 'block';
        mainImage.style.opacity = '0';
        mainImage.style.transition = 'opacity 1s';
        setTimeout(() => {
            mainImage.style.opacity = '1';
            // Show the button after image is visible
            setTimeout(() => {
                const testButton = document.getElementById('test-button');
                testButton.style.display = 'block';
                testButton.style.opacity = '0';
                testButton.style.transition = 'opacity 1s';
                setTimeout(() => {
                    testButton.style.opacity = '1';
                }, 100);
            }, 1000);
        }, 100);
    }, 2000);

    // Add click event to the button
    document.getElementById('test-button').addEventListener('click', () => {
        // Fade everything out
        const initialScreen = document.getElementById('initial-screen');
        initialScreen.style.opacity = '0';
        initialScreen.style.transition = 'opacity 1s';
        setTimeout(() => {
            initialScreen.style.display = 'none';
            // Show the main quote with animated fonts
            displayQuoteWithChangingFonts(
                "If you believe in your dreams, I will prove to you, that you can achieve your dreams just by working hard."
            );
        }, 1000);
    });
});
