/*
 * jQuery Headline Plugin
 * version: 0.0.1
 * @requires jQuery 1.6 or later
 * @homepage https://github.com/lucasmazza/jquery.headline
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 * Copyright Lucas Mazza
 *
 * Usage:
 *  jQuery(function($) {
 *    $("#container").headline(['First line', 'Second line', 'Third line']);
 *  })
 */

(function($) {
  $.headline = function(element, args) {
    var options = $.extend({}, $.headline.defaults, args);
    var index    = 0,
        frame    = 0,
        position = 0,
        mode     = 0;

    writeLine(element, options, index);

    window.setInterval(function() {
      var item = $(element.children().get(position)),
          cursor = element.children('.cursor');

      item.toggleClass(options.cssClass);

      if(position < options.elements[index].length) {
        cursor.addClass(options.cssClass);
      } else {
        var operation = Math.floor(frame / 10) % 2 === 0 ? 'addClass' : 'removeClass';
        cursor[operation](options.cssClass);
      }

      if(mode === 0) {
        if(position < options.elements[index].length) {
          position++;
        }
      } else {
        if(position > 0) {
          position--;
        } else {
          mode = 1 - mode;
          index++;
          index%= options.elements.length;
          element.empty();
          writeLine(element, options, index);
        }
      }
      frame++;
      if(frame % options.timeout === 0) {
        mode = 1 - mode;
      }

    }, options.interval);

    return element;
  };

  $.fn.headline = function(options) {
    if($.isArray(options)) {
      options = { elements: options };
    }

    return $.headline(this, options);
  };

  /* Default options */
  $.headline.defaults = {
    cursor: true, // Displays a "_" cursor at the end of the phrase.
    interval: 40, // Interval between animations.
    timeout: 400, // Interval between phrases.
    cssClass: 'headline-off' // Class used to hide the letters.
  };

  /* Private Methods */
  function writeLine(elem, opts, index) {
    var letters = opts.elements[index].split('');
    $.each(letters, function(number, letter) {
      elem.append(createNode(letter,opts.cssClass));
    });
    if(opts.cursor) {
      elem.append(createNode("_").addClass('cursor'));
    }
  }

  function createNode(value, klass) {
    return $("<span />", {text: value, 'class': klass });
  }
})(jQuery);
