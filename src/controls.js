/**
 * Checks if there is an entry, if there is, returns true
 * @param {any} xs The input
 * @param {function} f The function to filter with
 * @returns True if found, false if not
 */
export function some(xs, f) {
  for (const [i, x] of xs.entries()) {
    if (f(x, i, xs)) return true;
  }
  return false;
}

/**
 * Returns the same array, but with a different instance
 * @param {array} tiles The array to clone
 * @returns The cloned array
 */
export function cloned(tiles) {
  return tiles.slice(0);
}

/**
 * Compares two arrays and compares if they are the same
 * @param {array} left Left array
 * @param {array} right Right array
 * @returns True if arrays are the same, false otherwise
 */
export function is_equal(left, right) {
  return JSON.stringify(left) == JSON.stringify(right);
}

/**
 * Merges an array up
 * @param {array} tiles The array to merge
 * @returns The items with value !== 0
 */
export function merge_up(tiles) {
  for (let i = 0; i < tiles.length - 1; ++i) {
    const current = tiles[i];
    const next = tiles[i + 1];
    if (current == next) {
      tiles[i] = current * 2;
      tiles[i + 1] = 0;
    }
  }
  return filter(tiles, (x) => x !== 0);
}

/**
 * Merges an array right
 * @param {array} tiles The array to merge
 * @returns The items with value !== 0
 */
export function merge_right(tiles) {
  for (let i = tiles.length - 1; i > 0; --i) {
    const current = tiles[i];
    const next = tiles[i - 1];
    if (current == next) {
      tiles[i] = current * 2;
      tiles[i - 1] = 0;
    }
  }
  return filter(tiles, (x) => x !== 0);
}

/**
 * Merges an array down
 * @param {array} tiles The array to merge
 * @returns The items with value !== 0
 */
export function merge_down(tiles) {
  for (let i = tiles.length - 1; i > 0; --i) {
    const current = tiles[i];
    const next = tiles[i - 1];
    if (current == next) {
      tiles[i] = current * 2;
      tiles[i - 1] = 0;
    }
  }
  return filter(tiles, (x) => x !== 0);
}

/**
 * Merges an array left
 * @param {array} tiles The array to merge
 * @returns The items with value !== 0
 */
export function merge_left(tiles) {
  for (let i = 0; i < tiles.length - 1; ++i) {
    const current = tiles[i];
    const next = tiles[i + 1];
    if (current == next) {
      tiles[i] = current * 2;
      tiles[i + 1] = 0;
    }
  }
  return filter(tiles, (x) => x !== 0);
}

/**
 * Filters an array using the provided function
 * @param {array} xs The array to filter
 * @param {function} f The function to filter with
 * @returns The filtered array
 */
export function filter(xs, f) {
  const ys = [];
  for (const [i, x] of xs.entries()) {
    if (f(x, i, xs)) {
      ys.push(x);
    }
  }
  return ys;
}

/**
 * Combines two arrays
 * @param {array} xs Left side
 * @param {array} ys Right side
 * @returns Left and right side combined
 */
export function concat(xs, ys) {
  let zs = [];
  for (const x of xs) {
    zs = [...zs, x];
  }
  for (const y of ys) {
    zs.push(y);
  }
  return zs;
}

/**
 * Moves an array up and returns if it moved
 * @param {array} tiles The tiles to move
 * @returns If it has moved
 */
export function move_up(tiles) {
  const prev = cloned(tiles);
  const size = Math.sqrt(tiles.length);
  for (let i = 0; i < size; ++i) {
    const column = filter(tiles, (_, j) => j % size == i);
    const moved = filter(column, (x) => x !== 0);
    const merged = merge_up(moved);
    const padded = concat(
      merged,
      Array.from({ length: size - merged.length }).fill(0)
    );
    for (let j = 0; j < size * size; ++j) {
      if (j % size == i) {
        tiles[j] = padded.shift();
      }
    }
  }
  return !is_equal(prev, tiles);
}

/**
 * Moves an array right and returns if it moved
 * @param {array} tiles The tiles to move
 * @returns If it has moved
 */
export function move_right(tiles) {
  const prev = cloned(tiles);
  const size = Math.sqrt(tiles.length);
  for (let i = 0; i < size; ++i) {
    const row = filter(tiles, (_, j) => Math.trunc(j / size) == i);
    const moved = filter(row, (x) => x !== 0);
    const merged = merge_right(moved);
    const padded = concat(
      Array.from({ length: size - merged.length }).fill(0),
      merged
    );
    for (let j = 0; j < size * size; ++j) {
      if (Math.trunc(j / size) == i) {
        tiles[j] = padded.shift();
      }
    }
  }
  return !is_equal(prev, tiles);
}

/**
 * Moves an array down and returns if it moved
 * @param {array} tiles The tiles to move
 * @returns If it has moved
 */
export function move_down(tiles) {
  const prev = cloned(tiles);
  const size = Math.sqrt(tiles.length);
  for (let i = 0; i < size; ++i) {
    const column = filter(tiles, (_, j) => j % size == i);
    const moved = filter(column, (x) => x !== 0);
    const merged = merge_down(moved);
    const padded = concat(
      Array.from({ length: size - merged.length }).fill(0),
      merged
    );
    for (let j = 0; j < size * size; ++j) {
      if (j % size == i) {
        tiles[j] = padded.shift();
      }
    }
  }
  return !is_equal(prev, tiles);
}

/**
 * Moves an array left and returns if it moved
 * @param {array} tiles The tiles to move
 * @returns If it has moved
 */
export function move_left(tiles) {
  const prev = cloned(tiles);
  const size = Math.sqrt(tiles.length);
  for (let i = 0; i < size; ++i) {
    const row = filter(tiles, (_, j) => Math.trunc(j / size) == i);
    const moved = filter(row, (x) => x !== 0);
    const merged = merge_left(moved);
    const padded = concat(
      merged,
      Array.from({ length: size - merged.length }).fill(0)
    );
    for (let j = 0; j < size * size; ++j) {
      if (Math.trunc(j / size) == i) {
        tiles[j] = padded.shift();
      }
    }
  }
  return !is_equal(prev, tiles);
}

/**
 * Renders the tiles within the provided HTML element
 * @param {HTMLElement} element The element to render within
 * @param {array} tiles The tiles to render
 */
export function render(element, tiles) {
  element.innerHTML = "";
  for (const x of tiles) {
    const scale = x == 0 ? 0 : Math.log2(x);
    const sat = Math.min(scale * 16, 100);
    const light = Math.max(40, 100 - sat / 2);
    element.innerHTML += `<span class="tile" style="--sat: ${sat}; --light: ${light}">${
      x == 0 ? "" : x
    }</span>`;
  }
}

/**
 * Adds a random number to the tiles. (90% : 2 && 10% : 4)
 * @param {array} tiles The current tiles
 */
export function add_number(tiles) {
  if (!some(tiles, (x) => x == 0)) return;
  const index = Math.floor(Math.random() * tiles.length);
  const number = Math.random() <= 0.9 ? 2 : 4;
  if (tiles[index] == 0) {
    tiles[index] = number;
  } else {
    add_number(tiles);
  }
}
