let bookName = document.getElementById("Site Name")
let websiteUrl = document.getElementById("Site URL")
let submit = document.getElementById("submit")

let bookscontainer;

if (localStorage.getItem("books") == null) {
    bookscontainer = [];
} else {
    bookscontainer = JSON.parse(localStorage.getItem("books"));
    displayBooks(bookscontainer);
}

submit.addEventListener('click', function addBooks() {
    var book = {
        name: bookName.value,
        website: websiteUrl.value
    };

    bookscontainer.push(book)
    localStorage.setItem("books", JSON.stringify(bookscontainer));
    displayBooks(bookscontainer);
    clearBook();

});

function displayBooks(list) {
    var cartoona = "";
    for (var i = 0; i < list.length; i++) {
        cartoona += `
         <tr>
         <td>${list[i].name}</td>
         <td>${list[i].website}</td>
         <td><button class="btn btn-danger" onclick="deleteBook(${i})" > Delete</button></td>
         <td><a class="btn btn-success"  href="${list[i].website}"> Visite</a></td>
     </tr>
         `

    }
    document.getElementById("tableRow").innerHTML = cartoona;
}


function clearBook() {
    bookName.value = "";
    websiteUrl.value = ""
}

function deleteBook(index) {
    bookscontainer.splice(index, 1)
    localStorage.setItem("books", JSON.stringify(bookscontainer))
    displayBooks(bookscontainer)
}

function searchBook(term) {
    var searchBooks = [];

    for (var i = 0; i < bookscontainer.length; i++) {

        if (bookscontainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            searchBooks.push(bookscontainer[i]);
        }
    }
    displayBooks(searchBooks);
}