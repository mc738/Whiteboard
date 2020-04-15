import store from './main/index.js';

import Board from './components/board.js';
import Node from './components/node.js';

// let board = 

// let node1 = new Node('node-1', 10, 10, 10, 10, 'hotpink', 'board');

// let node2 = new Node('node-2', 10, 10, 50, 50, 'blue', 'board');




store.dispatch('addBoard', new Board('board','board-holder'));
// store.dispatch('addBoard', board);
store.dispatch('addNode', new Node('node-1', 10, 10, 10, 10, 'hotpink', 'board'));

store.dispatch('addNode', new Node('node-2', 10, 10, 50, 50, 'blue', 'board'));

console.log(store);
