let bookArray = [] 
const myUser = {"id": 1, "username": "pouros"}

document.addEventListener("DOMContentLoaded", function() {
   urlBooks = "http://localhost:3000/books"
   
   let checkExistingUser = (book) => {
    let existingUser = false
  
    if (book.users.length > 0) {
      book.users.forEach((user) => {
        if (user.username == myUser.username) {
          existingUser = true
        }
      })
    } else {
      existingUser = false
    }
  
    return existingUser
  }
   let domBookList = document.querySelector("#list")

   function fetchBooks() {
        fetch(urlBooks)
        .then(r => r.json())
        .then(fetchedBooks => {
            bookArray = fetchedBooks
            renderAllBooks(bookArray)
            
        })
    }
    function renderAllBooks(books){
    books.forEach(renderBookList)
}

    function renderBookList(book){
        let booklist = document.createElement("li")
        let panelShow = document.createElement("p")
        let panel = document.querySelector("#show-panel")
        let likeButton = document.createElement("button")
        let likersList = document.createElement("ul")
        likersList.id = "users-list"
        likeButton.innerText = "Like"
        booklist.textContent = book.title
        booklist.dataset.id = book.id
        domBookList.append(booklist)
        booklist.addEventListener("click", e =>{
            panel.innerHTML = ''
            if (bookArray.filter(x => x.id === e.target.id)){ 
                panelShow.innerHTML = `
                <img src=${book.img_url} />
                <h2>${book.title}</h2>
                <h4><em>${book.subtitle}</em></h4>
                <h4>${book.author}</h4>
                <p>${book.description}</p>
                <button data-id=
                `
                if (book.users.length > 0) {
                    book.users.forEach((user) => {
                      let likeUser = document.createElement("li")
                      likeUser.innerText = user.username
                      likeUser.id = user.username
              
                      likersList.append(likeUser)
                      
                    })
                  }
                  panel.append(panelShow, likersList, likeButton)
            }
        })  
        let findUser = (user) => {
            return user.username !== myUser.username
          }

        likeButton.addEventListener("click", (event) => {
      if (!checkExistingUser(book)) {
        book.users.push(myUser)
      } else {
        book.users = book.users.filter(findUser)
      }
      
            fetch(`${urlBooks}/${book.id}`, {
              method: "PATCH",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify({
                users: book.users
              })
            })
            .then(response => response.json())
            .then((updatedBook) => {
                book.users = updatedBook.users
                updateLikersList(book.users)
              })
          })
    }
fetchBooks()
let updateLikersList = (users) => {
    let likersList = document.querySelector("ul#users-list")
    likersList.innerHTML = ""
  
    users.forEach((user) => {
      let likeUser = document.createElement("li")
      likeUser.innerText = user.username
      likeUser.id = user.username
      
      likersList.append(likeUser)
    })
  }
});
