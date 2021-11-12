var global_id = 0;
var slider_interval;
var timeout_time = 3800; /// задержка между автосменой слайдов

window.onload = function(){
    slider_interval = setTimeout(slide_auto, timeout_time);
}

function slide_auto(){ /// выясняет какой сейчас слайд и вызывает функцию смены для следующего слайда
    if (global_id == 3){
        global_id = 0;
        slide_change(global_id);        
    }else{
        global_id++;
        slide_change(global_id);
    }
}

function slide_change(id){
    clearTimeout(slider_interval); /// очищает таймаут, чтобы автослайдер не перелестнул сразу после того как пользователь выберет слайд
    var slider = document.getElementById('slider');
    var dots = document.getElementsByClassName('slider-dot');

    switch (id) { /// двигает блок со слайдами в зависимости от нажатой точки (те что белые и одна красная)
        case 0:
            slider.style.left = '0px';
            break; 
        case 1:
            slider.style.left = '-1450px';
            break;
        case 2:
            slider.style.left = '-2896px';
            break;
        case 3:
            slider.style.left = '-4343px';
            break;
        default:
            break;
    }

    for (let i = 0; i < 4; i++) {                  ///
        dots[i].src = "content/passive-dot.svg";   ///  меняет активную точку (те что белые и одна красная))) 
    }                                              ///
    dots[id].src = "content/active-dot.svg";       ///
    global_id = id;
    slider_interval = setTimeout(slide_auto, timeout_time);
}