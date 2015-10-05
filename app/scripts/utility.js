'use strict';

/**
 * Returns the current breakpoint of the page
 *
 * @returns {string}
 */
function getLayout() {
   return window
      .getComputedStyle(document.body, ':before')
      .getPropertyValue('content')
      .replace(/^"?(.*?)"?$/, '$1');
}

/**
 * Check if the argument provided is a plain object
 *
 * @param {Object} object
 *
 * @returns {boolean}
 */
function isPlainObject(object) {
   return object !== null &&
      typeof object === 'object' &&
      object.constructor === Object;
}

/**
 * Merges the properties of one object into another
 *
 * @param {Object} target The object where the properties will be copied
 * @param {Object} source The object whose properties will be copied
 *
 * @returns {Object}
 */
function mergeProperties(target, source) {
   for(var property in source) {
      if (!source.hasOwnProperty(property)) {
         continue;
      }

      if (source[property] instanceof Array) {
         target[property] = source[property].concat(
            target[property] instanceof Array ? target[property] : []
         );
      } else if (isPlainObject(source[property])) {
         target[property] = mergeProperties(target[property], source[property]);
      } else {
         target[property] = source[property];
      }
   }

   return target;
}

/**
 * Merge an arbitrary number of objects into one.
 * This function modifies the <code>target</code> object.
 *
 * @param {Object} target The target object of the merge
 *
 * @returns {Object} The modified target object
 */
function extend(target) {
   for(var i = 1; i < arguments.length; i++) {
      target = mergeProperties(target, arguments[i]);
   }

   return target;
}

var Utility = {
   extend: extend,
   getLayout: getLayout,
   isPlainObject: isPlainObject
};

module.exports = Utility;