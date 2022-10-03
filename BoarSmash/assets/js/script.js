const URL = "https://realbet-server.online/api";

const backgroundMusic = new Audio('./assets/sounds/apple_bg.mp3');
const resultMusic = new Audio('./assets/sounds/apple_play.mp3');
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

        InitPreAnim(GameSec);

        if (GameSec == 60) {
            backgroundMusic.pause();
            resultMusic.play();
            GetResult();
        }

        $('#game-screen #round').html(GameRound);
        $('#game-screen #timer').html(GameSec == 60 ? 0 : GameSec);

    }, 1000);
};


// Play pre-animation fade in the bird left and right

const InitPreAnim = (GameSec) => {

    if(GameSec > 1) {
        if(!isAnimPlaying) {
            if(GameSec % 6 >= 3) {
                PlayBoarPreAnim(1)
            } else {
                PlayBoarPreAnim(2);
            }
        }
    } else {
        $('.tab_start_1').fadeOut();
        $('.tab_start_2').fadeOut();
    }
}




const PlayBoarPreAnim = (type) => {
    if(type == 1) {
        $('.tab_start_1').fadeIn("slow");
        $('.tab_start_2').fadeOut();
    }

    if(type == 2) {
        $('.tab_start_1').fadeOut();
        $('.tab_start_2').fadeIn("slow");
    }
}

// Boar Animation
const InitBoarAnimation = () => {
    $('.tab_start_1').hide();
    $('.tab_start_2').hide();
}

const BoarStartFromLeft = () => {
    $('.tab_start_1').fadeIn("slow");
}

const BoarStartFromRight = () => {
    $('.tab_start_2').fadeIn("slow");
}

const BoarSmash = (type,count,drop) => {

    return new Promise((resolve) => {
        if(type == 'left') {
        $('.tab_start_1').fadeIn();
        $('.tab_start_1').animate({
            'left' : '66px'
        },speed, function()  {
            
            $('.tab_count_1').show();
            $(this).animate({
                'left' : '10px'
            },speed,function() {
                $(this).animate({
                    'left' : '66px',
                },speed , function() {
                    $('.tab_count_1').hide();
                    $('.tab_count_2').show();
                    $(this).animate({
                        'left' : '10px'
                    },speed , function() {
                        $(this).animate({
                            'left' : '66px'
                        },speed, function() {
                            if(count == 3) {
                                VibrateTarget(drop);
                                resolve(true);
                            }
                            $('.tab_count_2').hide();
                            $('.tab_count_3').show();
                            if(count == 4) {
                                $(this).animate({
                                    'left' : '10px'
                                },speed, function() {
                                    $('.tab_count_3').hide();
                                    $('.tab_count_4').show();
                                    VibrateTarget(drop);
                                    $(this).animate({
                                        'left' : '66px'
                                    },speed,function() {
                                        resolve(true);
                                    })
                                })
                            }
                           
                        });
                    })
                })
            })
        });
    } 

    if(type == 'right') {
        $('.tab_start_2').fadeIn();
        $('.tab_start_2').animate({
            'right' : '66px'
        },speed, function()  {
            
            $('.tab_count_1').show();
            $(this).animate({
                'right' : '10px'
            },speed,function() {
                $(this).animate({
                    'right' : '66px',
                },speed , function() {
                    $('.tab_count_1').hide();
                    $('.tab_count_2').show();
                    $(this).animate({
                        'right' : '10px'
                    },speed , function() {
                        $(this).animate({
                            'right' : '66px'
                        },speed, function() {
                            if(count == 3) {
                                VibrateTarget(drop);
                                resolve(true);
                            }
                            $('.tab_count_2').hide();
                            $('.tab_count_3').show();
                            if(count == 4) {
                                $(this).animate({
                                    'right' : '10px'
                                },speed, function() {
                                    $('.tab_count_3').hide();
                                    $('.tab_count_4').show();
                                    VibrateTarget(drop);
                                    $(this).animate({
                                        'right' : '66px'
                                    },speed,function() {
                                        resolve(true);
                                    })
                                })
                            }
                           
                        });
                    })
                })
            })
        });
    }
    })

   
    
}


const VibrateTarget = (drop) => {
    $('.tab_tree_2').addClass('tree-move');
    $('.tab_apple_1').addClass('apple-move');
    $('.tab_apple_2').addClass('apple-move');
    setTimeout(() => {
        $('.tab_tree_2').removeClass('tree-move');
        $('.tab_apple_1').removeClass('apple-move');
        $('.tab_apple_2').removeClass('apple-move');
        AppleDrop(drop)
    },2000)
}

const AppleDrop = (type) => {
    if(type == 'blue') {
        $('.tab_apple_1').animate({
            top : '337px'
        },speed)
    } 
    if(type == 'red') {
        $('.tab_apple_2').animate({
            top : '337px'
        },speed)
    }
}

const GetResult = async() => {
    isAnimPlaying = true;
    // let RandomPosition = ['left' , 'right'];
    // let RandomBounce = [3,4];
    // let RandomDrop = ['left' , 'right'];

    
    // let Bird = RandomPosition[GetRand(RandomPosition.length)];
    // let Bounce = RandomBounce[GetRand(RandomBounce.length)];
    // let drop = RandomDrop[GetRand(RandomDrop.length)];

    $.ajax(URL + '/boar-smash').then((res) => {

        let boxSpeed = res.count == 4 ? 6000 : 5000;

        RunAnimation(res.round,res.top,res.count,res.color);

        setTimeout(() => {
            populateResult(res, 'result');
            setTimeout(() => {
                backgroundMusic.play();
            },4000)
           
        }, boxSpeed);
    });
 
}



const RunAnimation = (Round , Top , Count , Result) => {
    InitBoarAnimation();

    BoarSmash(Top,Count,Result).then(() => {
        setTimeout(() => {
            $('.result_box').fadeIn();
            CreateResultBoxContent(Round , Top , Count , Result);
        },3000);    
    
        setTimeout(() => {
            ResetAnimation();
        },10000)
    });


}

const ResetAnimation = () => {
    $(".tab_start_1").removeAttr("style");
    $(".tab_start_2").removeAttr("style");
    $(".tab_start_1").hide();
    $(".tab_start_2").hide();
    $(".tab_apple_1").removeAttr("style");
    $(".tab_apple_2").removeAttr("style");
    $(".tab_count_1").removeAttr("style");
    $(".tab_count_2").removeAttr("style");
    $(".tab_count_3").removeAttr("style");
    $(".tab_count_4").removeAttr("style");
    $('.result_box').hide()
    isAnimPlaying = false;
}





const RefreshHistory = () => {
    $.ajax(URL + '/boar-smash/history').then((res) => {
        res.map((item) => {
            populateResult(item, 'history');
        });
    })
}




const CreateResultBoxContent = (Round , Top , Count , Result) => {


    let Res1 = Top == 'left' ? 'icon_leftright_1' : 'icon_leftright_2';
    let Res2 = Count == 3 ? 'icon_count_3' : 'icon_count_4';
    let Res3 = Result == 'blue' ? 'icon_result_1' : 'icon_result_2';
    $('.result_box').html(`<div class="rcontent">`+
            `<div class="round">${Round} 회차결과</div>`+
            `<div class="game-sprite ${Res1}"></div>`+
            `<div class="game-sprite ${Res2}"></div>`+
            `<div class="game-sprite ${Res3}"></div>`+
        `</div>`)
    
};


const populateResult = (res, type) => {

    let Res1 = res.top == 'left' ? 'icon_leftright_1' : 'icon_leftright_2';
    let Res2 = res.count == 3 ? 'icon_count_3' : 'icon_count_4';
    let Res3 = (res.color == 'blue') ? 'icon_result_1' : 'icon_result_2';

    if (type == 'history') {
        $('.history').prepend(ListResultBody(res, Res1, Res2,Res3));
    }

    if (type == 'result') {
        $('.history').prepend(ListResultBody(res, Res1, Res2,Res3));
    }

}



const ListResultBody = (res, Res1, Res2,Res3) => {
    return `<div class="listitem game-sprite">`+
                `<div class="round"><strong>${res.round}</strong>회차</div>`+
                `<div class="game-sprite ${Res1}"></div>`+
                `<div class="game-sprite ${Res2}"></div>`+
                `<div class="game-sprite ${Res3}"></div>`+
            `</div>`;
}



RunGameTimeAndRound('korea', '+9');
RefreshHistory();

