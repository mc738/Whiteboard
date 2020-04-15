import PubSub from '../lib/pubsub.js';

export default class Store {
    constructor(params) {
        let self = this;
        self.actions = {};
        self.mutations = {};
        self.state = {};
        self.status = 'resting';
        
        self.events = new PubSub();

        if (params.hasOwnProperty('actions')) {
            self.actions = params.actions;  
        }

        if (params.hasOwnProperty('mutations')) {
            self.mutations = params.mutations;
        }

        //console.log(params);

        self.state = new Proxy((params.state || {}),  {
            set: function(state, key, value) {
                state[key] = value;

                // debugger;
                console.log(`State Changed: ${key}:${value}`);

                self.events.publish('stateChanged', self.state);

                if (self.status !== 'mutation') {
                    console.warn(`You should use a mutation to set ${key}`);
                }

                self.status = 'resting';

                return true;
            }
        });
    }

    dispatch(actionKey, payload) {
        let self = this;

        //console.log(self);

        if (typeof self.actions[actionKey] !== 'function') {
            console.error(`Action '${actionKey}' doesn't exist`);
            return false;
        }

        console.groupCollapsed(`ACTION: ${actionKey}`);

        self.status = 'action';

        self.actions[actionKey](self, payload);

        console.groupEnd();

        return true;
    }

    commit(mutationKey, payload) {
        let self = this;

        if (typeof self.mutations[mutationKey] !== 'function') {
            console.log(`Mutation '${mutationKey}' doens't exist`);
            return false;
        }

        self.status = 'mutation';

        let newState = self.mutations[mutationKey](self.state, payload);

        // check for differences and make a new state



        if (mutationKey.indexOf('Board') > -1)
            self.state.boards = Object.assign(self.state.boards, newState.boards);

        if (mutationKey.indexOf('Node')  > -1)
            self.state.nodes = Object.assign(self.state.nodes, newState.nodes);

        return true;
    }


}