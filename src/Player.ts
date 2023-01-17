import AABB from "./AABB.js";
import AnimatedSprite from "./AnimatedSprite.js";
import Game from "./Game.js";

interface IAnimations {
	[key: string]: AnimatedSprite;
}

export default class Player {
	private game: Game;

	private x: number = 80;
	private y: number = 0;
	private dx: number = 0;
	private dy: number = 0;
	private vx: number = 3;
	private vy: number = 1;
	private AABB: AABB = new AABB(32, 32);
	private lastdir: number = 0;
	private gravity: number = 0.2;
	private jumping: boolean = false;
	private animations: IAnimations;
	private currentAnimation = 'idle';
	private character: string = 'PinkMan';

	constructor(game: Game) {
		this.game = game;
	}

	public async init() {
		// Setup animations
		this.animations = {
			idle: new AnimatedSprite(`assets/PixelAdventure/Characters/${this.character}/idle.png`, 32, 32),
			run: new AnimatedSprite(`assets/PixelAdventure/Characters/${this.character}/run.png`, 32, 32),
			jump: new AnimatedSprite(`assets/PixelAdventure/Characters/${this.character}/jump.png`, 32, 32),
			double_jump: new AnimatedSprite(`assets/PixelAdventure/Characters/${this.character}/doublejump.png`, 32, 32),
			fall: new AnimatedSprite(`assets/PixelAdventure/Characters/${this.character}/fall.png`, 32, 32),
		};

		// Loading animations
		for (const animation in this.animations) {
			await this.animations[animation].init();
			this.animations[animation].setAnimationSpeed(0.3);
		}
	}

	public update() {
		this.AABB.setPos(this.x, this.y);

		this.dx = 0;
		this.dy = 0;

		// update animations
		for (const animation in this.animations) {
			this.animations[animation].update();
		}

		if (this.game.inputHandler.isDown(37)) { // left
			this.dx = -1;
			this.lastdir = -1;
		}
		if (this.game.inputHandler.isDown(38)) { // up
			if (!this.jumping) {
				this.jumping = true;
				this.vy -= 5;
			}
		}
		if (this.game.inputHandler.isDown(39)) { // right
			this.dx = 1;
			this.lastdir = 1;
		}

		if (this.vy < 0) {
			this.setCurrentAnimation('jump');
		} else if (this.vy > 0) {
			this.setCurrentAnimation('fall');
		} else if (this.dx != 0) {
			this.setCurrentAnimation('run');
		} else {
			this.setCurrentAnimation('idle');
		}

		let collided = false;



		

		for (const aabb of this.game.AABBList) {
			if (aabb.isColliding(this.AABB)) {
				let y_overlap = (this.AABB.getPos()[1] + 32) - aabb.getPos()[1];
				collided = true;
				
				// After colliding, check if:
				// Player is going down
					this.jumping = false;
					this.vy = 0;
				// Player is going up
				// else if (this.vy < 0) {
					
				// 	this.vy = 0
				// }

				this.y -= y_overlap;
				break;
			}
		}

		// console.log(this.vy);
		this.x += this.vx * this.dx;
		this.y += this.vy;

		if (!collided) {
			this.vy += this.gravity;
		}


		// console.log(this.vy);


		// 	this.jumping = false;
		// 	this.vy = 0;

		// }



	}

	public setCurrentAnimation(name: string) {
		this.currentAnimation = name;
	}

	public render(ctx: CanvasRenderingContext2D) {
		this.animations[this.currentAnimation].render(ctx, this.x, this.y, (this.lastdir < 0 ? true : false));
		this.AABB.render(ctx);
	}
}