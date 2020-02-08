# JavaScript-Performance-Interview-Question

[Article may be found here](https://medium.freecodecamp.org/bet-you-cant-solve-this-google-interview-question-4a6e5a4dc8ee)

[Another useful resource](https://en.wikipedia.org/wiki/Depth-first_search)

# Corrections:
The algorithm described in the article and in most files are very naive and use quadratic or more complexity. As a consequence they are very slow.
Using the right data structure for nodes you can achieve a linear complexity that make the program a lot faster.
The file [`./getLargestContiguousNodesLinear.js`](./getLargestContiguousNodesLinear.js) show how to do this.

The basic idea is to browse the array once to build relations between nodes.
The basic relation is parenting: a node have a number of child and a "pointer" to its parent.
If a node parent is itself, it is a root.
When adding a child to a parent, the parent's childrenCount is incremented.

The algorithm consist in browsing the grid left-to-right/top-to-bottom.
It the current node is of the same color as it left or top neighbors, the
"families" of the current node and the neighbors are merged: the root ancestor of `left` (or `top` or both) become a child of the root ancestor or `current`.

Once all nodes have been looked at, the size of the biffer block is the bigger `childrenCount` (of a root node) encountered + 1 (the node itself).

In [`./getLargestContiguousNodesLinear.js`](./getLargestContiguousNodesLinear.js) I browse the array twice, once to prepare nodes (adding `parent` and `childrenCount` properties) and once to find biggest block.

# Timing:
```
Grid of size 100 100
Linear: 25.788ms
size 35
addAdjacencies: 1.640s
Recursive: 427.908ms
length 35
Iterative: 708.468ms
length 35
Sequential Iterative: 913.282ms
size 35
Redux-Observable Iterative: 1.443s
count 35
Redux-Observable Sequential: 1.849s
count 35
Redux-Observable Concurrent: 902.401ms
count 35
```

```
Grid of size 200 200
Linear: 36.706ms
size 49
addAdjacencies: 18.570s
Recursive: 8.167s
length 49
Iterative: 5.427s
length 49
Sequential Iterative: 11.314s
size 49
Redux-Observable Iterative: 12.486s
count 49
Redux-Observable Sequential: 21.251s
count 49
Redux-Observable Concurrent: 4.302s
count 49
```

As you can see complexity really matter.
