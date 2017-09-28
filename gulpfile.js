var gulp = require('gulp');
var spsave = require('gulp-spsave');
var myCreds = {
    username: "<SP Online User>",
    password: "<Password SP Online User>"
}

//Display Templates. Watch all display template html files and only upload the ones that change
gulp.task('watch:displayTemplates', function () {
    
    var watcher = gulp.watch(["Filter_MM_hbsites.html","refinement-functions.js","Item_MM_hbsites.html","filter_mm.css"]);

    return watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type);
        
        if (event.path.indexOf("Filter") !== -1)
        {
            uploadToSharePointFilters(event.path);                             
        }
        else if (event.path.indexOf("refinement") !== -1 || event.path.indexOf("filter_mm.css") !== -1)
        {
            uploadToSharePointHbsites(event.path);
        }
        else if (event.path.indexOf("Item_") !== -1)
        {
            uploadToSharePointSearch(event.path);
        }
    });

});

function uploadToSharePointFilters(files) {
    return gulp.src(files)
    .pipe(spsave({
        siteUrl: "<URL to SC>",
        folder: "_catalogs/masterpage/Display Templates/Filters",
        checkin: true,
        checkinType: 1
    }, myCreds));
}
function uploadToSharePointHbsites(files) {
    return gulp.src(files)
    .pipe(spsave({
        siteUrl: "<URL to SC>",
        folder: "_catalogs/masterpage/hbsites_blog",
        checkin: true,
        checkinType: 1
    }, myCreds));
}
function uploadToSharePointSearch(files) {
    return gulp.src(files)
    .pipe(spsave({
        siteUrl: "<URL to SC>",
        folder: "_catalogs/masterpage/Display Templates/Search",
        checkin: true,
        checkinType: 1
    }, myCreds));
}