(()=>{
  $(function(){
    setInterval(updateBoard,1000);
    $("#messager").on('submit',function(event){
      event.preventDefault();
      let sendName  = $("#name").val().trim(), sendMessage = $("#message").val().trim();
      if(sendName === ''){
        sendName = 'Anon'
      }
      if(sendMessage != ''){
        $.post('http://localhost:3000/message', {name: sendName, message: sendMessage});
      } else {
        alert("Cannot send empty message!");
      }
      $("#message").val('');
    })
  });

  function updateBoard(){
    $.get('http://localhost:3000/board', (data)=>{
      $("#board").empty();
      for(mes in data.messages){
        let container = $("<div>");
        let containerBody = $("<div>");
        let name = $("<div>");
        let message = $("<div>");
        container.addClass("card");
        name.addClass('card-header');
        message.addClass('card-text');
        containerBody.addClass('card-block');
        name.text(data.messages[mes].name);
        message.text(data.messages[mes].message);
        containerBody.append(name);
        containerBody.append(message);
        container.append(containerBody);
        $("#board").append(container);
      }
    })
  }
})()
