// Enable tooltips everywhere.
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

// jQuery block
$(document).ready(function () {
    // Initialize Masonry
    $('.masonry-grid').masonry({
        itemSelector: '.masonry-grid-item',
        columnWidth: '.masonry-grid-sizer',
        percentPosition: false
    });

    // $('.fixed-nav-item-link').click(e => {
    //     const target = e.currentTarget;
    //     // Remove active class from current active button.
    //     $('.fixed-nav-item-link').removeClass('active');

    //     // Then add the active class to the target.
    //     $(target).addClass('active');
    // });
});