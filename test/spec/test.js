/* global describe, it, assert */
(function() {
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

      describe('extend', function() {
         it('should give precedence to the later objects', function() {
            assert.deepEqual(
               Utility.extend({
                  a: 1,
                  b: 2
               }, {
                  a: 3
               }),
               {
                  a: 3,
                  b: 2
               },
               'One source'
            );
            assert.deepEqual(
               Utility.extend({
                  a: 1,
                  b: true,
                  c: false
               }, {
                  a: 2,
                  c: [1, 2],
                  d: 4
               }, {
                  a: 'hello',
                  d: null,
                  e: 6
               }),
               {
                  a: 'hello',
                  b: true,
                  c: [1, 2],
                  d: null,
                  e: 6
               },
               'Multiple sources'
            );
         });

         it('should concatenate properties containing arrays', function() {
            assert.deepEqual(
               Utility.extend({
                  a: [1, 2]
               }, {
                  a: [1, 4, 5]
               }, {
                  a: [6, 2, 1]
               }),
               {
                  a: [
                     6,
                     2,
                     1,
                     1,
                     4,
                     5,
                     1,
                     2
                  ]
               }
            );
         });

         it('should merge properties of nested objects', function() {
            assert.deepEqual(
               Utility.extend({
                  a: {
                     a: true
                  },
                  b: {
                     a: 3,
                     c: {
                        a: 'hello'
                     }
                  }
               }, {
                  a: {
                     b: false
                  },
                  b: {
                     b: null,
                     c: {
                        b: true
                     }
                  }
               }),
               {
                  a: {
                     a: true,
                     b: false
                  },
                  b: {
                     a: 3,
                     b: null,
                     c: {
                        a: 'hello',
                        b: true
                     }
                  }
               }
            );
         });
      });
   });
})();