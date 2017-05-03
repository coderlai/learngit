function add_comment(token,source_type,source_id,content,to_user_id){
    var postData = {_token:token,source_id:source_id,source_type:source_type,content:content};
    if(to_user_id>0){
        postData.to_user_id = to_user_id;
    }
    $.post('/comment/store',postData,function(html){
        $("#comments-"+source_type+"-"+source_id+" .widget-comment-list").append(html);
        $("#comment-"+source_type+"-content-"+source_id).val('');
    });
}


function load_comments(source_type,source_id){
    $.get('/'+source_type+'/'+source_id+'/comments',function(html){
        $("#comments-"+source_type+"-"+source_id+" .widget-comment-list").append(html);
    });
}

function clear_comments(source_type,source_id){
    $("#comments-"+source_type+"-"+source_id+" .widget-comment-list").empty();
}