

$(function () {

    // 初始化区域滚动组件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        success:function(msg){
            // var tmp = {};
            // tmp.list = msg.rows;
            // var html = template("category-first",tmp);
            var html = template("category-first",{list:msg.rows})
            $(".first").html(html);
            if(msg.rows.length){
				// 给第一个一级分类添加选中状态
				$('.first').find('a').eq(0).addClass('active')
				// 获取第一个一级分类的ID
				var id = msg.rows[0].id;
				// 根据一级分类ID获取二级分类
                $.ajax({
                    url: '/category/querySecondCategory',
                    type: 'get',
                    data: {
                        id: id
                    },
                    success: function(msg){                 
                        var html = template('category-second', msg);       
                        $('.second').html(html); 
                    }
                });
            }
            // else if(msg.rows.length ==0) {
            //     $('.second').html('暂无数据'); 
            // }
        }
    });

    $(".first").on('click', 'a', function() {
        var id = $(this).data('id');
        // console.log(id);
        $.ajax({
            url:'/category/querySecondCategory',
            type:'get',
            data:{id:id},
            success:function(msg) {
                console.log(msg);
                var html = template('category-second',msg);
                $(".second").html(html);
            }
        });
    });
});