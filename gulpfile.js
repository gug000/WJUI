var gulp = require('gulp');
var gutil = require('gulp-util');
var os = require('os');
var plumber = require('gulp-plumber');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var streamify = require('gulp-streamify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var open = require('gulp-open');
var gulpSequence = require('gulp-sequence');
var ngtemplates = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var jade = require('gulp-jade');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-minify-css');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var imagemin = require('gulp-imagemin');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var tinypng = require('gulp-tinypng');
var fs = require('fs');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var env = process.env.NODE_ENV || "development";
// env = "production";
var agent = process.env.agent || "yg";
var config = {
    app: "app",
    src: "app",
    test:"test",
    dist: "dist",
    dev: "dev",
    env: env,
    tmp: ".tmp",
    liveloadPort: 9001,
    entries: "app/app.js",
    agent: agent
};
gulp.task('clean:temp',function(){
    return del(config.tmp);
});
gulp.task('clean:dev',function(){
    return del(config.dev);
});
gulp.task('clean:dist',function(){
    var dir = [config.tmp,config.dist];
    var option = {dot:true};
    return del(dir,option);
});




gulp.task('ngtemplates:dev', function() {
    var options = {
        module: config.app,
        root: "modules"
    };
    return gulp.src(config.src + "/modules/**/*.html")
        .pipe(ngtemplates(options))
        .pipe(gulp.dest(config.dev + "/scripts"));
});
gulp.task('ngtemplates:WJUI:dev', function() {
    var options = {
        module: config.app,
        root: "WJUI"
    };
    return gulp.src(config.src + "/WJUI/**/*.html")
        .pipe(ngtemplates(options))
        .pipe(gulp.dest(config.dev + "/scripts/WJUI"));
});
gulp.task('less:dev', function() {
    var src = [config.src + "/styles/**/*.less",config.src + "/modules/**/*.less"];
    var dest = config.dev + "/styles";
    return gulp.src(src)
        .pipe(rename({dirname: ''}))
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(dest));
});
gulp.task('less:WJUI:dev', function() {
    var src = config.src + "/WJUI/**/*.less";
    var dest = config.dev + "/styles";
    return gulp.src(src)
        .pipe(rename({dirname: ''}))
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(concat('WJUI.css'))
        .pipe(gulp.dest(dest));
});
gulp.task('copycss:WJUI:dev',function(){
    return gulp.src(["WJUI/**/*.css"], {
        cwd: config.src,
        dot: true,
        base: config.src
    })
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.dev+'/styles'));
});
gulp.task('jsconcat:dev', function() {
    return gulp.src([config.src+"/modules.js",config.src + "/WJUI/**/*.js",config.src + "/modules/**/*.js",config.entries])
        .pipe(plumber())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(config.dev + "/scripts"))
});
gulp.task('ngAnnotate:dev', function() {
    return gulp.src("bundle.js", {
        cwd: config.dev + "/scripts"
    })
        .pipe(plumber())
        .pipe(ngAnnotate())
        .pipe(gulp.dest(config.dev + "/scripts"));
});
gulp.task('copy:dev', function() {
    return gulp.src([
        "*.{ico,txt}",
        "fonts/*",
        "swf/**/*",
        "*_dev.html"
    ], {
        cwd: config.src,
        dot: true,
        base: config.src
    })
        .pipe(gulp.dest(config.dev));
});
gulp.task('fonts:dev', function() {
    return gulp.src([config.src+"/WJUI/fonts/*",config.src+"/fonts/*"])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.dev+"/fonts"));
});
gulp.task('images:dev', function() {
    return gulp.src([
        "images/*",
        "WJUI/images/*"
    ], {
        cwd: config.src,
        dot: true,
        base: config.src
    })
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.dev+"/images"));
});
gulp.task('less:watch',function(){
    gulp.watch([config.src+"/modules/**/*.less",config.src+"/WJUI/**/*.less"],['less:dev','less:WJUI:dev']);
});
gulp.task('js:watch',function(){
    gulp.watch([config.src+"/modules/**/*.js",config.src+"/WJUI/**/*.js"],['jsconcat:dev','ngAnnotate:dev']);
});
gulp.task('html:watch',function(){
    gulp.watch([config.src+"/modules/**/*.html",config.src+"/WJUI/**/*.html"],['ngtemplates:dev','ngtemplates:WJUI:dev']);
});





gulp.task('dev', gulpSequence(
    "clean:dev",
    "ngtemplates:dev",
    "ngtemplates:WJUI:dev",
    "jsconcat:dev",
    "ngAnnotate:dev",
    "less:dev",
    "less:WJUI:dev",
    "copycss:WJUI:dev",
    "copy:dev",
    "fonts:dev",
    "images:dev",
    "less:watch",
    "js:watch",
    "html:watch"
));
