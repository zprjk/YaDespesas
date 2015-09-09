'use strict';

var gulp = require('gulp'),
  // sass = require('gulp-sass'),
  // rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  minify = require('gulp-minify-css'),
  ngAnnotate = require('gulp-ng-annotate'),
  inject = require('gulp-inject'),
  angularFilesort = require('gulp-angular-filesort'),
  yargs = require('yargs').argv,
  gulpif = require('gulp-if'),
  runSequence = require('run-sequence'),
  mainBowerFiles = require('main-bower-files'),
  connect = require('gulp-connect');

//cli option --target
//WIP TODO:Mudar para process.env.NODE_ENV
var target = yargs.target === 'production' ? true : false;

var SRC = 'src';
var DIST = 'www';

//watch paths
var paths = {
  js: SRC + '/**/*.js',
  css: SRC + '/**/*.css',
  html: SRC + '/**/*.html',
  image: SRC + '/**/*.{png,jpeg}',
  bower: SRC + '/bower_components/**/*'
};

gulp.task('default', function(cb) {
  runSequence('serve', cb);
});

gulp.task('serve', function(cb) {
  runSequence('build', 'connect', 'watch', cb);
});

//Builds 'www' folder
gulp.task('build', function(cb) {
  runSequence('clean:build', 'inject:main-bower-files', 'inject', ['js', 'js:main-bower-files', 'html', 'css', 'image', 'other-files'], cb);
});

gulp.task('js', function() {
  return gulp.src([paths.js, '!' + paths.bower], {
      base: SRC
    })
    .pipe(gulpif(target, ngAnnotate()))
    .pipe(gulpif(target, uglify()))
    .pipe(gulp.dest(DIST))
    .pipe(connect.reload());
});

gulp.task('js:main-bower-files', function() {
  return gulp.src(mainBowerFiles({
      includeDev: true
    }), {
      base: SRC + '/bower_components'
    })
    .pipe(gulp.dest(DIST + '/bower_components'))
    .pipe(connect.reload());
});

gulp.task('css', function() {
  return gulp.src([paths.css, '!' + paths.bower], {
      base: SRC
    })
    // .pipe(gulpif(target, minify())) //wtf not working. Why?
    .pipe(gulp.dest(DIST))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src([paths.html, '!' + paths.bower], {
      base: SRC
    })
    .pipe(gulp.dest(DIST))
    .pipe(connect.reload());
});

gulp.task('image', function() {
  return gulp.src([paths.image, '!' + paths.bower], {
      base: SRC
    })
    .pipe(gulp.dest(DIST))
    .pipe(connect.reload());
});

gulp.task('other-files', function() {
  return gulp.src(['*.ico'], {
      cwd: SRC
    })
    .pipe(gulp.dest(DIST))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  return connect.server({
    root: DIST,
    port: '8100',
    livereload: true
  });
});

//inject js & css
gulp.task('inject', function() {
  var target = gulp.src(SRC + '/index.html');
  var sources = gulp.src([paths.js, paths.css, '!' + paths.bower]).pipe(angularFilesort());

  return target.pipe(inject(sources, {
      relative: true
    }))
    .pipe(gulp.dest(SRC))
    .pipe(connect.reload());
});

gulp.task('inject:main-bower-files', function() {
  var target = gulp.src(SRC + '/index.html');
  var sources = gulp.src(mainBowerFiles({
    includeDev: true
  }));

  return target.pipe(inject(sources, {
      name: 'bower',
      relative: true
    }))
    .pipe(gulp.dest(SRC))
    .pipe(connect.reload());
});

gulp.task('clean:build', function() {
  // runSequence(['clean:js', 'clean:css', 'clean:html', 'clean:images', 'clean:fonts'], cb);
  return del([
    DIST + '/**/*',
  ], {
    force: true
  });
});

gulp.task('watch', function(cb) {
  gulp.watch(paths.html, ['html']);

  // gulp.watch(['app/**/*.*!(html,js,css,png,jpeg)', 'assets/**/.*!(html,js,css,png,jpeg)', '*.*!(html,js,css,png,jpeg)'], ['other-files']);

  gulp.watch(paths.image, ['image']);

  gulp.watch([paths.js, paths.css], function(event) {
    if (event.type === 'changed') {
      if (event.path.indexOf('.js') !== -1)
        gulp.start('js');
      else
        gulp.start('css');
    }

    if (event.type === 'added' || event.type === 'deleted') {
      if (event.path.indexOf('.js') !== -1)
        gulp.start(['inject', 'js']);
      else
        gulp.start(['inject', 'css']);
    }
  });

  //Note:Throwing 'Error: watch EPERM' if you deleted a bower plugin
  gulp.watch(paths.bower, function(event) {
    if (event.type === 'added' || event.type === 'deleted')
    // gulp.start(['inject:main-bower-files', 'js:main-bower-files']);
      runSequence('inject:main-bower-files', 'js:main-bower-files');
  });

  cb();
});




// gulp.task('sass', function(done) {
//   return gulp.src('./scss/ionic.app.scss')
//     .pipe(sass({
//       errLogToConsole: true
//     }))
//     .pipe(gulp.dest('./www/css/'))
//     .pipe(minifyCss({
//       keepSpecialComments: 0
//     }))
//     .pipe(rename({
//       extname: '.min.css'
//     }))
//     .pipe(gulp.dest('./www/css/'))
//     .on('end', done);
// });

// gulp.task('install', ['git-check'], function() {
//   return bower.commands.install()
//     .on('log', function(data) {
//       gutil.log('bower', gutil.colors.cyan(data.id), data.message);
//     });
// });

// gulp.task('git-check', function(done) {
//   if (!sh.which('git')) {
//     console.log(
//       '  ' + gutil.colors.red('Git is not installed.'),
//       '\n  Git, the version control system, is required to download Ionic.',
//       '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
//       '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
//     );
//     process.exit(1);
//   }
//   done();
// });
