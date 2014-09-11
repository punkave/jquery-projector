# jquery-projector

<a href="http://apostrophenow.org/"><img src="https://raw.github.com/punkave/jquery-projector/master/logos/logo-box-madefor.png" align="right" /></a>

`jquery-projector` is a simple jQuery slideshow plugin. `jquery-projector` progressively enhances a list of items into a slideshow.

Progressive enhancement makes `jquery-projector` very SEO-friendly. `jquery-projector` also copes intelligently with images of varying heights, imposing a consistent height on the slideshow so your page doesn't "jump." `jquery-projector` is tested and supported back to at least IE8.

As of version 0.3.0, `jquery-projector` instances can be nested inside one another safely.

## How to Use

### Requirements

You need jQuery, of course. `jquery-projector` is actively supported with jQuery 1.9 and 2.0 but may work with older versions.

You must also have the [jquery-images-ready](http://github.com/punkave/jquery-images-ready) plugin.

### Setting Up Your Markup

Need a simple slideshow? Start with markup like this. Your markup may vary quite a bit as long as you have elements with all of the data attributes shown. (The `data-next` and `data-previous` links are optional.) The use of the `my-slideshow` class is just an example.

```html
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
```

Looking for pagers instead of previous and next buttons? You can use the `[data-pager]` attribute like this and projector will add the appropirate click events and also toggle your `currentClass` on the pager item itself:

```html
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
```

Pagers must be outside of the `data-slideshow-items` element.

### Setting Up Your CSS

Note the use of the `apos-current` class (or the value of the `currentClass` option if you passed one in)  on the first list item. You must initially apply this class to the first item. *In your CSS, make sure list items in your slideshow are hidden unless they have this class.* Your CSS might look like this:

```css
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
```

*If you don't like `apos-current`, you can change the name of this class via the `currentClass` option when calling `projector`.*

### Your JavaScript: Invoking `jquery-projector`

Now just select your slideshow and call `projector`:

```javascript
<script type="text/javascript">
  $(function() {
      $('.my-slideshow').projector();
  });
</script>
```

This will give you a slideshow with a default delay of 5 seconds between items.

### Curent, Next, Previous, and Other

`jquery-projector` adds convenience classes to your slideshow to allow for transitions and visual changes. The active slide gets `currentClass`, which by default is `apos-current`. The element _before_ the current one gets the `previousClass` (default is `apos-previous`), and the element _after_ the current one gets `nextClass` (`apos-next`).

In the event that your slideshow has only _two_ `data-slideshow-items` in it, a third modifier class appears: `apos-other` (or whatever value you give `otherClass`). The item that is not currently active gets `apos-next` and `apos-other`, giving you the option to use your default `apos-next` style (if you have one) or override it by styling `apos-other`. This is useful if you are writing, for example, a horizontal sliding transition (which doesn't work as well with only two slides).

#### With all of the options:

```javascript
$('.my-slideshow').projector({
  // the delay between each slideshow item specified in milliseconds.
  // set this to 0 to turn off automatic slideshow advancing.
  delay: 2000,
  // the classname applied to the current slideshow item
  currentClass: 'apos-current',
  // the classname applied to the item before the current item
  previousClass: 'apos-previous',
  // the classname applied to the item after the current item
  nextClass: 'apos-next',
  // the classname applied to the other item when the
  // slideshow is of length 2
  otherClass: 'apos-other',
  // turns off automatic height when set to `true` (see the Automatic Height section below).
  // defaults to `false`.
  noHeight: false,
  // turns off the next and previous classes, leaving only `apos-current`.
  // defaults to `false`.
  noNextAndPreviousClasses: false
});
```

You can also set these options on the outermost element of the slideshow using data attributes:
```html
<div class="my-slideshow" data-delay="2000" data-no-height="true" data-current-class="my-current-class" data-next-class="my-next-class" data-previous-class="my-previous-class" data-other-class="my-other-class" data-no-next-and-previous-classes="false">
  <!-- ... Etc -->
</div>
```

Note that if both data-attributes and javascript option are present, the data-attributes win.

### Automatic Height

The height of the slideshow is automatically fixed based on the tallest item in the slideshow. Note that the height of the tallest item can be affected by your CSS decisions. For instance, if you impose a `max-height` on the slideshow images, that will be respected.

This prevents the rest of the page below the slideshow from "jumping" as the slideshow auto-rotates.

Note that this assumes you are using CSS to force a consistent width for all of the images and allowing the height to scale in order to maintain the aspect ratio, with the optional use of `max-height` as well.

You can disable this autosizing behavior by setting the `noHeight` option to `true`, or by setting the `data-no-height` attribute on the outer element of your slideshow (no value is needed).

## Changelog

0.3.0: Projector instances can be nested inside each other! As a result, `data-pager`, `data-next`, and `data-previous` elements must be outside of the `data-slideshow-items` element. This is the reason for the 0.2 - 0.3 switch.

0.2.5: added `otherClass` (`apos-other` by default) for slideshows of length 2.

0.2.4: added next and previous classes around the `currentClass` as a hook for CSS transitions. Use these to create sliding and fading animations. Added the options `nextClass` and `previousClass` to configure classnames, as well as `data-next-class` and `data-previous-class` data-attributes. Added the `noNextAndPreviousClasses` option in the event that this feature should be turned off. Updated some demo styles.

0.2.3: added `data-current-class` data-attribute to set the `currentClass` option.

0.2.2: allowed for multiple instances on the same selector and added the ability to have pagers which reference a particular item in the slideshow. Also have added a demo for testing purposes.

0.2.0, 0.2.1: simplified the automatic height calculations. We trust jQuery to tell us the heights of the slideshow items. One benefit is that you may have additional elements beyond images, such as credits and titles, in each `[data-slideshow-item]` element.

## About P'unk Avenue and Apostrophe

`jquery-projector` was created at [P'unk Avenue](http://punkave.com) for use in Apostrophe, an open-source content management system built on node.js. If you like `jquery-projector` you should definitely [check out apostrophenow.org](http://apostrophenow.org). Also be sure to visit us on [github](http://github.com/punkave).

## Support

Feel free to open issues on [github](http://github.com/punkave/jquery-projector).


<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/jquery-projector/master/logos/logo-box-builtby.png" /></a>
