function prepareNodes(nodes){
    for(let node of nodes){
        node.color  = node.colorId;
        node.parent = node.id;
        node.childrenCount = 0;
    }
}

function getNode(nodes, w, x, y){
    return nodes[x + y * w];
}

function getParent(nodes, node){
    if(node.id == node.parent){
        return node;
    } else {
        return nodes[node.parent];
    }
}

function getRoot(nodes, node){
    let current = node;
    while(current.parent != current.id){
        current = getParent(nodes, current);
    }
    return current;
}

function addChild(parent, child){
    if(parent.parent != parent.id){
        // since I don't update parent patent's childrenCount
        // (just to keep things simple)
        // I should never add a child to a non root
        console.err('parent is not a root !');
    }
    child.parent = parent.id;
    parent.childrenCount += 1 + child.childrenCount;
}

function getLargestContiguousNodesLinear(w, nodes){
    prepareNodes(nodes);
    let maxChildren = -1;
    let biggerRoot = 0;

    for(let current of nodes){
        let rootc = getRoot(nodes, current);

        let x = current.x;
        let y = current.y;

        if(x > 1){
            let other = getNode(nodes, w, x - 1, y);
            if(other.color == current.color){
                let rooto = getRoot(nodes, other);
                if(rooto.id != rootc.id){
                    addChild(rootc, rooto);
                }
            }
        }

        if(y > 1){
            let other = getNode(nodes, w, x, y - 1);
            if(other.color == current.color){
                let rooto = getRoot(nodes, other);
                if(rooto.id != rootc.id){
                    addChild(rootc, rooto);
                }
            }
        }

        if(maxChildren < rootc.childrenCount){
            maxChildren = rootc.childrenCount;
            biggerRoot = rootc.id;
        }
    }
    return nodes[biggerRoot];
}

module.exports = getLargestContiguousNodesLinear;
