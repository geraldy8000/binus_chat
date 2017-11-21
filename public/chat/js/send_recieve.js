jQuery(function($){
    var socket          = io.connect();
    var $messageForm    = $('#wf-form-Send');   //Form
    var $messageBox     = $('#chat-message');   //Input box  
    var $uid            = $('#uid');
    var $chat           = $('.list');           //Chat box

    $(document).ready(function() {
      var inputItems = JSON.parse(sessionStorage.getItem('chatArray'));

      var replyItems = JSON.parse(sessionStorage.getItem('replyArray')) || [];

      for (var i=0; i<inputItems.length; i++) {

        $chat.append('<li class="list-chat right" data-ix="list-item" \
                          style="opacity: 1; transform: translateX(0px) translateY(0px); transition: opacity 500ms cubic-bezier(0.23, 1, 0.32, 1), transform 500ms cubic-bezier(0.23, 1, 0.32, 1);">\
                          <div class="w-clearfix column-right chat right">\
                              <div class="arrow-globe right"></div>\
                              <div class="chat-text right">' + inputItems[i].content + '</div>\
                              <div class="chat-time right">' + inputItems[i].time + '</div>\
                          </div>\
                      </li>');

        $chat.append('<li class="w-clearfix list-chat" data-ix="list-item\
                        style="opacity: 1; transform: translateX(0px) translateY(0px); transition: opacity 500ms cubic-bezier(0.23, 1, 0.32, 1), transform 500ms cubic-bezier(0.23, 1, 0.32, 1);">\
                        <div class="column-left chat">\
                            <div class="image-message chat"><img src="chat/images/logo.png">\
                        </div>\
                        </div>\
                        <div class="w-clearfix column-right chat">\
                          <div class="arrow-globe"></div>\
                          <div class="chat-text">' + replyItems[i].content + '</div>\
                          <div class="chat-time">' + replyItems[i].time + '</div>\
                        </div>\
                    </li>');
        
        //socket.emit('send-message', {content: inputItems[i].content, uid: $uid.val()});
      }
      $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    });
    
    $messageForm.submit(function(e){
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes();

        var stored = JSON.parse(sessionStorage.getItem('chatArray')) || [];
        var chatList = {content: $messageBox.val(), time: time};

        stored.push(chatList);

        sessionStorage.setItem('chatArray', JSON.stringify(stored));

        e.preventDefault();     

        socket.emit('send-message', {content: $messageBox.val(), uid: $uid.val()});

        // Append chat bubbles
        $chat.append('<li class="list-chat right" data-ix="list-item" \
                          style="opacity: 1; transform: translateX(0px) translateY(0px); transition: opacity 500ms cubic-bezier(0.23, 1, 0.32, 1), transform 500ms cubic-bezier(0.23, 1, 0.32, 1);">\
                          <div class="w-clearfix column-right chat right">\
                              <div class="arrow-globe right"></div>\
                              <div class="chat-text right">' + $messageBox.val() + '</div>\
                              <div class="chat-time right">' + time + '</div>\
                          </div>\
                      </li>');

        $messageBox.val('');
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        //$scroll.animate({scrollTop: $scroll[0].scrollHeight}, 500);     
        console.log(time);
    });

    socket.on('bot-reply', function(data){
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes();

        var stored = JSON.parse(sessionStorage.getItem('replyArray')) || [];
        var chatList = {content: data, time: time};

        stored.push(chatList);

        sessionStorage.setItem('replyArray', JSON.stringify(stored));

        $chat.append('<li class="w-clearfix list-chat" data-ix="list-item\
                        style="opacity: 1; transform: translateX(0px) translateY(0px); transition: opacity 500ms cubic-bezier(0.23, 1, 0.32, 1), transform 500ms cubic-bezier(0.23, 1, 0.32, 1);">\
                        <div class="column-left chat">\
                            <div class="image-message chat"><img src="chat/images/logo.png">\
                        </div>\
                        </div>\
                        <div class="w-clearfix column-right chat">\
                          <div class="arrow-globe"></div>\
                          <div class="chat-text">' + data + '</div>\
                          <div class="chat-time">' + time + '</div>\
                        </div>\
                    </li>');


        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        //$scroll.animate({scrollTop: $scroll[0].scrollHeight}, 500);
    });


});