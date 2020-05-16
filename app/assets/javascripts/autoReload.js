$(function(){
  
  function buildHTML(message){
    image = ( message.image ) ? `<img class="message__image" src=${message.image} >` : "";
      let html =
        `<div class="message"data-message-id=${message.id}>
          <div class="message__upper-info">
            <div class="message__upper-name">
              ${message.user_name}
            </div>
            <div class="message__upper-data">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="message__content">
              ${message.content}
            </p>
            ${image}
          </div>
        </div>`
      return html; 
  }

  reloadMessages = function() {
    let last_message_id = $('.message:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    
    .fail(function() {
      alert('error');
    });
  };
    setInterval(reloadMessages, 7000);


});