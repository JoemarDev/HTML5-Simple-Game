const URL = "https://realbet-server.online/api";

const backgroundMusic = new Audio('./assets/sounds/roulette_bg.mp3');
const resultMusic = new Audio('./assets/sounds/roulette_play.mp3');
let isBrowserSoundReady = false;
let globalSeconds = 0;
let round = 0;
let isGameReady = false;
let speed = 300;
let isAnimPlaying = false;

// Config and sound script

let history = [];
//             1     4     3     2     1     4     3     2
const Pos = [3960, 4005, 4050, 4095, 4140, 4185, 4230, 4275];



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


        if (GameSec == 60) {
            backgroundMusic.pause();
            resultMusic.play();
            GetResult();
        }

        $('#game-screen .round').html(GameRound);
        $('#game-screen .timer').html(GameSec == 60 ? 0 : GameSec);

    }, 1000);
};





const RunAnimation = (res, ticker) => {

    let resPosition = Pos[res];

    resPosition += Number(ticker);

    $('#game-screen .front').css('opacity', 0);

    $('#game-screen .front').css({
        'transform': `rotate(0deg)`,
        'transition': 'transform 0s',
    });

    $('#game-screen .back').css('opacity', 1);

    setTimeout(() => {

        $('#game-screen .front').css({
            'transition': 'transform 8s cubic-bezier(0.05, 0.15, 0, 1.01)',
            'transform': `rotate(${(resPosition)}deg)`,
        });

        setTimeout(() => {
            $('#game-screen .front').css('opacity', 1);

            $('#game-screen .back').css('opacity', 0);

            $('#game-screen .back').css({
                'transform': `rotate(${(resPosition)}deg)`,
                'transition': 'none',
            });

        }, 500);

    }, 100);
}

const populateResult = (res, type) => {
    let res_name_1 = '';
    let res_icon_2 = '';



    res.result % 2 != 0 ? res_icon_2 = 'icon_result_1' : res_icon_2 = 'icon_result_2';

    if (res.result == 1 || res.result == 5) res_name_1 = 'icon_number_1';
    if (res.result == 4 || res.result == 8) res_name_1 = 'icon_number_2';
    if (res.result == 3 || res.result == 7) res_name_1 = 'icon_number_3';
    if (res.result == 2 || res.result == 6) res_name_1 = 'icon_number_4';



    if (type == 'history') {
        $('.history').prepend(ListResultBody(res, res_name_1, res_icon_2));
    }

    if (type == 'result') {
        $('.history').prepend(ListResultBody(res, res_name_1, res_icon_2));
        $('.result_box').show();
        $('.result_box').html(GameResultBody(res, res_name_1, res_icon_2));
        ResetResultBox();
    }

}


const GetResult = async () => {
    
    $.ajax(URL + '/flower-routellete').then((res) => {
        RunAnimation((res.result - 1), res.rand_pos);
        setTimeout(() => {
            populateResult(res, 'result');
            backgroundMusic.play();
        }, 8200);
    });
}


const RefreshHistory = () => {
    $.ajax(URL + '/flower-routellete/history').then((res) => {
        res.map((item) => {
            populateResult(item, 'history');
        });
    })
}

const ListResultBody = (res, res_name_1, res_icon_2) => {
    return  `<div class="listitem">`+
                `<div class="round-box"><strong>${res.round}</strong>회차</div>`+
                `<div class="game-sprite ${res_icon_2}"></div>`+
                `<div class="game-sprite ${res_name_1}"></div>`+      
            `</div>`;
}


const GameResultBody = (res, res_name_1, res_icon_2) => {
    return `<div class="content_box">` +
                `<div class="round-box">${res.round}회차 결과</div>`+
                `<div class="game-sprite result_icon ${res_icon_2}"></div>`+
                `<div class="game-sprite result_icon ${res_name_1}"></div>`+
            `</div>`;
}


const ResetResultBox = () => {
    setTimeout(() => {
        $('.result_box').hide();
        $('.result_box').html();
    }, 10000);
}



RunGameTimeAndRound('korea', '+9');
RefreshHistory();

