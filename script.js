class Library {
  constructor() {
    this.books = [];
  }
  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }
  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }
  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
  getBook(title) {
    return this.books.find((book) => book.title === title);
  }
}

const library = new Library();

class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    complete = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.complete = complete;
  }
}

const getBookFromInput = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const complete = document.getElementById("complete").checked;
  return new Book(title, author, pages, complete);
};

const booksGrid = document.getElementById("booksGrid");

const createBookCard = (book) => {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const buttonGroup = document.createElement("div");
  const readBtn = document.createElement("button");
  readBtn.onclick = toggleRead;
  const removeBtn = document.createElement("button");
  removeBtn.onclick = removeBook;

  bookCard.classList.add("book-card");
  buttonGroup.classList.add("button-group");
  readBtn.classList.add("btn");
  removeBtn.classList.add("btn");

  title.textContent = `"${book.title}"`;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";

  if (book.complete) {
    readBtn.textContent = "Complete ✅";
    readBtn.classList.add("btn-light-green");
  } else {
    readBtn.textContent = "Not Complete";
    readBtn.classList.add("btn-light-red");
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  buttonGroup.appendChild(readBtn);
  buttonGroup.appendChild(removeBtn);
  bookCard.appendChild(buttonGroup);
  booksGrid.appendChild(bookCard);
};

const updateBooksGrid = () => {
  resetGrid();
  for (let book of library.books) {
    createBookCard(book);
  }
};

const resetGrid = () => {
  booksGrid.innerHTML = "";
};

const addBookToLibrary = (e) => {
  e.preventDefault();
  const newBook = getBookFromInput();

  if (library.isInLibrary(newBook)) return;

  library.addBook(newBook);
  updateBooksGrid();
};
const addBookButton = document.getElementById("add-book");
addBookButton.onclick = addBookToLibrary;

const removeBook = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ""
  );
  library.removeBook(title);
  updateBooksGrid();
};

const toggleRead = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ""
  );
  const book = library.getBook(title);
  book.complete = !book.complete;
  updateBooksGrid();
};
