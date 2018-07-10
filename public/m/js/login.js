$(function () {
    $('#login-btn').on('click', function () {
        var username = $('[name="username"]').val();
        var password = $("[name= 'password']").val();
        // console.log(111)
        if(!username){
			mui.toast("请输入用户名");
			return;
		}

		if(!password){
			mui.toast("请输入密码");
			return;
		}
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            beforeSend: function(){
				$('#login-btn').html("正在登录...");
            },
            success: function (msg) {
                location.href='user.html';
                console.log(msg);
            }
        });
    });
});