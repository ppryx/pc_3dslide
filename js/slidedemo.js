/**
 * Created by baidu on 15-3-25.
 */
window.document.onkeydown = slidePage;
slide = $('.slide');
length = slide.length;
flag = 1;
for (i=0; i<length; i++) {
    slide.eq(i).attr('rank',i);
}
/* 探测浏览器种类 */
/*function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}*/
unbindfunc=function() {
    slide.unbind("webkitAnimationEnd");
    flag = 1;
}
show_left=function() {
    if(current>0) {
        flag = 0;
        $('.current').addClass('current_l');
        $('.left').addClass('left_show');
        slide.bind("webkitAnimationEnd", function() {
            slide.eq(current).removeClass('current');
            slide.eq(current).removeClass('current_l');
            slide.eq(current).addClass('right');
            slide.eq(left).removeClass('left');
            slide.eq(left).removeClass('left_show');
            slide.eq(left).addClass('current');
            if (right<length) {
                slide.eq(right).removeClass('right');
                slide.eq(right).addClass('future');
            }
            if (current>1) {
                slide.eq(left-1).removeClass('future');
                slide.eq(left-1).addClass('left');
            }
            unbindfunc();
        });
    }
}
show_right=function() {
    if (right<length) {
        flag = 0;
        $('.current').addClass('current_r');
        $('.right').addClass('right_show');
        slide.bind("webkitAnimationEnd", function() {
            slide.eq(current).removeClass('current');
            slide.eq(current).removeClass('current_r');
            slide.eq(current).addClass('left');
            slide.eq(right).removeClass('right');
            slide.eq(right).removeClass('right_show');
            slide.eq(right).addClass('current');
            if (current>0) {
                slide.eq(left).removeClass('left');
                slide.eq(left).addClass('future');
            }
            if (right+1<length) {
                slide.eq(right+1).removeClass('future');
                slide.eq(right+1).addClass('right');
            }
            unbindfunc();
        });
    }
}
/* 监听变换事件! */
transitionEvent = whichTransitionEvent();
function slidePage(evt){
    evt = (evt) ? evt : window.event;
    if (evt.keyCode) {
        current=parseInt($('.current').attr('rank'));
        left=current-1;
        right=current+1;
        if (evt.keyCode == 37) {
            //key left
            if (flag) {
                show_left();
            }

        }
        if (evt.keyCode == 39) {
            //key right
            if (flag) {
                show_right();
            }

        }
    }
}