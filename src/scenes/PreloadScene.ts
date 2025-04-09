import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    console.log('PreloadScene: Preload');

    // Display a loading message
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: 'Loading...',
      style: {
        font: '30px Arial',
        color: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    // --- Move Texture Generation Here ---
    // We'll keep generating them dynamically for now
    // Later, this is where actual asset loading (this.load.image, etc.) would go.

    // Paddle Texture
    const paddleGraphics = this.make.graphics({ x: 0, y: 0 }, false);
    paddleGraphics.fillStyle(0xffffff);
    paddleGraphics.fillRect(0, 0, 20, 100); // Paddle texture (20x100)
    paddleGraphics.generateTexture('paddle', 20, 100);
    paddleGraphics.destroy();

    // Ball Texture
    const ballGraphics = this.make.graphics({ x: 0, y: 0 }, false);
    ballGraphics.fillStyle(0xffffff);
    ballGraphics.fillRect(0, 0, 20, 20); // Ball texture (20x20)
    ballGraphics.generateTexture('ball', 20, 20);
    ballGraphics.destroy();

    // --- Asset loading complete --- 
    // Phaser automatically calls create() after preload() finishes
  }

  create() {
    console.log('PreloadScene: Create - Starting MenuScene');
    // Start the MenuScene
    this.scene.start('MenuScene');
  }
} 