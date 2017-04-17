/*
TO-DO-LIST
按完=键之后将结果显示在屏幕上
只进行十以内的操作。
按键即时显示在屏幕上


*/

  var result;
var 
  btn0=$('#btn0').val(),
  btn1=$('#btn1').val(),
  btn2=$('#btn2').val(),
  btn3=$('#btn3').val(),
  btn4=$('#btn4').val(),
  btn5=$('#btn5').val(),
  btn6=$('#btn6').val(),
  btn7=$('#btn7').val(),
  btn8=$('#btn8').val(),
  btn9=$('#btn9').val();

function clickIt(b)
    {
      
      for(var i=0;i<10;i++){
        if(i==b){
          var a=b;
         
       if($('#number').val()==0){
         $('#number').val(a);
       }   
else{
  $("#number").val($("#number").val()+a)
        }
        }
       
      }
      
       }

  
function takeOperation(op){
  switch(op) {
    case '+': $("#number").val($("#number").val()+op);
      break;
       case '-':
  $("#number").val($("#number").val()+op);
      break;
       case '*': $("#number").val($("#number").val()+op);
      break;
       case '/': $("#number").val($("#number").val()+op);
      break;
       case '=':$('#number').append(op);
      break;
    case 'clear' :$("#number").val(0);
    break;
    
  }
  
  
}

$(document).ready(function(){
  $('#equal').on("click",function(){
  var result=$('#number').val();
    var final=math.eval(result);
    console.log(final);
    $('#number').val(final);
  /*
  for(var i=0;i<result.length;i++)
    {
      
    }
    */
  });
  
})

// var number=clickIt(b);
  //    console.log(number);
      /*
    switch(b)
      {
        case 0:
          var a=Number(btn0);
          console.log(a);
          break;
           case 1:
          var a=Number(btn1);
          console.log(a);
          break;
           case 2:
          var a=Number(btn2);
          console.log(a);
          break;
           case 3:
          var a=Number(btn3);
          console.log(a);
          break;
           case 4:
          var a=Number(btn4);
          console.log(a);
          break;
           case 5:
          var a=Number(btn5);
          console.log(a);
          break;
          case 6:
          var a=Number(btn6);
          console.log(a);
          break;
          case 7:
          var a=Number(btn7);
          console.log(a);
          break;
          case 8:
          var a=Number(btn8);
          console.log(a);
          break;
          case 9:
          var a=Number(btn9);
          console.log(a);
          break;
        }
      
      */
      
    //全局变量的问题  
     //在文本框中增加内容http://stackoverflow.com/questions/841722/append-text-to-input-field 


//$('#input-field-id').val($('#input-field-id').val() + 'more text');

//解析文本得到结果。
//http://stackoverflow.com/questions/2276021/evaluating-a-string-as-a-mathematical-expression-in-javascript