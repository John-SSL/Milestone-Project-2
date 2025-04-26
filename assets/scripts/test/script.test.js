/**
 * @jest-environment jsdom
 */

const { game, addScore, newGame } = require("../script");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("game.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("Game contains correct keys", () => {
    test("Sources key exists", () => {
        expect("sources" in game).toBe(true);
    });
    test("Turns key exists", () => {
        expect("turns" in game).toBe(true);
    });
    test("correctSymbol key exists", () => {
        expect("correctSymbol" in game).toBe(true);
    });
    test("Score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("secondsLeft key exists", () => {
        expect("secondsLeft" in game).toBe(true);
    });
});

describe("Score count works correctly", () => {
    beforeAll(() => {
        game.score = 7;
        addScore();
    });
    test("Should add 1 to score", () => {
        expect(game.score).toEqual(8);
    });
});

describe ("New Game works correctly", () => {
    beforeAll(() => {
        game.score = 7;
        game.secondsLeft = 0;
        newGame();
    });
    test("Should reset the score to 0", () => {
        expect(game.score).toEqual(0);
    });
    test("Should reset the time to 60s", () => {
        expect(game.secondsLeft).toEqual(60);
    });
});