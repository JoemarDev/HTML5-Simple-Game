const URL = "http://127.0.0.1:8000/api";

let history = [];

const Pos = [720, 765, 810, 855, 900, 945, 990, 1035];


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
        
        if (GameSec == 60) {
            RunAnimation(0, 1);
        }

        $('#roullete .round').html(GameRound  );
        $('#roullete .time').html(GameSec == 60 ? 0 : GameSec);
    }, 1000);
};



const RunAnimation = (res, distance) => {

    const rand = Math.floor(Math.random() * Pos.length);

    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;

    const ticker = Math.floor(Math.random() * 20) * plusOrMinus;

    let resPosition = Pos[rand] * distance;

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

const RefreshHistory = () => {
    $.ajax(URL + '/arcade-routellete/history').then((res) => {
        res.map((item) => {
            populateResult(item);
        })
    })
}

const populateResult = (res) => {
    let res_name_1 = '';
    let res_icon_2 = '';

    res.result % 2 == 0 ? res_icon_2 = 'icon_result_1' : res_icon_2 = 'icon_result_2';

    if( res.result % 4 == 0) res_name_1 = 'icon_sinsu_3';
    if( res.result % 4 == 1) res_name_1 = 'icon_sinsu_1';
    if( res.result % 4 == 2) res_name_1 = 'icon_sinsu_2';
    if( res.result % 4 == 3) res_name_1 = 'icon_sinsu_4';


    let date = new Date(res.created_at);
    let options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: "Asia/Seoul"
    };
    let KoreaFormat = date.toLocaleString("ko-KR", options);
    KoreaFormat = KoreaFormat.substring(0 , KoreaFormat.length - 1);

    $('.history').prepend(
        '<div class="listitem">'+
            `<span class="date">${KoreaFormat}</span>`+
            '<span>&ndash;</span>'+
            `<span class="round"><strong>${res.round}</strong>회차</span>`+
            `<span class="routelle-image icon_sinsu ${res_name_1}"></span>`+
            `<span class="routelle-image icon_result ${res_icon_2}"></span>`+
        '</div>'
    )
}

const InitGame = () => {
    RefreshHistory();
    RunGameTimeAndRound('korea', '+9');
}



InitGame();