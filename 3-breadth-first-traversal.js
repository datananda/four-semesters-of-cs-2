const breadthFirstTraverse = (queue, array) => {
    // fill code in here
    while (queue.length > 0) {
        let nodeToProcess = queue.shift();
        array.push(nodeToProcess.value);
        if (nodeToProcess.left) queue.push(nodeToProcess.left);
        if (nodeToProcess.right) queue.push(nodeToProcess.right);
    }

    return array;
}

const breadthFirstTraverseRecursive = (queue, array) => {
    if (queue.length < 1) return;

    let nodeToProcess = queue.shift();
    array.push(nodeToProcess.value);
    if (nodeToProcess.left) queue.push(nodeToProcess.left);
    if (nodeToProcess.right) queue.push(nodeToProcess.right);
    breadthFirstTraverseRecursive(queue, array);

    return array;
}
  
  
//   // unit tests
//   // do not modify the below code
//   describe('tests', function() {
//     const answer = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K' ];
    
    const tree = {
      value: "A",
      left: {
        value: "B",
        left: {
          value: "D",
          left: {
            value: "G",
            left: null,
            right: null
          },
          right: null
        },
        right: {
          value: "E",
          left: null,
          right: {
            value: "H",
            left: {
              value: "K",
              left: null,
              right: null
            }
          }
        }
      },
      right: {
        value: "C",
        left: {
          value: "F",
          left: {
            value: "I",
            left: null,
            right: null
          },
          right: {
            value: "J",
            left: null,
            right: null
          }
        },
        right: null
      }
    };

console.log(breadthFirstTraverse([tree], []));
console.log(breadthFirstTraverseRecursive([tree], []));
    
//     render(tree, answer);
    
//     it('breadthFirstTraverse', () => {
//       expect(breadthFirstTraverse([tree], [])).toEqual(answer);
//     });
//   });