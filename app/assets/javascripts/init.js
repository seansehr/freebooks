// random onload functions.

$(function() {
  $(document).foundation();

  // Toggle the category filter dropdown.
  $('#category-filter').on('click', function (e) {
    $(this).toggleClass('opened');
    $('.category-list').toggleClass('hidden');
  });

  // If user clicks outside of the menu close the category filter dropdown.
  $(document).mouseup(function (e) {
    if ($('.category-list').hasClass('hidden')) {
      return;
    }
    var container = $('.fixed');

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
      $('#category-filter').toggleClass('opened');
      $('.category-list').toggleClass('hidden');
    }
  });

  // Small object for handling Read More functionality.
  var descriptionToggle = {
    close: function (target) {
      $(target).removeClass('open');
      $('.readmore', target).text('Read More');
    },
    open: function (target) {
      $(target).addClass('open');
      $('.readmore', target).text('Read Less');
    },
    toggle: function (target) {
      if ($(target).hasClass('open')) {
        this.close(target);
      }
      else {
        this.open(target);
      }
    }
  };

  // Attach Read More functionality.
  $('body').on('click', '.readmore', function(event) {
    event.preventDefault();
    var $parent = $(this).parent('.description');
    descriptionToggle.toggle($parent);
  });
});
