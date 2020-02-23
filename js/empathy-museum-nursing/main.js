(function($) {
  const minShoeSize = 2;
  const maxShoeSize = 14;
  const availableShoeSizes = [2,3,5,7];

  $(document).ready(init);

  function init() {
    hoverEvents();
    clickEvents();
  }

  function hoverEvents() {    
    const hovers = '.do-hover, a';
    $(hovers).on('mouseenter', doMouseEnter);
    $(hovers).on('mouseleave', doMouseLeave);
  }

  function clickEvents() {
    $('button.counter').on('click', doCounter);
    $('#arrow-down').on('click', doScroll);
  }

  function doMouseEnter() {
    const $el = $(this);
    $el.addClass('is-hover');

    if ($el.hasClass('do-enlarge')) {
      $el.addClass('is-enlarge');
    }
  }

  function doMouseLeave() {
    const $el = $(this);
    $el.removeClass('is-hover is-enlarge');
  }

  function doScroll() {
    $('html, body').animate({
      scrollTop: $('#bottom-half').offset().top
    }, 300);
  }

  function doCounter() {
    const $el = $(this);
    const $shoeSize = $('#shoe-size');
    const isMinus = $el.attr('id') === 'minus';
    let shoeSize = parseInt($shoeSize.text());
    
    if (isMinus && shoeSize > minShoeSize) {
      shoeSize--;
    } else if(!isMinus && shoeSize < maxShoeSize) {
      shoeSize++;
    }

    $shoeSize.text(shoeSize);

    doHref(shoeSize);
  }

  function doHref(shoeSize) {
    let hrefShoeSize = shoeSize;
    const $counterAction = $('#counter-action');

    if (!availableShoeSizes.includes(hrefShoeSize)) {
      hrefShoeSize = availableShoeSizes.reduce(function (prev, curr) {
        return (Math.abs(curr - hrefShoeSize) < Math.abs(prev - hrefShoeSize) ? curr : prev);
      });
    }

    $counterAction.attr('href', `shoe-${hrefShoeSize}.html`);
  }

})(jQuery);