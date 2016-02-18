'use strict';

function addMouseActiveClass() {
   document.body.removeEventListener('mousemove', addMouseActiveClass);
   document.body.classList.add('mouse-active');
}

function init() {
   var ToggleMenu = require('./toggle-menu');
   var menuElement = document.querySelector('.js-menu');
   var mainMenu = new ToggleMenu(
      menuElement.querySelector('.js-menu-items'),
      menuElement.querySelector('.js-menu-toggle'),
      {
         animationDuration: 300,
         layouts: ['mobile']
      }
   );

   document.body.addEventListener('mousemove', addMouseActiveClass);
   mainMenu.init();
}

function speaking() {
   var GallerySpeaking = require('./gallery-speaking');
   var galleryElement = document.querySelector('.js-gallery-speaking');
   var gallerySpeaking = new GallerySpeaking({
      element: galleryElement.querySelector('.js-gallery-speaking-items'),
      previousButton: galleryElement.querySelector('.js-gallery-arrow-left'),
      nextButton: galleryElement.querySelector('.js-gallery-arrow-right')
   });

   gallerySpeaking.init();
}

function publications() {
   var Articles = require('./articles');
   var articles = new Articles(document.querySelector('.articles').children, {
      showAll: document.querySelector('.js-button-show-all-articles'),
      showMore: document.querySelector('.js-button-show-more-articles'),
      filter: document.querySelector('.js-articles-filter')
   });

   articles.init();
}

function projects() {
   var ToggleMenu = require('./toggle-menu');
   var projectsMenuElement = document.querySelector('.js-projects-menu');
   var projectMenu = new ToggleMenu(
      projectsMenuElement.querySelector('.js-projects-menu-items'),
      projectsMenuElement.querySelector('.js-projects-menu-toggle'),
      {
         animationDuration: 300,
         layouts: ['mobile'],
         toggleActiveClass: 'projects-menu__toggle--active'
      }
   );

   projectMenu.init();
}

module.exports = {
   common: {
      init: init
   },
   main: {
      speaking: speaking,
      publications: publications
   },
   projects: {
      init: projects
   }
};