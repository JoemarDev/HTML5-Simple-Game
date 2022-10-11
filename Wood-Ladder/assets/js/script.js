const URL = "https://realbet-server.online/api";

const backgroundMusic = new Audio('./assets/sounds/ladder_bg.mp3');
const resultMusic = new Audio('./assets/sounds/ladder_play.mp3');
let isBrowserSoundReady = false;
let globalSeconds = 0;
let round = 0;
let isGameReady = false;
let speed = 300;
let isAnimPlaying = false;
let gameData = $('#game');



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

    $.ajax(URL + '/wood-line').then((res) => {
        RunAnimation(res.top,res.line,res.type);
        setTimeout(() => {
            populateResult(res, 'history');
            backgroundMusic.play();
        }, 5000);
    });

   
}


const RunAnimation = (Top,Line) => {
    $('.wait_box').fadeOut();

    (Top == 'left' && Line == 3) && ladder_type1();
    (Top == 'right' && Line == 3) && ladder_type2();
    (Top == 'left' && Line == 4) && ladder_type3();
    (Top == 'right' && Line == 4)  && ladder_type4();

    setTimeout(() => {
        ResetAnimation();
    },5000);
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






function ladder_type1(response) {
        $('.ladder_bg').addClass('s3');
        var time = 3;
        var ladder_content = gameData.find('.ladder_type1');
        ladder_content.find('.t1').animate({
            height: '44px'
        }, 44 * time, function() {
            ladder_content.find('.t2').animate({
                width: '148px'
            }, 148 * time, function() {
                ladder_content.find('.t3').animate({
                    height: '29px'
                }, 29 * time, function() {
                    ladder_content.find('.t4').animate({
                        width: '158px',
                        'margin-left': '0px'
                    }, 158 * time, function() {
                        ladder_content.find('.t5').animate({
                            height: '29px'
                        }, 29 * time, function() {
                            ladder_content.find('.t6').animate({
                                width: '165px'
                            }, 165 * time, function() {
                                ladder_content.find('.t7').animate({
                                    height: '75px'
                                }, 75 * time, function() {
                                    gameData.find('.end_icon.s2').addClass('on');
                                   
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    function ladder_type2(response) {
        $('.ladder_bg').addClass('s3');
        var time = 3;
        var ladder_content = gameData.find('.ladder_type2');
        ladder_content.find('.t1').animate({
            height: '44px'
        }, 44 * time, function() {
            ladder_content.find('.t2').animate({
                width: '151px',
                'margin-left': '0px'
            }, 150 * time, function() {
                ladder_content.find('.t3').animate({
                    height: '29px'
                }, 29 * time, function() {
                    ladder_content.find('.t4').animate({
                        width: '158px'
                    }, 158 * time, function() {
                        ladder_content.find('.t5').animate({
                            height: '29px'
                        }, 29 * time, function() {
                            ladder_content.find('.t6').animate({
                                width: '168px',
                                'margin-left': '0px'
                            }, 168 * time, function() {
                                ladder_content.find('.t7').animate({
                                    height: '75px'
                                }, 75 * time, function() {
                                    gameData.find('.end_icon.s1').addClass('on');
                                   
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    function ladder_type3(response) {
        $('.ladder_bg').addClass('s4');
        var time = 2.5;
        var ladder_content = gameData.find('.ladder_type3');
        ladder_content.find('.t1').animate({
            height: '44px'
        }, 44 * time, function() {
            ladder_content.find('.t2').animate({
                width: '148px'
            }, 148 * time, function() {
                ladder_content.find('.t3').animate({
                    height: '25px'
                }, 25 * time, function() {
                    ladder_content.find('.t4').animate({
                        width: '156px',
                        'margin-left': '0px'
                    }, 156 * time, function() {
                        ladder_content.find('.t5').animate({
                            height: '25px'
                        }, 25 * time, function() {
                            ladder_content.find('.t6').animate({
                                width: '164px'
                            }, 164 * time, function() {
                                ladder_content.find('.t7').animate({
                                    height: '28px'
                                }, 28 * time, function() {
                                    ladder_content.find('.t8').animate({
                                        width: '172px',
                                        'margin-left': '0px'
                                    }, 172 * time, function() {
                                        ladder_content.find('.t9').animate({
                                            height: '60px'
                                        }, 60 * time, function() {
                                            gameData.find('.end_icon.s1').addClass('on');
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

    function ladder_type4(response) {
        $('.ladder_bg').addClass('s4');
        var time = 2.5;
        var ladder_content = gameData.find('.ladder_type4');
        ladder_content.find('.t1').animate({
            height: '44px'
        }, 44 * time, function() {
            ladder_content.find('.t2').animate({
                width: '150px',
                'margin-left': '0px'
            }, 150 * time, function() {
                ladder_content.find('.t3').animate({
                    height: '24px'
                }, 24 * time, function() {
                    ladder_content.find('.t4').animate({
                        width: '156px'
                    }, 156 * time, function() {
                        ladder_content.find('.t5').animate({
                            height: '25px'
                        }, 25 * time, function() {
                            ladder_content.find('.t6').animate({
                                width: '164px',
                                'margin-left': '0px'
                            }, 164 * time, function() {
                                ladder_content.find('.t7').animate({
                                    height: '28px'
                                }, 28 * time, function() {
                                    ladder_content.find('.t8').animate({
                                        width: '171px',
                                        'margin-left': '0px'
                                    }, 171 * time, function() {
                                        ladder_content.find('.t9').animate({
                                            height: '60px'
                                        }, 60 * time, function() {
                                            gameData.find('.end_icon.s2').addClass('on');
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

    const populateResult = (res, type) => {
        let Top = res.top == 'left' ? 'ld_a1' : 'ld_a2';
        let Line = res.line == '3' ? 'ld_b3' : 'ld_b4';
        let OddEven = res.type == 'odd' ? 'ld_c1' : 'ld_c2';
    
        if (type == 'history') {
            $('.history ul').prepend(ListHistoryBody(res,Top,Line,OddEven));
        }
    
       
        $('.result_list').scrollLeft( $('.result_list ').scrollLeft() + 300);
    }

    
    const ListHistoryBody = (res,Top,Line,OddEven) => {
        return `<li>`+
                    `<div class="data">`+
                        `<h3>${res.round}회차</h3>`+
                        `<div class="icon_box">`+
                            `<span class="l_icon_result ${Top}"></span>`+
                            `<span class="l_icon_result ${Line}"></span>`+
                            `<span class="l_icon_result ${OddEven}"></span>`+
                        `</div>`+
                    `</div>`+
                `</li>`;
    }

    const RefreshHistory = () => {
        $.ajax(URL + '/wood-line/history').then((res) => {
            res.map((item,index) => {
                populateResult(item, 'history');
            });
        })
    }

    
    RunGameTimeAndRound('korea', '+9');

    RefreshHistory();
    

    