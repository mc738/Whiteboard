import Component from '../lib/component.js';
import store from '../main/index.js';

export default class Node extends Component {

    constructor(id, height = 0, width = 0, x = 0, y = 0, fill = '', parentId = '') {

        // this.height = height;
        // this.width = width;
        // this.x = x;
        // this.y = y;
        // this.fill = fill;

        let parent = document.getElementById(parentId);

        var node = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        node.style.x = x;
        node.style.y = y;
        node.style.height = height + "%";
        node.style.width = width + "%";
        node.style.fill = fill;
        node.classList.add('draggable');
        node.id = id;

        parent.appendChild(node);

        super({
            store,
            element: document.getElementById(id)
        }) 
    }


    render() {
        let self = this;

        console.log(self);
    }
}