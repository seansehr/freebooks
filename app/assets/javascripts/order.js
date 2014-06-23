$(function() {
  var order = (function () {
    var userBooks = [];

    function bookAdd(event) {
      var book = event.detail.book;
      if (userBooks.indexOf(book) > -1) {
        return;
      }
      userBooks.push(book);
      updateOrder(book);
      saveBooks();
    }

    function bookRemove(event) {
      event.preventDefault();
      event.stopPropagation();
      var book = event.detail.book,
          index = userBooks.indexOf(book);

      if (index > -1) {
        userBooks.splice(index, 1);
      }
      updateOrder(book, 'remove');
      saveBooks();
    }

    function getAllBooks() {
      $.get('/books.json', function(data) {
        books = data;
      });
    }

    function loadBooks() {
      if (JSON.parse(localStorage.getItem('books'))) {
        userBooks = JSON.parse(localStorage.getItem('books'));
        userBooks.forEach(function(book) {
          updateOrder(book, 'add');
        });
      }
    }

    function updateBook(isbn, method) {
      method = method || 'add';
      switch(method) {
        case 'add':
          $('.order-list').append(orderTemplate(isbn));
          $('.book-list a[data-isbn="' + isbn + '"]').addClass('remove').text('Remove from Order');
          break;
        case 'remove':
          $('.order-list tr[data-isbn="' + isbn + '"]').remove();
          $('.book-list a[data-isbn="' + isbn + '"]').removeClass('remove').text('Add to Order');
          break;
      }
    }

    function updateOrder(book, method) {
      $('.order-num').text(userBooks.length);
      updateBook(book, method);
    }

    function orderClick(event) {
      event.preventDefault();
      var eventTrigger = 'addBook';
      if ($(this).hasClass('remove')) {
        eventTrigger = 'removeBook';
      }
      var message = new CustomEvent(eventTrigger, {
        detail: {
          book: $(this).attr('data-isbn')
        },
        bubbles: true,
        cancelable: true
      });
      event.currentTarget.dispatchEvent(message);
    }

    function orderFormClick(event) {
      event.preventDefault();
      $(this).toggleClass('active');
      $('.order-form').toggleClass('opened');
    }

    function orderTemplate(isbn) {
      var book = books.filter(function(obj) {
        return obj.isbn == isbn;
      })['0'],
          fields = ['isbn', 'title', 'author', 'category', 'format'];

      if (typeof book === 'undefined') {
        return '';
      }

      var row = $('<tr />', {'data-isbn' : book.isbn});
      fields.forEach(function(field) {
        $('<td />', {
          text: book[field]
        }).appendTo(row);
      });

      $('<td />', {
        html: '<a href="#" class="add-to-order remove" data-isbn="' + book.isbn + '"><i class="fa fa-minus-square"></i></a>'
      }).appendTo(row);

      return row;
    }

    function saveBooks() {
      localStorage['books'] = JSON.stringify(userBooks);
    }

    function publicInit() {
      window.addEventListener('addBook', bookAdd, false);
      window.addEventListener('removeBook', bookRemove, false);
      $('body').on('click', '.add-to-order', orderClick);
      // $('.cart').on('click', '.button', orderFormClick);
      loadBooks();
    }

    return {
      init: publicInit
    };
  })();

  order.init();
});
