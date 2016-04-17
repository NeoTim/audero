'use strict';

// Cutting the mustard: Not providing JavaScript features for IE<=8 and others old browsers
var isModernBrowser = 'querySelector' in document && 'localStorage' in window && 'addEventListener' in window;

if (isModernBrowser) {
   require('classlist-polyfill');

   if ('serviceWorker' in navigator) {
      navigator.serviceWorker
         .register('/service-worker.js')
         .then(function() {}, function() {});
   }

   var Audero = require('./audero');
   var controller = document.body.getAttribute('data-controller');
   var action = document.body.getAttribute('data-action');

   Audero.common.init();

   if (controller && Audero[controller]) {
      if (Audero[controller].init) {
         Audero[controller].init();
      }

      if (action && Audero[controller][action]) {
         Audero[controller][action]();
      }
   }
}