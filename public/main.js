$(function () {
    const socket = io();

    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg.name +':'+msg.msg));
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('user connected', function(socket){
      $('#messages').append($('<li>', {class: 'system-connect'}).text(socket.name + ' has connected'));
      $('.connected-users').append($('<li>').text(socket.name));
      window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('user disconnected', function(msg){
      $('#messages').append($('<li>', {class: 'system-disconnect'}).text(msg.name + ' has disconnected'));
      $(".connected-users li:contains('" + msg.name + "')").remove();
      window.scrollTo(0, document.body.scrollHeight);
    });

  });