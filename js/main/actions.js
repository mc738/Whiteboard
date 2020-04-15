export default {   
    addBoard(context, payload) {
        context.commit('addBoard', payload);
    },
    removeBoard(context, payload) {
        context.commit('removeBoard', payload);
    },
    addNode(context, payload) {
        context.commit('addNode', payload);
    }, 
    removeNode(context, payload) {
        context.commit('removeNode', payload);
    }
}