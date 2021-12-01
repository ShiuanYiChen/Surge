var checkinURL = {
    url: 'https://api-go.myfunnow.com/v2/funnow/auth',
    headers: {
        'Cookie': $persistentStore.read("CookieFunNow") + ';',
    }
};
var pointsInfoURL = {
    url: 'https://api-go.myfunnow.com/v2/funnow/member',
    headers: {
        'Cookie': $persistentStore.read("CookieFunNow") + ';',
    },
};

function checkin() {
    $httpClient.get(checkinURL, function(error, response, data) {
        if (error) {
            $notification.post('Funnow Cookie', '', '連線錯誤‼️');
            $done();
        } else {
            if (response.status == 200) {
                getPointsInfo();
                $done();
            } else {
                $notification.post('Funnow Cookie 失敗‼️', '', '請重新登入');
            }
        }
    });
}

function getPointsInfo() {
    $httpClient.get(pointsInfoURL, function(error, response, data) {
        if (error) {
            $notification.post("Funnow每日登入失敗‼️", "", "連線錯誤‼️")
            $done();
        } else {
            if (response.status == 200) {
                let obj = JSON.parse(data);
                var point = obj["data"]["point"];
                $notification.post("🥂Funnow 已登入", "", "P點已累積 " + point + " ⓅⓅⓅ");
                $done();
            } else {
                $notification.post("Funnow Cookie 已過期‼️", "", "請重新登入 🔓");
                $done();
            }
        }
    });
}
checkin();