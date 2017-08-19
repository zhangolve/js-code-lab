var id=$('#channel1').data('id');
console.log('channel1',id);
$('#channel1').data('id','002');
var newId=$('#channel1').data('id');
console.log('channel1',newId);
console.log('channel1',document.querySelector('#channel1').dataset.id)

console.log('channel2',$('#channel2').attr('data-id'));
$('#channel2').attr('data-id','003');
console.log('channel2',$('#channel2').attr('data-id'))
console.log('channel2 data()',$('#channel2').data('id'))
console.log('channel2',document.querySelector('#channel2').dataset.id)
// 前者，由于没有这个对应的data ,从dataset上面找到了，然后放到了jquery 的内部存储，后者发现在jquery的内部存储中已经含有了这样一个data,因此直接从内部存储中取出。不再访问html5 dataset,因此总是不变的。
// set data-id attr 004
$('#channel2').attr('data-id','00４');
console.log('channel2 data() again ',$('#channel2').data('id'));
console.log('channel2 attr() again',$('#channel2').attr('data-id'));