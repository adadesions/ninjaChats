var socket = io();
var name = 'No name';
var notify = 0;

$('#user-online').click(function(){
      $('#listofusers').slideToggle('slow');
});

$('form#send').submit(function(){
	socket.emit('chatting', {
		msg: $('#sender').val(),
		name: name, 
	});

      // socket.emit('private', 1, "TEST PRIVETE");

	socket.emit('notification', {number: 1});

	$('#sender').val('');
	return false;
});

$('form#name_form').submit(function() {
	name = $('#name').val();
	$('.dynamic').text('AdaCode.io : NinajaChats<'+name+'>')

      socket.emit('change name', name);
	return false;
});

$('input#sender').focus(function() {
	notify = 0;
	$('title').text("NinjaChats");
});

socket.on('chatting', function(data) {
	msg = data.name+" : "+data.msg;
	$('ul#messages').append($('<li>').text(msg));
});

socket.on('notification', function(data) {
	notify += data.number;
	$('title').text("("+notify+")New message");
});

socket.on('private msg', function(data){
      msg = data.name+" p: "+data;
      $('ul#messages').append($('<li>').text(msg));
});

socket.on('connected', function(data) {
      console.log(data);
      $('.list-header li > p').text('Users are online ('+data.length+')');
      display_user(data);
});
socket.on('disconnected', function(data){
      $('.list-header li > p').text('Users are online ('+data.length+')');
      display_user(data);
      // $('ul#messages').append($('<li>').text('left: '+data[user].name));
});

function display_user(data){
      $('ul#listing').empty();
      for(user in data){
            if(data[user])
                  $('ul#listing').append($('<li>').text(data[user].name));
      }
}

