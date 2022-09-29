// eg: 
// RunAnimation('left', 3) // Even
// RunAnimation('left', 4) // Odd
// RunAnimation('right', 3) // Odd
// RunAnimation('right', 4) // Even

const URL = "https://realbet-server.online/api";

const backgroundMusic = new Audio('./assets/sounds/dooly_bg.mp3');
const resultMusic = new Audio('./assets/sounds/dooly_play.mp3');
const gameData = $('#game-screen');
let isBrowserSoundReady = false;
let globalSeconds = 0;
let round = 0;
let isGameReady = false;
let speed = 300;
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
            $('.dooly_ani').fadeOut();
        } 
        if (GameSec == 60) {
            backgroundMusic.pause();
            resultMusic.play();
            GetResult();
        }

        $('#game-screen .round-result-box').html(GameRound - 1);
        $('#game-screen .game-clock').html(FormatDate(d));
        $('#game-screen .round').html(GameRound);
        $('#game-screen .timer').html(GameSec == 60 ? 0 : GameSec);

    }, 1000);
};


function doolyAni_s1(response) {
    var object_content = $('.result_set.type1');
    var time = 3;
    gameData.find('.game-sprite.i_icon.o_s1').addClass('on');
    setTimeout(function() {
        object_content.find('.t1').animate({
            height: 61
        }, 61 * time, function() {
            object_content.find('.t2').animate({
                width: 196
            }, 196 * time, function() {
                object_content.find('.t3').animate({
                    height: 46
                }, 46 * time, function() {
                    object_content.find('.t4').animate({
                        width: 196, 'margin-left': 0
                    }, 196 * time, function() {
                        object_content.find('.t5').animate({
                            height: 46
                        }, 46 * time, function() {
                            object_content.find('.t6').animate({
                                width: 196
                            }, 196 * time, function() {
                                object_content.find('.t7').animate({
                                    height: 61
                                }, 61 * time, function() {
                                    setTimeout(function() {
                                        gameData.find('.game-sprite.i_icon.o_e2').addClass('on');
                                        // doolyResult(response);
                                    }, 100);
                                });
                            });
                        });
                    });
                });
            });
        });
    }, 100);
}
function doolyAni_s2(response) {
    var object_content = $('.result_set.type2');
    var time = 3;
    gameData.find('.game-sprite.i_icon.o_s1').addClass('on');
    setTimeout(function() {
        object_content.find('.t1').animate({
            height: 41
        }, 41 * time, function() {
            object_content.find('.t2').animate({
                width: 196
            }, 196 * time, function() {
                object_content.find('.t3').animate({
                    height: 46
                }, 46 * time, function() {
                    object_content.find('.t4').animate({
                        width: 196, 'margin-left': 0
                    }, 196 * time, function() {
                        object_content.find('.t5').animate({
                            height: 46
                        }, 46 * time, function() {
                            object_content.find('.t6').animate({
                                width: 196
                            }, 196 * time, function() {
                                object_content.find('.t7').animate({
                                    height: 46
                                }, 46 * time, function() {
                                    object_content.find('.t8').animate({
                                        width: 196, 'margin-left': 0
                                    }, 196 * time, function() {
                                        object_content.find('.t9').animate({
                                            height: 43
                                        }, 43 * time, function() {
                                            setTimeout(function() {
                                                gameData.find('.game-sprite.i_icon.o_e1').addClass('on');
                                                // doolyResult(response);
                                            }, 100);
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
}
function doolyAni_s3(response) {
    var object_content = $('.result_set.type3');
    var time = 3;
    gameData.find('.game-sprite.i_icon.o_s2').addClass('on');
    setTimeout(function() {
        object_content.find('.t1').animate({
            height: 61
        }, 61 * time, function() {
            object_content.find('.t2').animate({
                width: 196, 'margin-left': 0
            }, 196 * time, function() {
                object_content.find('.t3').animate({
                    height: 46
                }, 46 * time, function() {
                    object_content.find('.t4').animate({
                        width: 196
                    }, 196 * time, function() {
                        object_content.find('.t5').animate({
                            height: 46
                        }, 46 * time, function() {
                            object_content.find('.t6').animate({
                                width: 196, 'margin-left': 0
                            }, 196 * time, function() {
                                object_content.find('.t7').animate({
                                    height: 61
                                }, 61 * time, function() {
                                    setTimeout(function() {
                                        gameData.find('.game-sprite.i_icon.o_e1').addClass('on');
                                        // doolyResult(response);
                                    }, 100);
                                });
                            });
                        });
                    });
                });
            });
        });
    }, 100);
}
function doolyAni_s4(response) {
    var object_content = $('.result_set.type4');
    console.log(object_content)
    var time = 3;
    gameData.find('.game-sprite.i_icon.o_s2').addClass('on');
    setTimeout(function() {
        object_content.find('.t1').animate({
            height: 41
        }, 41 * time, function() {
            object_content.find('.t2').animate({
                width: 196, 'margin-left': 0
            }, 196 * time, function() {
                object_content.find('.t3').animate({
                    height: 46
                }, 46 * time, function() {
                    object_content.find('.t4').animate({
                        width: 196
                    }, 196 * time, function() {
                        object_content.find('.t5').animate({
                            height: 46
                        }, 46 * time, function() {
                            object_content.find('.t6').animate({
                                width: 196, 'margin-left': 0
                            }, 196 * time, function() {
                                object_content.find('.t7').animate({
                                    height: 46
                                }, 46 * time, function() {
                                    object_content.find('.t8').animate({
                                        width: 196
                                    }, 196 * time, function() {
                                        object_content.find('.t9').animate({
                                            height: 43
                                        }, 43 * time, function() {
                                            setTimeout(function() {
                                                gameData.find('.game-sprite.i_icon.o_e2').addClass('on');
                                                // doolyResult(response);
                                            }, 100);
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
}


const RunAnimation = (Top,Line) => {
    if(Top == 'left') {
        $('.dooly_ani_s1').fadeIn();
    }

    if(Top == 'right') {
        $('.dooly_ani_s2').fadeIn();
    }
  
    $('.result_box').hide();
   if(Line == 3) {
        $('.width_line.line_3').show()
   }
    if(Line == 4) {
        $('.width_line.line_4').show();
    }
    (Top == 'left' && Line == 3) && doolyAni_s1();
    (Top == 'left' && Line == 4) && doolyAni_s2();
    (Top == 'right' && Line == 3) && doolyAni_s3();
    (Top == 'right' && Line == 4) && doolyAni_s4();

    setTimeout(() => {
        ResetAnimation();
    },7000)
}


const GetResult = async() => {
    isAnimPlaying = true;

    // let RandomTopPosition = ['left' , 'right'];
    // let RandomLine = [3,4];
    // let RandomBotPosition = ['left' , 'right'];

    // let Top = RandomTopPosition[GetRand(RandomTopPosition.length)];
    // let Line = RandomLine[GetRand(RandomLine.length)];
    // let Bottom = RandomBotPosition[GetRand(RandomBotPosition.length)];

    $.ajax(URL + '/dolly').then((res) => {
        RunAnimation(res.top,res.line,res.type);
        setTimeout(() => {
            populateResult(res, 'result');
            populateResult(res, 'history');
            backgroundMusic.play();
        }, 7000);
    });

   
}

const GetRand = (len) => {
    return Math.floor(Math.random() * len)
}

const populateResult = (res, type) => {

    let Res1 = res.top == 'left' ? 'icon_leftright_1' : 'icon_leftright_2';
    let Res2 = res.line == 3 ? 'icon_count_3' : 'icon_count_4';
    let Res3 = res.type == 'left' ? 'icon_result_1' : 'icon_result_2';


    if (type == 'history') {
        $('.history').prepend(ListHistoryBody(res,Res1, Res2,Res3));
    }

    if (type == 'result') {
        $('.result_box .result').html(ListResultBody(Res1, Res2,Res3));
    }
}

const ListResultBody = (Res1, Res2,Res3) => {
    return `<div class="game-sprite ${Res1}"></div>`+
    `<div class="game-sprite ${Res2}"></div>`+
    `<div class="game-sprite ${Res3}"></div>`;
}

const ListHistoryBody = (res , Res1 , Res2 , Res3) => {
    return `<div class="listitem">`+
                `<div class="round"><strong>${res.round}</strong>회차</div>`+
                `<div class="game-sprite ${Res1}"></div>`+
                `<div class="game-sprite ${Res2}"></div>`+
                `<div class="game-sprite ${Res3}"></div>`+
           `</div>`;
}


const RefreshHistory = () => {
    $.ajax(URL + '/dolly/history').then((res) => {

        res.map((item,index) => {
            if(index == (res.length - 1)) {
                populateResult(item, 'result');
            }
            populateResult(item, 'history');
        });
    })
}


const ResetAnimation = () => {
    $('.dooly_ani').show();
    $('.dooly_ani_s1').hide();
    $('.dooly_ani_s2').hide();
    $('.result_set  span').removeAttr("style");
    $('.i_icon ').removeClass('on');
    $('.width_line ').hide();
    $('.result_box').show()
    isAnimPlaying = false;
}

RunGameTimeAndRound('korea', '+9');
RefreshHistory();