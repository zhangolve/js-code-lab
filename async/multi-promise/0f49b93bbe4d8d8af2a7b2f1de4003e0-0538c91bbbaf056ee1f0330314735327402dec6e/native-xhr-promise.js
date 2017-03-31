
function request(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}


request('GET', 'https://jsonplaceholder.typicode.com/posts')
    .then(function (e) {
        console.log(e.target.response);
    }, function (e) {
        // handle errors
    });