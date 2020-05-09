$(function(){
    var copyright_date = new Date();
    //获取当前年
    var copyright_year=copyright_date.getFullYear();
    $(".year").html(copyright_year);
    function init(){
        if(window.LS.get('userInfo')){
            $(".user_no").hide()
            var userInfo = JSON.parse(window.LS.get('userInfo'))
            console.log(userInfo.name)
            $(".user_name span").text('您好，'+userInfo.name)
            $(".tel_msg strong").text(userInfo.phone)
            $(".user_log,.logout").show()
        }else{
            $(".user_no").text('未登录，请先登录')
           $(".user_no").show()
           $(".user_log,.logout").hide()
        }
    }
    init()
    $('.logout').click(function(){
        window.LS.set('userInfo','')
        init()
    })
    $('.user_log').mouseenter(function(){
        $(".downdp").stop(true,true).show();
    });
	$(".head_fr").mouseleave(function(){
        $(".downdp").stop(true,true).hide();
    });
//   登录注册切换
$('.nav_box .sign_tab').each(function(index){
    $(this).mouseenter(function(){
       var slider_d = index * $(this).width()
       $('.slider').animate({
           left:slider_d
       },200)
       $('.navs_tab .sign_tab').removeClass('on')
       $('.navs_tab .sign_tab').eq(index).addClass('on')
       $('.ret_form').hide().stop().eq(index).show()
    })
})
})