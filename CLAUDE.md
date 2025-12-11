# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **NintendoDemo** repository containing browser-based arcade game projects. The primary project is **Sky Reach**, a vertical platformer climbing game built with vanilla JavaScript and HTML5 Canvas.

## Project Structure

The repository follows a simple structure for browser-based games:

```
/NintendoDemo/
  ├── SKY_REACH_IMPLEMENTATION_PLAN.md  # Detailed implementation plan
  └── /sky-reach/                        # Game directory (to be created)
      ├── index.html                     # Main HTML with canvas
      ├── game.js                        # Game logic
      └── README.md                      # Game instructions
```

## Sky Reach Architecture

### Core Tech Stack
- **HTML5 Canvas**: 800×600px rendering surface
- **Vanilla JavaScript (ES6+)**: Zero dependencies
- **requestAnimationFrame**: 60 FPS game loop
- **No build tools**: Direct browser execution

### Game Architecture

The game follows a single-file architecture in `game.js` with these main components:

1. **Game State Management**
   - States: `'menu'`, `'playing'`, `'won'`, `'lost'`
   - Global state object tracks score, current state, and game timer

2. **Player Object**
   - Position (x, y), velocity, collision box
   - States: `isOnGround`, `isOnLadder`, `isJumping`
   - Methods: `update()`, `draw()`

3. **Level Data**
   - 6 platforms (0-5) with fixed positions
   - Multiple ladders connecting platforms
   - Star collectibles (3-5 per level)
   - Spacecraft win zone at top

4. **Meteor System**
   - Array-based meteor management
   - Spawning logic (every 1.5s, max 6 on screen)
   - Variants: small (faster) and large (slower)

5. **Game Loop**
   - `update()`: Physics, collision detection, game state
   - `render()`: Draw all game objects
   - `handleInput()`: Keyboard event processing

### Physics Constants

All physics values are configurable constants at the top of `game.js`:

```javascript
PLAYER_SPEED = 100        // px/s
JUMP_HEIGHT = 40          // pixels
GRAVITY = 1200           // px/s²
CLIMB_SPEED = 75         // px/s
METEOR_SPEED = 120       // px/s
METEOR_SPAWN_RATE = 1.5  // seconds
```

### Collision Detection

- **AABB (Axis-Aligned Bounding Box)**: For player vs platforms
- **Circle-to-Rectangle**: For player vs meteors
- **Point-in-Box**: For star collection and win zone

## Development Workflow

### Running the Game
Simply open `sky-reach/index.html` in a modern browser (Chrome, Firefox, Safari, Edge).

No build step or server required for basic development. For local testing with proper CORS:
```bash
python3 -m http.server 8000
# Or use any simple HTTP server
```

### Testing
Manual testing in browser. Focus areas:
- Player movement smoothness
- Jump arc feel
- Ladder climbing from all angles
- Collision detection accuracy
- Win/lose conditions
- Restart functionality

### Performance
Target 60 FPS. Check browser DevTools Performance tab if frame drops occur.

## Code Style

- **Simple over clever**: Prioritize readability
- **Constants for magic numbers**: All physics/dimension values should be named constants
- **Minimal comments**: Code should be self-explanatory; comment only complex collision logic
- **Single file**: Keep all game logic in one file (under 300 lines target)
- **No abstractions**: Avoid premature optimization or class hierarchies

## Implementation Phases

Follow the 6-phase plan in `SKY_REACH_IMPLEMENTATION_PLAN.md`:

1. **Foundation** (45 min): Game loop, canvas, input
2. **Player & Movement** (60 min): Character, platforms, ladders
3. **Meteors** (45 min): Spawning, collision, game over
4. **Win Condition** (30 min): Stars, spacecraft, scoring
5. **Polish** (30 min): UI, screens, visual effects
6. **Testing** (30 min): Edge cases, browser compatibility

Complete each phase fully before moving to the next.

## Color Palette

```javascript
COLOR_BACKGROUND = '#0a0e27'      // Dark space blue
COLOR_PLAYER = '#ff6b35'          // Orange astronaut
COLOR_HELMET = '#ffffff'          // White helmet
COLOR_METEOR = '#4a4a4a'          // Gray meteor
COLOR_METEOR_GLOW = '#ff4444'     // Red glow
COLOR_PLATFORM = '#8c8c8c'        // Silver platform
COLOR_LADDER = '#00d9ff'          // Cyan ladder
COLOR_STAR = '#ffd700'            // Gold star
COLOR_TEXT = '#ffffff'            // White text
```

## Scope Boundaries

**In Scope (Demo):**
- Single level with 5 platforms
- Basic player movement and jumping
- Ladder climbing
- Falling meteors
- Star collectibles
- Win/lose conditions
- Score tracking
- Restart functionality

**Out of Scope (Post-Demo):**
- Multiple levels
- Sound effects and music
- Power-ups
- Lives system
- High score persistence
- Mobile controls
- Complex animations
- Leaderboards

Focus on completing the demo scope. Resist feature creep.

## Key Implementation Details

### Platform-Through Jumping
Players should be able to jump through platforms from below but land on them from above. Check if `player.velocityY > 0` (falling) before triggering platform collision.

### Ladder Mounting
Auto-mount ladder when player presses up/down within 10px of ladder X position. Disable gravity while `isOnLadder = true`.

### Meteor Cleanup
Remove meteors from array when `meteor.y > 600` to prevent memory leaks.

### Delta Time
Use delta time for all movement calculations to maintain consistent speed across frame rates:
```javascript
player.x += player.velocityX * deltaTime;
```

## Browser Compatibility

Target modern browsers (2020+):
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

All required features (Canvas, ES6, requestAnimationFrame) are widely supported.
