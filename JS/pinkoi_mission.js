let missionListURL = {
  url: 'https://www.pinkoi.com/apiv2/mission_game/mission_list',
  headers: {
    Cookie: 'sessionid=' + $persistentStore.read('CookiePinkoi') + ';',
  },
};

function completeMission(missionList) {
  missionList.forEach((mission) => {
    achieveMission(mission);
    claimReward(mission);
  });
  $notification.post('Pinkoi Cookie 任務完成');
}

function getMissionList() {
  $httpClient.get(missionListURL, function (error, response, data) {
    if (error) {
      $notification.post('Pinkoi每日登入失敗‼️', '', '連線錯誤‼️');
      $done();
    } else {
      if (response.status == 200) {
        let obj = JSON.parse(data);
        completeMission(obj['result']);
        $done();
      } else {
        $notification.post('Pinkoi Cookie 已過期‼️', '', '請重新登入 🔓');
        $done();
      }
    }
  });
}

function achieveMission(mission) {
  let missionKey = mission['mission_key'];
  let missionRule = mission['rule'];
  let missionPayload = {
    headers: {
      Cookie: 'sessionid=' + $persistentStore.read('CookiePinkoi') + ';',
    },
  };

  if (
    missionKey === 'search_hot_keyword' ||
    missionKey === 'browse_three_subcategory' ||
    missionKey === 'view_topic'
  ) {
    let URLs = missionRule.match(
      /https:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w\u4E00-\u9FA5.,@?^=%&:\/~+#-]*)/g
    );

    URLs.forEach((url) => {
      missionPayload.url = url;

      $httpClient.get(missionPayload, function (error, response, data) {
        if (error) {
          $notification.post('Pinkoi任務失敗‼️', '', '連線錯誤‼️');
          $done();
        } else {
          if (response.status == 200) {
            return;
          } else {
            $notification.post('Pinkoi Cookie 已過期‼️', '', '請重新登入 🔓');
            $done();
          }
        }
      });
    });
  }
}

function claimReward(mission) {
  let missionKey = mission['mission_key'];
  let claimRewardPayload = {
    url: 'https://www.pinkoi.com/apiv2/mission_game/mission_list',
    headers: {
      Cookie: 'sessionid=' + $persistentStore.read('CookiePinkoi') + ';',
    },
    body: {
      mission_key: missionKey,
    },
  };

  $httpClient.post(claimRewardPayload, function (error, response, data) {
    if (error) {
      $notification.post('Pinkoi獲得獎勵失敗‼️', '', '連線錯誤‼️');
      $done();
    } else {
      if (response.status == 200) {
        return;
      } else {
        $notification.post('Pinkoi Cookie 已過期‼️', '', '請重新登入 🔓');
        $done();
      }
    }
  });
}
getMissionList();
