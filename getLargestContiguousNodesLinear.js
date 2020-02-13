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
        // since I don't update parent's ancestors' childrenCount
        // (just to keep things simple)
        // I should never add a child to a non root
        console.err('parent is not a root !');
    }
    if(parent.id != child.id){
        child.parent = parent.id;
        parent.childrenCount += 1 + child.childrenCount;
    }
}

function getLargestContiguousNodesLinear(w, nodes){
    prepareNodes(nodes);
    let maxChildren = -1;
    let biggerRoot = 0;

    for(let current of nodes){
        let x = current.x;
        let y = current.y;

        let rootc = current

        if(x >= 1){
            // look left
            let other = getNode(nodes, w, x - 1, y);
            if(other.color == rootc.color){
                let rooto = getRoot(nodes, other);
                addChild(rooto, rootc);
                rootc = rooto
            }
        }

        if(y >= 1){
            // look up
            let other = getNode(nodes, w, x, y - 1);
            if(other.color == rootc.color){
                let rooto = getRoot(nodes, other);
                addChild(rooto, rootc);
                rootc = rooto
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
