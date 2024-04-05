function searchById() {
    const id = document.getElementById('search-by-id-input').value;
    console.log(id); 
    window.location.href = `/admin/search?id=${id}`;
}

function searchByKeyword() {
    const keyword = document.getElementById('search-by-keyword-input').value;
    console.log(keyword); 
    window.location.href = `/admin/search?keyword=${encodeURIComponent(keyword)}`;
}
