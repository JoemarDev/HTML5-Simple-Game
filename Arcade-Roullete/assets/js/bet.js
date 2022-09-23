let DefaultBets = 1000;

let userInfo = {};

const GetGameDate = (d) => {

    let date = new Date(d);
    let options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour12: false,
        timeZone: "Asia/Seoul"
    };
    let KoreaFormat = date.toLocaleString("ko-KR", options);
    KoreaFormat = KoreaFormat.substring(0 , KoreaFormat.length - 1);
    
    return KoreaFormat;
}

const GetGameTime = (d) => {
    let date = new Date(d);
    let options = {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: "Asia/Seoul"
    };
    let KoreaFormat = date.toLocaleString("ko-KR", options);
    KoreaFormat = KoreaFormat.substring(0 , KoreaFormat.length - 1);
    
    return KoreaFormat;
}



const Changebet = (elem) => {
    $('.bet-section li').removeClass('on');
    $(elem).addClass('on');
    DefaultBets = Number($(elem).val());
}


const InitUser = () => {
    if(!inIframe()) {
        let user = localStorage.getItem("user");
        if(!user) {
            let newUser = {
                name : `DEMO-${Date.now()}`,
                coin : Math.round(GenerateCoin(50000,100000))
            }

            userInfo.name = newUser.name;
            userInfo.coin = newUser.coin;
            let toStored = JSON.stringify(newUser);

            localStorage.setItem("user" , toStored);
        } else {
            user = JSON.parse(user);
            userInfo.name = user.name;
            userInfo.coin = user.coin;
        }
    }
}

const UpdateUserMoney = (money) =>  {
    userInfo.coin += money;
    let toStored = JSON.stringify(userInfo);
    localStorage.setItem("user" , toStored);
    UpdateUIUserInfo();
}

const UpdateUIUserInfo  = () => {
    $('.user-name').html(userInfo.name);
    $('.user-coin').html(`Coins : ${FormatMoney(userInfo.coin)}`);
}

const GenerateCoin = (min,max) => {
    return Math.random() * (max - min) + min;
}

const FormatMoney = (num) => {
    Number.prototype.format = function (n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    };
    return parseInt(num).format();
}


const CreateBet = (type) => {

    let betsHistory = localStorage.getItem('bets');
    let existingBets = false;

    if(betsHistory) {
        betsHistory = JSON.parse(betsHistory);
        betsHistory.map((item) => {
            if(item.date == GetGameDate(Date.now()) && item.round == GetGameRound('+9')) {
                existingBets = true;
                return item.amount += DefaultBets;
            }
        });

        if(existingBets) {
            betsHistory = JSON.stringify(betsHistory);
            localStorage.setItem('bets' , betsHistory);
        } else {
            AppendSingleBet(betsHistory , type);
        }
     
    } else {
        AppendSingleBet([] , type);
    }

    UpdateUserMoney(Math.abs(DefaultBets) * -1);
    UpdateBetHistoryTable();
}

const AppendSingleBet = (container , type) => {
    
    let bet = {
        'date' : GetGameDate(Date.now()),
        'time' : GetGameTime(Date.now()),
        'round' : GetGameRound('+9'),
        'purchase' : type,
        'result' : '-',
        'amount' : DefaultBets,
        'winning-points' : '-',
        'win-or-lose' : 0,
    };

    container = [...container , bet];

    let bets = JSON.stringify(container);

    localStorage.setItem('bets' , bets);
}

const UpdateBetHistoryTable = () => {
    
    let betsHistory = localStorage.getItem('bets');

    if(betsHistory) {
        $('.bet-history h3').hide();
        $('.bet-lists').html('');
        betsHistory = JSON.parse(betsHistory);

        betsHistory.map((item) => {
      
            $('.bet-lists').append(BetListBody(item));
        });
    } else {
        $('.bet-history h3').show();
    }
}

const BetListBody = (res) => {
    let status = '';

    if(res['win-or-lose'] == 0) 
        status = 'Waiting';
    
    if(res['win-or-lose'] == 1) 
        status = 'HIT';

    if(res['win-or-lose'] == 1) 
        status = 'NOT-HIT';
    
    return  '<tr>'+
               `<td>${res.round}</td>`+
                `<td>${res.time}</td>`+
                `<td>${res.purchase}</td>`+
                `<td>${res.result}</td>`+
                `<td>${FormatMoney(res.amount)}	Coins</td>`+
                `<td>${FormatMoney(res.amount * 1.95)}	Coins</td>`+
                `<td>${status}</td>`+
            `</tr>`;
}





const StartBettingSection = async() => {
    await InitUser();
    UpdateUIUserInfo();
    UpdateBetHistoryTable();
}



StartBettingSection();