// Filters for Book App.

// Round the average rating to the half for star count.
bookApp.filter('averageRating', function () {
  return function (input) {
    return Math.round(input * 2) / 2;
  };
});

// Filter books by selected categories.
bookApp.filter('categoryFilter', function($filter) {
  return function(items, categories) {
    // Get the categories that are checked.
    var filters = $filter('filter')(categories, {checked: true});
    if (typeof filters === 'undefined' || !filters.length) {
      return items;
    }
    var filtered = [];
    // TODO: Is there a better way to do this?
    angular.forEach(filters, function (category) {
      angular.forEach(items, function (item) {
        if (item.category.id === category.id) {
          filtered.push(item);
        }
      });
    });
    return filtered;
  };
});

// Get the number of categories selected.
bookApp.filter('categoryCount', function($filter) {
  return function(categories) {
    var filters = $filter('filter')(categories, {checked: true});
    if (typeof filters === 'undefined' || !filters.length) {
      return 0;
    }

    return filters.length;
  };
});

// Get the books that are added to the cart.
bookApp.filter('cart', function($filter) {
  return function(books, ignore) {
    if (ignore) {
      return books;
    }
    var cart = $filter('filter')(books, {cart: true});

    if (typeof cart === 'undefined' || !cart.length) {
      return [];
    }

    return cart;
  };
});
