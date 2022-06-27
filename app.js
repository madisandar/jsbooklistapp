// create a class
class Book{
	constructor(title,author,isbn){
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// UI
class UI{
	static displayBooks(){
		
		const books = Store.getBook();

	

		books.forEach((book)=>UI.addBookToList(book));
	}

	static addBookToList(book){
		const list = document.getElementById('book-list');

		const row = document.createElement('tr');

		row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='btn btn-danger btn-sm delete'>X</a></td>
		`;

		list.appendChild(row);
	}

	static deleteBook(element){
     if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();
     }
	}
   
    static showAlert(message,className){
    	const div = document.createElement('div');
    	div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
       
        setTimeout(()=> document.querySelector('.alert').remove(),2000);
    }

	static clearFields(){
		document.getElementById('title').value ='';
		document.getElementById('author').value ='';
		document.getElementById('isbn').value ='';
	}


}


class Store{
	// getBooks from local Storage
      static getBook(){
         let books;
         if(localStorage.getItem('books') === null){
           books = [];
         }else{
         	books = JSON.parse(localStorage.getItem('books'));
         }

         return books;
      }
	// addBooks from local Storage
      static addBook(book){
      	const books = Store.getBook();

      	books.push(book);
      	localStorage.setItem('books',JSON.stringify(books));
      }
	// remove Books
	static removeBook(isbn){
		const books = Store.getBook();

		books.forEach((book,index)=>{
			if(book.isbn === isbn){
				books.splice(index,1);
			}
		});

		localStorage.setItem('books',JSON.stringify(books));
	}
}
document.addEventListener('DOMContentLoaded',UI.displayBooks);

// add a Book
document.getElementById('book-form').addEventListener('submit',(e)=>{
	e.preventDefault();
	const title = document.getElementById('title').value;
    const author= document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    
    // validate
    if(title === '' || author === '' || isbn === ''){
    	// show error msg
    	UI.showAlert("Please fill out in all fields",'danger');
    }else{
   const book = new Book(title,author,isbn);
   
   // add a book to UI
   UI.addBookToList(book);

   // add a Book to LocalStorage
   Store.addBook(book);
   
   // delete books from form
  UI.clearFields();
   
   // show success message
     UI.showAlert("Book added",'success');
   }
 
});

// Remove a book
document.getElementById('book-list').addEventListener('click',(e)=>{
	e.preventDefault();
	 
	 // remove from UI
	UI.deleteBook(e.target);
      
      // remove from Store
      Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
      // delete book show error message
      UI.showAlert("Book Removed",'success');
     
 });

