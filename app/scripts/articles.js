'use strict';

require('classlist-polyfill');

/**
 * The number of articles shown at every new request
 *
 * @type {number}
 */
var LIMIT = 20;

/**
 * The number of articles currently visible
 *
 * @type {number}
 */
var visibleElements = LIMIT;

/**
 * Hides a portion of the elements provided
 *
 * @param {NodeList} elements The collection of elements to process
 * @param {number} [start] Zero-based index at which to begin hiding the articles
 * @param {number} [end] Zero-based index at which to end hiding the articles.
 * The method hides up to but not including end
 *
 * @returns {NodeList}
 */
function hide(elements, start, end) {
   start = start || 0;
   end = end || elements.length;

   for(var i = start; i < elements.length && i < end; i++) {
      elements[i].classList.add('hidden');
   }

   return elements;
}

/**
 * Shows a portion of the elements provided
 *
 * @param {NodeList} elements The collection of elements to process
 * @param {number} [start] Zero-based index at which to begin showing the articles
 * @param {number} [end] Zero-based index at which to end showing the articles.
 * The method shows up to but not including end
 *
 * @returns {NodeList}
 */
function show(elements, start, end) {
   start = start || 0;
   end = end || elements.length;

   for(var i = start; i < elements.length && i < end; i++) {
      elements[i].classList.remove('hidden');
   }

   return elements;
}

/**
 * Filters elements based on the tag provided
 *
 * @param {NodeList} elements The elements to filter
 * @param {string} tag The tag used to filter the elements
 *
 * @returns {Array}
 */
function filterByTag(elements, tag) {
   var regex;

   if (tag === '*') {
      regex = new RegExp('.*');
   } else {
      regex = new RegExp('(^|\\s)' + tag + '(\\s|$)');
   }

   return [].filter.call(elements, function(element) {
      return regex.test(element.querySelector('.article').getAttribute('data-tags'));
   });
}

/**
 * Binds events
 *
 * @param {Articles} articles
 */
function bindEvents(articles) {
   var filteredArticles = articles.articles;

   articles.settings.showMore.addEventListener('click', function() {
      show(filteredArticles, visibleElements, visibleElements + LIMIT);
      visibleElements = Math.min(visibleElements + LIMIT, filteredArticles.length);

      if (visibleElements === filteredArticles.length) {
         articles.settings.showMore.classList.add('hidden');
      }
   });

   articles.settings.showAll.addEventListener('click', function() {
      show(filteredArticles, visibleElements);
      visibleElements = filteredArticles.length;

      articles.settings.showAll.classList.add('hidden');
      articles.settings.showMore.classList.add('hidden');
   });

   articles.settings.filter.addEventListener('change', function(event) {
      filteredArticles = filterByTag(articles.articles, event.target.value);
      visibleElements = Math.min(LIMIT, filteredArticles.length);

      hide(articles.articles);
      show(filteredArticles, 0, visibleElements);

      if (visibleElements === filteredArticles.length) {
         articles.settings.showAll.classList.add('hidden');
         articles.settings.showMore.classList.add('hidden');
      } else {
         articles.settings.showAll.classList.remove('hidden');
         articles.settings.showMore.classList.remove('hidden');
      }
   });
}

/**
 *
 * @param {NodeList} articles
 * @param {Object} [options]
 *
 * @constructor
 */
function Articles(articles, options) {
   this.articles = articles;
   this.settings = options;
}

/**
 * Initializes the module
 */
Articles.prototype.init = function() {
   hide(this.articles, LIMIT);

   if (visibleElements >= this.articles.length) {
      return;
   }

   bindEvents(this);

   this.settings.showAll.classList.remove('hidden');
   this.settings.showMore.classList.remove('hidden');
   this.settings.filter.classList.remove('hidden');
};

module.exports = Articles;