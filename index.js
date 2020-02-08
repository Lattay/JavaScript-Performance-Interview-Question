const addAdjacencies = require('./addAdjacencies')
const generateNodes = require('./generateNodes')
const getLargestContiguousNodesIterativeRandom = require('./getLargestContiguousNodesIterativeRandom')
const getLargestContiguousNodesIterativeSequential = require('./getLargestContiguousNodesIterativeSequential')
const getLargestContiguousNodesObservableConcurrent = require('./getLargestContiguousNodesObservableConcurrent')
const getLargestContiguousNodesObservableSequential = require('./getLargestContiguousNodesObservableSequential')
const getLargestContiguousNodesObservableRandom = require('./getLargestContiguousNodesObservableRandom')
const getLargestContiguousNodesRecursive = require('./getLargestContiguousNodesRecursive')
const getLargestContiguousNodesLinear = require('./getLargestContiguousNodesLinear');

function benchmark(w, h){
    console.log('Grid of size', w, h)
    const raw_nodes = generateNodes({numberOfColumns: w, numberOfRows: h})



    console.time('Linear')
    const largestContiguousNodesLinear = getLargestContiguousNodesLinear(w, raw_nodes)
    console.timeEnd('Linear')
    console.log('size', 1 + largestContiguousNodesLinear.childrenCount)

    console.time('addAdjacencies')
    const nodes = addAdjacencies(raw_nodes)
    console.timeEnd('addAdjacencies')

    console.time('Recursive')
    const largestContiguousNodesRecursive = (
        getLargestContiguousNodesRecursive(
            nodes,
        )
    )
    console.timeEnd('Recursive')
    console.log('length', largestContiguousNodesRecursive.length || 1)

    console.time('Iterative')
    const largestContiguousNodesIterative = (
        getLargestContiguousNodesIterativeRandom(
            nodes,
        )
    )
    console.timeEnd('Iterative')
    console.log('length', largestContiguousNodesIterative.length || 1)

    console.time('Sequential Iterative')
    const largestContiguousNodesSequentialIterative = (
        getLargestContiguousNodesIterativeSequential(
            nodes,
        )
    )
    console.timeEnd('Sequential Iterative')
    console.log('size', largestContiguousNodesSequentialIterative.size || 1)

    getLargestContiguousNodesObservableRandom(
        nodes,
    )
    .subscribe(() => {
        getLargestContiguousNodesObservableSequential(
            nodes,
        )
        .subscribe(() => {
            getLargestContiguousNodesObservableConcurrent(
                nodes,
            )
        })
    })
}

benchmark(100, 100)
