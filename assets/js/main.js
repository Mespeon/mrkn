// Enable tooltips everywhere.
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Construct navigation bar
const nav = document.getElementById('nav-list');
const generateNavItems = [].slice.call(document.querySelectorAll('[data-group="nav-items"]')).map((item, index) => {
  // Construct navigation item div
  const navDiv = document.createElement('div');
  navDiv.setAttribute('data-nav-name', `${item.dataset.name}`)
  navDiv.classList.add('fixed-nav-item', 'col-12', 'mb-3');

  // Construct navigation item link
  const navDivHref = document.createElement('a');
  navDivHref.innerText = item.dataset.name;
  navDivHref.setAttribute('href', '#' + `${item.dataset.name.replace(' ', '').toLowerCase()}`);
  navDivHref.classList.add('fixed-nav-item-link', 'fw-bold');
  if (index == 0) {
    navDivHref.classList.add('active');
  }

  // Append to nav bar
  navDiv.append(navDivHref);
  nav.appendChild(navDiv);
});

// jQuery blocks
$(document).ready(function () {
    // Initialize Masonry
    $('.masonry-grid').masonry({
        itemSelector: '.masonry-grid-item',
        columnWidth: '.masonry-grid-sizer',
        percentPosition: false
    });

    // Change active nav when clicking
    $('.fixed-nav-item-link').click(e => {
        const target = e.currentTarget;
        // Remove active class from current active button.
        $('.fixed-nav-item-link').removeClass('active');

        // Then add the active class to the target.
        $(target).addClass('active');
    });

    
    const navSections = [].slice.call(document.querySelectorAll('section'));
    $(window).scroll(function () {
      var fromTop = $(this).scrollTop();
      var documentBottom = document.body.scrollHeight;
      var windowInnerHeight = $(this).innerHeight();
      
      // Determine if the window is scrolled all the way to the bottom.
      if (documentBottom - Math.ceil(fromTop + windowInnerHeight) + 1 <= 1) {
        // Remove any active classes from navs that are not the last child.
        $(nav).children(':not(:last-child)').find('a').removeClass('active');

        // Find the last child of the nav bar then add the active class to its anchor tag.
        $(nav).find('div:last-child').find('a').addClass('active');
      }
      else {
        var current = navSections.map((item) => {
          // Get heading element of each section.
          const heading = $(item).children('div').children('h2');
  
          // Push element if its heading element is near the top of the page.
          // Heading distance from top = (element top offset - 50)
          if (($(heading).offset().top - (fromTop * 0.1)) <= fromTop) {
            return $(item);
          }
        });
  
        // Get current section in viewport.
        var activeSection = current.findLastIndex((item) => { return item != null ? item : 0});
        var previousActiveSection = activeSection >= 0 ? -1 : activeSection;
        if (activeSection >= 0) {
          // If the previous section has changed, remove the active class from all anchor tags in the nav list.
          if (activeSection != previousActiveSection) {
            $(nav).find('a').removeClass('active');
          }
  
          // Get active nav item.
          const activeNav = document.querySelector(`[data-nav-name="${current[activeSection][0].dataset.name}"]`);        
  
          // Get anchor child of active nav then add an active class to it.
          const anchor = $(activeNav).find('a').addClass('active');
        }
      }
    });
});
