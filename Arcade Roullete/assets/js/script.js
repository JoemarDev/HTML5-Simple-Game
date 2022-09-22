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

        const GameRound = (GameHour * 60) + GameMinute;
        // get korean timezone seconds
        const GameSec = (60 - nd.getSeconds()).toString().padStart(2, '0');

        if (GameSec == 60) {
            RunAnimation(0, 4);
        }

        $('#roullete .round').html(GameRound + 1);
        $('#roullete .time').html(GameSec == 60 ? 0 : GameSec);
    }, 1000);
};

const Pos = [720, 765, 810, 855, 900, 945, 990, 1035];


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

RunGameTimeAndRound('korea', '+9');
