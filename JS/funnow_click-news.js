var funnowNewsURL = {
    url: 'https://api-go.myfunnow.com/v2/funnow/news',
    headers: {
        'Cookie': 'FunNowGoSession=' + $persistentStore.read("CookieFunNow") + ';',
    }
};
var newsIDs = [];
$httpClient.get(funnowNewsURL, function(error, response, data) {
    if (error) {
        $notification.post('Funnow動態消息', '', '連線錯誤‼️');
        $done();
    } else {
        if (response.status == 200) {
            let obj = JSON.parse(data);
            newsIDs = obj['data'].map(post => post['id']);
            funnowNewsClick();
            $done();
        } else {
            $notification.post('Funnow動態消息 失敗‼️', '', '請重新登入');
        }
    }
});
var funnowNewsClick = () => {
    newsIDs.map(id => {
        let obj = {
            url: 'https://api-go.myfunnow.com/v2/funnow/news/click',
            headers: {
                'Cookie': 'FunNowGoSession=' + $persistentStore.read("CookieFunNow") + ';',
            },
            body: {
                'news_id': id
            }
        }
        $httpClient.post(obj, function(error, response, data) {
            if (error) {
                $notification.post('Funnow動態消息', '', '連線錯誤‼️')
                $done();
            } else {
                if (response.status == 200) {
                    $done();
                } else {
                    $notification.post('Funnow Cookie 已過期‼️', '', '請重新登入 🔓');
                    $done();
                }
            }
        });
    })
    $notification.post('Funnow動態消息', '', '已點擊最新動態 👆');
}
