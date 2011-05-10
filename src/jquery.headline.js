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
  $.headline = function(element, arguments) {
    var options = $.extend({}, $.headline.defaults, arguments);
    var index    = 0,
        frame    = 0,
        position = 0,
        mode     = 0;

    writeLine(element, options, index);

    window.setInterval(function() {
      var item = $(element.children().get(position)),
          cursor = element.children('.cursor');

      item.toggleClass(options.class);

      if(position < options.elements[index].length) {
        cursor.addClass( options.class);
      } else {
        var operation = Math.floor(frame / 10) % 2 === 0 ? 'addClass' : 'removeClass';
        cursor[operation](options.class);
      }

      if(mode === 0) {
        if(position < options.elements[index].length) position++;
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
      if(frame % options.delay === 0)
        mode = 1 - mode;

    }, options.timeout)

    return element;
  }

  $.fn.headline = function(options) {
    if($.isArray(options)) {
      options = { elements: options };
    };

    return $.headline(this, options);
  }

  /* Default options */
  $.headline.defaults = {
    cursor: true, // Displays a "_" cursor at the end of the phrase.
    timeout: 40, // Interval between animations.
    delay: 400, // Interval between phrases.
    class: 'headline-off' // Class used to hide the letters.
  }

  /* Private Methods */
  function writeLine(elem, opts, index) {
    var letters = opts.elements[index].split('');
    for(i in letters) {
      elem.append(createNode(letters[i], opts.class))
    }
    if(opts.cursor) {
      elem.append(createNode("_").addClass('cursor'));
    }
  }

  function createNode(value, klass) {
    return $("<span />", {text: value, class: klass });
  }
})(jQuery);
