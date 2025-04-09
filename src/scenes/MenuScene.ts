import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    console.log('MenuScene: Create');

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Game Title
    this.add
      .text(width / 2, height * 0.4, 'Vibe Pong AI', {
        font: '64px Arial',
        color: '#00ff00',
      })
      .setOrigin(0.5);

    // Start Instruction
    this.add
      .text(width / 2, height * 0.6, 'Press SPACE to Start', {
        font: '32px Arial',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    // Add listener for SPACE key
    this.input.keyboard!.on('keydown-SPACE', () => {
      console.log('MenuScene: Space pressed - Starting GameScene');
      this.scene.start('GameScene');
    });
  }
} 