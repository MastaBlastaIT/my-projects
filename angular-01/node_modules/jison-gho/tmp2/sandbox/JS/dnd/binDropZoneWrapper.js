"use strict";

/**
 * jQuery UI widget wrapper for DropZone.
 */
$.widget("rs.binDropZone", $.rs.dropZone, {
  options: {
    DropZoneConstructor: BinDropZone
  }
});
