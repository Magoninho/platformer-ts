var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AABB from "./AABB.js";
import AnimatedSprite from "./AnimatedSprite.js";
function lerp(v0, v1, t) {
    return v0 + t * (v1 - v0);
}
export default class Player {
    constructor(game) {
        this.x = 300;
        this.y = 100;
        this.dx = 0;
        this.vx = 0;
        this.vy = 1;
        this.AABB = new AABB(0, 0, 32, 32);
        this.lastdir = 0;
        this.gravity = 0.2;
        this.jumping = false;
        this.currentAnimation = 'idle';
        this.character = 'PinkMan';
        this.collisionType = 'none';
        this.horizontal_speed = 0.3;
        this.game = game;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield this.animations[animation].init();
                this.animations[animation].setAnimationSpeed(0.3);
            }
        });
    }
    update() {
        this.dx = 0;
        // update animations
        for (const animation in this.animations) {
            this.animations[animation].update();
        }
        if (this.game.inputHandler.isDown(37)) { // left
            this.dx = -1;
            // this.vx = Math.max(this.vx - this.horizontal_speed, -3);
            this.vx += -0.5;
            this.lastdir = -1;
        }
        else if (this.game.inputHandler.isDown(39)) { // right
            this.dx = 1;
            // this.vx = Math.min(this.vx + this.horizontal_speed, 3);
            this.vx += 0.5;
            this.lastdir = 1;
        }
        if (this.game.inputHandler.isDown(38)) { // up
            if (!this.jumping) {
                this.jumping = true;
                this.vy = -6;
            }
        }
        // console.log(this.vx);
        if (this.vy < 0) {
            this.setCurrentAnimation('jump');
        }
        else if (this.vy > 0 && this.jumping) {
            this.setCurrentAnimation('fall');
        }
        else if (this.dx != 0) {
            this.setCurrentAnimation('run');
        }
        else if (this.dx == 0) {
            this.setCurrentAnimation('idle');
        }
        // next player position
        let playerNewX = this.x + this.vx;
        let playerNewY = this.y + this.vy;
        let level = this.game.levels[0];
        let intx = Math.floor(playerNewX);
        let inty = Math.floor(playerNewY);
        let topLeftX = playerNewX;
        let topLeftY = playerNewY;
        let topRightX = playerNewX + 32;
        let topRightY = playerNewY;
        let bottomLeftX = playerNewX;
        let bottomLeftY = playerNewY + 32;
        let bottomRightX = playerNewX + 32;
        let bottomRightY = playerNewY + 32;
        // going right
        if (this.vx > 0) {
            if (level.isSolidAt(playerNewX + 32, playerNewY) ||
                level.isSolidAt(playerNewX + 32, playerNewY + 30)) {
                playerNewX = Math.floor(playerNewX); // floored position
                this.vx = 0;
            }
        }
        else if (this.vx < 0) {
            // moving left
            if (level.isSolidAt(playerNewX, playerNewY) ||
                level.isSolidAt(playerNewX, playerNewY + 30)) {
                playerNewX = Math.floor(playerNewX) + 1;
                this.vx = 0;
            }
        }
        // falling
        if (this.vy > 0) {
            if (level.isSolidAt(playerNewX, playerNewY + 32) ||
                level.isSolidAt(playerNewX + 30, playerNewY + 32)) {
                playerNewY = Math.floor(playerNewY);
                this.vy = 0;
                this.jumping = false;
            }
        }
        else if (this.vy < 0) {
            if (level.isSolidAt(playerNewX + 30, playerNewY) ||
                level.isSolidAt(playerNewX, playerNewY)) {
                playerNewY = Math.floor(playerNewY) + 1;
                this.vy = 0;
            }
        }
        this.x = playerNewX;
        this.y = playerNewY;
        this.vx = lerp(this.vx, 0, 0.1);
        this.vy += this.gravity;
        // this.AABB.setPos(this.x, this.y);
        // console.log(this.collision(this.x, this.y))
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
    handleCollisions(x, y) {
        // Collision
        let level = this.game.levels[0];
        let intx = Math.floor(x);
        let inty = Math.floor(y);
        let topLeftX = intx;
        let topLeftY = inty;
        let topRightX = intx + 32 - 1;
        let topRightY = inty;
        let bottomLeftX = intx;
        let bottomLeftY = inty + 32 - 1;
        let bottomRightX = intx + 32 - 1;
        let bottomRightY = inty + 32 - 1;
        // console.log(level.isSolidAt(topLeftX, topLeftY));
        // going right
        if (this.vx > 0) {
            if (level.isSolidAt(topRightX, topRightY) ||
                level.isSolidAt(bottomRightX, bottomRightY)) {
                this.x = 12;
            }
        }
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
    setCurrentAnimation(name) {
        this.currentAnimation = name;
    }
    render(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(0, 200, 800, 200);
        ctx.fillRect(400, 100, 800, 200);
        this.animations[this.currentAnimation].render(ctx, this.x, this.y, (this.lastdir < 0 ? true : false));
        this.AABB.render(ctx);
    }
}
//# sourceMappingURL=Player.js.map