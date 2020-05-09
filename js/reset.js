$(function(){
    $("#getyzm2").click(function(event) {
        var phone = $("#phone2").val();
        if (!phone) {
            alert('请输入手机号！')
            return false;
        }
        var phone_re = /^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0-9]{1}\d{8}$|^18[\d]{9}$|^19[\d]{9}$/;
        if (!phone_re.test(phone)) {
            alert('请输入正确的手机号！')
            return false;
        }
        $.ajax({
            url: 'http://zg99.offcn.com/index/chaxun/sendmsg?actid=13060&callback=?',
            type: 'GET',
            dataType: 'jsonp',
            data: {phone: phone},
            success: function(data) {
                if (data.status=="1") {
                    alert('正在发送请稍后...');
                   
                    var sec = 120;
                    $("#r_getyzm").text(sec+'s');
                    var timer1 = setInterval(function (){
                        sec--;
                        $("#r_getyzm").text(sec+'s');
                        if (sec<1) {
                            $("#r_getyzm").text('发送验证码');
                            clearInterval(timer1);
                        }
                    }, 1000);
                } else {
                    alert(data.msg);
                  
                }
            }
        });
    });
    // 重置下一步
    $("#next_btn").click(function(){
        var Myr_phone = $("#phone2").val();
        var r_yzm = $("#yzm2").val();
        if(Myr_phone == '') { //验证手机号是否为空
            alert('请填写手机号！')
            return false;
        }
        var reg = /^0?1[3456789]\d{9}$/; //手机号正则
        if(!reg.test(Myr_phone)) { //验证手机号是否正确
            alert('请填写正确的手机号！');
            return false;
        }
        if(r_yzm == '') { //验证码是否为空
            alert('请填写验证码');
            return false;
        }
        $.ajax({
            url: 'http://zg99.offcn.com/index/chaxun/getphonestatus?actid=13060&callback=?',
            type: 'GET',
            dataType: 'jsonp',
            data: { phone: Myr_phone},
            success: function(data) {
                 if(data.status == 1){
                    $.ajax({
                        url: 'http://zg99.offcn.com/index/chaxun/login?actid=13060&callback=?',
                        type: 'GET',
                        dataType: 'jsonp',
                        data: {phone: Myr_phone, yzm: r_yzm},
                        success: function(data) {
                            if (data.status=="1") {
                                 setTimeout(() => {
                                    $(".step1").hide()
                                    $(".step2").show()
                                 }, 1000);
                                return false;
                            } else {
                                
                                alert(data.msg);
                            }
                        }
            
                    })
                 }else if(data.status == 2){
                    alert('该手机号未注册！')
                 }else {
                    alert('该手机号未注册！')
                }
                }
            })
    })
    // 重置密码下一步
    $("#next_btn2").click(function(){
        var Myphone2 = $("#phone2").val();
        var yzm2 = $("#yzm2").val();
        var pass2 = $("#pass2").val();
        var re_pass2 = $("#re_pass2").val();
        var data_source = window.location.href;
        var activity_name = '考试匹配系统';
        var fenxiao = $("#fenxiao").val();
	    var geneal = $("#geneal").val();
        if(pass2 == '') { //验证码是否为空
            alert('请设置密码！')
            return false;
        }
            var len = pass2.length 
            if(len<6||len>10) {
                alert('请设置6-10位的密码！')
                return false;
            }
            if(re_pass2 == '') { //验证码是否为空
                alert('请输入确认密码！')
                return false;
            }
            if(pass2 !== re_pass2){
                alert('密码不一致！')
                return false;
            }
        $.ajax({
            url: 'http://zg99.offcn.com/index/chaxun/getphonestatus?actid=13060&callback=?',
            type: 'GET',
            dataType: 'jsonp',
            data: { phone: Myphone2},
            success: function(data) {
                var user = data.user.name
                // console.log(user)
                 if(data.status == 1){
                    $.ajax({
                        url: 'http://zg99.offcn.com/index/chaxun/register?actid=13060&callback=?',
                        type: 'GET',
                        dataType: 'jsonp',
                        data: {name: user, phone: Myphone2, yzm: yzm2,password:pass2,data_source:data_source,fenxiao:fenxiao, geneal:geneal,activity_name:activity_name},
                        success: function(data) {
                            if (data.status=="1") {
                                setTimeout(() => {
                                    $(".step1,.step2").hide()
                                    $(".step3").show()
                                 }, 1000);
                                return false;
                            } else {
                                alert(data.msg);
                            }
                        }
            
                    })
                 }else if(data.status == 2){
                    alert('未注册！');
                 }else {
                    alert(data.msg);
                }
                }
            })
    })
    $(document).on('click','.go_login',function(){
        console.log(1)
        window.location.href = './login.html'+window.location.search
    })
})