const URL = "https://realbet-server.online/api";

const backgroundMusic = new Audio('./assets/sounds/roulette_bg.mp3');
const resultMusic = new Audio('./assets/sounds/roulette_play.mp3');
let isBrowserSoundReady = false;
let globalSeconds = 0;
let round = 0;
let isGameReady = false;
let speed = 300;
let isAnimPlaying = false;


const EvenPos = 347;
const OddPos = 375;
const pos  = {
    '23' : 7,
    '11' : 23,
    '7' : 38,
    '22' : 53,
    '15' : 68,
    '6' : 83,
    '24' : 98,
    '14' : 113,
    '10' : 128,
    '16' : 143,
    '5' : 158,
    '18' : 173,
    '8' : 188,
    '21' : 203,
    '19' : 218,
    '3' : 233,
    '12' : 248,
    '2' : 263,
    '20' : 278,
    '9' : 293,
    '4' : 308,
    '17' : 323,
    '13' : 338,
    '1' : 352,
};




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

        $('#game-screen #round').html(GameRound);
        $('#game-screen #timer').html(GameSec == 60 ? 0 : GameSec);

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

    $.ajax(URL + '/sky-roullete').then((res) => {
        let oe = res.odd_even == 'odd' ? OddPos : EvenPos;
        RunAnimation(res, res.number,oe);
    });

   
}





const RunAnimation = (res , a , b) => {

    $('.roulette_center_ani').show();
    $('#game').find('.roulette_01').rotate({
        duration: 10000,
        angle: 0,
        animateTo: 1080 + ((pos[a]) + Number(res['rand_pos_1'])),
        easing: $.easing.easeOutQuart,
        callback: function() {}
    });

    setTimeout(() => {
        $('#game').find('.roulette_02').rotate({
            duration: 10000,
            angle: 0,
            animateTo: -1080 - (b + Number(res['rand_pos_2'])),
            easing: $.easing.easeOutQuart,
            callback: function() {
                $('.roulette_result_board').removeClass('hide');
                populateResult(res,'result');
                populateResult(res,'history');
                backgroundMusic.play();
                setTimeout(() => {
                    ResetAnimation();
                },5000)  
            }
        });
    },500)
}



const ResetAnimation = () => {
    $('.roulette_result_board').addClass('hide');
    $('.roulette_center_ani').fadeOut();
};


const populateResult = (res, type) => {

    let UnderOver = res.under_over;
    let Color = res.color;
    let Number = res.number;
    let OddEven = res.odd_even;

    if (type == 'history') {
        $('.history ul').append(ListHistoryBody(res,UnderOver, Color,Number , OddEven));
    }

    if(type == 'result') {
        $('.roulette_result_board').html(ResultBody(res,UnderOver, Color,Number , OddEven));
    }
   
    $('.result_list').scrollLeft( $('.result_list ').scrollLeft() + 300);
}


const ResultBody = (res , UnderOver , Color , Number , OddEven) => {
    return `<div>`+
                `<h2>룰렛룰렛 <strong>${res.round}</strong>회차 당첨 안내</h2>`+
                `<div class="icon_box">`+
                    `<span class=" ${Color} icon_result"></span>`+
                    `<span class="${OddEven} icon_result"></span>`+
                    `<span class="${UnderOver} icon_result">${Number}</span>`+
                `</div>`+
            `</div>`;
}



const ListHistoryBody = (res , UnderOver , Color , Number , OddEven) => {
    return `<li>`+
                `<div class="data">`+
                    `<h3>${res.round}회차</h3>`+
                    `<div class="icon_box">`+
                        `<span class="icon_result ${Color}"></span>`+
                        `<span class="icon_result ${OddEven}"></span>`+
                        `<span class="icon_result ${UnderOver}">${Number}</span>`+
                    `</div>`+
                `</div>`+
            `</li>`;
}

const RefreshHistory = () => {
    $.ajax(URL + '/sky-roullete/history').then((res) => {
        res.map((item,index) => {
            populateResult(item, 'history');
        });
    })
}







RefreshHistory();
RunGameTimeAndRound('korea', '+9');
