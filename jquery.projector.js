// projector: a simple jQuery slideshow plugin
//
// Copyright 2013 P'unk Avenue LLC
//
// Complete docs here: http://github.com/punkave/jquery-projector

(function( $ ) {
  $.fn.projector = function(options) {
    this.each(function(i, el) {
      var $el = $(this);
      if (!options) {
        options = {};
      }

      var delay = 5000;
      if (options.delay !== undefined) {
        delay = options.delay;
      }
      if ($el.attr('data-delay') !== undefined) {
        delay = $el.attr('data-delay');
      }
      delay = parseInt(delay, 10);

      var currentClass = $el.attr('data-current-class') || options.currentClass || 'apos-current';
      var nextClass = $el.attr('data-next-class') || options.nextClass || 'apos-next';
      var previousClass = $el.attr('data-previous-class') || options.previousClass || 'apos-previous';
      var otherClass = $el.attr('data-other-class') || options.otherClass || 'apos-other';
      var noHeight = ($el.attr('data-no-height') !== undefined) || options.noHeight || false;
      var noNextAndPreviousClasses = ($el.attr('data-no-next-and-previous-classes') !== undefined) || options.noNextAndPreviousClasses || false;

      var slideshowLength = $el.find('[data-slideshow-item]').length;

      // extra checks in case false was passed to the data attribute
      if($el.attr('data-no-height') === 'false') {
        noHeight = false;
      }
      if($el.attr('data-no-next-and-previous-classes') === 'false') {
        noNextAndPreviousClasses = false;
      }

      var interval;

      function reset() {
        if (interval) {
          clearInterval(interval);
        }
        if (delay) {
          interval = setInterval(function() {
            if (!getCurrent().length) {
              // Widget has gone away. Kill the interval timer and go away too
              clearInterval(interval);
            }
            next();
          }, delay);
        }
      }

      reset();

      $el.find('[data-pager]').click(function(){
        setPager($(this).index());
        return false;
      });

      $el.find('[data-previous]').click(function() {
        previous();
        return false;
      });

      $el.find('[data-next]').click(function() {
        next();
        return false;
      });


      initializeSiblings();

      function setPager(target) {
        var $current = getCurrent();
        $current.removeClass(currentClass);
        $el.find('[data-slideshow-item]').eq(target).addClass(currentClass);
        setSiblings( getCurrent() );
        refreshPager(target);
        reset();
      }

      function getCurrent() {
        var $current = $el.find('[data-slideshow-item].' + currentClass);
        return $current;
      }

      function previous() {
        var $current = getCurrent();
        var $prev = $current.prev();
        if (!$prev.length) {
          $prev = $current.closest('[data-slideshow-items]').find('[data-slideshow-item]:last');
        }
        $current.removeClass(currentClass);
        $prev.addClass(currentClass);

        setSiblings($prev);

        refreshPager($prev.index());

        // A fresh n seconds for the next auto rotate
        reset();
      }

      function next() {
        var $current = getCurrent();
        if (!$current.length) {
          // Widget has gone away. Kill the interval timer and go away too
          clearInterval(interval);
          return;
        }
        var $next = $current.next();
        if (!$next.length) {
          $next = $current.closest('[data-slideshow-items]').find('[data-slideshow-item]:first');
        }
        $current.removeClass(currentClass);
        $next.addClass(currentClass);

        setSiblings($next);

        refreshPager($next.index());
        // A fresh n seconds for the next auto rotate
        reset();
      }

      function setSiblings($current, ignoreOld) {
        if(noNextAndPreviousClasses || slideshowLength < 2) {
          return;
        }
        if(!ignoreOld) {
          var $oldNext = $el.find('[data-slideshow-item].' + nextClass);
          var $oldPrevious = $el.find('[data-slideshow-item].' + previousClass);
          $oldNext.removeClass(nextClass);
          $oldPrevious.removeClass(previousClass);
        }

        var $newNext = $current.next();
        if(!$newNext.length) {
          $newNext = $current.closest('[data-slideshow-items]').find('[data-slideshow-item]:first');
        }
        $newNext.addClass(nextClass);

        if(slideshowLength == 2) {
          $current.removeClass(otherClass);
          $newNext.addClass(otherClass);
          return;
        }

        var $newPrevious = $current.prev();
        if(!$newPrevious.length) {
          $newPrevious = $current.closest('[data-slideshow-items]').find('[data-slideshow-item]:last');
        }
        $newPrevious.addClass(previousClass);
      }

      function initializeSiblings() {
        setSiblings( getCurrent() , true);
      }

      function refreshPager(target) {
        $el.find('[data-pager]').removeClass(currentClass);
        $el.find('[data-pager]').eq(target).addClass(currentClass);
      }

      function adjustSize() {
        $el.find('[data-image]').imagesReady(function() {
          var tallest = 0;
          $el.find('[data-slideshow-item]').each(function() {
            var $item = $(this);
            if ($item.height() > tallest) {
              tallest = $item.height();
            }
          });

          if (!noHeight) {
            $el.find('[data-slideshow-items]').height(tallest);
          }

        });
      }

      adjustSize();
    });
  };
})( jQuery );
