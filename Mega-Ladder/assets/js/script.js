const URL = "https://realbet-server.online/api";
// const URL = "http://127.0.0.1:8000/api";
const backgroundMusic = new Audio('./assets/sounds/ladder_bg.mp3');
const resultMusic = new Audio('./assets/sounds/start0.mp3');
let isBrowserSoundReady = false;
let globalSeconds = 0;
let round = 0;
let isGameReady = false;
let speed = 300;
let isAnimPlaying = false;
let gameData = $('#game');


var drawLaddered = false;



// Config and sound script

const sound_switch = (type) => {
    
    $('.menu_sound li').removeClass("active");

    if(type == 'off') {
        $('#sound_off').addClass("active");
        window.localStorage.setItem("sound" ,"off");
        resultMusic.volume = 0;
    }

    if(type == 'on') {
        $('#sound_on').addClass("active");
        window.localStorage.setItem("sound" ,"on");
        resultMusic.volume = 1;
    }
}

const CheckSoundConfig = () => {

    let sound = window.localStorage.getItem("sound");
    $('.menu_sound li').removeClass("active");


    if(sound == null || sound === undefined) {
        $('#sound_on').addClass("active");
        window.localStorage.setItem("sound" ,"on");
        resultMusic.volume = 1;
    }

    if(sound == 'on') {
        $('#sound_on').addClass("active");
        resultMusic.volume = 1;
    }

    if(sound == 'off') {
        $('#sound_off').addClass("active");
        resultMusic.volume = 0;
    }


}


// Time And Round Script

const FormatDate = (d) => {

    let date = new Date(d);
    let options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: "Asia/Seoul"
    };

    return date.toLocaleString("ko-KR", options);
}
const GetGameRound = (offset) => {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000 * offset));
    const GameHour = (nd.getHours() / 2) ;
    const GameMinute = (nd.getMinutes() / 2);

    return Math.floor(((GameHour * 60) + GameMinute) + 1);

}


const RunGameTimeAndRound = (city, offset) => {

    setInterval(() => {
        // convert the current time to korean timezone
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));

        const minute  = nd.getMinutes() % 2;
        const GameRound = GetGameRound(offset);

        // get korean timezone seconds
        const GameSec = (60 - nd.getSeconds()).toString().padStart(2, '0');
    
        if(GameSec == 8 && minute == 0) {
            resultMusic.play();
        }

        if (GameSec == 60 && minute == 1) {
            GetResult();
        }

        $('#round').html(GameRound);
        $('#timer').html(`${minute} 분 ${GameSec} 초`);

    }, 1000);
};

const GetResult = async() => {
    isAnimPlaying = true;

    // let RandomTopPosition = ['left' , 'right'];
    // let RandomLine = [3,4];
    // let RandomBotPosition = ['left' , 'right'];

    // let Top = RandomTopPosition[GetRand(RandomTopPosition.length)];
    // let Line = RandomLine[GetRand(RandomLine.length)];
    // let Bottom = RandomBotPosition[GetRand(RandomBotPosition.length)];

    $.ajax(URL + '/mega-ladder').then((res) => {
        let top = res.top == 'left' ? 1 : 2;
        let line = res.line == 3 ? 3 : 4;

        drawLadder(top,line);

        setTimeout(() => {
            populateResult(res, 'history');
        }, 5000);
    });

   
}



const ResetAnimation = () => {
    $('.ladder_bg').removeClass('s3');
    $('.ladder_bg').removeClass('s4');
    $('.end_icon').removeClass('on');
    $('.ladder_type1 div').removeAttr('style');
    $('.ladder_type2 div').removeAttr('style');
    $('.ladder_type3 div').removeAttr('style');
    $('.ladder_type4 div').removeAttr('style');
    $('.wait_box').fadeIn();
}




function drawLadder(game_result_lr, game_result_34) {
    if(drawLaddered === false) {
        drawLaddered = true;
        var spd = 500;
        
        $(".info").hide();

        if(game_result_lr == 1 && game_result_34 == 4) {
            $(".ladder_shape").css('background-image', "url('img/bg_line4.png')");
            $("#result_left_icon").attr("src", "./img/game_icon_left1.png");
            $("#bri1-0").show().animate({height:'50px'},spd,function(){
            $("#bri1-1").show().animate({width :'200px'},spd,function(){
            $("#bri2-1").show().animate({height:'57px'},spd,function(){
            $("#bri2-3").show().animate({width :'200px'},spd,function(){
            $("#bri1-3").show().animate({height:'57px'},spd,function(){
            $("#bri1-5").show().animate({width :'200px'},spd,function(){
            $("#bri2-5").show().animate({height:'57px'},spd,function(){
            $("#bri2-7").show().animate({width :'200px'},spd,function(){
            $("#bri1-7").show().animate({height:'50px'},spd,function(){
                $("#result_odd_icon").attr("src", "./img/game_icon_odd1.png");
                drawLadderEnd();
            });});});});});});});});});

            $("#ramji.blue" ).show();
            $("#ramji.blue" ).animate({top   :'+=65px'},spd,function(){$("#ramji.blue" ).rotate(-90);
            $("#ramji.blue" ).animate({left  :'+=190px'},spd,function(){$("#ramji.blue" ).rotate(0);
            $("#ramji.blue" ).animate({top   :'+=46px'},spd,function(){$("#ramji.blue" ).rotate(90);
            $("#ramji.blue" ).animate({left  :'-=190px'},spd,function(){$("#ramji.blue" ).rotate(0);
            $("#ramji.blue" ).animate({top   :'+=46px'},spd,function(){$("#ramji.blue" ).rotate(-90);
            $("#ramji.blue" ).animate({left  :'+=190px'},spd,function(){$("#ramji.blue" ).rotate(0);
            $("#ramji.blue" ).animate({top   :'+=46px'},spd,function(){$("#ramji.blue" ).rotate(90);
            $("#ramji.blue" ).animate({left  :'-=185px'},spd,function(){$("#ramji.blue" ).rotate(0);
            $("#ramji.blue" ).animate({top   :'+=35px'},spd,function(){
            setTimeout(function() {
            $("#ramji.blue" ).animate({top   :'+=160px'},spd,function(){
            });
            }, 2000);
            });});});});});});});});});


        }
        else if(game_result_lr == 2 && game_result_34 == 4) {
            $(".ladder_shape").css('background-image', "url('img/bg_line4.png')");
            $("#result_right_icon").attr("src", "./img/game_icon_right1.png");
            $("#bri2-0").show().animate({height:'50px'},spd,function(){
            $("#bri2-1").show().animate({width :'200px'},spd,function(){
            $("#bri1-1").show().animate({height:'57px'},spd,function(){
            $("#bri1-3").show().animate({width :'200px'},spd,function(){
            $("#bri2-3").show().animate({height:'57px'},spd,function(){
            $("#bri2-5").show().animate({width :'200px'},spd,function(){
            $("#bri1-5").show().animate({height:'57px'},spd,function(){
            $("#bri1-7").show().animate({width :'200px'},spd,function(){
            $("#bri2-7").show().animate({height:'50px'},spd,function(){
                $("#result_even_icon").attr("src", "./img/game_icon_even1.png");
                drawLadderEnd();
            });});});});});});});});});
            
            $("#ramji.red" ).css('left', '175px').show();
            $("#ramji.red" ).animate({top   :'+=65px'},spd,function(){$("#ramji.red" ).rotate(90);
            $("#ramji.red" ).animate({left  :'-=190px'},spd,function(){$("#ramji.red" ).rotate(0);
            $("#ramji.red" ).animate({top   :'+=46px'},spd,function(){$("#ramji.red" ).rotate(-90);
            $("#ramji.red" ).animate({left  :'+=190px'},spd,function(){$("#ramji.red" ).rotate(0);
            $("#ramji.red" ).animate({top   :'+=46px'},spd,function(){$("#ramji.red" ).rotate(90);
            $("#ramji.red" ).animate({left  :'-=190px'},spd,function(){$("#ramji.red" ).rotate(0);
            $("#ramji.red" ).animate({top   :'+=46px'},spd,function(){$("#ramji.red" ).rotate(-90);
            $("#ramji.red" ).animate({left  :'+=195px'},spd,function(){$("#ramji.red" ).rotate(0);
            $("#ramji.red" ).animate({top   :'+=35px'},spd,function(){
            setTimeout(function() {
            $("#ramji.red" ).animate({top   :'+=160px'},spd,function(){
            });
            }, 2000);
            });});});});});});});});});

        }
        else if(game_result_lr == 2 && game_result_34 == 3) {
            $(".ladder_shape").css('background-image', "url('img/bg_line3.png')");
            $("#result_right_icon").attr("src", "./img/game_icon_right1.png");
            $("#bri2-0").show().animate({height:'67px'},spd,function(){
            $("#bri2-2").show().animate({width :'200px'},spd,function(){
            $("#bri1-2").show().animate({height:'57px'},spd,function(){
            $("#bri1-4").show().animate({width :'200px'},spd,function(){
            $("#bri2-4").show().animate({height:'57px'},spd,function(){
            $("#bri2-6").show().animate({width :'200px'},spd,function(){
            $("#bri1-6").show().animate({height:'67px'},spd,function(){
                $("#result_odd_icon").attr("src", "./img/game_icon_odd1.png");
                drawLadderEnd();
            });});});});});});});
            
            $("#ramji.red" ).css('left', '175px').show();
            $("#ramji.red" ).animate({top   :'+=82px'},spd,function(){$("#ramji.red" ).rotate(90);
            $("#ramji.red" ).animate({left  :'-=190px'},spd,function(){$("#ramji.red" ).rotate(0);
            $("#ramji.red" ).animate({top   :'+=52px'},spd,function(){$("#ramji.red" ).rotate(-90);
            $("#ramji.red" ).animate({left  :'+=190px'},spd,function(){$("#ramji.red" ).rotate(0);
            $("#ramji.red" ).animate({top   :'+=52px'},spd,function(){$("#ramji.red" ).rotate(90);
            $("#ramji.red" ).animate({left  :'-=185px'},spd,function(){$("#ramji.red" ).rotate(0);
            $("#ramji.red" ).animate({top   :'+=54px'},spd,function(){
            setTimeout(function() {
            $("#ramji.red" ).animate({top   :'+=160px'},spd,function(){
            });
            }, 2000);
            });});});});});});});
        }
        else if(game_result_lr == 1 && game_result_34 == 3) {
            $(".ladder_shape").css('background-image', "url('img/bg_line3.png')");
            $("#result_left_icon").attr("src", "./img/game_icon_left1.png");
            $("#bri1-0").show().animate({height:'67px'},spd,function(){
            $("#bri1-2").show().animate({width :'200px'},spd,function(){
            $("#bri2-2").show().animate({height:'57px'},spd,function(){
            $("#bri2-4").show().animate({width :'200px'},spd,function(){
            $("#bri1-4").show().animate({height:'57px'},spd,function(){
            $("#bri1-6").show().animate({width :'200px'},spd,function(){
            $("#bri2-6").show().animate({height:'67px'},spd,function(){
                $("#result_even_icon").attr("src", "./img/game_icon_even1.png");
                drawLadderEnd();
            });});});});});});});
            
            $("#ramji.blue" ).show();
            $("#ramji.blue" ).animate({top   :'+=82px'},spd,function(){$("#ramji.blue" ).rotate(-90);
            $("#ramji.blue" ).animate({left  :'+=190px'},spd,function(){$("#ramji.blue" ).rotate(0);
            $("#ramji.blue" ).animate({top   :'+=52px'},spd,function(){$("#ramji.blue" ).rotate(90);
            $("#ramji.blue" ).animate({left  :'-=190px'},spd,function(){$("#ramji.blue" ).rotate(0);
            $("#ramji.blue" ).animate({top   :'+=52px'},spd,function(){$("#ramji.blue" ).rotate(-90);
            $("#ramji.blue" ).animate({left  :'+=195px'},spd,function(){$("#ramji.blue" ).rotate(0);
            $("#ramji.blue" ).animate({top   :'+=54px'},spd,function(){
            setTimeout(function() {
            $("#ramji.blue" ).animate({top   :'+=160px'},spd,function(){
            });
            }, 2000);
            });});});});});});});
        }
    }
}


jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};



function drawLadderEnd(){
    setTimeout(function(){
        location.reload();
    }, 4000);
}





const populateResult = (res, type) => {
    let Top = res.top == 'left' ? 'result_icon_left.png' : 'result_icon_right.png';
    let Line = res.line == '3' ? 'result_icon_3.png' : 'result_icon_4.png';
    let OddEven = res.type == 'odd' ? 'result_icon_odd.png' : 'result_icon_even.png';

    if (type == 'history') {
        $('#game_result_box').prepend(ListHistoryBody(res,Top,Line,OddEven));
    }

    
    $('.result_list').scrollLeft( $('.result_list ').scrollLeft() + 300);
}

    
    const ListHistoryBody = (res,Top,Line,OddEven) => {

        return `<li>`+
                    `<dl>`+
                   ` <dt>${res.round}회차</dt>`+
                    `<dd><img src="./img/${Top}"></dd>`+
                    `<dd><img src="./img/${Line}"></dd>`+
                    `<dd><img src="./img/${OddEven}"></dd>`+
                    `</dl>`+
                `</li>`;
    }

    const RefreshHistory = () => {
        $.ajax(URL + '/mega-ladder/history').then((res) => {
            res.map((item,index) => {
                populateResult(item, 'history');
            });
        })
    }

    RunGameTimeAndRound('korea', '+9');
    RefreshHistory();
    

    