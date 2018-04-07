const abbreviationsInput = document.querySelector('#filter');
const tr = document.getElementsByTagName('tr');

(function() {
    for (i = 0; i < tr.length; i++) {
        let td = tr[i].firstElementChild;
        td.style.textTransform = "uppercase";
    }
})();

(function() {
    for (i = 0; i < tr.length; i++) {
        let td = tr[i].firstElementChild;
        td.addEventListener('mouseover', slangHover);
        td.addEventListener('click', slangClick);
        td.addEventListener('mouseleave', slangLeave)
    }
})();

function slangHover(e) {
    e.target.style.cursor = 'pointer';
    e.target.style.color = '#7b1fa2';
    e.target.style.fontWeight = "bold";

}

function slangClick(e) {
    let prefixSearch = 'https://www.google.iq/search?q=';
    let stringToSearch = prefixSearch + e.target.textContent.toUpperCase() + ' ' + 'abbreviation';
    window.open(stringToSearch, '_blank');
}

function slangLeave(e) {
    e.target.style.color = '#000';
    e.target.style.fontWeight = "normal";
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