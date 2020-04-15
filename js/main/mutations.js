export default {
    addBoard(state, payload) {
        state.boards.push(payload);

        return state;
    },
    removeBoard(state, payload) {
        state.boards = state.boards.filter(x => x !== payload);

        return state;
    },
    addNode(state, payload) {
        state.nodes.push(payload);

        return state;
    },
    removeNode(state, payload) {
        state.boards = state.nodes.filter(x => x !== payload);
 
        return state;
    }
}