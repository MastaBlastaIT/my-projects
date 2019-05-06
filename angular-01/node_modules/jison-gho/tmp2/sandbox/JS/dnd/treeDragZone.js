"use strict";

/**
 * Drag zone for tree lists.
 * @extends DragZone
 * @constructor
 */
function TreeDragZone(options) {
  DragZone.apply(this, arguments);
  this._classes.container.push('rs-treednd__dragzone');
  this._classes.shape.push('rs-treednd__shape');
  this._classes.shapeMany.push('rs-treednd__shape_many');
  this._classes.shapeNotMany.push('rs-treednd__shape_notmany');

  this._shapeSelector = 'li';
  this._DragObjectConstructor = TreeDragObject;
}

extend(TreeDragZone, DragZone);