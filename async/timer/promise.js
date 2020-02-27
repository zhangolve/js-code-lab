let timer=null;

var delay=()=> {
return new Promise((resolve)=>{
    timer =setTimeout(()=> {
        timer =null;
        resolve()
    },5000)
})
}


const a= async () => {
    console.log(timer);
    await delay();
    console.log('444')
    console.log(timer)
}

a();