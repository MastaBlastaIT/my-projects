"use strict";

/**
 * Object being dragged (aka shape object).
 * @param options.shape {Node} - DOM element of the initial shape.
 * @param options.dragClone {boolean} - true if dragging clones not initial objects
 * @param options.many - true if each shape is a generator of many shapes
 * @param options.e {Event} - mouse click event that created a draggable object
 * @constructor
 */
function DragObject(options) {
  this._id = GIDMaker(this.constructor.name);

  this._classes = {
    avatar: ['rs-dnd__avatar']
  };

  this.downX = options.e.pageX;
  this.downY = options.e.pageY;
  this.shape = options.shape;
  this.many = options.many;
  this.dragClone = options.dragClone || options.many;  // if many shapes, always drag clones

  this.avatar = null;  // avatar is a representation of a shape when it is being dragged
  this._shiftX = this._shiftY = 0;  // cursor shift for proper avatar alignment
}


/**
 * Hide initial element being dragged.
 */
DragObject.prototype.hide = function() {
  this.shape && (this.shape.style.display = 'none');
};

/**
 * Restore element being dragged to its initial state.
 */
DragObject.prototype.restore = function() {
  this.shape && (this.shape.style.display = '');
};

/**
 * Remove initial element being dragged (e.g. when successfully placed inside the pocket).
 */
DragObject.prototype.remove = function() {
  this.removeAvatar();
  if(!this.many) {
    this.shape && this.shape.remove();
  }
};

/**
 * Initialize and create avatar object.
 * @returns {boolean} - returns true if avatar was successfully created
 */
DragObject.prototype._initAvatar = function () {
  this.avatar = this.createAvatarFromShape();
  if(!this.avatar) return false;

  // initialize props of avatar object, including shiftX/shiftY
  let coords = getCoords(this.shape);
  this._shiftX = this.downX - coords.left;
  this._shiftY = this.downY - coords.top;

  // prepare for dragging in DOM
  document.body.appendChild(this.avatar);
  this.applyClasses();

  // this.avatar.style.zIndex = 9999;
  // this.avatar.style.position = 'absolute';
  //
  // // disable pointer events until released
  // this.avatar.style.pointerEvents = 'none';

  if (!this.dragClone) {
    this.hide();
  }

  return true;
};

/**
 * Returns avatar element based on the shape.
 * @returns {Node}
 */
DragObject.prototype.createAvatarFromShape = function() {
  return this.shape.cloneNode(true);
};

DragObject.prototype.moveTo = function (pageX, pageY) {
  if(this.avatar) {
    // sync position on mouse move
    this.avatar.style.left = pageX - this._shiftX + 'px';
    this.avatar.style.top = pageY - this._shiftY + 'px';
  }
};

/**
 * Returns true if avatar was created.
 * @returns {boolean}
 */
DragObject.prototype.isAvatarCreated = function () {
  return !!this.avatar;
};

/**
 * Hides avatar.
 */
DragObject.prototype.hideAvatar = function () {
  this.avatar && (this.avatar.hidden = true);
};

/**
 * Shows avatar.
 */
DragObject.prototype.showAvatar = function () {
  this.avatar && (this.avatar.hidden = false);
};

/**
 * Removes avatar.
 */
DragObject.prototype.removeAvatar = function () {
  this.avatar && (this.avatar.remove());
  this._shiftX = this._shiftY = 0;
};


DragObject.prototype.applyClasses = function () {
  this.avatar && this.avatar.classList.add(...this._classes.avatar);
};