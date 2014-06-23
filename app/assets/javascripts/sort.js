$(function() {
  var sort = (function () {
    var options = {
      valueNames: ['title', 'category', 'author'],
      item: 'book',
      listClass: 'book-list',
      page: 500
    },
        bookList = new List('books', options);

    function updatedSort(event) {
      // Has to be somewhere in the event to get this data
      $('.button-group .button.active').removeClass('active');
      var $button = $('.button-group .button.asc, .button-group .button.desc');
      $button.addClass('active');
    }

    function categorySortDropdown(event) {
      bookList.sort('category', { order: "asc" });
    }

    function categoryLinkSelect(event) {
      event.preventDefault();
      var els = $('.book-list').find('[data-category="' + this.textContent + '"]');
      console.log(els);
      console.log(this.textContent);
    }

    function publicInit() {
      bookList.on('updated', updatedSort);
      bookList.sort('title', { order: "asc" });
      $('.button.category').on('click.fndtn.dropdown', categorySortDropdown);
      $('#categories-list').on('click', '.category-link', categoryLinkSelect);
    }

    return {
      init: publicInit
    };

  })();

  sort.init();

});
