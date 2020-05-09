$(function(){
    var db_arr=[];//缓存收藏id
    var choice_arr=[]
    var choice_arr_text=[]
    if(window.LS.get("coll_data")){
      // window.LS.remove("coll_data")   
      db_arr=JSON.parse(window.LS.get("coll_data"));
   }
    function restdata(){
        choice_arr=[]
        choice_arr_text=[]
        for(var i=0;i<db_arr.length ; i++) {
            choice_arr.push(Number(db_arr[i].dinx))
            var nowjson=notice[Number(db_arr[i].dinx)]
            nowjson.dinx=db_arr[i].dinx
            choice_arr_text.push(nowjson)
        }
        window.LS.set('clss',JSON.stringify(choice_arr_text))
    }
    restdata()
       // 近期公告数据渲染
   function init_data(xm){
    var attr = [];
    var data =  notice.filter((item,i,arr)=>{
      return item.xm == xm
    })
    var htmls = ""
    data.forEach((el,i)=>{
      htmls += ' <li dinx = "'+el.id+'">\
      <a href = "'+el.href+'" target = "_blank"><h2 class = "clearfix"><i class="i-line"></i><p class="h22">'+el.title+'</p></h2>\
      <div class="line"></div>\
      <p class="notice">'+el.des+'</p></a>\
      <div class = "clearfix"><div class="collect clearfix"><span>收藏</span><i class="col-i"></i></div>\
      </div></li>' 
      // htmls += ' <li dinx = "'+el.id+'">\
      //         <a href = "'+el.href+'" target = "_blank"><h2 class = "clearfix"><i class="i-line"></i><p class="h22">'+el.title+'</p></h2>\
      //         <div class="line"></div>\
      // <p class="notice">'+el.des+'</p></a>\
      // <div class = "clearfix"><div class="collect clearfix"><span>收藏</span><i class="col-i"></i></div>\
      // <p class = "dtime">'+el.dtime+'</p></div></li>' 
    })
    $('.cons1').html(htmls)
    restdata()
    for(var n = 0; n <data.length;n++){
      for(var m = 0;m<db_arr.length;m++){
        if(data[n].id==db_arr[m].dinx){
          $('.collect span').eq(n).text('已收藏')
          $('.collect').eq(n).addClass('col-i-a')
        }
      }
    }
  }
  init_data('国考')

   // 近期公告 切换
  $('.tab1 span').each(function(inx){
      $(this).click(function(){
          $(this).addClass('on').siblings(".itm-nav span").removeClass('on')
          var xm = $(this).text()
          var target = inx
          console.log(xm)
          init_data(xm)
      })
  })

    // 收藏
    $(document).on('click','.collect',function(){
    // if(!window.LS.get('userInfo')){
    //    alert('请先登录！')
    // }else{
        var nowpush={}
        nowpush.dinx=$(this).parents('li').attr('dinx')
        if($(this).hasClass('col-i-a')){
                del_local(nowpush.dinx)
                $(this).find('span').text('收藏')
        }else{
            db_arr.push(nowpush)
            $(this).find('span').text('已收藏')
                window.LS.set("coll_data",JSON.stringify(db_arr));
                restdata()
        }
        $(this).toggleClass('col-i-a')
    // }
    })
      // 重新缓存（删除）
  function del_local(targetindex){
    var new_db_arr=[]
    for ( var i=0;i<db_arr.length;i++) {
        if(db_arr[i].dinx != targetindex){
           new_db_arr.push(db_arr[i])
        }
    }
    db_arr=new_db_arr;
     window.LS.set("coll_data",JSON.stringify(db_arr));
     restdata()
}
})