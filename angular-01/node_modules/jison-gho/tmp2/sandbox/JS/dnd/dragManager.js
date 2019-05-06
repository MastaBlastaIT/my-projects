"use strict";

/**
 * Handles global mouse events and dispatches them to the appropriate dragZones.
 * @constructor
 */
function DragManager() {
  this._id = GIDMaker(this.constructor.name);

  let downX, downY;  // coordinates of the last mouse click
  let dragZone;  // currently active dragZone
  let isDragging = false;  // there is a shape being dragged right now

  // Prevent default HTML5 Drag&Drop
  document.onmousemove = onMouseMove;
  document.onmousedown = onMouseDown;
  document.onmouseup = onMouseUp;

  let self = this;

  function onMouseDown(e) {

    if (e.which != 1) return;  // not left-mouse click

    dragZone = findDragZone(e);
    if (!dragZone) {
      reset();
      return;
    }

    if (!dragZone._onDragInit(e)) {
      reset();
      return;
    }

    downX = e.downX;
    downY = e.downY;

    return false;
  }

  function onMouseMove(e) {
    if (!dragZone) return;

    if (!isDragging) {
      let moveX = e.pageX - downX;
      let moveY = e.pageY - downY;

      // accidental click
      if (Math.abs(moveX) < 5 && Math.abs(moveY) < 5) {
        reset();
        return;
      }

      // start dragging
      if (!dragZone._onDragStart(e)) {
        reset();
        return;
      }

      isDragging = true;
    }

    dragZone._onDragMove(e);
    return false;
  }

  function onMouseUp(e) {
    if (dragZone) { // dragging is in progress
      dragZone._onDragEnd(e);
    }

    reset();
    return false;
  }

  function findDragZone(e) {
    let target = e.target;
    while (target != document && !target.dragZone) {
      target = target.parentNode;
    }

    return target.dragZone;
  }

  function reset() {
    dragZone = downX = downY = undefined;
    isDragging = false;
  }


}
