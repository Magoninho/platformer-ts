var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import InputHandler from "./InputHandler.js";
import Level from "./Level.js";
import Player from "./Player.js";
import { map1 } from "./Data/Map.js";
export default class Game {
    constructor() {
        this.ctx = document.getElementById('game-canvas').getContext('2d');
        this.inputHandler = new InputHandler();
        this.player = new Player(this);
        this.levels = [
            new Level("assets/PixelAdventure/Terrain/terrain.png", map1)
        ];
        this.AABBList = [];
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.player.init();
            yield this.levels[0].init();
            // this.ctx.scale(2, 2);
            for (const b of this.levels[0].getCollisionBlocks()) {
                if (b) {
                    this.AABBList.push(b.getAABB());
                }
            }
            this.ctx.imageSmoothingEnabled = false; // this is the best line ever
            this.run();
        });
    }
    // game loop
    run() {
        this.update();
        this.render(this.ctx);
        // Request to do this again ASAP
        requestAnimationFrame(this.run.bind(this));
    }
    update() {
        this.player.update();
    }
    render(ctx) {
        ctx.clearRect(0, 0, 800, 600);
        this.player.render(ctx);
        // ctx.restore();
        this.levels[0].render(ctx);
    }
}
//# sourceMappingURL=Game.js.map