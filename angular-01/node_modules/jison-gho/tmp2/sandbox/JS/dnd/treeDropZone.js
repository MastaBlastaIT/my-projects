"use strict";

/**
 * Drop zone for tree lists.
 * @extends DropZone
 * @constructor
 */
function TreeDropZone(options) {
  DropZone.apply(this, arguments);
  this._pocketSelector = 'li';

  this._classes.container.push('rs-treednd__dropzone');
  this._classes.pocket.push('rs-treednd__pocket');
  this._classes.pocketHighlight.push('rs-treednd__pocket_active');
  this._classes.separator = ['rs-treednd__separator'];

  this._hasSeparators = options.hasSeparators || false;
}

extend(TreeDropZone, DropZone);

/**
 * Adds extra <li> separators to the existing list to allow sorting.
 */
TreeDropZone.prototype.appendSeparators = function() {
  if(this._hasSeparators) return;

  let lis = this._container.querySelectorAll('li');
  let li;

  for (let i=0; i<lis.length; i++) {
    li = lis[i];
    let sortingLi = this._createSortingLi();
    li.parentNode.insertBefore(sortingLi, li);
  }

  this._hasSeparators = true;
};

TreeDropZone.prototype._createSortingLi = function () {
  let sortingLi = document.createElement('li');
  // default CSS styling for a separator
  sortingLi.style.listStyle = 'none';
  sortingLi.style.height = '5px';
  sortingLi.style.width = '100px';
  sortingLi.classList.add(...this._classes.separator);
  sortingLi.isSeparator = true;  // store in DOM

  return sortingLi;
};


TreeDropZone.prototype._findPocket = function (e, dragObject) {
  let target = DropZone.prototype._findPocket.apply(this, arguments);
  if(!target) return null;

  // sub-element cannot be a pocket
  let testTarget = target;
  while (testTarget !== document) {
    if(testTarget === dragObject.shape) {
      return null;
    }
    testTarget = testTarget.parentNode;
  }

  return target;
};


/**
 * Inserts <li> element to the another list's <ul> level in alphabetical order
 * @param li
 * @param ul
 * @param mode {string} - can be one of the following options.
 * 'end' - insert to the end of ul list (default)
 * 'begin' - insert to the beginning of ul list
 * 'alphabetical' - insert keeping alphabetical in the ul list
 * @returns {*}
 */
TreeDropZone.prototype.appendLiToUl = function (li, ul, mode = 'end') {
  let title = li.textContent; // list title being dragged
  let targetLi = null;

  switch (mode) {
    case 'begin':
      targetLi = ul.children[0];
      break;

    case 'end':
      targetLi = null;
      break;

    case 'alphabetical':
      for (let i = 0; i < ul.children.length; i++) {
        targetLi = ul.children[i];
        let childTitle = targetLi.textContent;
        if (childTitle > title) {
          // insert before this element
          break;
        }
      }
      break;

    default:
      throw new Error(`Incorrect mode parameter specified: ${mode}. Should be one of 'begin', 'end', 'alphabetical'`);
  }

  ul.insertBefore(li, targetLi);
  return li;
};


/**
 * Place the element inside of the pocket.
 * @param e - mouse event
 * @param dragObject {TreeDragObject}
 * @param pocket {HTMLElement}
 */
TreeDropZone.prototype.onDragEnd = function (e, dragObject, pocket) {
  if (pocket.isSeparator) {
    // insert element in place of a separator
    pocket.parentNode.insertBefore(dragObject.shape, pocket);

    // make sure it is wrapped around with separators
    if (dragObject.separatorBefore) {
      pocket.parentNode.insertBefore(dragObject.separatorBefore, dragObject.shape);
    }

    return;
  }

  // pocket is not a separator (not reordering)
  // get container for li elements in pocket
  let ul = pocket.querySelector('ul');

  if (!ul) {
    // leaf (no descendants) => add as a child
    ul = document.createElement('ul');
    pocket.appendChild(ul);
    ul.appendChild(dragObject.shape);
  } else {
    // has descendants => add to the list in alphabetical order
    this.appendLiToUl(dragObject.shape, ul, 'end');
  }

  // if dragging with separator => insert separator
  if (dragObject.separatorBefore) {
    ul.insertBefore(dragObject.separatorBefore, dragObject.shape);
  }

  DropZone.prototype.onDragEnd.apply(this, arguments);
};

