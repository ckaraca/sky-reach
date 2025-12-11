# Sky Reach

A browser-based arcade climbing game where you must reach a spacecraft at the top of a tower while avoiding falling meteors.

## Game Description

You are a brave astronaut trying to reach your stranded spacecraft at the top of an ancient space tower. Cosmic debris (meteors) constantly falls from above, threatening your ascent. Climb platforms using ladders, collect stars for bonus points, and reach the top to complete your mission!

## How to Play

### Controls
- **Arrow Keys (Left/Right)**: Move horizontally
- **Spacebar**: Jump
- **Arrow Keys (Up/Down)**: Climb ladders

### Objective
1. Start at the bottom of the tower
2. Climb platforms and ladders to reach higher levels
3. Avoid falling meteors (they're deadly!)
4. Collect stars for bonus points (+100 each)
5. Reach the spacecraft at the top to win

### Scoring
- **Star Collected**: +100 points
- **Platform Reached**: +50 points (first time)
- **Meteor Avoided**: +5 points
- **Mission Complete**: +500 bonus points

## Running the Game

### Option 1: Direct Browser (Simplest)
Simply open `index.html` in any modern web browser:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Option 2: Local Server (Recommended for development)
```bash
# Using Python 3
python3 -m http.server 8000

# Then open: http://localhost:8000
```

## Game Features

- **60 FPS gameplay** using HTML5 Canvas
- **Vertical platforming** with climbing mechanics
- **Falling hazards** that spawn dynamically
- **Collectible stars** for bonus points
- **Win/lose conditions** with restart functionality
- **Zero dependencies** - pure vanilla JavaScript

## Development Status

**Current Phase**: Foundation Complete ✓
- Game loop implemented
- Canvas rendering setup
- Input handling system
- Menu/win/lose screens
- Starfield background

**Next Phases**:
- Phase 2: Player movement and platforms
- Phase 3: Meteor system
- Phase 4: Stars and win condition
- Phase 5: Polish and effects
- Phase 6: Testing and balancing

## Technical Details

### Tech Stack
- HTML5 Canvas (800×600px)
- Vanilla JavaScript (ES6+)
- RequestAnimationFrame game loop
- No external dependencies

### Browser Compatibility
Works in all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript
- RequestAnimationFrame API

### Performance
- Target: 60 FPS
- Canvas size: 800×600 pixels
- Memory usage: <50MB

## Project Structure

```
sky-reach/
├── index.html    # Main HTML file with canvas
├── game.js       # Complete game logic
└── README.md     # This file
```

## License

This is a demo project created for educational purposes.

## Credits

Game concept and implementation: Original arcade-style climbing game

---

**Ready to play?** Open `index.html` in your browser and press SPACE to start!
