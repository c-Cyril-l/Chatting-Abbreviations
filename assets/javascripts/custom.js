// Global declarations.

// search box.
let abbreviationsInput = document.querySelector('#filter');

// Table rows.
let tr = document.getElementsByTagName('tr');

// List items inside unordered lists.
let abbvList = document.getElementsByTagName('li');

// URL retriever.
let cuurPage = location.pathname;


// organize items to table while loading...
document.addEventListener('DOMContentLoaded', loading);

// Filtering Tables items by checking where we landed.
function loading() {

  filter('a');
  document.getElementById('total_reg').textContent = tr.length - 1 + " Abbreviations In Total";

  if (cuurPage.includes('currencies')) {
    filter(null, false, 'other', 0, 18);
    document.getElementById('total_reg').textContent = tr.length - 1 + " Crypto Currencies In Total";
  } else if (cuurPage.includes('emoj')) {
    filter(null, false, 'other', 0, 18);
    document.getElementById('total_reg').textContent = tr.length - 1 + " Emotions In Total";
  }
}

// Mobile support for navbar.
(function($) {
  $(function() {
    $('.sidenav').sidenav();
  });
})(jQuery);

// organize items based on clicked pagination list item...
(function() {
  for (i = 0, len = abbvList.length; i < len; i++) {
    let currentAnchor = abbvList[i].querySelector('a');
    currentAnchor.addEventListener('click', function(e) {
      if (cuurPage.includes('index')) {
        let letter = this.textContent.toLowerCase();
        filter(letter);
      } else {
        if (Number(this.textContent) === 1) {
          filter('', false, 'other', 0, 18);
        } else if (parseInt(this.textContent) === 2) {
          filter('', false, 'other', 19, 36);
        } else if (parseInt(this.textContent) === 3) {
          filter('', false, 'other', 37, 48);
        }
      }

      // Getting the old active list item and remove it.
      var activeItem = document.getElementsByClassName("active");
      activeItem[0].className = activeItem[0].className.replace(/active/g, "");

      // Setting new active list item since the new anchor has been clicked.
      this.parentElement.className += " active";

      // check if the parent of the parent of current anchor is pagination, so that we avoid to showing # tag in url while clicking pagination links.
      if (this.parentElement.parentElement.classList.contains('pagination')) {
        e.preventDefault();
      }
    });
  }

})();

// Give any abbreviation 3 events.
(function() {
  // Loop through table rows
  for (i = 0; i < tr.length; i++) {
    // I made this to make abbreviations and currencies and emotions searchable.

    // I choose only first child of current table row which is abbreviations... which is first table data (td)
    let firstTds = tr[i].firstElementChild;

    // Make the abbreviation
    firstTds.style.textTransform = "uppercase";

    // give the abbreviations... events.
    if (firstTds.textContent.toUpperCase() != 'ABBREVIATIONS') {
      firstTds.addEventListener('mouseover', slangHover);
      firstTds.addEventListener('click', slangClick);
      firstTds.addEventListener('mouseleave', slangLeave);
    }
  }
})();

// Hover li item
function slangHover(e) {
  this.style.cursor = 'pointer';
  this.style.color = '#2196f3';
  this.style.textShadow = "#2196f3  0 0 1px"
  this.style.fontWeight = "bold";
}

// Click event for hovered li to give it a search.
function slangClick(e) {
  // Google search perfix.
  let prefixSearch = 'https://www.google.iq/search?q=';

  // Check in which page we're in, so that make an item search for right search for clicked item.
  let suffix;
  if (cuurPage.includes('emoj')) {
    suffix = 'emoji';
  } else if (cuurPage.includes('currencies')) {
    suffix = 'Currency';
  } else {
    suffix = 'abbreviation';
  }

  let stringToSearch = prefixSearch + this.textContent.toUpperCase() + ' ' + suffix;

  // Opening a new window to search for clicked item, so that the user can stay on current page still.
  window.open(stringToSearch, '_blank');
}

// Releasing a hover event and bring the old styles for hovered items.
function slangLeave(e) {
  this.style.color = '#000';
  this.style.fontWeight = "normal";
  this.style.textShadow = "none"
}

// Adding input event to search input field, I used input event instead of keyup, so that we can detect if user erased all inputted text.
abbreviationsInput.addEventListener('input', filterAbbreviations);

// Filtering items by given search result.
function filterAbbreviations(e) {
  let text = abbreviationsInput.value.toLowerCase();
  if (text != '')
    // we check if user inputted something so that we search for what user searched for.
    filter(text, true);
  else
    // we check if user cleared it the search box.
    loading();
}

// Filter function make items filter to search results in search input.
function filter(text, search = true, page = 'main', startform = 0, len = 18) {
  // Check if we're not in main page.
  if (page != 'main') {
    // First change the display property of all items in non-main page to none.
    for (i = 0, count = tr.length; i < count; i++) {
      tr[i].style.display = 'none';

      // We make sure if the item is not from tfoot, otherwise we change its display property to normal.
      if (tr[i].firstElementChild.textContent.toUpperCase() === 'ABBREVIATIONS') {
        tr[i].style.display = '';
      }
    }
    // We change the display property of given items from startfrom to len to normal.
    for (i = startform; i <= len; i++) {
      if (tr[i]) {
        tr[i].style.display = '';
      }
    }
  } else {
    // If we're in main page.
    for (i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        // We check if it's search or just arranging, if searching then we arrange items based on search input, otherwise as first letter match of given letter.
        if (search != true) {
          tr[i].style.display = td.textContent.toLowerCase().indexOf(text) != -1 ? '' : 'none';
        } else {
          tr[i].style.display = td.textContent.toLowerCase().startsWith(text) ? '' : 'none';
        }
      }
    }
  }

}
