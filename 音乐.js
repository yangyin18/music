$(function (){
    $('a').eq(0).css('color','#A9A9A9');
    function dao(index_choose){
        let move_list = ['1000px','1170px','1295px','1430px','1535px'];
        let move = move_list[index_choose] + " 0px";
        $('a').css('color','black')
        $('a').eq(index_choose).css('color','#A9A9A9');
        
        $('.choose_big').css('background-position',move);

    };
    
    //生成歌单，str给one
    function music_big(list,str,add){
        let id_x = 0
        let id_y = 0 
        for(let index_y=0;index_y<2;index_y++){
            id_y = id_y+1
            for(let index_x=0;index_x<3;index_x++){  
                id_x=id_x+1
                //核心
                $('.choose_music').each(function (t) {
                        let str=$(this).attr('id') 
                        $(this).append($('<div class="music" id='+ id_x.toString() + "_" + id_y.toString()+'_'+str+'>'))
                        let move = (str=='two') ? $('#'+id_x.toString() + "_" + id_y.toString()+'_'+str).css('left','300px') :0
                        $('#'+id_x.toString() + "_" + id_y.toString()+'_'+str).append($('<img class="music_img" id='+ id_x.toString() + "_" + id_y.toString()+'_img_'+str+'>'))
                        $('#'+id_x.toString() + "_" + id_y.toString()+'_'+str).append($('<p class="music_txt" id='+ id_x.toString() + "_" + id_y.toString()+'_txt_'+str+'>'))
                        $('#'+id_x.toString() + "_" + id_y.toString()+'_'+str).append($('<p class="music_txt" id='+ id_x.toString() + "_" + id_y.toString()+'_author_'+str+'>'))
                        $('#'+id_x.toString() + "_" + id_y.toString()+'_'+str).css({'left':(index_x*200+23).toString()+'px',
                                                                            'top' :(index_y*250+15).toString() +'px',
                                                                           })
                    var t = (history.length==1) ? get(list,str) : 0;
                    
                })
            }
            id_x=0
        }

    }
    //第一个参数是歌名列表
    function get(list,str){
        let id_y=0
        let id_x=0
        let i = 0
        for(let index_y=0;index_y<2;index_y++){
            id_y = id_y+1
            for(let index_x=0;index_x<3;index_x++){  
                      id_x=id_x+1
                      let img = '图片/'+figure_one+'/'+list[i]+'.jpg'
                      i++
                      $('#'+id_x.toString() + "_" + id_y.toString()+'_img_'+str).attr('src',img)
                      $('#'+id_x.toString() + "_" + id_y.toString()+'_txt_'+str).text(list[i-1])
                      $('#'+id_x.toString() + "_" + id_y.toString()+'_txt_'+str).css('bottom','35px')
                      $('#'+id_x.toString() + "_" + id_y.toString()+'_author_'+str).text(figure_one)
                      $('#'+id_x.toString() + "_" + id_y.toString()+'_author_'+str).css('bottom','10px')

            }
            id_x=0
        }
    }
    

    function lun_if(num,obj){
        //判断是否在左边
                     
    }

    //轮播图核心
    function def(num){
    
        $('#music_one').animate({left:'-='+(700*num).toString() + 'px'},500)
        $('#music_two').animate({left:'-='+(700*num).toString() + 'px'},500)
        $('#music_three').animate({left:'-='+(700*num).toString() + 'px'},500)
        $('.choose_music').each(function(obj){

                let move_if = parseInt($(this).css('left').split('px')[0])-(700*num)
                if(num==1&&move_if==0){
                    let id=$(this).attr('id')
                    get(list_all[index_r],id)
                }else if(num==-1&&move_if==0){
                    let id=$(this).attr('id')
                    get(list_all[index_r],id)
                }

                if(move_if<=-1400){
                    $(this).animate({'left':'700px'},10)
                }else if(move_if>=1400){
                    $(this).animate({'left':'-700px'},10)

                }
        })
    }

    function text_big(obj){
        let txt=$(obj).text().length
        if(10>txt>6){
            console.log(txt)
            let big=parseInt(30/txt)
            $(obj).css({'font-size':big})
        }else if(txt>=10){
            let txt=$(obj).text($(obj).text().slice(0,10)+'......')
            $(obj).css({'font-size':'5px'})
        }
        else{
            $(obj).css({'font-size':'20px','left':'140px','top':'','margin-bottom':'0px'})
        }
    }

    function no_if(obj){

        let audio = document.getElementById("audio");
        let music_time=parseInt(audio.duration)
        let list_n=['图片/暂停.png','图片/开始.png']
        if (time_i >= music_time||bug_end) {
                bug_o()
                 }else{
        let img =$(obj).attr('src')        
        music_top(list_n,img)
        clearTimeout(bug_out)
        for(i in list_n){
            if(list_n[i]==img){
                list_n.splice(i,1)
            }
                 }        
        $(obj).attr('src',list_n[0])
        }

    }
    //回到起点
    function clear_music(){
        clearInterval(audio_move)
        no_fun=true
        music_new=true
        time_i=0
        $('#time_begin').text('00:00')
        $('.cut_one').css('left','-180px')
        bar()
    }
    //切换


    function replace_music(obj){
        let img=$(obj).attr('src')
        let author=img.split('/')[1]
        let name=img.split('/')[2].split('.')[0]
        $('#audio_name').text(name)
        text_big('#audio_name')
        $('#audio_author').text(author)
        text_big('#audio_author')
        $('.icon_no').attr('src','图片/暂停.png')
        $('#audio_img').attr('src',img)
        $('.audio_show').animate({'bottom':'180px'},500)
        $('.music_end').css({"background-color":"black"})

        let audio = document.getElementById("audio");
        audio.src='音频/'+author+'/'+name+'.mp3'
        audio.load();
        if_music=true
        time_i=0
        let im=$('#audio_img')
        $('#audio_img').remove()
        $('.music_work').append(im)

        clearTimeout(bug_out)
        audio.oncanplay = function () {
            if (if_music) {
                clear_music()
                if_music=false;
            }
        }

    }
    //格式化
    function time_to(time){
        let second=String(time%60)
        let minute=String(parseInt(time/60))
        if (second.length==1){
            second='0'+second
        }
        if (minute.length==1){
            minute='0'+minute
        }
        let time_n=minute+':'+second
        return time_n
    }

    //暂停图片替换和进度条核心
    function music_top(list_n,img){
        let index_o=list_n.indexOf(img)
        let r=(index_o==1) ?  $('.audio_show').animate({'bottom':'180px'},500) : $('.audio_show').animate({'bottom':'100px'},500)
        let m=(index_o==1) ?  bar():bar_no()
    }

    //进度条功能实现
    function bar_no() {
        no_fun = false;
        let audioEle = $("#audio")[0];
        audioEle.pause();
        $('#audio_img').css('animation-play-state','paused');
        
    }
    function bar(){
        no_fun=true
        let audio = document.getElementById("audio");
        let music_time=parseInt(audio.duration)
        move_second=180/music_time
        $('#time_end').text(time_to(music_time))
        $('#audio_img').css('animation-play-state','running');
        if (music_new) {
            audio_move=setInterval(function(){
            if (no_fun){
                $('.cut_one').animate({'left':'+='+String(move_second)+'px'},10)
                if (time_i >= music_time) {
                    bug_o()      
                 }else{
                time_i+=1;
                $('#time_begin').text(time_to(time_i))
                 }
              }
            },1000)
            music_new=false
        }
        let audioEle = $("#audio")[0];
        audioEle.play();
    }


    function cut_click(x_n){
        let x=x_n/180
        let audio = document.getElementById("audio");
        time_i=parseInt(audio.duration*x)
        audio.currentTime=time_i
        let music_time=time_to(time_i)
        $('#time_begin').text(music_time)
    }

    //特效
    $('.choose_music').hover(function(){
        $('.bg').remove()
        $(this).append($('<div></div>',{
                                          'class':'bg',
                                        }))
        let x = String(window.event.pageX-720) + 'px'
        let y = String(window.event.pageY-180) + 'px'
        $('.bg').css({'position':'absolute',
                      'top':y,"left":x,
                        'animation-name':'in',
                        'animation-duration':'0.5s' 
                    })

    },function(){
        let x = String(window.event.pageX-720) + 'px'
        let y = String(window.event.pageY-180) + 'px'
        $('.bg').css({'position':'absolute',
                      'top':y,"left":x,
                        'animation-name':'out',
                        'animation-duration':'0.5s' 
                    })
    
    })
    //轮播控制
    $('.icon').click(function(){

        if($(this).attr('id')=='two'){
            index_r++;
            index=(index_r==4)?index_r=0:index_r=index_r;
            figure_one=figure[index_r]
            history.push(index_r)
            if(isclick){
                isclick=false
                def(1)
                dao(index_r)
              }  
            setTimeout(function(){ 
            isclick = true;
        }, 500);
        }else{
            index_r--;
            index=(index_r==-1)?index_r=3:index_r=index_r;
            figure_one=figure[index_r]
            history.push(index_r)
            if(isclick){
                isclick=false
                def(-1)
                dao(index_r)
              }  
            setTimeout(function(){ 
            isclick = true;
        }, 500);

        }
        
    
    })
    //搜索框功能实现
    function search_mp3(url){
        let list_mp3=[]
        let bug_work=false
        $.ajax({
            url:url,
            type:'get',
            dataType:'json',
            async:false,
            success:function(data){
                let mp3=data['data'][0]['url']
                list_mp3.push(mp3)
                bug_work=true
            }
        })
        if(bug_work){
        }
        return list_mp3[0]
    }
    //搜索音乐
    function search_replace(name,author,img,id){
        $('#audio_img').css({'z-index':'-1'})        
        $('#audio_name').text(name)
        text_big('#audio_name')
        $('#audio_author').text(author)
        text_big('#audio_author')
        $('.icon_no').attr('src','图片/暂停.png')
        $('#audio_img').attr('src',img)
        $('.audio_show').animate({'bottom':'180px'},500) 
        let audio = document.getElementById("audio");
        let url_mp3 = 'https://api.a20safe.com/api.php?api=10&key=51fe2465685127cbe503a8f9acbd7113&search='+id+'&type=song'
        if_music=true
        bug_end=true
        time_i=0
        let im=$('#audio_img')
        $('#audio_img').remove()
        $('.music_work').append(im)
        clearTimeout(bug_out)
        clearInterval(audio_move)
        $('#time_begin').text('00:00')
        $('#time_end').text('00:00')
        $('.cut_one').css('left','-180px')
        audio.oncanplay = function () {
            if (if_music) {
                clear_music()
                if_music=false;
                bug_end=false
                $('#audio_img').css({'z-index':'1'})

            }
        }
        let mp_3=search_mp3(url_mp3)
        audio.src=mp_3
        audio.load();

    }
    function search(figure_one){
        search_name=[]
        search_author=[]
        search_id=[]
        search_img=[]
        bug_end=false
        url='https://api.a20safe.com/api.php?api=10&key=51fe2465685127cbe503a8f9acbd7113&search='+figure_one+'&type=so';
        $.ajax({
            url:url,
            type:'get',
            dataType:'json',
            success:function(data) {
                for(i in data['data'][0]['list']){
                    let name_=data['data'][0]['list'][i]['name']
                    let author_=data['data'][0]['list'][i]['artist']
                    let img_=data['data'][0]['list'][i]['pic']
                    let id_=data['data'][0]['list'][i]['id']
                    let time_=data['data'][0]['list'][i]['time']
                    search_name.push(name_)
                    search_author.push(author_)
                    search_id.push(id_)
                    search_img.push(img_)
                    let li_=$('<li class="music_end">  <p id="search_name">'+name_+'</p><p id="search_author">'+author_+'</p><P id="search_time">'+time_+'</P></li>')
                    $('#search_music').append(li_)
                    $('.search_out .wait').css('display','none')

                }
            }
        })

    }
    function search_def(){
         let value =$(".search_input").val()
         $('.music_end').each(function(){
            $(this).remove()
        }) 
         if(value.length > 0 || n == 0){
            if(value.length > 0){
                $('.wait').css('display','block')
                search(value)
                 };
           $('.search').css({"width":"650px",'height':'510px'});
           $('.search_zi').css({"width":"630px",'height':'55px','backgruond':'white'});
           $('.search_out').css('display','block')
             setTimeout(function(){ 
             $(".search_input").css({"width":"550px","height":"42px","display":"block"}); 
             }, 300);
           n = 1;
            }else{
            $('.search').css({"width":"55px",'height':'55px'});
            $('.search_zi').css({"width":"55px",'height':'55px'});
            $(".search_input").css({"width":"0px","height":"0px","display":"none"});
            $('.search_out').css('display','none')
            n = 0;
            }

    }

    function bug_o(){
          clearInterval(audio_move)
          let list_m=[1,2]
          bug_out =setTimeout(function(){
                time_i=0
                music_top(list_m,list_m[0])
                $('.icon_no').attr('src','图片/开始.png')
                $('#time_begin').text('00:00')
                $('.cut_one').css('left','-180px')
                no_fun=true
                music_new=true
                    },2000)

    }
   
    //播放

    var figure=['周杰伦','Beyond','李荣浩','薛之谦']
    var figure_one=figure[0]
    var history=[0]
    var lun=0
    var index_r = 0
    var list_nmae_one=['七里香', '告白气球', '夜曲', '晴天', '稻香', '蒲公英的约定']
    var list_name_two=['光辉岁月', '大地(粤语)', '情人', '海阔天空', '灰色轨迹', '真的爱你']
    var list_name_three=['不将就', '年少有为', '戒烟', '李白', '模特', '麻雀']
    var list_name_four=['刚刚好', '天外来物', '意外', '我好像在哪见过你', '消愁', '演员']
    var list_all=[]
    var search_name=[]
    var search_author=[]
    var search_id=[]
    var search_img=[]
    var isclick= true;
    var music_new=true;
    var no_fun=false;
    var if_music=true;
    var move_second=0
    var time_i=0        
    var audio_move
    var n=0
    var current = 0;
    var bug_out=true
    var bug_end=false
    music_big(list_nmae_one,'one',0)
    
    list_all.push(list_nmae_one,list_name_two,list_name_three,list_name_four)
    if(isclick){
    $('.choose').click(function (){
        let index_choose = $('.choose').index($(this));

        dao(index_choose);
});
    $('a').bind('click',function(){

        history.push(index_r)
        figure_one = $(this).text()
        index_r=$('a').index($(this))
        var obj=list_all[index_r]
        
        var y = (index_r>history[history.length-1]) ? 700 : -700;
        if(index_r>history[history.length-1]){
            def(1)
        }else if(index_r<history[history.length-1]){
            def(-1)
        }else{
        
        }

    })
    //音乐继续或暂停
    $('.icon_no').bind('click',function (t) {
        let obj=this
        if(bug_out){
            bug_out=false
            no_if(obj)
            setTimeout(function(){
                bug_out=true    
            },200)
        }
    })

    $('.music_img').bind('click',function(){
        replace_music(this)
    })
    //进度条点击
    $('.cut').bind('click',function(){
        no_fun=false
        let x_n=window.event.pageX-347;
        $(this).children().css('left',x_n-180)
        setTimeout(function(){no_fun=true},100)   
        cut_click(x_n)     
    })
    //进度条补充
    
    $('.search_img').click(function(){
        search_def()
       
    });
    $('.search_input').bind('keydown',function(){
        if (event.keyCode == "13") {
         search_def()
      }

    })
    $(document).on('click','#search_name',function(){
     $('.music_end').css({"background-color":"black"})
     $(this).parent().css({"background-color":"#556B2F"});  
     let index_k = $('.music_end').index($(this).parent())
     search_replace(search_name[index_k],search_author[index_k],search_img[index_k],search_id[index_k])
   // let li_=$('<li class="music_end">  <p id="search_name">'+name_+'</p><p id="search_author">'+author_+'</p><P id="search_time">'+time_+'</P></li>')

    });

isclick=false}

})//结尾

