"use strict";
/**
 * Zone that contains elements that can be dragged (shapes).
 * Drag zone creates Dragging Objects and drops them to the appropriate Drop zones.
 * Usage: Initialize the object and store inside the DOM element (container) as `node.dragZone`.
 * @param options.container {Node} - DOM node of the zone
 * @param options.dragClone {boolean} - true if dragging clones not initial objects
 * @param options.many - true if each shape is a generator of many shapes
 * @param options.shapeSelector {string} - CSS selector to find draggable elements (by default, '.draggable')
 * @param options.manyOverrideSelector {string} - CSS selector to identify elements that are not removed from initial
 * position when placed into a pocket.
 * @param options.DragObjectConstructor {function(new:DragObject)} - constructor that implements DragObject interface
 * @constructor
 */
function DragZone(options) {
  this._id = GIDMaker(this.constructor.name);

  options.container.dragZone = this;  // save in DOM
  this._container = options.container;

  this._classes = {
    container: ['rs-dnd__dragzone'],
    shape: ['rs-dnd__shape'],
    shapeMany: ['rs-dnd__shape_many'],
    shapeNotMany: ['rs-dnd__shape_notmany']
  };

  this._dragClone = options.dragClone || false;
  this._many = options.many || false;
  this._shapeSelector = options.shapeSelector || ('.' + this._classes.shape[0]);
  this._shapeManySelector = options.shapeManySelector || ('.' + this._classes.shapeMany[0]);
  this._shapeNotManySelector = options.shapeNotManySelector || ('.' + this._classes.shapeNotMany[0]);

  this._DragObjectConstructor = DragObject;  // DragObject constructor

  /**
   * Wrapper around element being dragged.
   * @type {DragObject}
   * @private
   */
  this._dragObject = null;
  /**
   * Active drop zone - updated on mouse move.
   * @type {DropZone}
   * @private
   */
  this._dropZone = null;

  this._allowedDropZones = {};  // IDs of allowed drop zones

  this.applyClasses();
}


DragZone.prototype._onDragInit = function (e) {
  let shape = this.findShape(e);
  if (!shape) return false;

  let many = this.isMany(shape);

  this._dragObject = new this._DragObjectConstructor({shape: shape, many: many, dragClone: this._dragClone, e: e});

  return true;
};

/**
 * Returns shape element under cursor (or undefined).
 * @param e - mouse left click event
 * @returns {HTMLElement | null} - draggable element
 */
DragZone.prototype.findShape = function (e) {
  let shape = e.target.closest(this._shapeSelector);
  if(!shape) return null;

  return shape;
};

/**
 * Return true if the shape should be dragged as clone of many shapes.
 * @param shape {HTMLElement} - shape element
 * @returns {boolean}
 */
DragZone.prototype.isMany = function (shape) {
  let many = this._many;
  if (shape.matches(this._shapeManySelector)) {
    many = true;
  } else if(shape.matches(this._shapeNotManySelector)) {
    many = false;
  }

  return many;
};

DragZone.prototype._onDragStart = function (e) {
  let isAvatarCreated = this._dragObject._initAvatar();

  if (!isAvatarCreated) { // cancel dragging, could not create avatar element
    this.reset();
    return false;
  }

  return true; // avatar created successfully
};

DragZone.prototype._onDragMove = function (e) {
  let newDropZone = this._findDropZone(e);

  if(newDropZone !== this._dropZone) {  // moved to new drop zone
    // notify drop zones
    this._dropZone && this._dropZone.onDragLeave(e, this._dragObject);
    this._dropZone && this._dropZone.reset();
    newDropZone && newDropZone.onDragEnter(e, this._dragObject);
  }

  this._dropZone = newDropZone;
  this._dropZone && this._dropZone._onDragMove(e, this._dragObject);

  this._dragObject.moveTo(e.pageX, e.pageY);
};

DragZone.prototype._onDragEnd = function (e) {
  let dropZone = this._dropZone = this._findDropZone(e);
  let isDroppedToPocket = dropZone && dropZone.drop(e, this._dragObject);

  this.reset();
};

/**
 * Returns drop zone under the mouse.
 * @param e - mouse event
 * @returns {DropZone}
 * @private
 */
DragZone.prototype._findDropZone = function (e) {
  this._dragObject.hideAvatar();
  let target = document.elementFromPoint(e.clientX, e.clientY);
  this._dragObject.showAvatar();

  if (target == null) {  // possible if mouse pointer went outside the window
    return null;
  }

  while(target != document) {
    target = target.parentNode;
    if(target.dropZone) {
      // check if the found drop zone is an allowed one
      if(this._allowedDropZones && (target.dropZone._id in this._allowedDropZones)) {
        // found allowed dropZone
        break;
      }
    }
  }

  if(target === document) {
    return null;
  }

  return target.dropZone;
};

/**
 * Allow to drop shapes to the specified drop zone.
 * @param dropZone
 */
DragZone.prototype.addDropZone = function (dropZone) {
  this._allowedDropZones[dropZone._id] = true;
  return dropZone;
};

DragZone.prototype.removeDropZone = function (dropZone) {
  delete this._allowedDropZones[dropZone._id];
  return dropZone;
};

DragZone.prototype.clearDropZones = function (dropZone) {
  this._allowedDropZones = {};
};


/**
 * Abort any active dragging operation.
 */
DragZone.prototype.reset = function () {
  this._dragObject.removeAvatar();
  // restore initial element in case it was hidden
  this._dragObject.restore();
  // destroy dragging wrapper around it
  this._dragObject = null;
};


/**
 * Applies classes to the element.
 */
DragZone.prototype.applyClasses = function () {
  this._container.classList.add(...this._classes.container);

  this._container.querySelectorAll(this._shapeSelector)
    .forEach((el) => el.classList.add(...this._classes.shape));

  if(this.many) {
    this._container.querySelectorAll(this._shapeNotManySelector)
      .forEach((el) => el.classList.add(...this._classes.shapeNotMany));
  } else {
    this._container.querySelectorAll(this._shapeManySelector)
      .forEach((el) => el.classList.add(...this._classes.shapeMany));
  }
};