import {
  add_number,
  move_down,
  move_left,
  move_right,
  move_up,
  render,
  some,
} from "./controls";

export default class GameController {
  /**
   * Initializes and listens to all user inputs
   * @param {HTMLElement} element The element to listen to
   * @param {array} tiles The tiles
   */
  constructor(element, tiles) {
    this.element = element;
    this.tiles = tiles;

    this.keydownHandler = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (move_up(this.tiles)) {
            render(this.element, this.tiles);
            if (this.is_win(this.tiles)) {
              document.removeEventListener(eventName, handler);
              return;
            }
            add_number(this.tiles);
            render(this.element, this.tiles);
          } else if (this.is_lose(this.tiles)) {
            document.removeEventListener(eventName, handler);
          }
          return;
        case "ArrowRight":
          if (move_right(this.tiles)) {
            render(this.element, this.tiles);
            if (this.is_win(this.tiles)) {
              document.removeEventListener("keydown", this.keydownHandler);
              return;
            }
            add_number(this.tiles);
            render(this.element, this.tiles);
          } else if (this.is_lose(this.tiles)) {
            document.removeEventListener("keydown", this.keydownHandler);
          }
          return;
        case "ArrowDown":
          if (move_down(this.tiles)) {
            render(this.element, this.tiles);
            if (this.is_win(this.tiles)) {
              document.removeEventListener("keydown", this.keydownHandler);
              return;
            }
            add_number(this.tiles);
            render(this.element, this.tiles);
          } else if (this.is_lose(this.tiles)) {
            document.removeEventListener("keydown", this.keydownHandler);
          }
          return;
        case "ArrowLeft":
          if (move_left(this.tiles)) {
            render(this.element, this.tiles);
            if (this.is_win(this.tiles)) {
              document.removeEventListener("keydown", this.keydownHandler);
              return;
            }
            add_number(this.tiles);
            render(this.element, this.tiles);
          } else if (this.is_lose(this.tiles)) {
            document.removeEventListener("keydown", this.keydownHandler);
          }
          return;
        default:
      }
    };
    document.addEventListener("keydown", this.keydownHandler);
  }

  /**
   * Checks if the player can move, if not - ends the game
   * @param {array} tiles The tiles
   * @returns If the player has lost
   */
  is_lose(tiles) {
    if (some(tiles, (x) => x == 0)) return false;
    const message = document.querySelector(".message");
    message.innerHTML = "you lose!";
    message.classList.remove("hidden");
    return true;
  }


    /**
   * Checks if tiles have "2048", ends game if it does
   * @param {array} tiles The tiles
   * @returns If the player has won
   */
  is_win(tiles) {
    if (!some(tiles, (x) => x == 2048)) return false;
    const message = document.querySelector(".message");
    message.innerHTML = "you win!";
    message.classList.remove("hidden");
    return true;
  }
}
