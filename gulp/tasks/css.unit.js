'use strict';

module.exports = function() {
  $.gulp.task('sass', function() {
    return $.gulp.src('./build/assets/css/*.css')
      .pipe($.gp.cssunit({
            type     :    'px-to-rem',
            fontSize    :    16
        }))
      .pipe($.gulp.dest($.config.root + '/assets/css'))
  })
};