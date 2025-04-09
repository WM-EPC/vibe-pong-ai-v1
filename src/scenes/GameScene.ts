import Phaser from 'phaser';

const WINNING_SCORE = 11;

export default class GameScene extends Phaser.Scene {
  private playerPaddle!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private opponentPaddle!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private ball!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private playerScore: number = 0;
  private opponentScore: number = 0;
  private playerScoreText!: Phaser.GameObjects.Text;
  private opponentScoreText!: Phaser.GameObjects.Text;
  private gameOverTextPrimary?: Phaser.GameObjects.Text;
  private gameOverTextSecondary?: Phaser.GameObjects.Text;
  private gameOverPromptText?: Phaser.GameObjects.Text;
  private isGameOver: boolean = false;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    console.log('GameScene: Create');

    const worldWidth = this.physics.world.bounds.width;
    const worldHeight = this.physics.world.bounds.height;

    this.playerPaddle = this.physics.add.image(50, worldHeight / 2, 'paddle');
    this.playerPaddle.setImmovable(true);
    this.playerPaddle.setCollideWorldBounds(true);

    this.opponentPaddle = this.physics.add.image(worldWidth - 50, worldHeight / 2, 'paddle');
    this.opponentPaddle.setImmovable(true);
    this.opponentPaddle.setCollideWorldBounds(true);

    this.ball = this.physics.add.image(worldWidth / 2, worldHeight / 2, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.physics.world.checkCollision.left = false;
    this.physics.world.checkCollision.right = false;

    this.ball.setBounce(1, 1);
    const initialBallSpeed = 400;
    this.ball.setVelocity(initialBallSpeed, initialBallSpeed);

    this.physics.add.collider(this.ball, this.playerPaddle);
    this.physics.add.collider(this.ball, this.opponentPaddle);

    this.cursors = this.input.keyboard!.createCursorKeys();

    const scoreStyle = { font: '48px Arial', color: '#ffffff' };
    this.playerScoreText = this.add.text(this.cameras.main.width * 0.25, 50, '0', scoreStyle).setOrigin(0.5);
    this.opponentScoreText = this.add.text(this.cameras.main.width * 0.75, 50, '0', scoreStyle).setOrigin(0.5);

    this.playerScore = 0;
    this.opponentScore = 0;
    this.playerScoreText.setText('0');
    this.opponentScoreText.setText('0');

    this.isGameOver = false;
    this.gameOverTextPrimary?.destroy();
    this.gameOverTextSecondary?.destroy();
    this.gameOverPromptText?.destroy();
    this.gameOverTextPrimary = undefined;
    this.gameOverTextSecondary = undefined;
    this.gameOverPromptText = undefined;
  }

  update() {
    if (this.isGameOver) {
      return;
    }

    const paddleSpeed = 500;
    if (this.cursors.up.isDown) {
      this.playerPaddle.setVelocityY(-paddleSpeed);
    } else if (this.cursors.down.isDown) {
      this.playerPaddle.setVelocityY(paddleSpeed);
    } else {
      this.playerPaddle.setVelocityY(0);
    }

    const opponentSpeed = 50;
    if (this.opponentPaddle.y < this.ball.y - 15) {
      this.opponentPaddle.setVelocityY(opponentSpeed);
    } else if (this.opponentPaddle.y > this.ball.y + 15) {
      this.opponentPaddle.setVelocityY(-opponentSpeed);
    } else {
      this.opponentPaddle.setVelocityY(0);
    }

    const worldBounds = this.physics.world.bounds;
    const isBallActive = this.ball.active;

    if (isBallActive && this.ball.x > worldBounds.width) {
      this.playerScore++;
      this.playerScoreText.setText(this.playerScore.toString());
      this.handleScore();
    } else if (isBallActive && this.ball.x < 0) {
      this.opponentScore++;
      this.opponentScoreText.setText(this.opponentScore.toString());
      this.handleScore();
    }
  }

  handleScore() {
    this.ball.setActive(false).setVisible(false);
    this.ball.setVelocity(0, 0);

    let primaryMessage = '';
    let secondaryMessage = '';

    if (this.playerScore >= WINNING_SCORE) {
      primaryMessage = 'Flow State!';
      secondaryMessage = '(You Win!)';
    } else if (this.opponentScore >= WINNING_SCORE) {
      primaryMessage = 'Vibe Check...';
      secondaryMessage = '(Sorry, you lost)';
    }

    if (primaryMessage) {
      this.isGameOver = true;
      this.playerPaddle.setVelocity(0, 0);
      this.opponentPaddle.setVelocity(0, 0);

      this.gameOverTextPrimary = this.add.text(
          this.cameras.main.centerX,
          this.cameras.main.centerY - 20,
          primaryMessage,
          { font: '64px Arial', color: '#00ff00' }
      ).setOrigin(0.5);

      this.gameOverTextSecondary = this.add.text(
          this.cameras.main.centerX,
          this.cameras.main.centerY + 40,
          secondaryMessage,
          { font: '32px Arial', color: '#ffffff' }
      ).setOrigin(0.5);

      this.gameOverPromptText = this.add.text(
          this.cameras.main.centerX,
          this.cameras.main.centerY + 100,
          'Press SPACE to Play Again',
          { font: '24px Arial', color: '#cccccc' }
      ).setOrigin(0.5);

      this.input.keyboard!.once('keydown-SPACE', () => {
        this.scene.start('MenuScene');
      });

    } else {
      this.time.delayedCall(1000, () => {
        const worldWidth = this.physics.world.bounds.width;
        const worldHeight = this.physics.world.bounds.height;
        const speed = 400;
        const angle = Phaser.Math.Between(0, 1) ? Phaser.Math.DegToRad(Phaser.Math.Between(-30, 30)) : Phaser.Math.DegToRad(Phaser.Math.Between(150, 210));

        this.ball.setPosition(worldWidth / 2, worldHeight / 2);
        this.ball.setVisible(true).setActive(true);

        if (this.ball.body) {
          this.physics.velocityFromRotation(angle, speed, this.ball.body.velocity);
        }
      });
    }
  }
}