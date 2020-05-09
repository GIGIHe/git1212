$(function(){
    var collect = []
    $('.go-back1').click(function(){
        window.history.go(-1)
    })
   function init(){
    if(window.LS.get("clss")){
        // window.LS.remove("clss")  
        // window.LS.remove("clss")  
        collect=JSON.parse(window.LS.get("clss"));
        collect_id=JSON.parse(window.LS.get("coll_data"));
        // console.log(collect,collect_id)
        var nums = collect.length
        $('.coll-num .nums').text(nums)
        var hmls = ''
        // console.log(last_data)
        $.each(collect,(i,value)=>{
            hmls += ' <li dinx = "'+value.id+'">\
            <a href = "'+value.href+'" target = "_blank"><h2 class = "clearfix"><i class="i-line"></i><p class="h22">'+value.title+'</p></h2>\
            <div class="line"></div>\
            <p class="notice">'+value.des+'</p></a>\
            <div class = "clearfix"><div class="collect clearfix no-coll"><span>取消收藏</span><i class="col-i col-i-no"></i></div>\
           </div></li>' 
        })
        $('.collects').html(hmls)
     }
   }
   init()
   $(document).on('click','.no-coll',function(){
    var id = $(this).parents('li').attr('dinx')
    console.log(id)
    // console.log(1)
    var new_db_arr=[]
    var new_db_id = []
    for ( var i=0;i<collect.length;i++) {
        if(collect[i].id != id){
            new_db_arr.push(collect[i])
        }
        if(collect_id[i].dinx != id){
            new_db_id.push(collect_id[i])
            }
    }
        collect=new_db_arr;
        collect_id=new_db_id
        window.LS.set("clss",JSON.stringify(collect));
        window.LS.set("coll_data",JSON.stringify(collect_id));
        init()
   })
})