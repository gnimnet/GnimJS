/*
 * This javascript file for GnimJS plugin demo
 * Author:  Ming
 * Date:    2011.08.06
 * Site:    http://gnim.net
 */
(function($) {
    //Cookie
    function setCookie() {
        $.cookie('demo', 'This is a demo'); //Set Cookie
    }
    function delCookie() {
        $.cookie('demo', null); //Delete Cookie
    }
    $.ready(function() {
        $('#cookie').text('Cookie Value:' + $.cookie('demo'));
    });

    //Shortcut Key
    $.ready(function() {
        $.shortcut('Ctrl + Alt + Enter', function(e) {
            alert('Event On: document');
        });
        $('#shortcut .input').shortcut('Ctrl + Alt + Enter', function(e) {
            $.noBubble(e);
            alert('Input Value: ' + this.value);
        });
    });

    //Animate
    function anim(){
        $('#anim')
            .css({color:'#e83a37','font-size':'12px',width:'200px','border-left-width':'1px','border-left-color':'#e83a37'})
            .anim({color:'#efeb4d','font-size':'20px',width:'400px','border-left-width':'10px','border-left-color':'#efeb4d'},'fast');
    }
    var style1={color:'#e83a37','font-size':'12px',width:'200px','border-left-width':'1px','border-left-color':'#e83a37'};
    var style2={color:'#efeb4d','font-size':'20px',width:'400px','border-left-width':'10px','border-left-color':'#efeb4d'};
    var running=false;
    var step=0;
    function anim2(){
        if(running=!running){
            run();
        }
    }
    function run(){
        if(!running)return;
        var useStyle=(step++%2==0)?style1:style2;
        $('#anim').anim(useStyle,1000,run);
    }

    //Param
    function param(){
        alert($.param('test'));
    }

    //Selection
    function sel1(){
        var node=$('#sel .input')[0];
        $(node).sel(0,node.value.length);
    }
    function sel2(){
        var node=$('#sel .text')[0];
        $(node).sel(0,node.value.length);
    }
    $('#sel .input').select(function(e){
        var node=e.currentTarget||e.srcElement;
        var sel=$(node).sel();
        var selText=node.value.substring(sel.start,sel.end);
        $.log('Select Input:'+selText,'#sel');
    });
    $('#sel .text').select(function(e){
        var node=e.currentTarget||e.srcElement;
        var sel=$(node).sel();
        var selText=node.value.substring(sel.start,sel.end);
        $.log('Select Textarea:'+selText,'#sel');
    });

    //datepicker
    

    window.Demo = {
        setCookie: setCookie,
        delCookie: delCookie,
        anim: anim,
        anim2: anim2,
        param: param,
        sel1:sel1,
        sel2:sel2
    };
})(Gnim);