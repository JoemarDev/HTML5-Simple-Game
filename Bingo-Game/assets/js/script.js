const URL = "https://realbet-server.online/api";

const backgroundMusic = new Audio('./assets/sounds/bingo_bg.mp3');
const resultMusic = new Audio('./assets/sounds/bingo_start.mp3');
const  sayBingo = new Audio('./assets/sounds/bingo_win.mp3');
let isBrowserSoundReady = false;
let globalSeconds = 0;
let round = 0;
let isGameReady = false;
let speed = 100;
let isAnimPlaying = false;



// Config and sound script

const Toogle = (elem) => {
    return $(elem).hasClass('on') ? $(elem).removeClass('on') : $(elem).addClass('on');
}

const ReloadWindow = (elem) => {
    window.location.reload();
}

const InitSounds = async () => {
    isBrowserSoundReady = true;
    await CheckConfigSaved();
    backgroundMusic.loop = true;
    backgroundMusic.play();
}


const MusicToogle = (elem) => {
    localStorage.setItem("sounds", (!$(elem).hasClass('on')));
    backgroundMusic.muted = $(elem).hasClass('on');
};

const SoundEffectToogle = (elem) => {
    localStorage.setItem("effect", (!$(elem).hasClass('on')));
    resultMusic.muted = $(elem).hasClass('on');
};


const CheckConfigSaved = () => {
    let soundConfig = localStorage.getItem("sounds");
    let effectConfig = localStorage.getItem("effect");

    if (soundConfig == 'false') {
        backgroundMusic.muted = true;
        $('.music').addClass('on');
    }

    if (effectConfig == 'false') {
        resultMusic.muted = true;
        $('.sound').addClass('on');
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
    const GameHour = nd.getHours();
    const GameMinute = nd.getMinutes();

    return ((GameHour * 60) + GameMinute) + 1;

}


const RunGameTimeAndRound = (city, offset) => {

    setInterval(() => {
        // convert the current time to korean timezone
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));

        const GameRound = GetGameRound(offset);

        // get korean timezone seconds
        const GameSec = (60 - nd.getSeconds()).toString().padStart(2, '0');


        if(GameSec < 2) {
            $('.ani01').fadeOut();
        } 
        if (GameSec == 60) {
            backgroundMusic.pause();
            resultMusic.play();
            GetResult();
        }
        $('#game .game-clock').html(FormatDate(d));
        $('#game-screen #round').html(GameRound);
        $('#game-screen #timer').html(GameSec == 60 ? 0 : GameSec);

    }, 1000);
};




const GetResult = () => {
    $.ajax(URL + '/bingo-game').then((res) => {
        RunAnimation(res);
    });
}


const RunAnimation = (res) => {
    AnimateBall(0);
    setTimeout(() => {
        $(`.bingo_red_${res.ball_two}`).addClass('on');
        $(`.bingo_blue_${res.ball_two}`).addClass('on');
        AppendResultBall(res.ball_two);
        AnimateBall(0);
        setTimeout(() => {
            $(`.bingo_red_${res.ball_three}`).addClass('on');
            $(`.bingo_blue_${res.ball_three}`).addClass('on');
            AppendResultBall(res.ball_three);
            populateResult(res,'history');
            sayBingo.play();
            if(res.color == 'red') {
                $('.bingo_red .bingo_end_set').show();
            } else {
                $('.bingo_blue .bingo_end_set').show();
            }

            backgroundMusic.play();
            setTimeout(() => {
                GetNextPlaceHolder();
            },5000);
        },1500);
    },1500);
};


const AnimateBall = (current) => {
   
    setTimeout(() => {
        $('.ball_base').removeClass('ani5');
        $('.ball_base').addClass('ani1');
        setTimeout(() => {
            $('.ball_base').removeClass('ani1');
            $('.ball_base').addClass('ani2');
        },speed);
        setTimeout(() => {
            $('.ball_base').removeClass('ani2');
            $('.ball_base').addClass('ani3');
        },speed);
        setTimeout(() => {
            $('.ball_base').removeClass('ani3');
            $('.ball_base').addClass('ani4');
        },speed);
        setTimeout(() => {
            $('.ball_base').removeClass('ani4');
            $('.ball_base').addClass('ani5');
            if(current < 5) {
                AnimateBall(current + 1);
            } else {
                $('.ball_base').removeClass('ani5');
            }
        },speed);
    },speed);
}


const GetNextPlaceHolder = () => {

    $.ajax(URL + '/bingo-game/next').then((res) => 
    {
        AnimateBall(0); 
        setTimeout(() => {
            $('.ball_box .in_content').html('');
            $('.bingo_end_set').hide();
            AppendBoardTable(res.board_blue , 'blue' , res.ball_one);
            AppendBoardTable(res.board_red , 'red' , res.ball_one);
            AppendResultBall(res.ball_one);
        },1500);
    })
}

const AppendBoardTable = (data , type , ball_one ) => {

    let elem = null;

    if(type == 'blue') {
        elem =  $('.bingo_blue .bingo_item');
    } else {
        elem =  $('.bingo_red .bingo_item');
    }

    elem.removeAttr('class');
    elem.addClass('bingo_item');
    
    data.map((item,index) => {
        
 

        if(type == 'blue') {
            $(`.bingo_blue .bingo_item:eq(${index})`).addClass(`bingo_blue_${item} ${ball_one == item ? 'on' : ''}`);
        } else {
            $(`.bingo_red .bingo_item:eq(${index})`).addClass(`bingo_red_${item} ${ball_one == item ? 'on' : ''}`);
        }  
    })
}

const AppendResultBall = (ball) => {
    $('.result_ball').html(`<span class="big_ball s${ball}"></span>`)
    $('.ball_box .in_content').append(`<span class="small_ball  s${ball}"></span>`)
}



const populateResult = (res, type) => {

    let round = res.round;
    let tableType = res.color == 'red' ? 1 : 2;
    let color = res.color == 'red' ? 'red_bg' : 'blue_bg';

    if (type == 'history') {
        $('.history ul').prepend(ListHistoryBody(round,tableType, color, res.ball_one , res.ball_two , res.ball_three , res.win_type));
    }
}




const ListHistoryBody = ( round , table_type , color ,   Num1 , Num2 , Num3 ,type) => {

    return  `<li>`+
                `<h3>${round}회차</h3>`+
                `<div class="icon_box bing_box ${color}">`+
                    `<span class="bingo_type r${table_type}s${Number(type) + 1}"></span>`+
                    `<span class="number n${Num1}">${Num1}</span>`+
                    `<span class="split">.</span>`+
                    `<span class="number n${Num2}">${Num2}</span>`+
                    `<span class="split">.</span>`+
                    `<span class="number n${Num3}">${Num3}</span>`+
                `</div>`+
            `</li>`;
}



const RefreshHistory = () => {
    $.ajax(URL + '/bingo-game/history').then((res) => {
        res.map((item,index) => {
            populateResult(item, 'history');
        });
    })
}

RefreshHistory();
GetNextPlaceHolder();
RunGameTimeAndRound('korea', '+9');
