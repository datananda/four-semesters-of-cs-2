/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
  
  If you want to visualize your algorithm, call snapshot(<your array>) at the end of your heapify. The comparisons number will probably
  be a bit skewed but it's meant to be an approximation.
  
  
*/

const heapSort = array => {
    let heap = createMaxHeap(array);

    for (let i = heap.length - 1; i > 0; i--) {
        let lastVal = heap[i];
        heap[i] = heap[0];
        heap[0] = lastVal;
        heapify(heap, 0, i);
    }

    return heap;
  };
  
const createMaxHeap = array => {
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
        array = heapify(array, i, array.length);
    }

    return array;
};
  
const heapify = (array, index, heapSize) => {
    let parentVal = array[index];
    let leftChildIndex = 2 * index + 1;
    let rightChildIndex = 2 * index + 2;
    let maxVal = parentVal;
    let maxIndex = index;
        
    if (leftChildIndex < heapSize && array[leftChildIndex] > maxVal) { // is left child larger
        maxIndex = leftChildIndex;
        maxVal = array[leftChildIndex];
    }

    if (rightChildIndex < heapSize && array[rightChildIndex] > maxVal) { // is right child larger
        maxIndex = rightChildIndex;
        maxVal = array[rightChildIndex];
    }

    if (maxIndex !== index) { // if either child is larger, swap
        array[index] = maxVal;
        array[maxIndex] = parentVal;
        heapify(array, maxIndex, heapSize);
    }

    return array;
};

console.log(heapSort([2, 5, 3, 8, 10, 6, 4, 7, 9, 1]));
  
//   // unit tests
//   // do not modify the below code
//   describe("heap sort", function() {
//     // only one of these can run at a time due to how I implemented it D:
//     // the first one is the real test, the second is just to see what it looks like on a large scale
  
//     it("should sort correctly", () => {
//       const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
//       heapSort(nums);
//       expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//       done();
//     });
//     xit("should sort correctly", () => {
//       const fill = 50;
//       const nums = _.shuffle(new Array(fill).fill().map((_, index) => index + 1));
//       heapSort(nums);
//       expect(nums).toEqual(new Array(fill).fill().map((_, index) => index + 1));
//       done();
//     });
//   });
  