 console.log('sucess0');
$(document).ready(function(){
  console.log('sucess1');

  $('form').on('submit', function(){
    console.log('sucess2');

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          console.log('sucess');
          window.location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().split(' ').join(' ').slice(1);
      //item = item.splice(1);
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
