const abbreviationsInput = document.querySelector('#filter');
const tr = document.getElementsByTagName('tr');

(function() {
    for (i = 0; i < tr.length; i++) {
        let td = tr[i].firstElementChild;
        td.style.textTransform = "uppercase";
    }
})();

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