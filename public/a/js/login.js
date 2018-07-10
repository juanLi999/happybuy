$(function(){
    $('#login-button').click(function(){
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success:function(msg){
                // console.log(msg);
                if(msg.success) {
                    location.href='user.html';
                }
            }
        });
    });
});