'use strict';

module.exports = function() {
  $.gulp.task('sprite:png', function () {
	  return $.gulp.src('./source/sprite/*.png')
		  .pipe($.gp.spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.scss',
			algorithm: 'top-down'
	  }))
	  .pipe($.gulp.dest($.config.root + '/assets/img'))
	});
};