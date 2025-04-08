/**
 * Count Islands
 * By Colin Teahan on 4/8/25
 * 
 * Problem: Given an M*N Matrix containing "0"s for ocean tiles and "1"s for island tiles.
 * find all the groupings of adjacent islands (horizontally or vertically touching).
 *
 * TS Playground: https://tinyurl.com/zzzc7swc
 */
type Ocean = number[][]

enum Tiles {
    Ocean = 0,
    Island = 1
}

/**
 * Check if tile is in-bounds and an island tile.
 */
const isIsland = (ocean: Ocean, row: number, col: number) => {
    if (row < 0) return false
    if (col < 0) return false
    if (ocean[row] === undefined) return false
    if (ocean[row][col] === undefined) return false
    return ocean[row][col] === Tiles.Island
}

/**
 * Once found traverse the entire island clearing the tiles as you go,
 * this will prevent the need for a duplicate matrix and issues with
 * double counting places already visited.
 */
function walkIsland(ocean: Ocean, row: number = 0, col: number = 0) {
    if (!isIsland(ocean, row, col)) return
    ocean[row][col] = Tiles.Ocean
    walkIsland(ocean, row, col+1) // go right
    walkIsland(ocean, row+1, col) // go down
    walkIsland(ocean, row, col-1) // go left
    walkIsland(ocean, row-1, col) // go up
}

/**
 * Main function which takes an ocean matrix and returns the number of
 * distinct islands found. NOTE: This will modify the original array 
 * in-place replacing all islands with ocean tiles.
 */
function findIslands(ocean: Ocean): number {
    let totalIslands = 0;
    for (let row=0; row<ocean.length; row++) {
        let maxColumnSize = ocean[row].length
        for (let col=0; col<maxColumnSize; col++) {
            // check if island and walk entire island
            // clearing out the values
            if (isIsland(ocean, row, col)) {
                walkIsland(ocean, row, col)
                totalIslands++
            }
        }
    }
    return totalIslands
}

/*** Test Cases ***/

console.clear()

// basic 1x1 matrix
const TEST_1 = [
    [1]
]

console.log("Test #1:", findIslands(TEST_1) === 1)

// basic 2x2 matrix
const TEST_2 = [
    [1, 0], 
    [0, 1],
]

console.log("Test #2:", findIslands(TEST_2) === 2)

// basic 3x3 matrix
const TEST_3 = [
    [1, 0, 1],
    [1, 0, 0],
    [0, 0, 1]
]

console.log("Test #3:", findIslands(TEST_3) === 3)

// edge case L shape island
const TEST_4 = [
    [1, 1, 0, 0, 0],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
]

console.log("Test #4:", findIslands(TEST_4) === 4)

// edge case with one giant surrounding island
const TEST_5 = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
]

console.log("Test #5:", findIslands(TEST_5) === 1)

// edge case with no islands
const TEST_6 = [
    []
]

console.log("Test #6:", findIslands(TEST_6) === 0)

// edge case with no islands
const TEST_7 = [
    [1, 1, 1, 1, 0, 1],
    [1, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
]

console.log("Test #7:", findIslands(TEST_7) === 3)

// edge case with single square island
const TEST_8 = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
]

console.log("Test #8:", findIslands(TEST_8) === 1)

// edge case right angle islands
const TEST_9 = [
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0],
  [0, 1, 0, 0, 0],
  [1, 1, 0, 1, 1]
]

console.log("Test #8:", findIslands(TEST_9) === 5)

// edge case single spiral island
const TEST_10 = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1]
]

console.log("Test #10:", findIslands(TEST_10) === 1)

// edge case x with center box
const TEST_11 = [
  [1, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 1]
]

console.log("Test #11:", findIslands(TEST_11) === 13)
