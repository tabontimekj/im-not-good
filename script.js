// Array of different font families
const fonts = [
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald',
    'Raleway', 'Merriweather', 'Ubuntu', 'Playfair Display',
    'Source Sans Pro', 'Poppins', 'Roboto Mono', 'Roboto Condensed',
    'Roboto Slab', 'Nunito', 'Work Sans', 'PT Sans', 'Noto Sans',
    'Titillium Web', 'Fira Sans', 'Quicksand'
];

// Command data structure (kept for completeness, not used in new flow)
const commandCategories = [
    { name: "AFK", commands: ["afk ON/OFF"] },
    { name: "AfkCheck", commands: ["afkcheck "] },
    { name: "AllJoin", commands: ["jvc", "lvc", "vcstatus"] },
    // ... (rest of your command categories here)
];

// Quote to display with changing fonts
const quote = "After all of the wasted years, how could i stay in this place? Living lies that i thought were the truth.";

// Function to request fullscreen
function requestFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// Function to check if we're in fullscreen mode
function isFullScreen() {
    return !!(
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );
}

// Function to show warning when user tries to exit fullscreen
function showFullscreenWarning() {
    const warning = document.getElementById('fullscreen-warning');
    warning.style.display = 'flex';
    setTimeout(() => {
        warning.style.display = 'none';
        requestFullScreen(document.documentElement);
    }, 2000);
}

// Function to display the quote with changing fonts
function displayQuoteWithChangingFonts() {
    const quoteScreen = document.getElementById('quote-screen');
    const quoteText = document.getElementById('quote-text');
    quoteScreen.style.display = 'flex';

    // Split the quote into individual characters
    const characters = quote.split('');
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

    // After 10 seconds, fade out and show the Omer sequence
    setTimeout(() => {
        clearInterval(fontInterval);
        quoteScreen.style.opacity = '0';
        quoteScreen.style.transition = 'opacity 2s';
        setTimeout(() => {
            quoteScreen.style.display = 'none';
            displayOmerSequence();
        }, 2000);
    }, 10000);
}

// Function to display the Omer message sequence
function displayOmerSequence() {
    // Remove or hide the command grid and quote screen
    const commandGrid = document.getElementById('command-grid');
    if (commandGrid) commandGrid.style.display = 'none';
    const quoteScreen = document.getElementById('quote-screen');
    if (quoteScreen) quoteScreen.style.display = 'none';

    // Remove any existing sequence div
    let oldDiv = document.getElementById('omer-sequence');
    if (oldDiv) oldDiv.remove();

    // Messages to show
    const messages = [
        "omer was here",
        "omers return",
        "fear me. 20/05/25"
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

    let current = 0;

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
            span.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
            span.style.fontSize = '4vw';
            span.style.color = 'white';
            span.style.transition = 'font-family 0.5s';
            msgDiv.appendChild(span);
        }

        container.appendChild(msgDiv);

        // Animate font changes every 1.5s
        let interval = setInterval(() => {
            for (let span of msgDiv.children) {
                span.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
            }
        }, 1500);

        // Show each message for 2.5 seconds, then move to the next
        setTimeout(() => {
            clearInterval(interval);
            if (idx < messages.length - 1) {
                showMessage(idx + 1);
            }
        }, 2500);
    }

    showMessage(0);
}

// (The rest of your code remains unchanged)

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
            // Request fullscreen
            requestFullScreen(document.documentElement);
            // Display the quote with changing fonts
            displayQuoteWithChangingFonts();
        }, 1000);
    });

    // Add event listener for fullscreen change
    document.addEventListener('fullscreenchange', () => {
        if (!isFullScreen() && document.getElementById('quote-screen').style.display === 'flex') {
            showFullscreenWarning();
        }
    });

    document.addEventListener('webkitfullscreenchange', () => {
        if (!isFullScreen() && document.getElementById('quote-screen').style.display === 'flex') {
            showFullscreenWarning();
        }
    });

    document.addEventListener('mozfullscreenchange', () => {
        if (!isFullScreen() && document.getElementById('quote-screen').style.display === 'flex') {
            showFullscreenWarning();
        }
    });

    document.addEventListener('MSFullscreenChange', () => {
        if (!isFullScreen() && document.getElementById('quote-screen').style.display === 'flex') {
            showFullscreenWarning();
        }
    });

    // Prevent escape key from exiting fullscreen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('quote-screen').style.display === 'flex') {
            e.preventDefault();
            showFullscreenWarning();
        }
    });
});
