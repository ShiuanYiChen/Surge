if ($request.headers['Cookie']) {
    const cookie = $request.headers['Cookie'];
    const funnow_token = cookie.split('FunNowGoSession=')[1].split(';')[0];
    const saveCookie = $persistentStore.write(funnow_token, 'CookieFunNow');
    if (!saveCookie) {
        $notification.post("FunNow Cookie 保存錯誤‼️", "", "請重新登入")
    } else {
        $notification.post("FunNow Cookie 保存成功🎉", "", "")
    }
} else {
    $notification.post("FunNow Cookie 保存失敗‼️", "", "請重新登入")
}
$done({})