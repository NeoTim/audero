'use strict';

var Utility = require('./utility');

var defaults = {
   currentIndex: 0,
   element: null,
   nextButton: null,
   previousButton: null
};

/**
 * Binds events
 *
 * @param {SpeakingGallery} speakingGallery
 */
function bindEvents(speakingGallery) {
   speakingGallery.previousButton.addEventListener('click', speakingGallery.showPreviousImage.bind(speakingGallery));
   speakingGallery.nextButton.addEventListener('click', speakingGallery.showNextImage.bind(speakingGallery));

   window.addEventListener('resize', function() {
      speakingGallery.showImage(speakingGallery.currentIndex);
   });
}

/**
 *
 * @param {object} options
 *
 * @constructor
 */
function SpeakingGallery(options) {
   Utility.extend(this, defaults, options);
}

/**
 * Initializes the module
 */
SpeakingGallery.prototype.init = function() {
   bindEvents(this);
};

SpeakingGallery.prototype.showImage = function(index) {
   var items = this.element.children;
   var oldValue = this.element.scrollLeft;

   if (index < 0 || index >= items.length) {
      return this;
   }

   this.element.scrollLeft += items[index].getBoundingClientRect().left - this.element.getBoundingClientRect().left;

   if (this.element.scrollLeft !== oldValue) {
      this.currentIndex = index;
   }

   return this;
};

/**
 * Shows the previous image
 */
SpeakingGallery.prototype.showPreviousImage = function() {
   return this.showImage(this.currentIndex - 1);
};

/**
 * Shows the next image
 */
SpeakingGallery.prototype.showNextImage = function() {
   return this.showImage(this.currentIndex + 1);
};

module.exports = SpeakingGallery;