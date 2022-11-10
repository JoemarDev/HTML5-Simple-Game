// const URL = "https://realbet-server.online/api";
const URL = "http://127.0.0.1:8000/api";
const backgroundMusic = new Audio('./assets/sounds/hblb_bg.mp3');
const resultMusic = new Audio('./assets/sounds/hblb_play.mp3');
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
        
        $('#game-screen .round-result-box').html(GameRound - 1);
        $('#game-screen .game-clock').html(FormatDate(d));
        $('#game-screen .round').html(GameRound);
        $('#game-screen .timer').html(GameSec == 60 ? 0 : GameSec);

    }, 1000);
};



// Animation Result Scripts

const BirdFlyFromLeft = async() => {
    $('.tab_jebi_2').hide();
    $('.tab_jebi_1').fadeIn("slow" , function() {
        $(this).css({
            'top' : '140px',
            'left' : '92px',
            'transition' : 'all 0.8s ease-out'
        })
    });
}
const BirdFlyFromRight = () => {
    $('.tab_jebi_1').hide();
    $('.tab_jebi_2').fadeIn("slow" , function() {
        $(this).css({
            'top' : '140px',
            'right' : '92px',
            'transition' : 'all 0.8s ease-out'
        })
    });
}


const FoodBounceDropLeft = (bounceCount) => {
    $('.tab_see').fadeIn("slow" , function() {
        BounceFood(bounceCount).then(() => {

            $('.tab_see').animate({
                'top' : '190px',
            },speed ,function(){
                $('.tab_see').animate({
                    'top' : '435px',
                    'left' : '30%'
                },speed + 300,function(){
                    $('.tab_bak_1').addClass('open')
                });
            });

           
        });
    })
}

const FoodBounceDropRight = (bounceCount) => {
    $('.tab_see').fadeIn("slow" , function() {
        BounceFood(bounceCount).then(() => {

            $('.tab_see').animate({
                'top' : '190px',
            },speed ,function(){
                $('.tab_see').animate({
                    'top' : '435px',
                    'left' : '72%'
                },speed + 300,function(){
                    $('.tab_bak_2').addClass('open')
                });
            });

            
        })
    })
}


const BounceFood = (dropCount) => {
    return new Promise((resolve) => {
        $('.tab_see').animate({
            'top' : '240px'
        },speed,function(){
            $('.tab_count').show();
            $('.tab_count').html(1);
            $('.tab_see').animate({
                'top' : '200px'
            },speed,function(){
                $('.tab_see').animate({
                    'top' : '240px'
                },speed,function(){
                    $('.tab_count').html(2);
                    $('.tab_see').animate({
                        'top' : '200px'
                    },speed,function(){
                        $('.tab_see').animate({
                            'top' : '240px'
                        },speed,function(){
                            $('.tab_count').html(3);
                            if(dropCount != 3) {
                                $('.tab_see').animate({
                                    'top' : '200px'
                                },speed,function(){
                                    $('.tab_see').animate({
                                        'top' : '240px'
                                    },speed,function(){
                                        $('.tab_count').html(4);
                                        resolve(true);
                                    })
                                });
                            } else {
                                resolve(true)
                            }
                        })
                    });
                })
            });
        })
    })
   
}

const RunAnimation = (Bird , Bounce , drop) => {
    
    if(Bird == 'left') {
        BirdFlyFromLeft();
    }  else {
        BirdFlyFromRight();
    }

    setTimeout(() => {
        if(drop == 'left') {
            FoodBounceDropLeft(Bounce);
        } else {
            FoodBounceDropRight(Bounce);
        }

        setTimeout(() => {
            $('.result_box').fadeIn()
            CreateResultBoxContent(Bird,Bounce,drop);
        },3500);    

        setTimeout(() => {
            ResetAnimation();
        },10000)
    },1200)

}

const GetRand = (len) => {
    return Math.floor(Math.random() * len)
}


const GetResult = async() => {
    isAnimPlaying = true;
    // let RandomPosition = ['left' , 'right'];
    // let RandomBounce = [3,4];
    // let RandomDrop = ['left' , 'right'];

    // let Bird = RandomPosition[GetRand(RandomPosition.length)];
    // let Bounce = RandomBounce[GetRand(RandomBounce.length)];
    // let drop = RandomDrop[GetRand(RandomDrop.length)];

    $.ajax(URL + '/bird-and-egg').then((res) => {

        RunAnimation(res.bird,res.bounce,res.drop);
        setTimeout(() => {
            populateResult(res, 'result');
            backgroundMusic.play();
        }, 4000);
    });

   
}



// Play pre-animation fade in the bird left and right

const InitPreAnim = (GameSec) => {
    if(GameSec > 1) {
        if(!isAnimPlaying) {
            if(GameSec % 6 >= 3) {
                PlayBirdPreAnim(1)
            } else {
                PlayBirdPreAnim(2);
            }
        }
    } else {
        $('.tab_jebi_1').fadeOut();
        $('.tab_jebi_2').fadeOut();
    }
}

const PlayBirdPreAnim = (type) => {
    if(type == 1) {
        $('.tab_jebi_1').fadeIn("slow");
        $('.tab_jebi_2').fadeOut();
    }

    if(type == 2) {
        $('.tab_jebi_1').fadeOut();
        $('.tab_jebi_2').fadeIn("slow");
    }
}


const ResetAnimation = () => {
    $(".tab_jebi_1").removeAttr("style");
    $(".tab_jebi_2").removeAttr("style");
    $('.tab_see').removeAttr("style");
    $('.tab_count').html('0')
    $('.tab_count').removeAttr("style");
    $('.tab_bak_1').removeClass('open');
    $('.tab_bak_2').removeClass('open');
    $('.result_box').hide()
    isAnimPlaying = false;
}

const CreateResultBoxContent = (Bird , Bounce , Drop) => {

    let Res1 = Bird == 'left' ? 'icon_leftright_1' : 'icon_leftright_2';
    let Res2 = Bounce == 3 ? 'icon_count_3' : 'icon_count_4';
    let Res3 = Drop == 'left' ? 'icon_result_1' : 'icon_result_2';

    
    $('.rcontent').html(
        `<div class="game-sprite ${Res1}"></div>`+
        `<div class="game-sprite ${Res2}"></div>`+
        `<div class="game-sprite ${Res3}"></div>`
    );
};




const RefreshHistory = () => {
    $.ajax(URL + '/bird-and-egg/history').then((res) => {
        res.map((item) => {
            populateResult(item, 'history');
        });
    })
}



const populateResult = (res, type) => {

    let Res1 = res.bird == 'left' ? 'icon_leftright_1' : 'icon_leftright_2';
    let Res2 = res.bounce == 3 ? 'icon_count_3' : 'icon_count_4';
    let Res3 = res.drop == 'left' ? 'icon_result_1' : 'icon_result_2';

    if (type == 'history') {
        $('.history').prepend(ListResultBody(res, Res1, Res2,Res3));
    }

    if (type == 'result') {
        $('.history').prepend(ListResultBody(res, Res1, Res2,Res3));
    }

}


const ListResultBody = (res, Res1, Res2,Res3) => {
    return `<div class="listitem">`+
                `<div class="round"><strong>${res.round}</strong>회차</div>`+
                `<div class="game-sprite ${Res1}"></div>`+
                `<div class="game-sprite ${Res2}"></div>`+
                `<div class="game-sprite ${Res3}"></div>`+
            `</div>`;
}






RunGameTimeAndRound('korea', '+9');
RefreshHistory();


