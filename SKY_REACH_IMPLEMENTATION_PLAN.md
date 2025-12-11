# Sky Reach - Implementation Plan

**Project:** Sky Reach - Original Arcade Climbing Game
**Based on:** Sky Reach PRD v1.0
**Created:** December 11, 2025
**Target:** 5-minute browser-based demo
**Estimated Time:** 3-4 hours

---

## Project Overview

Sky Reach is a browser-based vertical platformer where players climb a tower while avoiding falling meteors. The goal is to reach a spacecraft at the top while collecting stars for bonus points.

**Core Tech Stack:**
- HTML5 Canvas (800×600px)
- Vanilla JavaScript (ES6+)
- 60 FPS using requestAnimationFrame
- Zero dependencies

---

## Phase 1: Project Setup & Foundation (45 minutes)

### 1.1 Create Project Structure
```
/sky-reach/
  ├── index.html
  ├── game.js
  └── README.md
```

### 1.2 HTML5 Canvas Setup
- [ ] Create `index.html` with canvas element (800×600px)
- [ ] Add basic CSS styling (centered canvas, dark background)
- [ ] Include game.js script
- [ ] Add meta tags for viewport and charset

### 1.3 Game Loop Foundation
- [ ] Set up canvas context (2D)
- [ ] Implement `requestAnimationFrame` loop
- [ ] Create delta time calculation for frame-independent movement
- [ ] Add FPS counter (debug mode)
- [ ] Initialize game state: `{ state: 'menu', score: 0 }`

### 1.4 Input Handling System
- [ ] Capture keyboard events (keydown/keyup)
- [ ] Store key states in object: `{ left, right, up, down, space }`
- [ ] Prevent default browser behavior (arrow keys scrolling)
- [ ] Add input buffering for responsive controls

**Deliverable:** Running game loop with input detection

---

## Phase 2: Player Character & Movement (60 minutes)

### 2.1 Player Object Creation
```javascript
player = {
  x: 400,           // Center of screen
  y: 550,           // Near bottom
  width: 14,
  height: 14,
  velocityX: 0,
  velocityY: 0,
  isOnGround: false,
  isOnLadder: false,
  isJumping: false
}
```

### 2.2 Basic Movement
- [ ] Implement left/right movement (100 px/s)
- [ ] Add acceleration (0.1s to max speed)
- [ ] Add deceleration when keys released
- [ ] Implement smooth horizontal movement
- [ ] Draw player as orange rectangle with white circle (helmet)

### 2.3 Jump Mechanics
- [ ] Spacebar triggers jump (if on ground)
- [ ] Apply gravity (1200 px/s²)
- [ ] Set jump velocity for 40px height
- [ ] Create parabolic arc
- [ ] Prevent double jumping

### 2.4 Level Structure Setup
- [ ] Define 6 platforms (0-5) with positions
- [ ] Platform 0: y=550, width=600
- [ ] Platforms 1-4: spaced 100px apart
- [ ] Platform 5 (top): y=50
- [ ] Draw platforms as metallic rectangles (#8c8c8c)

### 2.5 Platform Collision Detection
- [ ] Implement AABB collision detection
- [ ] Check if player is above platform and falling
- [ ] Set `isOnGround = true` when landing
- [ ] Stop vertical velocity on landing
- [ ] Allow jumping through platforms from below

### 2.6 Ladder System
- [ ] Define ladder positions on platforms 1-4
  - Platform 1: 2 ladders at varied X positions
  - Platform 2: 2 ladders
  - Platform 3: 2 ladders
  - Platform 4: 1 ladder
- [ ] Draw ladders as cyan vertical bars (#00d9ff)
- [ ] Detect when player is near ladder (within 10px)
- [ ] Allow up/down movement on ladder (75 px/s)
- [ ] Disable gravity when on ladder
- [ ] Allow dismounting ladder with left/right/jump

**Deliverable:** Playable character that can move, jump, and climb

---

## Phase 3: Meteor Hazard System (45 minutes)

### 3.1 Meteor Spawning
- [ ] Create meteors array: `meteors = []`
- [ ] Spawn timer: every 1.5 seconds
- [ ] Random X position across screen width
- [ ] Start at Y = -20 (above screen)
- [ ] Maximum 6 meteors on screen

### 3.2 Meteor Properties
```javascript
meteor = {
  x: random(0, 800),
  y: -20,
  size: 16,
  speed: 120,
  type: 'normal'  // or 'small'/'large'
}
```

### 3.3 Meteor Variants (Optional)
- [ ] Small meteors: 12×12px, 150 px/s (50% spawn rate)
- [ ] Large meteors: 20×20px, 90 px/s (50% spawn rate)
- [ ] Random selection on spawn

### 3.4 Meteor Movement
- [ ] Update Y position: `y += speed * deltaTime`
- [ ] Remove when Y > 600 (off screen)
- [ ] Draw as gray circles with red glow (#4a4a4a, #ff4444)

### 3.5 Collision Detection
- [ ] Circle-to-rectangle collision (player vs meteor)
- [ ] Trigger game over on collision
- [ ] Optional: Add brief invincibility on spawn (0.5s)

### 3.6 Game Over State
- [ ] Set `gameState = 'lost'`
- [ ] Stop meteor spawning
- [ ] Display "MISSION FAILED!" message
- [ ] Show final score
- [ ] Prompt "Press SPACE to restart"

**Deliverable:** Falling meteors that end game on collision

---

## Phase 4: Collectibles & Win Condition (30 minutes)

### 4.1 Star Placement
- [ ] Create stars array with 3-5 stars
- [ ] Place on platforms 1-5 (not on starting platform)
- [ ] Position near ladders or edges (risk/reward)
```javascript
stars = [
  { x: 200, y: 450, collected: false },
  { x: 600, y: 350, collected: false },
  { x: 100, y: 250, collected: false },
  { x: 500, y: 150, collected: false },
  { x: 400, y: 50, collected: false }
]
```

### 4.2 Star Collection
- [ ] Check collision between player and stars
- [ ] Mark star as collected
- [ ] Don't draw collected stars
- [ ] Add +100 to score
- [ ] Optional: Display floating "+100" text

### 4.3 Spacecraft Win Zone
- [ ] Define win zone on Platform 5: 32×32 pixel area
- [ ] Draw simple spacecraft sprite (silver/blue)
- [ ] Check if player enters win zone
- [ ] Trigger win condition

### 4.4 Win State
- [ ] Set `gameState = 'won'`
- [ ] Stop meteor spawning
- [ ] Display "MISSION COMPLETE!" message
- [ ] Add +500 bonus to score
- [ ] Show final score
- [ ] Prompt "Press SPACE to restart"

### 4.5 Scoring System
- [ ] Score display in top-left corner
- [ ] +100 for each star collected
- [ ] +50 for reaching new platform (first time)
- [ ] +5 for each meteor avoided (passes player Y)
- [ ] +500 mission complete bonus

**Deliverable:** Collectible stars and winning condition

---

## Phase 5: Polish & UI (30 minutes)

### 5.1 Visual Improvements
- [ ] Add starfield background (white dots on dark blue #0a0e27)
- [ ] Smooth player sprite (rounded corners)
- [ ] Add subtle glow to stars (optional pulse animation)
- [ ] Meteor trail effect (optional red particles)
- [ ] Platform shadows/highlights

### 5.2 HUD Elements
- [ ] Score display: "SCORE: 0" (top-left, 24px white text)
- [ ] Instructions: "ARROWS: Move | SPACE: Jump" (bottom center)
- [ ] Current platform indicator (optional)
- [ ] Timer display (optional)

### 5.3 Screen States
- [ ] **Menu Screen**
  - Title: "SKY REACH"
  - Instructions
  - "Press SPACE to Start"
- [ ] **Playing Screen**
  - HUD visible
  - Game active
- [ ] **Win Screen**
  - "MISSION COMPLETE!"
  - Final score
  - "Press SPACE to Restart"
- [ ] **Lose Screen**
  - "MISSION FAILED!"
  - Final score
  - "Press SPACE to Restart"

### 5.4 Restart Functionality
- [ ] Reset player position to start
- [ ] Clear all meteors
- [ ] Reset all stars to uncollected
- [ ] Reset score to 0
- [ ] Set `gameState = 'playing'`
- [ ] Restart meteor spawning timer

### 5.5 Final Touches
- [ ] Smooth animations and transitions
- [ ] Responsive controls (no input lag)
- [ ] Clear visual feedback for all actions
- [ ] Clean code comments
- [ ] README with instructions

**Deliverable:** Polished, playable demo

---

## Phase 6: Testing & Debugging (30 minutes)

### 6.1 Functional Testing
- [ ] Player movement feels smooth
- [ ] Jump arc feels natural (adjust if needed)
- [ ] Ladder climbing works from all angles
- [ ] Meteors spawn consistently
- [ ] No collision detection bugs
- [ ] Stars collect properly
- [ ] Win condition triggers correctly
- [ ] Lose condition triggers correctly
- [ ] Score increments correctly
- [ ] Restart resets everything

### 6.2 Edge Case Testing
- [ ] Jump while on ladder
- [ ] Move between adjacent ladders
- [ ] Multiple meteors hitting simultaneously
- [ ] Collect star while on ladder
- [ ] Rapid key presses don't break controls
- [ ] Can't jump off top of screen
- [ ] Can't move off sides of screen

### 6.3 Browser Compatibility
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge

### 6.4 Performance Testing
- [ ] Verify 60 FPS sustained
- [ ] Check with 6 meteors on screen
- [ ] Monitor memory usage
- [ ] Test on slower devices

**Deliverable:** Bug-free, smooth gameplay

---

## Technical Constants Reference

```javascript
// Physics
const PLAYER_SPEED = 100;        // pixels/second
const JUMP_HEIGHT = 40;          // pixels
const GRAVITY = 1200;            // pixels/second²
const CLIMB_SPEED = 75;          // pixels/second

// Meteors
const METEOR_SPEED = 120;        // pixels/second
const METEOR_SPAWN_RATE = 1.5;   // seconds
const MAX_METEORS = 6;

// Dimensions
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
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
```

---

## Level Layout Reference

```
[Platform 5 - Y:50]  ★ [SPACECRAFT] (Win Zone)
        |
    [Ladder]
        |
[Platform 4 - Y:150] ============== ★
        |
    [Ladder]
        |
[Platform 3 - Y:250] ============== ★
     |     |
 [Ladder] [Ladder]
     |     |
[Platform 2 - Y:350] ============== ★
     |     |
 [Ladder] [Ladder]
     |     |
[Platform 1 - Y:450] ============== ★
     |     |
 [Ladder] [Ladder]
     |     |
[Platform 0 - Y:550] ============== [START]

         ☄️ ☄️ ☄️ (Meteors falling from top)
```

---

## Success Criteria Checklist

### Gameplay
- [ ] Smooth 60 FPS performance
- [ ] Responsive controls with no lag
- [ ] Can complete level in 2-3 minutes
- [ ] Balanced difficulty (not too hard/easy)
- [ ] Clear visual feedback for all actions
- [ ] Win/lose states are obvious
- [ ] Restart works perfectly

### Technical
- [ ] No crashes or freezes
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Code is clean and maintainable
- [ ] Under 300 lines of JavaScript
- [ ] Loads in under 1 second

### User Experience
- [ ] Controls are intuitive
- [ ] Instructions are clear
- [ ] Game objective is obvious
- [ ] Replayability is high

---

## Future Enhancements (Post-Demo)

### Sound & Music
- Jump sound effect
- Star collection chime
- Meteor impact explosion
- Win/lose jingles
- Ambient space music

### Additional Features
- Multiple levels with different layouts
- Power-ups (shield, speed boost)
- Difficulty modes (easy/normal/hard)
- High score persistence (localStorage)
- Mobile touch controls
- Particle effects
- Combo system for consecutive stars
- Timer challenge mode
- Lives system (3 attempts)
- Animated character sprites

### Polish
- Better graphics/sprites
- More detailed background
- Animated spacecraft
- Screen shake on meteor impact
- Smooth camera follow (if level is taller)

---

## Risk Mitigation

### Potential Issues
1. **Collision detection bugs** → Test thoroughly with edge cases
2. **Performance issues** → Optimize draw calls, limit particles
3. **Browser compatibility** → Test early and often
4. **Controls feel sluggish** → Adjust physics constants iteratively
5. **Game too hard/easy** → Playtest and balance meteor spawn rate

---

## Development Tips

1. **Start simple:** Get basic movement working before adding complexity
2. **Test frequently:** Play the game after each feature
3. **Use constants:** Make physics values easy to tweak
4. **Comment code:** Explain complex collision logic
5. **Version control:** Commit after each completed phase
6. **Stay focused:** Don't add features beyond the PRD scope
7. **Polish last:** Functionality before visual improvements

---

## Completion Checklist

- [ ] Phase 1: Foundation complete
- [ ] Phase 2: Player movement complete
- [ ] Phase 3: Meteors complete
- [ ] Phase 4: Win/lose conditions complete
- [ ] Phase 5: Polish complete
- [ ] Phase 6: Testing complete
- [ ] README written
- [ ] Code commented
- [ ] Demo ready to play

---

**Ready to Build!** Follow phases 1-6 sequentially. Estimated total time: 3-4 hours.

**Next Step:** Create project structure and begin Phase 1 - Foundation.
