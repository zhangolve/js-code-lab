var mkdirp = require('mkdirp');
mkdirp('./videos/美好故事', function(err) { 
    console.log('created');
    console.log(err); //null
    // path exists unless there was an error

});