'use strict';
var theme = {
  /**
   * Theme's components/functions list
   * Comment out or delete the unnecessary component.
   * Some components have dependencies (plugins).
   * Do not forget to remove dependency from src/js/vendor/ and recompile.
   */
  init: function () {
    //  theme.rellax();
  },
  /**
   * Rellax.js
   * Adds parallax animation to shapes and elements
   * Requires assets/js/vendor/rellax.min.js
  rellax: () => {
    if(document.querySelector(".rellax") != null) {
      window.onload = function() {
        var rellax = new Rellax('.rellax', {
          speed: 2,
          center: true,
          breakpoints: [576, 992, 1201]
        });
        var projects_overflow = document.querySelectorAll('.projects-overflow');
        imagesLoaded(projects_overflow, function() {
          rellax.refresh();
        });
      }
    }
  },
  */
}
theme.init();