import GameController from "./controller";
import { render, add_number } from "./controls";

export default class Game {
  /**
   * Starts the game, generates and sets random tiles
   */
  start() {
    // generates random tiles
    const [element, tiles] = this.generateTiles();

    // adds "2" to 2 random tiles
    add_number(tiles);
    add_number(tiles);

    // renders the tiles
    render(element, tiles);

    // initializes the game controller, which handles all the user inputs       
    new GameController(element, tiles);
  }

  // handles generating a random tile
  generateTiles() {
    let size = 4; // tiles size
    const element = document.querySelector(".tiles"); // selects all the tiles
    element.style.setProperty("--size", size); // adds a property "--size" to all tiles
    const tiles = Array.from({ length: size * size }).fill(0); // constructs an array from the tiles, and feels the other ones with 0
    return [element, tiles]; // returns all the shinanigins
  }
}
