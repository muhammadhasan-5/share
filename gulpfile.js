var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', gulp.series(function(){
    return gulp.src(['node_modules/bootstrap/scss/*.scss', 'src/scss/*.scss'])
    .pipe(sass()) // converte sass em css
    .pipe(gulp.dest('src/css'));
    //
}));

// sass comprimi file
// gulp.task('min-css', () => {
//   return gulp.src('./src/css/style.css')
//     .pipe(cleanCSS({debug: true}, (details) => {
//       console.log(`${details.name}: ${details.stats.originalSize}`);
//       console.log(`${details.name}: ${details.stats.minifiedSize}`);
//     }))
//   .pipe(gulp.dest('./src/css/dist'));
// });

// sass observa
gulp.task('watch', gulp.series(function(){
    gulp.watch(['node_modules/bootstrap/scss/*.scss', 'src/scss/*.scss'], gulp.parallel(['sass']));
}));

//tarefa default para executar as tarefas anteriores
gulp.task('default', gulp.series( ['sass', 'watch'] ));