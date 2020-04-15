var showContextMenu = false;

// http://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/
var selectedElement = false;
var selectedOffset;
var transform;
var svg = document.getElementById('board');

makeDraggable = () => {
//    let svg = board.svg;
    console.log(svg);
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);
}

startDrag = (event) => {
    if (event.target.classList.contains('draggable')) {
        selectedElement = event.target;
        offset = getMousePosition(event);
        // Get all the transforms currently on this element
        var transforms = selectedElement.transform.baseVal;
        // Ensure the first transform is a translate transform
        if (transforms.length === 0 ||
            transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
        // Create an transform that translates by (0, 0)
        var translate = svg.createSVGTransform();
        translate.setTranslate(0, 0);
        // Add the translation to the front of the transforms list
        selectedElement.transform.baseVal.insertItemBefore(translate, 0);
        }
        // Get initial translation amount
        transform = transforms.getItem(0);
        offset.x -= transform.matrix.e;
        offset.y -= transform.matrix.f;
    }
}

drag = (event) => {
    if (selectedElement) {
        event.preventDefault();
        var coord = getMousePosition(event);
        transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
    }
}

endDrag = (event) => {
    selectedElement = null;
}

function getMousePosition(event) {
    //        var svg = document.getElementById('board');

    var CTM = svg.getScreenCTM();
    return {
        x: (event.clientX - CTM.e) / CTM.a,
        y: (event.clientY - CTM.f) / CTM.d
    };
}