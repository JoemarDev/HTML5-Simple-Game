const URL = "https://realbet-server.online/api";

const backgroundMusic = new Audio('./assets/sounds/flower_bg.mp3');
const resultMusic = new Audio('./assets/sounds/flower_play.mp3');
let isBrowserSoundReady = false;
let globalSeconds = 0;
let round = 0;
let isGameReady = false;
let speed = 300;
let isAnimPlaying = false;
const gameData = $('#game');

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
    $(".flip").flip({
        trigger: 'manual'
    });
    setInterval(() => {
        // convert the current time to korean timezone
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));

        const GameRound = GetGameRound(offset);

        // get korean timezone seconds
        const GameSec = (60 - nd.getSeconds()).toString().padStart(2, '0');

        // InitPreAnim(GameSec);

        if (GameSec == 60) {
            backgroundMusic.pause();
            resultMusic.play();
            GetResult();
        }

        $('#game-screen .round').html(GameRound);
        $('#game-screen .timer').html(GameSec == 60 ? 0 : GameSec);

    }, 1000);
};


function flowerAni(response) {

    var object = gameData.find('.hidden_card');
    var speed = 200;
    $("#flower_card").find('.back').addClass(`s${response.card}`).show();
    object.stop().animate({
        right: -4
    }, speed, function () {
        object.stop().animate({
            right: 4
        }, speed, function () {
            object.stop().animate({
                right: -4
            }, speed, function () {
                object.stop().animate({
                    right: 4
                }, speed, function () {
                    object.stop().animate({
                        right: -4
                    }, speed, function () {
                        object.stop().animate({
                            right: 4
                        }, speed, function () {
                            object.stop().animate({
                                right: -4
                            }, speed, function () {
                                object.stop().animate({
                                    right: 4
                                }, speed, function () {
                                    object.stop().animate({
                                        right: -4
                                    }, speed, function () {
                                        object.stop().animate({
                                            right: 4
                                        }, speed, function () {
                                            object.stop().animate({
                                                right: -4
                                            }, speed, function () {
                                                object.stop().animate({
                                                    right: 4
                                                }, speed, function () {
                                                    object.stop().animate({
                                                        right: 0
                                                    }, speed, function () {
                                                        $("#flower_card").flip(true);
                                                        setTimeout(() => {
                                                            populateResult(response, 'result');
                                                            backgroundMusic.play();
                                                            ResetAnimation();
                                                        }, 4000);
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

const ResetAnimation = () => {
    $("#flower_card").flip(false);
    let elem = $("#flower_card").find('.back');
    elem.removeAttr('class');
    elem.addClass('back imgflower_card');
}

const GetResult = async() => {
    isAnimPlaying = true;
    // let RandomPosition = ['left' , 'right'];
    // let RandomBounce = [3,4];
    // let RandomDrop = ['left' , 'right'];

    // let Bird = RandomPosition[GetRand(RandomPosition.length)];
    // let Bounce = RandomBounce[GetRand(RandomBounce.length)];
    // let drop = RandomDrop[GetRand(RandomDrop.length)];

    $.ajax(URL + '/card-game').then((res) => {
        flowerAni(res);
    });
}

const RefreshHistory = () => {
    $.ajax(URL + '/card-game/history').then((res) => {
        res.map((item) => {
            populateResult(item, 'history');
        });
    })
}


const populateResult = (res, type) => {

    let Res1 = res.odd_even == 'even' ? 'icon_result_1' : 'icon_result_2';
    let Res2 = res.under_over == 'under' ? 'icon_underover_1' : 'icon_underover_2';
    let Res3 = `icon_card_${res.card}`;

    if (type == 'history') {
        $('.history').prepend(ListResultBody(res, Res1, Res2,Res3));
    }

    if (type == 'result') {
        $('.history').prepend(ListResultBody(res, Res1, Res2,Res3));
    }

}




const ListResultBody = (res, Res1, Res2,Res3) => {
    return `<div class="listitem">`+
                `<div class="round">${res.round}회차</div>`+
                `<div class="game-sprite ${Res1}"></div>`+
                `<div class="game-sprite ${Res2}"></div>`+
                `<div class="game-sprite ${Res3}"></div>`+
            `</div>`;

}




RefreshHistory();
RunGameTimeAndRound('korea', '+9');

