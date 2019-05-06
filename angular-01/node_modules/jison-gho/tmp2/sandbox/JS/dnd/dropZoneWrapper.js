"use strict";

/**
 * jQuery UI widget wrapper for DropZone.
 */
$.widget("rs.dropZone", {
  options: {
    DropZoneConstructor: DropZone
  },
  _create: function() {
    let self = this;
    new this.options.DropZoneConstructor({
      container: this.element[0],  // sending vanilla DOM object
      pocketSelector: this.options.pocketSelector,
      onDragEndCallback: function(e, dragObject, pocket) {
        self._trigger("dragend", null, {e: e, dragObject: dragObject, pocket: pocket});
      }
    });
  }

});
