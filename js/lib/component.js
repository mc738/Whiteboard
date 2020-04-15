import Store from '../main/store.js';

export default class Component {
    constructor(props ={}) {
        let self = this;

        this.render = this.render || function() {};

        if (props.store instanceof Store) {
            props.store.events.subscribe('stateChanged', () => self.render());

            this.store = props.store;
        }

        if (props.hasOwnProperty('element')) {
            this.element = props.element;
        }
    }

    updateState(action, payload) {
        this.store.dispatch(action, payload);
    }
}

