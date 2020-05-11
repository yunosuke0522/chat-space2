$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message">
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
            <img class="message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message">
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
        </div>
      </div>`
      return html;
    };
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