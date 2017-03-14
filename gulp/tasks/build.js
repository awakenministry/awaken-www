'use strict';
var argv  = require('yargs').argv;
var gulp  = require('gulp');
var shell = require('shelljs');
var size  = require('gulp-size');

// include paths file
var paths = require('../paths');

// 'gulp site:tmp' -- copies Jekyll site to a temporary directory to be processed
//noinspection BadExpressionStatementJS
gulp.task('site:tmp', () =>
  gulp.src([paths.sourceFolderName + '/**/*', '!' + paths.sourceDir + paths.assetsFolderName + '/**/*', '!' + paths.sourceDir + paths.assetsFolderName], {dot: true})
    .pipe(gulp.dest(paths.tempDir + paths.sourceFolderName))
    .pipe(size({title: 'Jekyll'}))
);

// 'gulp site' -- builds site with development settings
// 'gulp site --prod' -- builds site with production settings
//noinspection BadExpressionStatementJS
gulp.task('site', done => {
  if (//noinspection BadExpressionStatementJS
!argv.prod) {
    shell.exec('bundle exec jekyll build --future --config _config.common.yml,_config.local.yml');
    done();
  } else if (argv.prod) {
    shell.exec('bundle exec jekyll build --future --config _config.common.yml,_config.prod.yml');
    done();
  }
});

// 'gulp site:check' -- runs Jekyll doctor
//noinspection BadExpressionStatementJS
gulp.task('site:check', done => {
  shell.exec('bundle exec jekyll doctor');
  done();
});
