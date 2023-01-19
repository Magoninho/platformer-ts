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
function intersects(rect1, rect2) {
    return (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y);
}
function lerp(v0, v1, t) {
    return v0 + t * (v1 - v0);
}
export default class Player {
    constructor(game) {
        this.rect = {
            x: 80,
            y: 0,
            width: 32,
            height: 32
        };
        this.dx = 0;
        this.vx = 0;
        this.vy = 1;
        this.AABB = new AABB(this.rect.x, this.rect.y, this.rect.width, this.rect.height, 10, 8, 16, 8);
        this.lastdir = 0;
        this.gravity = 0.2;
        this.jumping = false;
        this.currentAnimation = 'idle';
        this.character = 'Virtual Guy';
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
            console.log(this.game.AABBList);
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
        this.rect.x += this.vx;
        this.vx = lerp(this.vx, 0, 0.15);
        this.AABB.setPos(this.rect.x, this.rect.y);
        this.checkHorizontalCollisions();
        this.rect.y += this.vy;
        this.vy += this.gravity;
        this.AABB.setPos(this.rect.x, this.rect.y);
        this.checkVerticalCollisions();
        this.AABB.setPos(this.rect.x, this.rect.y);
    }
    checkHorizontalCollisions() {
        let level = this.game.levels[0];
        for (const tile of this.game.AABBList) {
            if (this.AABB.isColliding(tile)) {
                if (this.vx > 0) {
                    this.vx = 0;
                    // some math to figure out where the rect x have to be
                    this.rect.x = Math.floor(tile.rect.x - (this.AABB.cropx + this.AABB.rect.width));
                }
                if (this.vx < 0) {
                    this.vx = 0;
                    this.rect.x = Math.floor(tile.rect.x + tile.rect.width - this.AABB.cropx);
                }
                break;
            }
        }
    }
    checkVerticalCollisions() {
        for (const tile of this.game.AABBList) {
            if (this.AABB.isColliding(tile)) {
                if (this.vy > 0) {
                    this.vy = 0;
                    this.rect.y = Math.floor(tile.rect.y - (this.AABB.cropy + this.AABB.rect.height));
                    this.jumping = false;
                }
                if (this.vy < 0) {
                    this.vy = 0;
                    this.rect.y = Math.floor(tile.rect.y + tile.rect.height - this.AABB.cropy);
                }
                break;
            }
        }
    }
    setCurrentAnimation(name) {
        this.currentAnimation = name;
    }
    render(ctx) {
        ctx.fillStyle = "green";
        this.animations[this.currentAnimation].render(ctx, this.rect.x, this.rect.y, (this.lastdir < 0 ? true : false));
        // this.AABB.render(ctx);
    }
}
//# sourceMappingURL=Player.js.map