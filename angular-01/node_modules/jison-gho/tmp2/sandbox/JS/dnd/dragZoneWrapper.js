"use strict";

/**
 * jQuery UI widget wrapper for DragZone.
 */
$.widget("rs.dragZone", {
  options: {
    allowedDropZones: []
  },

  _create: function() {
    new DragZone({
      container: this.element[0],  // sending vanilla DOM object
      many: this.options.many,
      shapeSelector: this.options.shapeSelector,
      shapeManySelector: this.options.shapeManySelector,
      shapeNotManySelector: this.options.shapeNotManySelector
    });

    this.options.allowedDropZones.forEach((dropZone) => {
      this.addDropZone(dropZone);
    });
  },

  addDropZone: function(dropZoneEl) {
    if(dropZoneEl === undefined) {
      return null;
    }

    if(dropZoneEl[0].dropZone) {
      return this.element[0].dragZone.addDropZone(dropZoneEl[0].dropZone);
    } else if (dropZone.dropZone) {
      return this.element[0].dragZone.addDropZone(dropZoneEl.dropZone);
    }

    return null;
  },

  removeDropZone: function(dropZoneEl) {
    if(dropZoneEl === undefined) {
      return null;
    }

    if(dropZoneEl[0].dropZone) {
      return this.element[0].dragZone.removeDropZone(dropZoneEl[0].dropZone);
    } else if (dropZone.dropZone) {
      return this.element[0].dragZone.removeDropZone(dropZoneEl.dropZone);
    }

    return null;
  },

  clearDropZones: function() {
    this.element[0].dragZone.clearDropZones();
  }

});
