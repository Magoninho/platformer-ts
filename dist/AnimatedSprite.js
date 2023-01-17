var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ImageUtils from "./ImageUtils.js";
export default class AnimatedSprite {
    constructor(imagePath, tileWidth, tileHeight) {
        this.animationSpeed = 1;
        this.frame = 0;
        this.imagePath = imagePath;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.spritesheet = yield ImageUtils.loadImageFromUrl(this.imagePath);
            // finding how many cols we have for a spritesheet
            this.frameCount = this.spritesheet.width / this.tileWidth;
        });
    }
    update() {
        this.frame = (this.frame + this.animationSpeed) % this.frameCount;
    }
    render(ctx, x, y, flipped) {
        ctx.save();
        ctx.translate(x + this.tileWidth / 2, y + this.tileHeight / 2);
        ctx.scale(flipped ? -1 : 1, 1);
        ctx.drawImage(this.spritesheet, (Math.floor(this.frame)) * this.tileWidth, 0, this.tileWidth, this.tileHeight, 
        // TODO: camera offset?
        -this.tileWidth / 2, -this.tileHeight / 2, this.tileWidth, this.tileHeight);
        ctx.restore();
    }
    setAnimationSpeed(speed) {
        this.animationSpeed = speed;
    }
}
//# sourceMappingURL=AnimatedSprite.js.map