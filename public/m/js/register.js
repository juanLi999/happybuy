$(function () {
    $("#register-btn").on('click', function () {
        var username = $('[name = username]').val();
        var mobile = $('[name = mobile]').val();
        var password = $('[name = password]').val();
        var againPass = $('[name = againPass]').val();
        var vCode = $('[name = vCode]').val();
        $.ajax({
            url: '/user/register',
            type: 'post',
            data: {
                username: username,
                mobile: mobile,
                password: password,
                againPass: againPass,
                vCode: vCode
            },
            success: function (msg) {
                // console.log(msg);
                if (msg.success) {
                    mui.toast('注册成功，哈哈哈哈哈哈');
                }else{
                    mui.toast('注册失败');
                }
            }
        });
    });
    $("#getCode").on('click', function () {
        $.ajax({
            url: '/user/vCode',
            type: 'get',
            success: function (code) {
                console.log(code.vCode);
            }
        });
    });
});