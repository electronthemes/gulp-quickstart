const {series, dest, src, watch} = require('gulp')
const twig = require('gulp-twig')
const sass = require('gulp-sass')(require('sass'))
const sourcemap = require('gulp-sourcemaps')
const browsersync = require('browser-sync').create()
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const clean = require('gulp-clean')

// Template engine twig
function templateTask(){
    return src('./src/*.twig')
        .pipe(twig()).pipe(dest('dist'))
}

// SCSS Styles
function styleTask(){
    return src('./src/scss/*.scss')
        .pipe(sourcemap.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemap.write('.'))
        .pipe(dest('dist/assets/css')).pipe(browsersync.stream())
}

// CSS Styles
function cssPluginTask(){
    return src('./src/assets/css/*.css')
        .pipe(concat('plugins.min.css'))
        .pipe(dest('dist/assets/css'))
}

// Image asssets
function imageTask(){
    return src('./src/assets/img/**')
        .pipe(dest('dist/assets/img'))
}

// js asssets
function jsPluginsTask(){
    return src(['./src/assets/js/**/*.js', '!src/assets/js/scripts.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/assets/js'))
}

// Custom JS task
function customJsTask(){
    return src('src/assets/js/scripts.js')
        .pipe(dest('dist/assets/js'))
}

// Fonts file
function custonFonts(){
    return src('src/assets/fonts/**')
        .pipe(dest('dist/assets/fonts'))
}

// Live reload browsersync
function browsersyncServe(cb){
    browsersync.init({
        server: {
            baseDir: './dist'
        }
    })
    cb()
}

// Destroy dist folder
function destroyDist(){
    return src('./dist/', {read: true, allowEmpty: true}).pipe(clean());
}

// Watch all files
function watcher(){
    watch('./src/**/*.twig').on("change", series(templateTask, browsersync.reload))
    watch('./src/assets/img/**', imageTask)
    watch('./src/assets/js/**/*.js', jsPluginsTask)
    watch('./src/assets/js/scripts.js', customJsTask)
    watch('./src/assets/css/*.css', cssPluginTask)
    watch('./src/scss/**/*.scss', styleTask)
    watch('./src/assets/fonts/**', custonFonts)
}

// Default series task
exports.default = series(
    destroyDist,
    templateTask, 
    styleTask, 
    cssPluginTask,
    imageTask, 
    jsPluginsTask, 
    customJsTask,
    custonFonts, 
    browsersyncServe, 
    watcher
)