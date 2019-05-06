"use strict";

/**
 * Zone that contains pockets that can accept shapes.
 * Usage: Initialize the object and store inside the DOM element (container) as `node.dropZone`.
 * @param options.container {Node} - DOM node of the zone
 * @param options.droppableSelector {string} - CSS selector to find pockets
 * @constructor
 */
function DropZone(options) {
  this._id = GIDMaker(this.constructor.name);

  options.container.dropZone = this;  // save in DOM

  this._classes = {
    container: ['rs-dnd__dropzone'],
    pocket: ['rs-dnd__pocket'],
    pocketHighlight: ['rs-dnd__pocket_active']
  };

  this._container = options.container;
  this._pocketSelector = options.pocketSelector || '.' + this._classes.pocket[0];

  this._pocket = null; // active pocket
  this._onDragEndCallback = options.onDragEndCallback || undefined;

  this.applyClasses();
}

/**
 * Drop dragObject onto a dropZone.
 * @param e {event} - source mouse event
 * @param dragObject {DragObject}
 * @returns {boolean} - true if dropZone accepted the object, false otherwise
 */
DropZone.prototype.drop = function (e, dragObject) {
  let pocket = this._findPocket(e, dragObject);

  if (!pocket) {
    this.onDragCancel(e, dragObject);
    this.reset();
    return false;
  } else {
    this.onDragEnd(e, dragObject, pocket);
    this.reset();
    return true;
  }
};


DropZone.prototype._findPocket = function (e, dragObject) {
  let target = e.target;

  while (target !== document && !target.matches(this._pocketSelector)) {
    if(target === this._container) break;
    target = target.parentNode;
  }

  if (target === document || target === this._container) {
    return null;
  }

  return target;
};


/**
 * Drag object entered the drop zone.
 * @param e - mouse event
 * @param dragObject {DragObject}
 */
DropZone.prototype.onDragEnter = function (e, dragObject) {
};

/**
 * Drag object leaved the drop zone.
 * @param e - mouse event
 * @param dragObject {DragObject}
 */
DropZone.prototype.onDragLeave = function (e, dragObject) {
};

/**
 * No pocket found. Dragging is cancelled.
 * @param e - mouse event
 * @param dragObject {DragObject}
 */
DropZone.prototype.onDragCancel = function (e, dragObject) {
};

/**
 * Place the element inside of the pocket.
 * @param e - mouse event
 * @param dragObject {DragObject}
 * @param pocket
 */
DropZone.prototype.onDragEnd = function (e, dragObject, pocket) {
  this._onDragEndCallback && this._onDragEndCallback.apply(this, arguments);
};


DropZone.prototype._onDragMove = function (e, dragObject) {
  let newPocket = this._findPocket(e, dragObject);

  if(newPocket !== this._pocket) {  // moved out of an active pocket
    newPocket && this.highlightPocket(newPocket);
    this._pocket && this.deHighlightPocket(this._pocket);
  }

  this._pocket = newPocket;
};


/**
 * Highlight the active pocket.
 * @param pocket
 */
DropZone.prototype.highlightPocket = function (pocket) {
  pocket.classList.add(...this._classes.pocketHighlight);
};

/**
 * Cancel highlighting on the active pocket.
 * @param pocket
 */
DropZone.prototype.deHighlightPocket = function (pocket) {
  pocket.classList.remove(...this._classes.pocketHighlight);
};


DropZone.prototype.reset = function () {
  this._pocket && this.deHighlightPocket(this._pocket);
  this._pocket = null;
};


/**
 * Applies classes to the element.
 */
DropZone.prototype.applyClasses = function () {
  this._container.classList.add(...this._classes.container);

  this._container.querySelectorAll(this._pocketSelector)
    .forEach((el) => el.classList.add(...this._classes.pocket));
};