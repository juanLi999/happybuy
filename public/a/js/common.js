$.ajax({
    url: '/employee/checkRootLogin',
    type: 'get',
    async: false,
    success: function (msg) {
        // console.log(msg);
        if (msg.error && msg.error == 400) {
            location.href = 'login.html';
        }
    }
});

$(function () {
    $('.login_out_bot').click(function () {
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            success: function(res) {
                // console.log(res);
                location.href ='login.html';
            }

        });
    });
    var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});
});                                                                                                                                                                                                                                                                                                                                                                                                                                 