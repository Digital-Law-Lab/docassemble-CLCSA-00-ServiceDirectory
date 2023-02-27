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

      // for each checkbox item get the lable, image src, and index number
      document
        .querySelectorAll('.da-field-checkboxes label')
        .forEach((el, index) => {
          _optList.push({
            label: el
              .querySelector('span.labelauty-unchecked')
              .innerText.trim(),
            img: el.querySelector('span.labelauty-unchecked > img').src,
            index: index,
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
 * Add Safe Exit button
 */
// wrap the code in a daPageLoad trigger so that the code is re-executed when the user navigates from screen to screen
$(document).on('daPageLoad', function () {
  // check if button already exists (in which case lenght will be 1), and only add the button if it doesn't exist (length is 0)
  if ($('#escapeBtn').length == 0) {
    // add button to the end of the parent nav container
    $('.danavcontainer').append(
      '<a id="escapeBtn" href="https://www.google.com" class="btn btn-warning btn-da">Safe Exit</a>'
    );
  }
});
