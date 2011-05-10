(function($) {
  $.headline = function(element, arguments) {
    var options = $.extend({}, $.headline.defaults, arguments);
    var index    = 0,
        frame    = 0,
        position = 0,
        mode     = 0;

    prepare(element, options, index);

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
          prepare(element, options, index);
        }
      }
      frame++;
      if(frame % options.delay === 0)
        mode = 1 - mode;

    }, options.timeout)

    return element;
  }

  function prepare(element, opts, index) {
    var chars = opts.elements[index].split('');
    for(c in chars) {
      element.append(createNode(chars[c], opts.class))
    }
    if(opts.cursor) {
      element.append(createNode("_").addClass('cursor'));
    }
  }

  function createNode(value, klass) {
    return $("<span />", {text: value, class: klass });
  }

  $.headline.defaults = {
    cursor: true,
    timeout: 40,
    delay: 400,
    class: 'headline-off'
  }

  $.fn.headline = function(options) {
    if($.isArray(options)) {
      options = { elements: options }
    };

    return $.headline(this, options);
  }
})(jQuery);
