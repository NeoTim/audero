'use strict';

require('classlist-polyfill');
var Utility = require('./utility');

/**
 * The default values for the settings of the module
 *
 * @type {Object}
 */
var defaults = {
   animationDuration: 0,
   animationStep: 20,
   layouts: [],
   menuHiddenClass: 'hidden',
   toggleActiveClass: 'active',
   toggleHiddenClass: 'hidden'
};

/**
 * Shows the menu performing an animation
 *
 * @param {ToggleMenu} toggleMenu
 */
function showMenuAnimated(toggleMenu) {
   toggleMenu.menu.classList.remove(toggleMenu.settings.menuHiddenClass);

   var menuHeight = toggleMenu.menu.offsetHeight;
   var step = menuHeight / toggleMenu.settings.animationDuration * toggleMenu.settings.animationStep;

   toggleMenu.menu.style.height = 0;

   var timerId = setInterval(function () {
      toggleMenu.menu.style.height = Math.min(toggleMenu.menu.offsetHeight + step, menuHeight) + 'px';

      if (toggleMenu.menu.offsetHeight === menuHeight) {
         toggleMenu.menu.style.height = '';
         clearInterval(timerId);
      }
   }, toggleMenu.settings.animationStep);
}

/**
 * Hides the menu performing an animation
 *
 * @param {ToggleMenu} toggleMenu
 */
function hideMenuAnimated(toggleMenu) {
   var menuHeight = toggleMenu.menu.offsetHeight;
   var step = menuHeight / toggleMenu.settings.animationDuration * toggleMenu.settings.animationStep;

   var timerId = setInterval(function () {
      toggleMenu.menu.style.height = Math.max(toggleMenu.menu.offsetHeight - step, 0) + 'px';

      if (toggleMenu.menu.offsetHeight === 0) {
         toggleMenu.menu.style.height = '';
         toggleMenu.menu.classList.add(toggleMenu.settings.menuHiddenClass);
         clearInterval(timerId);
      }
   }, toggleMenu.settings.animationStep);
}

/**
 * Toggles the visibility status of the menu performing an animation
 *
 * @param {ToggleMenu} toggleMenu
 */
function animateTransition(toggleMenu) {
   if (toggleMenu.menu.classList.contains(toggleMenu.settings.menuHiddenClass)) {
      showMenuAnimated(toggleMenu);
   } else {
      hideMenuAnimated(toggleMenu);
   }
}

/**
 * The event handler for the <code>resize</code> event
 *
 * @param {ToggleMenu} toggleMenu
 */
function onResize(toggleMenu) {
   if (toggleMenu.settings.layouts.indexOf(Utility.getLayout()) >= 0) {
      toggleMenu.menu.classList.add(toggleMenu.settings.menuHiddenClass);
      toggleMenu.toggle.classList.remove(toggleMenu.settings.toggleHiddenClass);
   } else {
      toggleMenu.menu.classList.remove(toggleMenu.settings.menuHiddenClass);
      toggleMenu.toggle.classList.add(toggleMenu.settings.toggleHiddenClass);
   }
}

/**
 * The event handler for the <code>click</code> event on the toggle
 *
 * @param {ToggleMenu} toggleMenu
 */
function onToggleClick(toggleMenu) {
   toggleMenu.toggle.classList.toggle(toggleMenu.settings.toggleActiveClass);

   if (toggleMenu.settings.animationDuration <= 0) {
      toggleMenu.menu.classList.toggle(toggleMenu.settings.menuHiddenClass);
   } else {
      animateTransition(toggleMenu);
   }
}

/**
 * Binds events
 *
 * @param {ToggleMenu} toggleMenu
 */
function bindEvents(toggleMenu) {
   window.addEventListener('resize', onResize.bind(null, toggleMenu));
   toggleMenu.toggle.addEventListener('click', onToggleClick.bind(null, toggleMenu));
}

/**
 *
 * @param {HTMLElement} menu
 * @param {HTMLElement} toggle
 * @param {Object} options
 *
 * @constructor
 */
function ToggleMenu(menu, toggle, options) {
   this.menu = menu;
   this.toggle = toggle;
   this.settings = Utility.extend({}, defaults, options);
}

/**
 * Initializes the module
 */
ToggleMenu.prototype.init = function () {
   onResize(this);

   bindEvents(this);
};

module.exports = ToggleMenu;