// Controller for the book list.
bookApp.controller('BookListCtrl', function ($scope, $http, $filter) {
  // Get the books via JSON.
  $http({
    method: 'GET',
    url: '/books.json'
  }).success(function(data, status) {
    var books = data,
        lastUpdate = localStorage.getItem('updated');
    // If it hasn't been updated in 2 months, reset it.
    if (!lastUpdate || lastUpdate < (new Date().getTime() - 5256000000)) {
      localStorage.removeItem('categories');
      localStorage.removeItem('books');
    }
    // Get user choices from localStorage.
    var isbns = JSON.parse(localStorage.getItem('books')) || [],
    // Get all the categories available.
        categories = data.map(function(book) {
      // While we are iterating through books, add selected books to cart.
      if (isbns.indexOf(book.isbn) !== -1) {
        book.cart = true;
      }
      return book.category;
    }).sort(function (a, b) {
      return a.name < b.name ? -1 : 1;
    });

    // Now that we know which books are selected, set it to scope.
    $scope.books = books;

    // We only want 1 copy of each category.
    var filteredCategories = [],
        selectedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    angular.forEach(categories, function(category, key) {
      // Check if it is selected.
      if (selectedCategories.indexOf(category.name) !== -1) {
        category.checked = true;
      }
      // Let the first item be added.
      if (key === 0) {
        filteredCategories.push(category);
      }
      // Check if the id is the same as the previous in the array.
      else if (category.id != categories[key-1].id) {
        filteredCategories.push(category);
      }
    });

    $scope.categories = filteredCategories;
    $scope.sortBy = 'title';

    // Add books to localStorage when added to cart.
    $scope.$watch('books', function (newValue, oldvalue) {
      var books = newValue,
          cart = $filter('cart')(books),
      isbns = cart.map(function (book) {
        return book.isbn;
      });

      localStorage.setItem('updated', new Date().getTime());
      localStorage.setItem('books', JSON.stringify(isbns));
    }, true);

    // Add books to localStorage when added to cart.
    $scope.$watch('categories', function (newValue, oldvalue) {
      var filters = $filter('filter')(newValue, {checked: true}),
      selectedCategories = filters.map(function (category) {
        return category.name;
      });
      localStorage.setItem('categories', JSON.stringify(selectedCategories));
    }, true);
  // TODO: Do something when http errors.
  }).error(function(data, status) {
    console.error(status);
    console.error(data);
  });

  // Function for reseting category filtering.
  $scope.categoryReset = function () {
    angular.forEach($scope.categories, function (category) {
      category.checked = 0;
    });
  };
});
