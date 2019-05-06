"use strict";

/**
 * Drag Object for tree lists.
 * @param options
 * @extends DragObject
 * @constructor
 */
function TreeDragObject(options) {
  DragObject.apply(this, arguments);
  this._classes.avatar.push('rs-treednd__avatar');

  this.separatorBefore = null;  // separator before the shape used as a pocket for ordering
}

extend(TreeDragObject, DragObject);

TreeDragObject.prototype.createAvatarFromShape = function () {
  let li = this.shape.cloneNode(true);

  if (this.shape.previousElementSibling && this.shape.previousElementSibling.isSeparator) {
    // make sure there is no repetitive separator while dragging
    this.separatorBefore = this.shape.previousElementSibling;
    if(!this.dragClone) {
      this.separatorBefore.style.display = 'none';
    }
  }

  return li;
};

TreeDragObject.prototype.remove = function () {
  DragObject.prototype.remove.apply(this, arguments);
  if (!this.many) {
    this.separatorBefore.remove();
    this.separatorBefore = null;
  }
};

TreeDragObject.prototype.restore = function () {
  DragObject.prototype.restore.apply(this, arguments);
  this.separatorBefore && (this.separatorBefore.style.display = '');
};

TreeDragObject.prototype.hide = function () {
  DragObject.prototype.hide.apply(this, arguments);
  this.separatorBefore && (this.separatorBefore.style.display = 'none');
};



