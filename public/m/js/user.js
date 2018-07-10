
$(function(){
    var user = null;
// 不等页面加载完成就请求数据
$.ajax({
    url: '/user/queryUserMessage',
    type:'get',
    async: false,//???
    success:function(msg){
        console.log(msg);
        if(msg.error){
            mui.toast('未登录');
            location.href = 'login.html';
        }else{
            $("#mobile").html(msg.mobile);
            $("#username").html(msg.username);
        }
       
    }
});
    $('#logout').click(function(){
        $.ajax({
            url:'/user/logout',
            type:'get',
            success:function(msg){
                // console.log(msg);
                if(msg.success){
                    location.href='login.html';
                }         
            }
        });
    });
});