const URL = "https://realbet-server.online/api";

const backgroundMusic = new Audio('./assets/sounds/mario_bg.mp3');
const resultMusic = new Audio('./assets/sounds/mario_play.mp3');
const MarioPipe = new Audio('./assets/sounds/mario_pipe.mp3');
const MarioJump = new Audio('./assets/sounds/mario_jump.mp3');
let isBrowserSoundReady = false;
let globalSeconds = 0;
let round = 0;
let isGameReady = false;
let speed = 300;
let isAnimPlaying = false;

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





RunGameTimeAndRound('korea', '+9');
