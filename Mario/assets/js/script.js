const URL = "https://realbet-server.online/api";

const backgroundMusic = new Audio('./assets/sounds/mario_bg.mp3');
const resultMusic = new Audio('./assets/sounds/mario_play.mp3');
const MarioPipe = new Audio('./assets/sounds/mario_pipe.mp3');
const MarioJump = new Audio('./assets/sounds/mario_jump.mp3');

let isBrowserSoundReady = false;
let globalSeconds = 0;
let round = 0;
let isGameReady = false;
let speed = 1000;
let isAnimPlaying = false;

const Toogle = (elem) => {
    return $(elem).hasClass('on') ? $(elem).removeClass('on') : $(elem).addClass('on');
}

const ReloadWindow = (elem) => {
    window.location.reload();
}


const InitSounds = async () => {
    isBrowserSoundReady = true;
    console.log("asdsad")
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
    MarioPipe.muted = $(elem).hasClass('on');
    MarioJump.muted = $(elem).hasClass('on');
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
        MarioPipe.muted =  true;
        MarioJump.muted = true;
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
        
        $('#game-screen .round').html(GameRound);
        $('#game-screen .timer').html(GameSec == 60 ? 0 : GameSec);

    }, 1000);
};


const InitPreAnim = (GameSec) => {
    if(GameSec > 1) {
        if(!isAnimPlaying) {
            if(GameSec % 6 >= 3) {
                PlayMarioPreAnim(1)
            } else {
                PlayMarioPreAnim(2);
            }
        }
    } else {
        $('.tab_top_1').fadeOut();
        $('.tab_top_2').fadeOut();
    }
}



const PlayMarioPreAnim = (type) => {
    if(type == 1) {
        $('.tab_top_1').fadeIn("slow");
        $('.tab_top_2').fadeOut();
    }

    if(type == 2) {
        $('.tab_top_1').fadeOut();
        $('.tab_top_2').fadeIn("slow");
    }
}


// Animation Result Scripts

const MarioFallLeft = async() => {
    return new Promise((resolve) => {
        $('.tab_top_box .tab_top_1').fadeIn("slow" , function() {
            $(this).animate({
                top : '90px',
            },speed , function() {
                MarioPipe.play();
                 resolve(true);
            });
        });
        $('.tab_top_box .tab_top_2').hide();
    });

}

const MarioFallRight = async() => {
    return new Promise((resolve) => {
        $('.tab_top_box .tab_top_2').fadeIn("slow" , function() {
            $(this).animate({
                top : '90px',
            },speed , function() {
                MarioPipe.play();
                resolve(true);
            });
        });
        $('.tab_top_box .tab_top_1').hide();
    });


}


const MarioDropDownLeft = async() => {
    return new Promise((resolve) => {
        $('.tab_top_1').hide();
        $('.tab_top_2').hide();
        $('.tab_botton_box .tab_top_1').show();
        $('.tab_botton_box .tab_top_1').fadeIn(function() {
            $(this).animate({
                top : '54px',
            },speed , function() {
                $(this).animate({
                    'left' : '82px'
                },speed , function() {
                    resolve(true);
                })
            });
        });
    });

}


const MarioDropDownRight = async() => {
    return new Promise((resolve) => {
        $('.tab_top_1').hide();
        $('.tab_top_2').hide();
        $('.tab_botton_box .tab_top_2').show();
        $('.tab_botton_box .tab_top_2').fadeIn(function() {
            $(this).animate({
                top : '54px',
            },speed , function() {
                $(this).animate({
                    'right' : '82px'
                },speed , function() {
                    resolve(true);
                })
            });
        });
    });
}



const MarioGetsMushroomRewards = async(type) => {
    
    let elem = null;
    
    elem = type == 1 ? $('.tab_botton_box .tab_top_1') : $('.tab_botton_box .tab_top_2')
    MarioJump.play()
    elem.animate({
        'top' : '25px',
    },speed - 450 , function() {
        $(this).animate({
            'top' : '52px',
        },speed - 450 , function() {

            
            $('.tab_result_1').animate({
                top : '0px'
            })
        });
    })

}

const MarioGetsMobsRewards = async(type) => {
     
    let elem = null;
    
    elem = type == 1 ? $('.tab_botton_box .tab_top_1') : $('.tab_botton_box .tab_top_2')
    MarioJump.play()
    elem.animate({
        'top' : '25px',
    },speed - 450 , function() {
        $(this).animate({
            'top' : '52px',
        },speed - 450 , function() {
            $('.tab_result_2').animate({
                top : '0px'
            })
        });
    })
}


const RunAnimation = (Fall,Drop,Reward) => {
    if(Fall == 'left') {
        MarioFallLeft().then(() => {
            if(Drop == 'left') {
                MarioDropDownLeft().then(() => {
                    if(Reward == 'mushroom') {
                        MarioGetsMushroomRewards(1);
                    }

                    if(Reward == 'mobs') {
                        MarioGetsMobsRewards(1);
                    }
                });
            }

            if(Drop == 'right') {
                MarioDropDownRight().then(() => {
                    if(Reward == 'mushroom') {
                        MarioGetsMushroomRewards(2);
                    }

                    if(Reward == 'mobs') {
                        MarioGetsMobsRewards(3);
                    }
                });
            }
        });
    }

    if(Fall == 'right') {
        MarioFallRight().then(() => {
            if(Drop == 'left') {
                MarioDropDownLeft().then(() => {
                    if(Reward == 'mushroom') {
                        MarioGetsMushroomRewards(1);
                    }

                    if(Reward == 'mobs') {
                        MarioGetsMobsRewards(1);
                    }
                });
            }

            if(Drop == 'right') {
                MarioDropDownRight().then(() => {
                    if(Reward == 'mushroom') {
                        MarioGetsMushroomRewards(2);
                    }

                    if(Reward == 'mobs') {
                        MarioGetsMobsRewards(3);
                    }
                });
            }
        });
    }
}


const GetResult = () => {
    isAnimPlaying = true;
    // let Res1 = ['left' , 'right'];
    // let Res2 = ['left' , 'right'];
    // let Res3 = ['mushroom' , 'mobs'];

    // const Fall = Res1[Math.floor(Math.random() * 2)];
    // const Drop = Res2[Math.floor(Math.random() * 2)];
    // const Reward = Res3[Math.floor(Math.random() * 2)];

    $.ajax(URL + '/mario').then((res) => {

        RunAnimation(res.fall,res.drop,res.reward);
        setTimeout(() => {
            $('.result_box').fadeIn()
            CreateResultBoxContent(res.round, res.fall,res.drop,res.reward);
            populateResult(res, 'result');
            resultMusic.pause();
            backgroundMusic.play();
        }, 5000);

        setTimeout(() => {
            ResetAnimation();
        },10000)
        
    });
}


const ResetAnimation = async() => {
    $('.tab_top_1').removeAttr('style');
    $('.tab_top_2').removeAttr('style');
    $('.tab_result_1').removeAttr('style');
    $('.tab_result_2').removeAttr('style');
    $('.result_box').fadeOut("slow", function() {
       $('.result_content').html('')
    });
    isAnimPlaying = false;
} 

const RefreshHistory = () => {
    $.ajax(URL + '/mario/history').then((res) => {
        res.map((item) => {
            populateResult(item, 'history');
        });
    })
}





const populateResult = (res, type) => {

    let Res1 = res.fall == 'left' ? 'icon_leftright_1' : 'icon_leftright_2';
    let Res2 = res.drop == 'left' ? 'icon_color_1' : 'icon_color_2';
    let Res3 = res.reward == 'mushroom' ? 'icon_result_1' : 'icon_result_2';

    if (type == 'history') {
        $('.history').prepend(ListResultBody(res, Res1, Res2,Res3));
    }

    if (type == 'result') {
        $('.history').prepend(ListResultBody(res, Res1, Res2,Res3));
    }

}



const ListResultBody = (res, Res1, Res2,Res3) => {
    return  `<div class="listitem game-sprite">`+
                `<div class="round"><strong>${res.round}</strong>회차</div>`+
                `<div class="game-sprite ${Res1}"></div>`+
                `<div class="game-sprite ${Res2}"></div>`+
                `<div class="game-sprite ${Res3}"></div>`+
            `</div>`;
}

const CreateResultBoxContent = (round , Fall , Drop , Reward) => {

    let Res1 = Fall == 'left' ? 'icon_leftright_1' : 'icon_leftright_2';
    let Res2 = Drop == 'left' ? 'icon_color_1' : 'icon_color_2';
    let Res3 = Reward == 'mushroom' ? 'icon_result_1' : 'icon_result_2';

    
    $('.result_content').html(
        `<div style="margin-right:  20px;"><span class="round">${round}</span> 회차</div>`+
        `<div class="game-sprite ${Res1}"></div>`+
        `<div class="game-sprite ${Res2}"></div>`+
        `<div class="game-sprite ${Res3}"></div>`
    );
};





RunGameTimeAndRound('korea', '+9');
RefreshHistory();
