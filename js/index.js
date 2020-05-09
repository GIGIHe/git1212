$(function(){
    if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=8){
        alert("您的浏览器版本过低，为了更好的浏览体验，请下载IE9及以上版本！若您使用的是双核浏览器，请切换到非IE内核。");  
     }
    // 判断游览器的类型是否为ie6 7 8 9
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        new WOW().init();
    }
    if ((/msie [9|10]/i.test(navigator.userAgent))){
        // $(".c4conboxstep").show();
        // $(".c4conbox").css({
        //     borderWidth: '1px',
        //     borderStyle: 'dashed',
        //     borderColor: '#b4daf8'
        // })
    }

    var wow = new WOW({
        boxClass: 'wow', 
        animateClass: 'animated', 
        offset: 20, 
        mobile: true, 
        live: true 
    })
    //增加wow方法
    $.fn.extend({
        animateCss: function (animationName, callback) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
                if (callback) {
                    callback();
                }
            });
            return this;
        }
    });
    $('#zhuanye').typeahead(
        {
          source: zy_prolist,
        }
      )
    //   使用说明
      if(!window.sessionStorage.getItem('zg_direction')){
        $('.zg_direction').fadeIn();
        $('.zg_cover').fadeIn();
        //首页弹窗出现，使用sessionStorage加入缓存状态
        window.sessionStorage.setItem('zg_direction','true')
      }
      $('.direction_close,.direction_know').click(function(){
        $('.zg_direction').fadeOut(200);
        $('.zg_cover').fadeOut(200);
      })
})

