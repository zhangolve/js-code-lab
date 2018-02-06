// Rest object  正式发布
//If you are using object destructuring to handle named parameters,
// the rest operator enables you to collect all remaining parameters:
var a = {foo:1,bar:2,baz:3}
var b = ({foo,bar,baz})=>console.log(foo+bar)
b(a)  // 3

// ...rest 只能被放在后面，不能被放在后面。

var a={foo:1,bar:2,baz:3,coo:4}
const {foo,...rest,bar,...rest2}=a
//VM187:1 Uncaught SyntaxError: Rest element must be last element

