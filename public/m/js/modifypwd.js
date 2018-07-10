$(function () { 
    $('#modify-btn').on('click', function () {
        var originPass = $("[name='originPass']").val();
        var newPass = $("[name='newPass']").val();
        var confirmNewPass = $("[name ='confirmNewPass']").val();
        var vCode = $("[name ='vCode']").val();
        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: originPass,
                newPassword: newPass,
                vCode: vCode
            },
            success: function(msg){
                console.log(msg);
                if(msg.success){
                    mui.toast('修改成功');
                    setTimeout(() => {
                        location.href='login.html';
                    }, 2000);
                }
            }
        });
    });
    $("#getCode").on('click', function () {
        $.ajax({
            url: '/user/vCodeForUpdatePassword',
            type: 'get',
            success: function (code) {
                console.log(code.vCode);
            }
        });
    });
});