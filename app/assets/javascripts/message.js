$(function(){
  
  function buildHTML(message){
    image = ( message.image ) ? `<img class="message__image" src=${message.image} >` : "";
      let html =
        `<div class="message">
          <div class="message__upper-info">
            <div class="message__upper-name">
              ${message.user_name}
            </div>
            <div class="message__upper-data">
              ${message.date}
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

  $('.form__new-message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      console.log("ok")
      let html = buildHTML(data);
      $('.messages').append(html);    
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })

    .always(function(){            
      $('.submit-btn').prop("disabled", false);
    });

  });
});