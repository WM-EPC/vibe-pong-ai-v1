import Phaser from 'phaser';

// Import Scenes
import BootScene from './scenes/BootScene';
import PreloadScene from './scenes/PreloadScene';
import MenuScene from './scenes/MenuScene';
import GameScene from './scenes/GameScene';

// Function to initialize the game
function initGame() {
  // Ensure the game container exists
  let gameContainer = document.getElementById('game-container');
  if (!gameContainer) {
    gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    document.body.appendChild(gameContainer);
  }

  // Define the game configuration (reference the container ID)
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container', // Ensure this matches the ID
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {},
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600,
    },
    scene: [BootScene, PreloadScene, MenuScene, GameScene], // List all scenes, starting with BootScene
  };

  // Create a new Phaser game instance inside the container
  const game = new Phaser.Game(config);
}

// Initialize the game when the DOM is ready
document.addEventListener('DOMContentLoaded', initGame); 