// Pagination

$(document).ready(function() {
    $('#myTable').pageMe({
        pagerSelector: '#myPager',
        activeColor: '#7b1fa2',
        prevText: 'Anterior',
        nextText: 'Siguiente',
        showPrevNext: true,
        hidePageNumbers: false,
        perPage: 15
    });
});

// Custom

const abbreviationsInput = document.querySelector('#filter');
const tr = document.getElementsByTagName('tr');
let target;

(function() {
    for (i = 0; i < tr.length; i++) {
        let td = tr[i].firstElementChild;
        td.style.textTransform = "uppercase";
        if (td.textContent.toUpperCase() != 'ABBREVIATIONS') {
            td.addEventListener('mouseover', slangHover);
            td.addEventListener('click', slangClick);
            td.addEventListener('mouseleave', slangLeave);
        }
    }
})();

function slangHover(e) {
    target = e.target;
    target.style.cursor = 'pointer';
    target.style.color = '#7b1fa2';
    target.style.fontWeight = "bold";
}

function slangClick(e) {
    target = e.target;
    let prefixSearch = 'https://www.google.iq/search?q=';
    let stringToSearch = prefixSearch + target.textContent.toUpperCase() + ' ' + 'abbreviation';
    window.open(stringToSearch, '_blank');
}

function slangLeave(e) {
    target = e.target;
    target.style.color = '#000';
    target.style.fontWeight = "normal";
}

abbreviationsInput.addEventListener('keyup', filterAbbreviations);

function filterAbbreviations(e) {
    let text = abbreviationsInput.value.toLowerCase();
    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.textContent.toLowerCase().indexOf(text) != -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}