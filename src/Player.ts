import AABB from "./AABB.js";
import AnimatedSprite from "./AnimatedSprite.js";
import Game from "./Game.js";

interface IAnimations {
	[key: string]: AnimatedSprite;
}

export default class Player {
	private game: Game;

	private x: number = 260;
	private y: number = 10;
	private dx: number = 0;
	private vx: number = 0;
	private vy: number = 0;
	private AABB: AABB = new AABB(0, 0, 32, 32);
	private lastdir: number = 0;
	private gravity: number = 0.2;
	private jumping: boolean = false;
	private animations: IAnimations;
	private currentAnimation = 'idle';
	private character: string = 'PinkMan';

	public horizontal_speed: number = 0.5;

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

		this.dx = 0;

		// update animations
		for (const animation in this.animations) {
			this.animations[animation].update();
		}

		if (this.game.inputHandler.isDown(37)) { // left
			this.dx = -1;
			this.vx -= this.horizontal_speed
			this.lastdir = -1;
		} else if (this.game.inputHandler.isDown(39)) { // right
			this.dx = 1;
			this.vx += this.horizontal_speed;
			this.lastdir = 1;
		}
		if (this.game.inputHandler.isDown(38)) { // up
			if (!this.jumping) {
				this.jumping = true;
				this.vy = -5;
			}
		}

		// console.log(this.vx);
		
		

		if (this.vy < 0) {
			this.setCurrentAnimation('jump');
		} else if (this.vy > 0 && this.jumping) {
			this.setCurrentAnimation('fall');
		} else if (this.dx != 0) {
			this.setCurrentAnimation('run');
		} else if (this.dx == 0) {
			this.setCurrentAnimation('idle');
		}

		
		this.moveHorizontal(this.vx);
		this.moveVertical(this.vy);

		

		this.AABB.setPos(this.x, this.y);

		// let collided = false;

		// for (const aabb of this.game.AABBList) {
		// 	if (this.AABB.isColliding(aabb)) {
		// 		collided = true;

		// 		break;
		// 	}
		// }

		// if (!collided) {
		// 	this.vy += this.gravity;
		// } else {
		// 	this.vy = 0;
		// 	this.jumping = false;
		// }

		

	}

	private moveVertical(amount: number) {
		this.y += amount;
		this.vy += this.gravity;

		if (this.y >= 200 - 32) {
			this.vy = 0;
			this.jumping = false;
			this.y = Math.floor(this.y);
			if (amount > 0) {
				while (!(this.y <= 200 - 32))  {
					this.y -= 1;
				}
			}
		}
	}
	
	private moveHorizontal(amount: number) {
		this.x += amount;
		this.vx *= 0.9;
		
		if (this.x >= 400 - 32) {
			this.vx = 0;
			this.x = Math.floor(this.x);

			if (amount > 0) {
				while (!(this.x >= 400 - 32)){
					this.x -= 1;
				}
			}
		}
		
	}

	// private move() {

	// 	// let playerNewX = this.x + this.vx * this.dx;
	// 	// let playerNewY = this.y + this.vy;

	// 	this.x += this.vx;
	// 	this.vx *= 0.7;

	// 	this.y += this.vy;
	// 	this.vy += this.gravity;
		
	// 	// // let collision = this.game.levels[0].getTileAt(Math.floor(playerNewX), Math.floor(playerNewY)) != 0;
	// 	// // let collision = this.game.levels[0].isSolidAt(playerNewX, playerNewY));
		
	// 	// if (!this.collision(playerNewX, playerNewY)) {
	// 	// 	this.x = playerNewX;
	// 	// 	this.y = playerNewY;
	// 	// } else {
	// 	// 	this.vy = 0;
	// 	// 	this.jumping = false;
	// 	// }

		
	// 	//this.AABB.setPos(this.x + 8, this.y + 4); // THIS LINE MUST BE HERE, THE ORDER IS VERY IMPORTANT!!!!
	// }

	private collision(x: number, y: number) {
		// Collision
		let level = this.game.levels[0];

		let intx = Math.floor(x);
		let inty = Math.floor(y);

		let topLeftX: number = intx;
		let topLeftY: number = inty;

		let topRightX: number = intx + 32;
		let topRightY: number = inty;

		let bottomLeftX: number = intx;
		let bottomLeftY: number = inty + 32;

		let bottomRightX: number = intx + 32;
		let bottomRightY: number = inty + 32;

		// console.log(level.isSolidAt(topLeftX, topLeftY));
		


		// if player walking right
		// if (this.dx > 0) {
		// 	if (level.isSolidAt(topRightX, topRightY) ||
		// 		level.isSolidAt(bottomRightX, bottomRightY)) {
		// 		console.log("collided from left to right");
		// 	}
		// }

		// // if walking left
		// else {
		// 	if (level.isSolidAt(topLeftX, topLeftY) ||
		// 		level.isSolidAt(bottomLeftX, bottomLeftY)) {
		// 		console.log("collided from right to left");
		// 	}
		// }

		// // player is falling
		// if (this.vy > 0) {
		// 	if (level.isSolidAt(bottomLeftX, bottomLeftY) ||
		// 		level.isSolidAt(bottomRightX, bottomRightY)) {
		// 		// console.log("collided from up to down");
		// 		this.vy = 0;
		// 		this.jumping = false;
		// 	}
		// }

		// player is jumping
		// else {
		// 	if (level.isSolidAt(topLeftX, topLeftY) ||
		// 		level.isSolidAt(topRightX, topRightY)) {
		// 		console.log("collided from down to up");
		// 		// console.log(this.jumping)
		// 		this.vy *= -1;
		// 	}
		// }
		// console.log(topLeftX, topLeftY);
		

		// return false;
		return (level.isSolidAt(topLeftX, topLeftY) ||
		level.isSolidAt(topRightX, topRightY) ||
		level.isSolidAt(bottomLeftX, bottomLeftY) ||
		level.isSolidAt(bottomRightX, bottomRightY));
	}

	public setCurrentAnimation(name: string) {
		this.currentAnimation = name;
	}

	public render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = "green";
		ctx.fillRect(0, 200, 800, 200)
		ctx.fillRect(400, 100, 800, 200)
		this.animations[this.currentAnimation].render(ctx, this.x, this.y, (this.lastdir < 0 ? true : false));
		this.AABB.render(ctx);
	}
}