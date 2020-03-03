
# 1
https://stackoverflow.com/questions/3622928/jqgrid-and-json-reader/3623088#3623088

这个问题是当时做ebadmin的时候的一个问题，主要是对一个插件的研究。

设置它的翻页，是否翻页。
有时候一个属性，就可以改变很多东西。

# 2 https://stackoverflow.com/questions/1155008/how-unique-is-uuid

the annual risk of a given person being hit by a meteorite is estimated to be one chance in 17 billion, which means the probability is about 0.00000000006 (6 × 10−11), equivalent to the odds of creating a few tens of trillions of UUIDs in a year and having one duplicate. In other words, only after generating 1 billion UUIDs every second for the next 100 years, the probability of creating just one duplicate would be about 50%.

uuid随机数。

# 3 https://stackoverflow.com/questions/21247278/about-d-ts-in-typescript/21247316#21247316

d.ts文件的使用。

# 4.https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise/27746324#27746324

How a promise library decides
If it has a .then function - that's the only standard promise libraries use.

The Promises/A+ specification has a notion called thenable which is basically "an object with a then method". Promises will and should assimilate anything with a then method. All of the promise implementation you've mentioned do this.

If we look at the specification:

2.3.3.3 if then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise

鸭子类型。 promise

# 5 https://stackoverflow.com/questions/5834014/lf-will-be-replaced-by-crlf-in-git-what-is-that-and-is-it-important

In Unix systems the end of a line is represented with a line feed (LF). In windows a line is represented with a carriage return (CR) and a line feed (LF) thus (CRLF). when you get code from git that was uploaded from a unix system they will only have an LF.

If you are a single developer working on a windows machine, and you don't care that git automatically replaces LFs to CRLFs, you can turn this warning off by typing the following in the git command line

git config core.autocrlf true
If you want to make an intelligent decision how git should handle this, read the documentation

使用wsl中的一个问题

# 6 https://stackoverflow.com/questions/18701282/what-is-content-type-and-datatype-in-an-ajax-request/18701357#18701357


From the jQuery documentation - http://api.jquery.com/jQuery.ajax/

contentType When sending data to the server, use this content type.

dataType The type of data that you're expecting back from the server. If none is specified, jQuery will try to infer it based on the MIME type of the response

"text": A plain text string.

So you want contentType to be application/json and dataType to be text:

$.ajax({
    type : "POST",
    url : /v1/user,
    dataType : "text",
    contentType: "application/json",
    data : dataAttribute,
    success : function() {

    },
    error : function(error) {

    }
});