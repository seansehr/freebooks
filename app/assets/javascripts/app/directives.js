// Custom directive for loading book reviews.
bookApp.directive('loadReview', function(){
  return {
    link: function (scope, element) {
      element.on('click', function (event) {
        event.preventDefault();
        var reviewContainer = $(element).siblings('.review-container');
        reviewContainer.html(scope.book.reviews_widget);
      });
    }
  };
});
