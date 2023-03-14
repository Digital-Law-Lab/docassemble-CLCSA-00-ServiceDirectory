// insert Alpine into head with defer
$('head').append(
  $(
    '<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>'
  )[0]
);

// don't run until Alpine has loaded and is starting to initialise
document.addEventListener('alpine:init', () => {
  Alpine.data('boxMultiSelect', () => ({
    items: [],

    checkOrigin(index) {
      // get original checkbox item and toggle
      document.querySelectorAll('.da-field-checkboxes input')[index].checked =
        !document.querySelectorAll('.da-field-checkboxes input')[index].checked;
    },

    init() {
      // hide original checkboxes
      document.querySelector('.dafieldpart').classList.add('visually-hidden');
      let _optList = [];

      // for each checkbox item get the lable, image src, checked state, and index number
      document
        .querySelectorAll('.da-field-checkboxes label')
        .forEach((el, index) => {
          _optList.push({
            label: el.innerText.trim(),
            img: el.querySelector('span.labelauty-unchecked > img').src,
            index: index,
            checked: !!document.querySelector('input#' + el.getAttribute('for'))
              .checked,
          });
        });

      // update the new box list
      this.items = _optList;
    },
    replaceImgToSvg(el) {
      // DA loads svg files in img tag not svg, thus, get src and make a get request and replace img with actual svg element. this is needed to manipulate the colour when the background is dark
      $.get(
        el.src,
        function (data, status) {
          if (status == 'success') {
            let svgEl = $(data).find('svg');
            el.replaceWith(svgEl[0]);
          }
        },
        'xml'
      );
    },
  }));
});

/*
 * Place the Safe Exit button outside the toggler
 */

// wrap the code in a daPageLoad trigger so that the code is re-executed when the user navigates from screen to screen
$(document).on('daPageLoad', function () {
  // get the exit button - the text inside `contains` should match `exit label`.
  var escapeRef = $('#danavbar-collapse .nav-link:contains(Safe Exit)');
  escapeRef.parents('.nav-item').remove(); // remove the `li` item for the exit button
  escapeRef.removeClass('nav-link');
  escapeRef.attr('id', 'escapeBtn');
  escapeRef.addClass('btn btn-warning btn-da'); // add classes to make it look like a button
  // check if the mobile nave has other items
  if ($('#danavbar-collapse .navbar-nav').children().length == 0) {
    // the menu only has the exit button so remove it
    $('#danavbar-collapse').remove();
    $('#damobile-toggler').remove();
    // align to the far right
    escapeRef.addClass('ms-auto');
  } else {
    escapeRef.css('margin-left', '10px'); // add space between toggle icon and exit button
  }
  // add the button to the nav
  $('.danavcontainer').append(escapeRef);
});
