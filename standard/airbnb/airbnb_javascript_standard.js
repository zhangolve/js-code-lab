/* 20170527  */

// 3.3  对象内的方法使用shorthand 书写

const book={
    name: 'steve jobs',
    author:'asic ',
    sayName(name){
        return `${book.name}    ${name}`;//steve jobs    zhang
    },
    sayAuthor(){
        return this.author;
    }
};

console.log(book.sayName('zhang'));
console.log(book.sayAuthor()); //asic