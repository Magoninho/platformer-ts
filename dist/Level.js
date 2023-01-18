var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CollisionBlock from "./CollisionBlock.js";
import ImageUtils from "./ImageUtils.js";
import TileSet from "./TileSet.js";
export default class Level {
    constructor(imagePath, map) {
        this.name = "Pink World";
        this.collisionBlocks = new Array(1000).fill(0);
        this.imagePath = imagePath;
        this.map = map;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.tileset = new TileSet((yield ImageUtils.loadImageFromUrl(this.imagePath)), 16, 2); // TODO: test scale later
            // setup collision blocks
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 100; j++) {
                    if (this.getTileID(j, i) != 0)
                        this.collisionBlocks[j + (i * 100)] = new CollisionBlock(j * 32, i * 32, 32);
                }
            }
        });
    }
    getTileID(x, y) {
        return this.map[x + (y * 100)];
    }
    render(ctx) {
        // this.tileset.renderTileById(ctx, 216, 0, 0);
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 100; j++) {
                let tileID = this.getTileID(j, i);
                this.tileset.renderTileById(ctx, tileID, j * 32, i * 32);
                if (this.getTileID(j, i) != 0)
                    this.collisionBlocks[j + (i * 100)].renderCollision(ctx);
            }
        }
    }
    getTileAt(x, y) {
        let col = Math.floor(x / 32);
        let row = Math.floor(y / 32);
        return this.map[col + (row * 100)];
    }
    isSolidAt(x, y) {
        let col = Math.floor(x / 32);
        let row = Math.floor(y / 32);
        // if it is different from 0, then it is solid
        if (this.map[col + (row * 100)] === undefined)
            return true;
        return (this.map[col + (row * 100)] != 0);
    }
    getCollisionBlocks() {
        return this.collisionBlocks;
    }
}
//# sourceMappingURL=Level.js.map