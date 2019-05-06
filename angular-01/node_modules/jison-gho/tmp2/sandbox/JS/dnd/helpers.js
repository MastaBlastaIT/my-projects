/*jshint bitwise: false*/
"use strict";

(function () {
  function hashCode(str) {
    if (str.length === 0) {
      return 0;
    }

    let hash = 0,
      i, chr;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  let qs = (s) => document.body.querySelector(s); // shortcut for querySelector

  function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  }

  if (!Element.prototype.remove) {
    Element.prototype.remove = function() {
      if (this.parentNode) {
        return this.parentNode.removeChild(this);
      }
    }
  }

  /**
   * Returns "class" for ".class" or "class".
   * @param str
   * @returns {string}
   */
  function normalizeClass(str) {
    return str.split('.').join('');
  }

  /**
   * Use the returned function to generate unique global IDs.
   * @returns {function(prefix)} - call the returned function to get an integer id.
   */
  function getGIDMaker() {
    let id = 0;
    return (prefix) => {
      return `${prefix}_${++id}`;
    }
  }
  let GIDMaker = getGIDMaker();

  /**
   * Extends Derived class (constructor) from Base class (constructor).
   */
  function extend(Derived, Base) {
    Derived.prototype = Object.create(Base.prototype);
    Derived.prototype.constructor = Derived;
    Derived.parent = Base.prototype;
  }

  /**
   * Adds one or more mixins to constructor Obj.
   */
  function mix(Obj, ...mixins)
  {
    for (let i = 0; i < mixins.length; ++i)
    {
      for (let prop in mixins[i])
      {
        if (typeof Obj.prototype[prop] === "undefined")
        {
          Obj.prototype[prop] = mixins[i][prop];
        }
      }
    }
  }

  window.qs = qs;
  window.hashCode = hashCode;
  window.getCoords = getCoords;
  window.normalizeClass = normalizeClass;
  window.GIDMaker = GIDMaker;
  window.extend = extend;
})();
