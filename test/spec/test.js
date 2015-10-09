/* global describe, it, assert */
(function () {
   'use strict';

   describe('Utility', function() {
      var Utility = require('./../../app/scripts/utility');

      describe('isPlainObject', function() {
         it('should return true for object literals and object instances', function() {
            assert.isTrue(Utility.isPlainObject({}), 'Empty object literal');
            assert.isTrue(Utility.isPlainObject({
               a: 1,
               b: 2
            }), 'Non-empty object literal');
            /* jshint -W010 */
            assert.isTrue(Utility.isPlainObject(new Object()), 'Empty object');
            assert.isTrue(Utility.isPlainObject(new Object({
               a: 1,
               b: 2
            })), 'Non-empty object');
         });

         it('should return false for primitive types', function() {
            assert.isFalse(Utility.isPlainObject(null), 'Null');
            assert.isFalse(Utility.isPlainObject(undefined), 'Undefined');
            assert.isFalse(Utility.isPlainObject(1), 'Number');
            assert.isFalse(Utility.isPlainObject('test'), 'String');
            assert.isFalse(Utility.isPlainObject(false), 'Boolean');
         });

         it('should return false for non-literal objects', function() {
            function Car() {
               this.a = 1;
            }

            assert.isFalse(Utility.isPlainObject([1, 2, 3]), 'Array literal');
            assert.isFalse(Utility.isPlainObject(new Array(3)), 'Array');
            assert.isFalse(Utility.isPlainObject(new Car()), 'Custom object');
         });
      });
   });
})();