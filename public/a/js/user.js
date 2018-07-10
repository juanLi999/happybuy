// import { template } from "handlebars";

$(function(){
    $.ajax({
        url: '/user/queryUser',
        type: 'get',
        data: {
            page: 1,
            pageSize:3
        },
        success: function(res) {
            console.log(res);
            var html = template('userTpl',res);
            $('#user-box').html(html);
        }
    });
    $('#user-box').on('click',".edit-btn",function(){
        var isDelete = $(this).data('isdelete');
        var id = $(this).data('id');
      $.ajax({
        url: '/user/updateUser',
        type: 'post',
        data: {
            id: id,
            isDelete: isDelete=='1'? '0':'1'
        },
        success: function(msg) {
            console.log(msg);
            location.reload();
        }
      });
    });
});