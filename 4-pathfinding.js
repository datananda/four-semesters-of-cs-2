// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data
// node = {
//     visited: false,
//     distance: 0
// }

const findShortestPathLength = (maze, [xA, yA], [xB, yB]) => {
    let queue = [
        {distanceFromOrigin: 0, x: xA, y: yA, comingFrom: "A"},
        {distanceFromOrigin: 0, x: xB, y: yB, comingFrom: "B"}
    ];
    let mazeHeight = maze.length;
    let mazeWidth = maze[0].length; //assumes rectangular maze
    let shortestPath;

    while (queue.length && !shortestPath) {
        let {distanceFromOrigin, x, y, comingFrom} = queue.shift();

        // if it hasn't already been visited, process it
        if (maze[y][x] === 0 || maze[y][x] === 2) {
            maze[y][x] = {
                visitedBy: comingFrom,
                distance: distanceFromOrigin
            };

            //add all adjacent, unvisited spaces to the queue
            findAdjacentSpaces([mazeWidth, mazeHeight], [x, y]).forEach(([adjX, adjY]) => {
                queue.push({distanceFromOrigin: distanceFromOrigin + 1, x: adjX, y: adjY, comingFrom});
            });
        } 
        // if it has been visited, check if it was visited by the node opposite the one we're coming from
        // if so the path is complete
        else if (maze[y][x] !== 1 && maze[y][x].visitedBy !== comingFrom) {
            shortestPath = maze[y][x].distance + distanceFromOrigin;
        }
    }

    return shortestPath;
};

const findAdjacentSpaces = ([mazeWidth, mazeHeight], [xA, yA]) => {
    let adjacentSpaces = [];

    if (yA - 1 >= 0) adjacentSpaces.push([xA, yA - 1]); //up
    if (xA + 1 < mazeWidth) adjacentSpaces.push([xA + 1, yA]); //right
    if (yA + 1 < mazeHeight) adjacentSpaces.push([xA, yA + 1]); //down
    if (xA - 1 >= 0) adjacentSpaces.push([xA - 1, yA]); //left

    return adjacentSpaces;
}

// console.log(findAdjacentSpaces([1, 1]));

  const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0]
  ];

console.log(findShortestPathLength(sixBySix, [1, 1], [2, 5]));
// // there is a visualization tool in the completed exercise
// // it requires you to shape your objects like I did
// // see the notes there if you want to use it

// // unit tests
// // do not modify the below code
// describe("pathfinding – happy path", function() {
//   const fourByFour = [
//     [2, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 2]
//   ]
//   it("should solve a 4x4 maze", () => {
//     expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
//   });

  
//   const sixBySix = [
//     [0, 0, 0, 0, 0, 0],
//     [0, 2, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0],
//     [0, 1, 1, 1, 1, 1],
//     [0, 0, 0, 0, 0, 0],
//     [0, 0, 2, 0, 0, 0]
//   ];
//   it("should solve a 6x6 maze", () => {
//     expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
//   });

//   const eightByEight = [
//     [0, 0, 1, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 1, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 1, 0, 0],
//     [0, 0, 0, 1, 0, 1, 1, 0],
//     [0, 0, 0, 0, 0, 0, 1, 0],
//     [0, 2, 0, 0, 0, 0, 1, 0],
//     [0, 0, 0, 0, 0, 0, 1, 2]
//   ];
//   it("should solve a 8x8 maze", () => {
//     expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
//   });

//   const fifteenByFifteen = [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
//     [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
//     [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,],
//     [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,],
//     [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0,],
//     [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0,],
//     [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0,],
//     [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0,],
//     [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0,],
//     [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0,],
//     [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0,],
//     [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0,],
//     [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0,],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
//   ]
//   it("should solve a 15x15 maze", () => {
//     expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(78);
//   });
// });

// // I care far less if you solve these
// // nonetheless, if you're having, solve some of the edge cases too!
// // just remove the x from xdescribe
// xdescribe("pathfinding – edge cases", function() {
//   const byEachOther = [
//     [0, 0, 0, 0, 0],
//     [0, 2, 2, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 1, 1, 1, 1],
//     [0, 0, 0, 0, 0],
//   ];
//   it("should solve the maze if they're next to each other", () => {
//     expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
//   });

//   const impossible = [
//     [0, 0, 0, 0, 0],
//     [0, 2, 0, 0, 0],
//     [0, 0, 1, 1, 1],
//     [1, 1, 1, 0, 0],
//     [0, 0, 0, 0, 2],
//   ];
//   it("should return -1 when there's no possible path", () => {
//     expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
//   });
// });
