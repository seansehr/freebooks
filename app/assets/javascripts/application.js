// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require list
//= require_tree .

$(function() {
  $(document).foundation();

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

  $('.review-load').on('click', function(event) {
    event.preventDefault();
    var parent = $(this).parent(),
        reviewWidget = $('.review-textarea', parent).val(),
        descriptionDiv = $(this).parents('.description');

    descriptionToggle.open(descriptionDiv);
    $('.review-container', parent).append(reviewWidget);
    $(this).hide();
  });

  $('.readmore').on('click', function(event) {
    event.preventDefault();
    var $parent = $(this).parent('.description');
    descriptionToggle.toggle($parent);
  });
});
