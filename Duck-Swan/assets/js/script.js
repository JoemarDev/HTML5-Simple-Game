const URL = "https://realbet-server.online/api";

const backgroundMusic = new Audio('./assets/sounds/swan_bg.mp3');
const resultMusic = new Audio('./assets/sounds/swan_play.mp3');
let isBrowserSoundReady = false;
let globalSeconds = 0;
let round = 0;
let isGameReady = false;
let speed = 1000;
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

        //InitPreAnim(GameSec);

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
                PlayDuckPreAnim(1)
            } else {
                PlayDuckPreAnim(2);
            }
        }
    } else {
        $('.tab_start_1').fadeOut();
        $('.tab_start_2').fadeOut();
    }
}


const PlayDuckPreAnim = (type) => {
    if(type == 1) {
        $('.tab_start_1').fadeIn("slow");
        $('.tab_start_2').fadeOut();
    }

    if(type == 2) {
        $('.tab_start_1').fadeOut();
        $('.tab_start_2').fadeIn("slow");
    }
}


// Duck Animation
const InitDuckAnimation = () => {
    $('.tab_start_1').hide();
    $('.tab_start_2').hide();
}

const DuckSwimFromLeft = () => {
    $('.tab_start_1').fadeIn("slow");
}

const DuckSwimFromRight = () => {
    $('.tab_start_2').fadeIn("slow");
}


const DuckDoAnimationOne = (result) => {
    $('#game-screen .tab_type.s_type3').show();
    $('.tab_start_1').animate({
        top : '126px',
        left : '270px'
    },speed , function() {
        $(this).addClass('turn');
        $(this).animate({
            top: '200px',
            left: '36px',
        },speed , function() {
            $(this).removeClass('turn');
            $(this).animate({
                top : '270px',
                left : '270px'
            },speed , function() {
                $(this).addClass('turn');
                $(this).animate({
                    top: '329px',
                    left: '155px',
                },speed , function() {
                    if(result == 1) {
                        DuckGoPickSwan(1)
                    } 
                    if(result == 2) {
                        $(this).removeClass('turn')
                        DuckPickDuck(1)
                    }
                })
            })
        })
    })
}



const DuckDoAnimationTwo = (result) => {
    $('#game-screen .tab_type.s_type1').show();
    $('.tab_start_2').animate({
        top : '126px',
        right : '270px'
    },speed , function() {
        $(this).addClass('turn');
        $(this).animate({
            top: '200px',
            right: '36px',
        },speed , function() {
            $(this).removeClass('turn');
            $(this).animate({
                top : '270px',
                right : '270px'
            },speed , function() {
                $(this).addClass('turn');
                $(this).animate({
                    top: '329px',
                    right: '155px',
                },speed , function() {
                    if(result == 1) {
                        DuckGoPickSwan(2)
                    } 
                    if(result == 2) {
                        $(this).removeClass('turn')
                        DuckPickDuck(2)
                    }
                })
            })
        })
    })
}


const DuckDoAnimationThree = (result) => {
    $('#game-screen .tab_type.s_type4').show();
    $('.tab_start_1').animate({
        top : '126px',
    },speed , function() {
        $(this).animate({
            top : '135px',
            left : '270px'
        },speed,function() {
            $(this).addClass('turn');
            $(this).animate({
                top : '260px',
            },speed , function() {
                $(this).animate({
                    left: '36px',
                },speed , function() {
                    $(this).removeClass('turn');
                    $(this).animate({
                        top: '329px',
                        left: '155px',
                    },speed , function() {
                        if(result == 1) {
                            $(this).addClass('turn')
                            DuckGoPickSwan(1)
                        } 
                        if(result == 2) {
                         
                            DuckPickDuck(1)
                        }
                    })
                })
            })
        })
    })
}

const DuckDoAnimationFour = (result) => {
    $('#game-screen .tab_type.s_type2').show();
    $('.tab_start_2').animate({
        top : '126px',
    },speed , function() {
        $(this).animate({
            top : '135px',
            right : '270px'
        },speed,function() {
            $(this).addClass('turn');
            $(this).animate({
                top : '260px',
            },speed , function() {
                $(this).animate({
                    right: '36px',
                },speed , function() {
                    $(this).removeClass('turn');
                    $(this).animate({
                        top: '329px',
                        right: '155px',
                    },speed , function() {
                        if(result == 1) {
                            $(this).addClass('turn')
                            DuckGoPickSwan(2)
                        } 
                        if(result == 2) {
                
                            DuckPickDuck(2)
                        }
                    })
                })
            })
        })
    })
}



const GetResult = async() => {
    isAnimPlaying = true;
    // let RandomPosition = ['left' , 'right'];
    // let RandomBounce = [3,4];
    // let RandomDrop = ['left' , 'right'];

    
    // let Bird = RandomPosition[GetRand(RandomPosition.length)];
    // let Bounce = RandomBounce[GetRand(RandomBounce.length)];
    // let drop = RandomDrop[GetRand(RandomDrop.length)];

    $.ajax(URL + '/swan-duck').then((res) => {

        let boxSpeed = res.count == 4 ? 7000 : 6000;

        RunAnimation(res.round , res.top,res.count,res.result);
        setTimeout(() => {
            populateResult(res, 'result');
            backgroundMusic.play();
        }, boxSpeed);
    });

   
}


const DuckGoPickSwan = (type) => {
    if(type == 1) {
        $('.tab_start_1').animate({
            top: '426px',
            left: '30px'
        },speed, function() {
            $(this).addClass('result_2');
        });

    } else {
        $('.tab_start_2').animate({
            top: '426px',
            right: '30px'
        },speed, function() {
            $(this).addClass('result_1');
        });
    }
}

const DuckPickDuck = (type) => {

    if(type == 1) {
        $('.tab_start_1').animate({
            top: '426px',
            left: '270px'
        },speed, function() {
            $(this).addClass('result_1');
        });

    } else {
        $('.tab_start_2').animate({
            top: '426px',
            right: '270px'
        },speed, function() {
            $(this).addClass('result_2');
        });
    }
    
}

// 3 Line Left (1 = Swan 2 = Duck)
// DuckDoAnimationOne(2); 
// 3 Line right (1 = Swan 2 = Duck)
// DuckDoAnimationTwo(2);
// 4 Line left (1 = Swan 2 = Duck)
// DuckDoAnimationThree(2);
// 4 Line right (1 = Swan 2 = Duck)
// DuckDoAnimationFour(2);


const RunAnimation = (Round , Top , Count , Result) => {

    $('.timer_box').hide();
    $('.tab_start_2').hide();
    $('.tab_start_2').hide();

    let res = Result == 'swan' ? 1 : 2;


    if(Top == 'left') {
        $('.tab_start_1').fadeIn();

        if(Count == 3) {
            DuckDoAnimationOne(res); 
        } else {
            DuckDoAnimationThree(res);
        }
        
     
    }  else {
        $('.tab_start_2').fadeIn();
      
        if(Count == 3) {
            DuckDoAnimationTwo(res); 
        } else {
            DuckDoAnimationFour(res);
        }
    }

    let boxSpeed = Count == 4 ? 7000 : 6000;

    setTimeout(() => {
        $('.result_box').fadeIn();
        CreateResultBoxContent(Round , Top , Count , Result);
    },boxSpeed);    

    setTimeout(() => {
        ResetAnimation();
    },15000)

}


const CreateResultBoxContent = (Round , Top , Count , Result) => {


    let Res1 = Top == 'left' ? 'icon_leftright_1' : 'icon_leftright_2';
    let Res2 = Count == 3 ? 'icon_count_3' : 'icon_count_4';
    let Res3 = Result == 'swan' ? 'icon_result_2' : 'icon_result_1';
    $('.result_box').html(`<h3>${Round}회차결과</h3>`+
        `<div class="rcontent">`+
            `<div class="game-sprite ${Res1}"></div>`+
            `<div class="game-sprite ${Res2}"></div>`+
            `<div class="game-sprite ${Res3}"></div>`+
        `</div>`)
    
};

const ResetAnimation = () => {
    $('.tab_type').hide();
    $('.tab_start_1').removeClass('turn');
    $('.tab_start_2').removeClass('turn');
    $('.tab_start_1').removeClass('result_1');
    $('.tab_start_1').removeClass('result_2');
    $('.tab_start_2').removeClass('result_1');
    $('.tab_start_2').removeClass('result_2');
    $(".tab_start_1").removeAttr("style");
    $(".tab_start_2").removeAttr("style");
    $('.timer_box').show();
    $('.result_box').hide()
    isAnimPlaying = false;
}



const RefreshHistory = () => {

    $.ajax(URL + '/swan-duck/history').then((res) => {
        res.map((item) => {
            populateResult(item, 'history');
        });
    })
}




const populateResult = (res, type) => {

    let Res1 = res.top == 'left' ? 'icon_leftright_1' : 'icon_leftright_2';
    let Res2 = res.count == 3 ? 'icon_count_3' : 'icon_count_4';
    let Res3 = (res.result == 'swan') ? 'icon_result_2' : 'icon_result_1';

    if (type == 'history') {
        $('.history').prepend(ListResultBody(res, Res1, Res2,Res3));
    }

    if (type == 'result') {
        $('.history').prepend(ListResultBody(res, Res1, Res2,Res3));
    }

}


const ListResultBody = (res, Res1, Res2,Res3) => {
    return `<div class="listitem">`+
                `<div class="round"><strong>${res.round}</strong>회차 결과</div>`+
                `<div class="game-sprite ${Res1}"></div>`+
                `<div class="game-sprite ${Res2}"></div>`+
                `<div class="game-sprite ${Res3}"></div>`+
            `</div>`;
}






RunGameTimeAndRound('korea', '+9');
RefreshHistory();