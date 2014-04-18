# jquery-projector

<a href="http://apostrophenow.org/"><img src="https://raw.github.com/punkave/jquery-projector/master/logos/logo-box-madefor.png" align="right" /></a>

`jquery-projector` is a simple jQuery slideshow plugin. `jquery-projector` progressively enhances a list of items into a slideshow.

Progressive enhancement makes `jquery-projector` very SEO-friendly. `jquery-projector` also copes intelligently with images of varying heights, imposing a consistent height on the slideshow so your page doesn't "jump." `jquery-projector` is tested and supported back to at least IE8.

## How to Use

### Requirements

You need jQuery, of course. `jquery-projector` is actively supported with jQuery 1.9 and 2.0 but may work with older versions.

You must also have the [jquery-images-ready](http://github.com/punkave/jquery-images-ready) plugin.

### Setting Up Your Markup

Need a simple slideshow? Start with markup like this. Your markup may vary quite a bit as long as you have elements with all of the data attributes shown. (The `data-next` and `data-previous` links are optional.) The use of the `my-slideshow` class is just an example.

    <div class="my-slideshow">
      <a href="#" data-previous>Previous</a>
      <a href="#" data-next>Next</a>
      <ul data-slideshow-items>
        <li data-slideshow-item class="apos-current">
          <img src="/image1.jpg" data-image />
        </li>
        <li data-slideshow-item>
          <img src="/image2.jpg" data-image />
        </li>
        <!-- ... Etc -->
      </ul>
    </div>

Looking for pagers instead of previous and next buttons? You can use the `[data-pager]` attribute like this and projector will add the appropirate click events and also toggle your `currentClass` on the pager item itself:

    <div class="my-slideshow">
      <a href="#" data-pager class="apos-current">1</a>
      <a href="#" data-pager>2</a>
      <ul data-slideshow-items>
        <li data-slideshow-item class="apos-current">
          <img src="/image1.jpg" data-image />
        </li>
        <li data-slideshow-item>
          <img src="/image2.jpg" data-image />
        </li>
        <!-- ... Etc -->
      </ul>
    </div>


### Setting Up Your CSS

Note the use of the `apos-current` class on the first list item. You must initially apply this class to the first item. *In your CSS, make sure list items in your slideshow are hidden unless they have this class.* Your CSS might look like this:

    .my-slideshow li
    {
      display: none;
      /* Display all images with the same width, let height scale */
      width: 100%;
    }

    .my-slideshow li.apos-current
    {
      display: block;
    }

*If you don't like `apos-current`, you can change the name of this class via the `currentClass` option when calling `projector`.*

### Your JavaScript: Invoking `jquery-projector`

Now just select your slideshow and call `projector`:

    <script type="text/javascript">
      $(function() {
          $('.my-slideshow').projector();
      });
    </script>

This will give you a slideshow with a default delay of 5 seconds between items.

You can change the delay by setting the `delay` option, in milliseconds:

    $('.my-slideshow').projector({ delay: 2000 });

*Set the delay to 0 to shut off automatic rotation entirely.*

You can also set the delay via a `data-delay` attribute on the outermost element of the slideshow.

### Automatic Height

The height of the slideshow is automatically fixed based on the tallest item in the slideshow. Note that the height of the tallest item can be affected by your CSS decisions. For instance, if you impose a `max-height` on the slideshow images, that will be respected.

This prevents the rest of the page below the slideshow from "jumping" as the slideshow auto-rotates.

Note that this assumes you are using CSS to force a consistent width for all of the images and allowing the height to scale in order to maintain the aspect ratio, with the optional use of `max-height` as well.

You can disable this autosizing behavior by setting the `noHeight` option to `true`, or by setting the `data-no-height` attribute on the outer element of your slideshow (no value is needed).

## Changelog

0.2.0, 0.2.1: simplified the automatic height calculations. We trust jQuery to tell us the heights of the slideshow items. One benefit is that you may have additional elements beyond images, such as credits and titles, in each `[data-slideshow-item]` element.

## About P'unk Avenue and Apostrophe

`jquery-projector` was created at [P'unk Avenue](http://punkave.com) for use in Apostrophe, an open-source content management system built on node.js. If you like `jquery-projector` you should definitely [check out apostrophenow.org](http://apostrophenow.org). Also be sure to visit us on [github](http://github.com/punkave).

## Support

Feel free to open issues on [github](http://github.com/punkave/jquery-projector).


<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/jquery-projector/master/logos/logo-box-builtby.png" /></a>

