var global_id = 0;
var slider_interval;
var timeout_time = 3800; /// задержка между автосменой слайдов
var slides_count = 12;
var step;
var steps_count;

window.onload = function(){
    dots_counter();
    slider_interval = setTimeout(slide_auto, timeout_time);
}

window.onresize = function(){
    dots_counter();
}

function dots_counter(){
    if (window.innerWidth<1021 && step!=1) {
        step = 1;
        dots_constructor(step);
    }
    if (window.innerWidth>1020 && window.innerWidth<1531 && step!=2) {
        step = 2;
        dots_constructor(step);
    }
    if (window.innerWidth>1530 && step!=3) {
        step = 3;
        dots_constructor(step);
    }
    
}

function dots_constructor(step){
    clearTimeout(slider_interval);
    global_id = 0;
    document.getElementById('slider').style.left = 0;
    steps_count = slides_count/step;
    document.getElementById('slider-dots-block').innerHTML = '<img class="slider-dot" src="content/active-dot.svg" onclick="slide_change(0)">';
    for (let i = 1; i < steps_count; i++) {
        document.getElementById('slider-dots-block').innerHTML += '<img class="slider-dot" src="content/passive-dot.svg" onclick="slide_change('+i+')">'
        
    }
    slider_interval = setTimeout(slide_auto, timeout_time);
}

function slide_auto(){ /// выясняет какой сейчас слайд и вызывает функцию смены для следующего слайда
    if (global_id == steps_count-1){
        global_id = 0;
        slide_change(global_id);        
    }else{
        global_id++;
        slide_change(global_id);
    }
}

function slide_change(id){
    clearTimeout(slider_interval); /// очищает таймаут, чтобы автослайдер не перелестнул сразу после того как пользователь выберет слайд
    var px_step = 482 * step;
    var slider = document.getElementById('slider');
    var dots = document.getElementsByClassName('slider-dot');
    if (id != steps_count-1) {
        slider.style.left = '-'+(px_step*id)+'px'; /// двигает блок со слайдами в зависимости от нажатой точки (те что белые и одна красная)
    }
    else{
        if (window.innerWidth<1931) {
            slider.style.left = "calc(-"+(slides_count*482)+"px + 92.36vw)";
            if(window.innerWidth<514){
                slider.style.left = "calc(-"+(slides_count*482)+"px + "+160+"vw)";
            }
        }
        else{
            slider.style.left = '-4030px';
        }
        
    }

    console.log(steps_count);
    for (let i = 0; i < steps_count; i++) {         ///
        dots[i].src = "content/passive-dot.svg";   ///  меняет активную точку (те что белые и одна красная))) 
    }                                              ///
    dots[id].src = "content/active-dot.svg";       ///
    global_id = id;
    slider_interval = setTimeout(slide_auto, timeout_time);
}