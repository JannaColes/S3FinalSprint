document.getElementById("addResort-form").addEventListener("submit", function(e) {
    
})


function searchByPostgresId() {
    const id = document.getElementById('search-by-postgresId-input').value;
    console.log(id); 
    window.location.href = `/admin/searchPostgres?id=${id}`;
}

function searchByMongoId() {
    const id = document.getElementById('search-by-mongoId-input').value;
    console.log(id); 
    window.location.href = `/admin/searchMongo?id=${id}`;
}

function searchByKeyword() {
    const keyword = document.getElementById('search-by-keyword-input').value;
    console.log(keyword); 
    window.location.href = `/admin/search?keyword=${encodeURIComponent(keyword)}`;
}