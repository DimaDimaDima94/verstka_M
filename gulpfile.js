var gulp = require("gulp");
var rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();


function css_style(done){
    gulp.src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
        errorLogToConsole: true
        //outputStyle: "compressed"
        
    }))
    .on('error',console.error.bind(console))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false}))
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("./css/"))
    .pipe(browserSync.stream());
    done();
}

function print(done){
    console.log("Hi");
    done();
}

function whatchSass()
{
    gulp.watch("./scss/**/*",css_style);
}

function whatchFiles()
{
    gulp.watch("./scss/**/*",css_style);
    gulp.watch("./**/*.html",browserReload);
    gulp.watch("./**/*.php",browserReload);
    gulp.watch("./**/*.js",browserReload);
}

function sync(done){
    browserSync.init({
        
        proxy: "localhost/verstka-macet",
        notify: false
        
        // Это для index.html
        // server: {
        //     baseDir: "./"
            
        // },
        // port: 3000
    });
    done();
}

function browserReload(done){
    
    browserSync.reload();
    done();
}


gulp.task('default', gulp.parallel(sync, whatchFiles));
gulp.task(sync);

//gulp.task(print);

// exports.default = fun_task;
// exports.fun_print_hello = fun_print_hello;