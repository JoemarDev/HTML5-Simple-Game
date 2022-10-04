const URL = "https://realbet-server.online/api";

const backgroundMusic = new Audio('./assets/sounds/halloween_bg.mp3');
const resultMusic = new Audio('./assets/sounds/halloween_play.mp3');
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




// Animation Scripts
function halloweenAni_01() {
    return new Promise((resolve) => {
        $('.i_start_left').addClass('on')
        $('.b_ladder_3').show();
        var object_content = $('.ani_type1');
        var time = 3;
        object_content.show();
        setTimeout(function () {
            object_content.find('.b_s1').animate({
                height: 38
            }, 38 * time, function () {
                object_content.find('.b_s2').animate({
                    width: 136
                }, 136 * time, function () {
                    object_content.find('.b_s3').animate({
                        height: 31
                    }, 31 * time, function () {
                        object_content.find('.b_s4').animate({
                            width: 136,
                            'margin-left': 0
                        }, 136 * time, function () {
                            object_content.find('.b_s5').animate({
                                height: 31
                            }, 31 * time, function () {
                                object_content.find('.b_s6').animate({
                                    width: 136
                                }, 136 * time, function () {
                                    object_content.find('.b_s7').animate({
                                        height: 38
                                    }, 38 * time, function () {
                                        setTimeout(function () {
                                            gameData.find('.i_icon.i_result_right').addClass('on');
                                            resolve(true);
                                        }, 150);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }, 100);
    })
}

function halloweenAni_02() {
    return new Promise((resolve) => {
        $('.i_start_left').addClass('on')
        $('.b_ladder_4').show();
        var object_content = $('.ani_type2');
        var time = 3;
        object_content.show();
        setTimeout(function () {
            object_content.find('.b_s1').animate({
                height: 26
            }, 26 * time, function () {
                object_content.find('.b_s2').animate({
                    width: 136
                }, 136 * time, function () {
                    object_content.find('.b_s3').animate({
                        height: 31
                    }, 31 * time, function () {
                        object_content.find('.b_s4').animate({
                            width: 136,
                            'margin-left': 0
                        }, 136 * time, function () {
                            object_content.find('.b_s5').animate({
                                height: 31
                            }, 31 * time, function () {
                                object_content.find('.b_s6').animate({
                                    width: 136
                                }, 136 * time, function () {
                                    object_content.find('.b_s7').animate({
                                        height: 31
                                    }, 31 * time, function () {
                                        object_content.find('.b_s8').animate({
                                            width: 136,
                                            'margin-left': 0
                                        }, 136 * time, function () {
                                            object_content.find('.b_s9').animate({
                                                height: 26
                                            }, 26 * time, function () {
                                                setTimeout(function () {
                                                    gameData.find('.i_icon.i_result_left').addClass('on');
                                                    resolve(true)
                                                }, 150);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }, 100);
    })
}

function halloweenAni_03() {
    return new Promise((resolve) => {
        $('.i_start_right').addClass('on')
        $('.b_ladder_3').show();
        var object_content = $('.ani_type3');
        var time = 3;
        object_content.show();
        setTimeout(function () {
            object_content.find('.b_s1').animate({
                height: 38
            }, 38 * time, function () {
                object_content.find('.b_s2').animate({
                    width: 136,
                    'margin-left': 0
                }, 136 * time, function () {
                    object_content.find('.b_s3').animate({
                        height: 31
                    }, 31 * time, function () {
                        object_content.find('.b_s4').animate({
                            width: 136
                        }, 136 * time, function () {
                            object_content.find('.b_s5').animate({
                                height: 31
                            }, 31 * time, function () {
                                object_content.find('.b_s6').animate({
                                    width: 136,
                                    'margin-left': 0
                                }, 136 * time, function () {
                                    object_content.find('.b_s7').animate({
                                        height: 38
                                    }, 38 * time, function () {
                                        setTimeout(function () {
                                            gameData.find('.i_icon.i_result_left').addClass('on');
                                           resolve(true);
                                        }, 150);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }, 100);
    })
}

function halloweenAni_04() {
    return new Promise((resolve) => {
        $('.i_start_right').addClass('on')
        $('.b_ladder_4').show();
        var object_content = $('.ani_type4');
        var time = 3;
        object_content.show();
        setTimeout(function () {
            object_content.find('.b_s1').animate({
                height: 26
            }, 26 * time, function () {
                object_content.find('.b_s2').animate({
                    width: 136,
                    'margin-left': 0
                }, 136 * time, function () {
                    object_content.find('.b_s3').animate({
                        height: 31
                    }, 31 * time, function () {
                        object_content.find('.b_s4').animate({
                            width: 136
                        }, 136 * time, function () {
                            object_content.find('.b_s5').animate({
                                height: 31
                            }, 31 * time, function () {
                                object_content.find('.b_s6').animate({
                                    width: 136,
                                    'margin-left': 0
                                }, 136 * time, function () {
                                    object_content.find('.b_s7').animate({
                                        height: 31
                                    }, 31 * time, function () {
                                        object_content.find('.b_s8').animate({
                                            width: 136
                                        }, 136 * time, function () {
                                            object_content.find('.b_s9').animate({
                                                height: 26
                                            }, 26 * time, function () {
                                                setTimeout(function () {
                                                    gameData.find('.i_icon.i_result_right').addClass('on');
                                                    resolve(true);
                                                }, 150);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }, 100);
    })
}



const GetResult = async() => {
    isAnimPlaying = true;

    // let RandomTopPosition = ['left' , 'right'];
    // let RandomLine = [3,4];
    // let RandomBotPosition = ['left' , 'right'];

    // let Top = RandomTopPosition[GetRand(RandomTopPosition.length)];
    // let Line = RandomLine[GetRand(RandomLine.length)];
    // let Bottom = RandomBotPosition[GetRand(RandomBotPosition.length)];

    $.ajax(URL + '/halloween-line').then((res) => {
        RunAnimation(res.top,res.line,res.type);
        setTimeout(() => {
            populateResult(res, 'result');
            populateResult(res, 'history');
            backgroundMusic.play();
        }, 7000);
    });

   
}

const RunAnimation = (Top,Line) => {
    $('.timer_box').fadeOut();

    (Top == 'left' && Line == 3) && halloweenAni_01().then(() => setTimeout(() => {ResetAnimation()},2000));
    (Top == 'left' && Line == 4) && halloweenAni_02().then(() => setTimeout(() => {ResetAnimation()},2000));
    (Top == 'right' && Line == 3) && halloweenAni_03().then(() => setTimeout(() => {ResetAnimation()},2000));
    (Top == 'right' && Line == 4) && halloweenAni_04().then(() => setTimeout(() => {ResetAnimation()},2000));

    setTimeout(() => {
        ResetAnimation();
    },7000)
}


const populateResult = (res, type) => {

    let Res1 = res.top == 'left' ? 'icon_leftright_1' : 'icon_leftright_2';
    let Res2 = res.line == 3 ? 'icon_count_3' : 'icon_count_4';
    let Res3 = res.type == 'odd' ? 'icon_result_1' : 'icon_result_2';


    if (type == 'history') {
        $('.history').prepend(ListHistoryBody(res,Res1, Res2,Res3));
    }
}


const ListHistoryBody = (res , Res1 , Res2 , Res3) => {
    return `<div class="listitem">`+
                `<span class="round">${res.round}회차</span>`+
                `<span class="game-sprite ${Res1}"></span>`+
                `<span class="game-sprite ${Res2}"></span>`+
                `<span class="game-sprite ${Res3}"></span>`+
            `</div>`;    
}


const RefreshHistory = () => {
    $.ajax(URL + '/halloween-line/history').then((res) => {
        res.map((item,index) => {
            populateResult(item, 'history');
        });
    })
}





const ResetAnimation = () => {
    $('.b_ladder_3').hide();
    $('.b_ladder_4').hide();
    $('.i_icon').removeClass('on');
    $('.ani_type1 span').removeAttr('style');
    $('.ani_type2 span').removeAttr('style');
    $('.ani_type3 span').removeAttr('style');
    $('.ani_type4 span').removeAttr('style');
    $('.timer_box').fadeIn();
    $('.ani01').fadeIn();
}


RunGameTimeAndRound('korea', '+9');
RefreshHistory();
