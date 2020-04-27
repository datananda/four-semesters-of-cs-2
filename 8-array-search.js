// for both exercises, the id of the object you're searching for is given to you
// as integer. return the whole object that you're looking for
// 
// it's up to you what to return if the object isn't found (we're not testing that)

function linearSearch(id, array) {
    // code goes here
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) return array[i];
    }

    return -1;
}
  
function binarySearch(id, array) {
    // code goes here
    let found = false;
    let minIndex = 0;
    let maxIndex = array.length - 1;
    let middleIndex = Math.floor((maxIndex - minIndex) / 2); // 0,1,2,3

    while (minIndex <= maxIndex) {
        if (array[middleIndex].id === id) return array[middleIndex];
        if (array[middleIndex].id > id) { // subdivide left
            maxIndex = middleIndex;
        } else { // subdivide right
            minIndex = middleIndex + 1;
        }
        middleIndex = minIndex + Math.floor((maxIndex - minIndex) / 2);
    }

    return -1;
}

console.log(binarySearch(23, [
          { id: 1, name: "Sam" }, //0 
          { id: 3, name: "Sarah" }, //1
          { id: 5, name: "John" }, //2
          { id: 6, name: "Burke" }, //3
          { id: 10, name: "Simona" }, //4
          { id: 12, name: "Asim" }, //5
          { id: 13, name: "Niki" }, //6 
          { id: 15, name: "Aysegul" }, //7
          { id: 17, name: "Kyle" }, //8
          { id: 18, name: "Jem" }, //9
          { id: 19, name: "Marc" }, //10 
          { id: 21, name: "Chris" }, //11 <-
          { id: 23, name: "Brian" }, //12 <-
          { id: 24, name: "Ben" } //13 <-
        ]));
  
//   // unit tests
//   // do not modify the below code
//   describe("linear search", function() {
//     it("should find an object on an unsorted array", () => {
//       const lookingFor = { id: 5, name: "Brian" };
//       expect(
//         linearSearch(5, [
//           { id: 1, name: "Sam" },
//           { id: 11, name: "Sarah" },
//           { id: 21, name: "John" },
//           { id: 10, name: "Burke" },
//           { id: 13, name: "Simona" },
//           { id: 31, name: "Asim" },
//           { id: 6, name: "Niki" },
//           { id: 19, name: "Aysegul" },
//           { id: 25, name: "Kyle" },
//           { id: 18, name: "Jem" },
//           { id: 2, name: "Marc" },
//           { id: 51, name: "Chris" },
//           lookingFor,
//           { id: 14, name: "Ben" }
//         ])
//       ).toBe(lookingFor);
//     });
//   });
  
//   describe("binary search", function() {
//     it("should test things", () => {
//       const lookingFor = { id: 23, name: "Brian" };
//       expect(
//         binarySearch(23, [
//           { id: 1, name: "Sam" },
//           { id: 3, name: "Sarah" },
//           { id: 5, name: "John" },
//           { id: 6, name: "Burke" },
//           { id: 10, name: "Simona" },
//           { id: 12, name: "Asim" },
//           { id: 13, name: "Niki" },
//           { id: 15, name: "Aysegul" },
//           { id: 17, name: "Kyle" },
//           { id: 18, name: "Jem" },
//           { id: 19, name: "Marc" },
//           { id: 21, name: "Chris" },
//           lookingFor,
//           { id: 24, name: "Ben" }
//         ])
//       ).toBe(lookingFor);
//     });
//   });
  