import Component from '../lib/component.js';
import store from '../main/index.js';

import Node from './node.js'

export default class Board extends Component {

    constructor(id, parentId = 'board-holder') {

        var parent = document.getElementById(parentId);

        // Damnit js
        // https://stackoverflow.com/questions/28734628/how-can-i-set-an-attribute-with-case-sensitive-name-in-a-javascript-generated-el/28734954#28734954
        var node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        parent.appendChild(node);

        node.id = id;
        // node.setAttribute('viewBox', '0 0 100 100');
        // node.setAttribute("height", "500px");
        // node.setAttribute("width", "500px");
        // node.width = "500px";

        node.style.height = "500px";
        node.style.width = "500px";
        node.style.border = 'dashed 1px grey';
        node.setAttribute("viewBox", '0 0 100 100');

        super({
            store,
            element: document.getElementById(id)
        })

        this.selectedElement = false;
        this.selectedOffset = 0;
        this.transform = 0;

        this.makeDraggable();
    }


    render() {
        let self = this;

        // this.element.style.height = "500px";
        // this.element.style.width = "500px";

        console.log("Rendered", self);
    }

    makeDraggable = () => {

        let svg = this.element;

        svg.addEventListener('mousedown', this.startDrag);
        svg.addEventListener('mousemove', this.drag);
        svg.addEventListener('mouseup', this.endDrag);
        svg.addEventListener('mouseleave', this.endDrag);
    }

    startDrag = (event) => {
       // let self = this;

        if (event.target.classList.contains('draggable')) {
            this.selectedElement = event.target;
            this.offset = this.getMousePosition(event);
            // Get all the transforms currently on this element
            var transforms = this.selectedElement.transform.baseVal;
            // Ensure the first transform is a translate transform
            if (transforms.length === 0 ||
                transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
            // Create an transform that translates by (0, 0)
            var translate = this.element.createSVGTransform();
            translate.setTranslate(0, 0);
            // Add the translation to the front of the transforms list
            this.selectedElement.transform.baseVal.insertItemBefore(translate, 0);
            }           
            // Get initial translation amount
            this.transform = transforms.getItem(0);
            this.offset.x -= this.transform.matrix.e;
            this.offset.y -= this.transform.matrix.f;
        }
        else {

            
            this.addNode();
        }
    }
    
    drag = (event) => {
        if (this.selectedElement) {
            event.preventDefault();
            var coord = this.getMousePosition(event);
            this.transform.setTranslate(coord.x - this.offset.x, coord.y - this.offset.y);
        }
    }
    
    endDrag = (event) => {
        this.selectedElement = null;
    }
    
    getMousePosition(event) {
        //        var svg = document.getElementById('board');
    
        var CTM = this.element.getScreenCTM();
        return {
            x: (event.clientX - CTM.e) / CTM.a,
            y: (event.clientY - CTM.f) / CTM.d
        };
    } 

    addNode() {
        let pos = this.getMousePosition(event);
        // console.log();
        console.log(pos);
        let node = new Node(Math.random() * 10000, 10, 10, pos.x, pos.y, 'hotpink', 'board');

        super.updateState('addNode', node);
    }
}