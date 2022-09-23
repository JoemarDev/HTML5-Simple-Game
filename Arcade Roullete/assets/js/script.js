const URL = "https://realbet-server.online/api";

const backgroundMusic = new Audio('./assets/sounds/bing_bg.mp3');
const resultMusic = new Audio('./assets/sounds/bing_play.mp3');

let isBrowserSoundReady = false;
let globalSeconds = 0;

let history = [];
        //     1     4     4     3     3     2     2     1
const Pos = [3960, 4005, 4050, 4095, 4140, 4185, 4230, 4275];


const Toogle = (elem) => {
    return $(elem).hasClass('on') ? $(elem).removeClass('on') : $(elem).addClass('on');
}

const ReloadWindow = (elem) => {
    window.location.reload();
}

const RunGameTimeAndRound = (city, offset) => {
    setInterval(() => {
        // convert the current time to korean timezone
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));

        const GameHour = nd.getHours();
        const GameMinute = nd.getMinutes();
        
        const GameRound = ((GameHour * 60) + GameMinute) + 1;
        // get korean timezone seconds
        const GameSec = (60 - nd.getSeconds()).toString().padStart(2, '0');
        
        if (GameSec == 60)  {
            backgroundMusic.pause();
            resultMusic.play();
            GetResult();
        }
   
        $('#roullete .round').html(GameRound);
        $('#roullete .time').html(GameSec == 60 ? 0 : GameSec);
    }, 1000);
};

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

const SoundEffectToogle = (elem)=> {
    localStorage.setItem("effect", (!$(elem).hasClass('on')));
    resultMusic.muted = $(elem).hasClass('on');
};

const CheckConfigSaved = () => {
    let soundConfig = localStorage.getItem("sounds");
    let effectConfig = localStorage.getItem("effect");

    if(soundConfig == 'false') {
        backgroundMusic.muted = true;
        $('.music').addClass('on');
    }

    if(effectConfig == 'false') {
        resultMusic.muted = true;
        $('.sound').addClass('on');
    }
}



const GetResult = async() =>{
    $.ajax(URL + '/arcade-routellete').then((res) => {
        RunAnimation((res.result - 1),res.rand_pos);
        setTimeout(() => {
            populateResult(res,'result');
            backgroundMusic.play();
        },8200);
    });
}


const RunAnimation = (res,ticker) => {

    let resPosition = Pos[res];

    resPosition += ticker;

    $('#roullete .front').css('opacity', 0);

    $('#roullete .front').css({
        'transform': `rotate(0deg)`,
        'transition': 'transform 0s',
    });

    $('#roullete .back').css('opacity', 1);

    setTimeout(() => {

        $('#roullete .front').css({
            'transition': 'transform 8s cubic-bezier(0.05, 0.15, 0, 1.01)',
            'transform': `rotate(${(resPosition)}deg)`,
        });

        setTimeout(() => {
            $('#roullete .front').css('opacity', 1);

            $('#roullete .back').css('opacity', 0);

            $('#roullete .back').css({
                'transform': `rotate(${(resPosition)}deg)`,
                'transition': 'none',
            });

        }, 500);

    }, 100);
}

const RefreshHistory =  () => {
    $.ajax(URL + '/arcade-routellete/history').then((res) => {
        res.map((item) => {
            populateResult(item , 'history');
        });
    })
}

const populateResult = (res , type) => {
    let res_name_1 = '';
    let res_icon_2 = '';

    res.result % 2 == 0 ? res_icon_2 = 'icon_result_1' : res_icon_2 = 'icon_result_2';

    if( res.result  == 1 || res.result  == 8) res_name_1 = 'icon_sinsu_1';
    if( res.result  == 6 || res.result  == 7) res_name_1 = 'icon_sinsu_2';
    if( res.result  == 4 || res.result  == 5) res_name_1 = 'icon_sinsu_3';
    if( res.result  == 2 || res.result  == 3) res_name_1 = 'icon_sinsu_4';


    let date = new Date(res.created_at);
    let options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: "Asia/Seoul"
    };
    let KoreaFormat = date.toLocaleString("ko-KR", options);
    KoreaFormat = KoreaFormat.substring(0 , KoreaFormat.length - 1);
    
    if(type == 'history') {
        $('.history').prepend(ListResultBody(KoreaFormat,res,res_name_1,res_icon_2));
    }

    if(type == 'result') {
        $('.history').prepend(ListResultBody(KoreaFormat,res,res_name_1,res_icon_2));
        $('.result_box').show();
        $('.result_box').html(GameResultBody(res,res_name_1,res_icon_2));
        ResetResultBox();
    }
   
}

const ListResultBody = (KoreaFormat,res,res_name_1,res_icon_2) => {
    return '<div class="listitem">'+
                `<span class="date">${KoreaFormat}</span>`+
                '<span>&ndash;</span>'+
                `<span class="round"><strong>${res.round}</strong>회차</span>`+
                `<span class="routelle-image icon_sinsu ${res_name_1}"></span>`+
                `<span class="routelle-image icon_result ${res_icon_2}"></span>`+
            '</div>';
}

const GameResultBody = (res,res_name_1,res_icon_2) => {
    return  `<div class="content_box">`+
                `<span class="res-round">${res.round}회차 결과</span>`+
                `<span class="routelle-image result_icon  ${res_name_1}"></span>`+
                `<span class="routelle-image result_icon  ${res_icon_2}"></span>`+
           ` </div>`;
}

const ResetResultBox = () => {
    setTimeout(() => {
        $('.result_box').hide();
        $('.result_box').html();
    },5000);
}


const InitGame = () => {
    RefreshHistory();
    RunGameTimeAndRound('korea', '+9');
}

const inIframe = () => {
    try {
        return window.self !== window.top;
    } catch (error) {
        return true;
    }
}




InitGame();