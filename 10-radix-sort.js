/*

  Implement a radix sort in a function called radixSort.
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.
  
  If you need help understanding radix sort, see https://btholt.github.io/four-semesters-of-cs-part-two/radix-sort
  
  You can visualize each iteration of bucketing and emptying of buckets by calling snapshot(array) at the end of each
  loop. It'll tell you how many iterations you've gone through where it says `Comparisons` at the top.
  
  You can see what happens with bigger numbers if you change the first unit test to be `xit(...)` and the second unit
  test to be `it`.

*/

function getDigit(number, place) {
    const str = number.toString();
    const numDigits = str.length;
    return place > numDigits ? 0 : str[numDigits - place];
}

function radixSort(array) {
    // snapshot(array);
    let queues = new Array(10);
    let maxDigits = 0;

    while (array.length) {
        let val = array.shift();
        let numDigits = val.toString().length;
        if (maxDigits < numDigits) maxDigits = numDigits;

        let digit = getDigit(val, 1);
        if (queues[digit]) {
            queues[digit].push(val);
        } else {
            queues[digit] = [val];
        }
    }
    
    queues.forEach(queue => {
        while (queue.length) {
            array.push(queue.shift());
        }
    });

    for (let i = 2; i <= maxDigits; i++) {
        while (array.length) {
            let val = array.shift();
            let digit = getDigit(val, i);
            if (queues[digit]) {
                queues[digit].push(val);
            } else {
                queues[digit] = [val];
            }
        }
        
        queues.forEach(queue => {
            while (queue.length) {
                array.push(queue.shift());
            }
        });
    }

    return array;
}

console.log(radixSort([20, 51, 3, 801, 415]));
  
//   // unit tests
//   // do not modify the below code
//   describe("radix sort", function() {
//     it("should sort correctly", () => {
//       const nums = [20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34, 3000, 3001, 1200, 633];
//       const ans = radixSort(nums);
//       expect(ans).toEqual([1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944, 1200, 1244, 3000, 3001]);
//       done();
//     });
//     xit("should sort correctly", () => {
//       const fill = 99;
//       const nums = new Array(fill).fill().map(() => Math.floor(Math.random() * 500000));
//       const ans = radixSort(nums);
//       expect(ans).toEqual(_.sortBy(nums));
//       done();
//     });
//   });
  