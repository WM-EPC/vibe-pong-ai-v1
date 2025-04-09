import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Load minimal assets for the PreloadScene (e.g., loading bar graphics) if any
    // For now, we don't have any, so this can be empty.
    console.log('BootScene: Preload');
  }

  create() {
    console.log('BootScene: Create - Starting PreloadScene');
    // Start the PreloadScene
    this.scene.start('PreloadScene');
  }
} 