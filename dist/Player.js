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
export default class Player {
    constructor(game) {
        this.x = 80;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.vx = 3;
        this.vy = 1;
        this.AABB = new AABB(32, 32);
        this.lastdir = 0;
        this.gravity = 0.2;
        this.jumping = false;
        this.currentAnimation = 'idle';
        this.character = 'PinkMan';
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
        }
        else if (this.vy > 0) {
            this.setCurrentAnimation('fall');
        }
        else if (this.dx != 0) {
            this.setCurrentAnimation('run');
        }
        else {
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
    setCurrentAnimation(name) {
        this.currentAnimation = name;
    }
    render(ctx) {
        this.animations[this.currentAnimation].render(ctx, this.x, this.y, (this.lastdir < 0 ? true : false));
        this.AABB.render(ctx);
    }
}
//# sourceMappingURL=Player.js.map