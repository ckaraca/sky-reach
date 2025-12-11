// Sky Reach - Arcade Climbing Game
// A vertical platformer where you climb to reach a spacecraft while avoiding meteors

// ============================================================================
// CONSTANTS
// ============================================================================

// Canvas dimensions
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// Physics constants
const PLAYER_SPEED = 100;        // pixels/second
const JUMP_HEIGHT = 40;          // pixels
const GRAVITY = 1200;            // pixels/second²
const CLIMB_SPEED = 75;          // pixels/second

// Meteor constants
const METEOR_SPEED = 120;        // pixels/second
const METEOR_SPAWN_RATE = 1.5;   // seconds
const MAX_METEORS = 6;

// Dimensions
const PLAYER_SIZE = 14;
const METEOR_SIZE = 16;
const PLATFORM_WIDTH = 600;
const PLATFORM_HEIGHT = 6;
const PLATFORM_SPACING = 100;

// Colors
const COLOR_BACKGROUND = '#0a0e27';
const COLOR_PLAYER = '#ff6b35';
const COLOR_HELMET = '#ffffff';
const COLOR_METEOR = '#4a4a4a';
const COLOR_METEOR_GLOW = '#ff4444';
const COLOR_PLATFORM = '#8c8c8c';
const COLOR_LADDER = '#00d9ff';
const COLOR_STAR = '#ffd700';
const COLOR_TEXT = '#ffffff';

// Scoring
const POINTS_STAR = 100;
const POINTS_PLATFORM = 50;
const POINTS_METEOR_AVOIDED = 5;
const POINTS_MISSION_COMPLETE = 500;

// ============================================================================
// GAME STATE
// ============================================================================

const gameState = {
    state: 'menu',  // 'menu', 'playing', 'won', 'lost'
    score: 0,
    time: 0
};

// ============================================================================
// INPUT HANDLING
// ============================================================================

const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false
};

// ============================================================================
// CANVAS SETUP
// ============================================================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ============================================================================
// GAME LOOP
// ============================================================================

let lastTime = 0;

function gameLoop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    // Update game
    update(deltaTime);

    // Render game
    render();

    // Continue loop
    requestAnimationFrame(gameLoop);
}

// ============================================================================
// UPDATE FUNCTION
// ============================================================================

function update(deltaTime) {
    if (gameState.state === 'playing') {
        gameState.time += deltaTime;
        // TODO: Update player, meteors, collisions, etc.
    }
}

// ============================================================================
// RENDER FUNCTION
// ============================================================================

function render() {
    // Clear canvas
    ctx.fillStyle = COLOR_BACKGROUND;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw starfield background
    drawStarfield();

    if (gameState.state === 'menu') {
        renderMenu();
    } else if (gameState.state === 'playing') {
        renderGame();
    } else if (gameState.state === 'won') {
        renderWinScreen();
    } else if (gameState.state === 'lost') {
        renderLoseScreen();
    }
}

// ============================================================================
// RENDER SCREENS
// ============================================================================

function renderMenu() {
    ctx.fillStyle = COLOR_TEXT;
    ctx.font = 'bold 64px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SKY REACH', CANVAS_WIDTH / 2, 200);

    ctx.font = '24px Arial';
    ctx.fillText('Climb to the spacecraft at the top!', CANVAS_WIDTH / 2, 280);
    ctx.fillText('Avoid falling meteors', CANVAS_WIDTH / 2, 320);
    ctx.fillText('Collect stars for bonus points', CANVAS_WIDTH / 2, 360);

    // Pulsing "Press SPACE to Start" text
    ctx.font = '32px Arial';
    const pulseAlpha = 0.5 + Math.abs(Math.sin(Date.now() / 500)) * 0.5;
    ctx.fillStyle = COLOR_LADDER;
    ctx.globalAlpha = pulseAlpha;
    ctx.fillText('Press SPACE to Start', CANVAS_WIDTH / 2, 480);
    ctx.globalAlpha = 1.0; // Reset alpha
}

function renderGame() {
    // Draw HUD
    ctx.fillStyle = COLOR_TEXT;
    ctx.font = '24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${gameState.score}`, 20, 40);
}

function renderWinScreen() {
    ctx.fillStyle = COLOR_LADDER;
    ctx.font = 'bold 64px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('MISSION COMPLETE!', CANVAS_WIDTH / 2, 250);

    ctx.fillStyle = COLOR_TEXT;
    ctx.font = '32px Arial';
    ctx.fillText(`Final Score: ${gameState.score}`, CANVAS_WIDTH / 2, 320);
    ctx.fillText('Press SPACE to Restart', CANVAS_WIDTH / 2, 400);
}

function renderLoseScreen() {
    ctx.fillStyle = COLOR_METEOR_GLOW;
    ctx.font = 'bold 64px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('MISSION FAILED!', CANVAS_WIDTH / 2, 250);

    ctx.fillStyle = COLOR_TEXT;
    ctx.font = '32px Arial';
    ctx.fillText(`Score: ${gameState.score}`, CANVAS_WIDTH / 2, 320);
    ctx.fillText('Press SPACE to Restart', CANVAS_WIDTH / 2, 400);
}

// ============================================================================
// BACKGROUND EFFECTS
// ============================================================================

const stars = [];
for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        size: Math.random() * 2
    });
}

function drawStarfield() {
    ctx.fillStyle = COLOR_TEXT;
    stars.forEach(star => {
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });
}

// ============================================================================
// INPUT EVENT LISTENERS
// ============================================================================

document.addEventListener('keydown', (e) => {
    handleKeyEvent(e.key.toLowerCase(), true);
    // Prevent arrow keys from scrolling the page
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }
});

document.addEventListener('keyup', (e) => {
    handleKeyEvent(e.key.toLowerCase(), false);
});

function handleKeyEvent(key, isPressed) {
    switch(key) {
        case 'arrowleft':
            keys.left = isPressed;
            break;
        case 'arrowright':
            keys.right = isPressed;
            break;
        case 'arrowup':
            keys.up = isPressed;
            break;
        case 'arrowdown':
            keys.down = isPressed;
            break;
        case ' ':
            keys.space = isPressed;
            // Handle menu/restart interactions
            if (isPressed && (gameState.state === 'menu' || gameState.state === 'won' || gameState.state === 'lost')) {
                startGame();
            }
            break;
    }
}

// ============================================================================
// GAME CONTROL FUNCTIONS
// ============================================================================

function startGame() {
    gameState.state = 'playing';
    gameState.score = 0;
    gameState.time = 0;
    // TODO: Reset player position, clear meteors, reset stars, etc.
}

// ============================================================================
// INITIALIZE AND START
// ============================================================================

// Start the game loop
requestAnimationFrame(gameLoop);
