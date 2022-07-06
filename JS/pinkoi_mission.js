let missionListURL = {
  url: 'https://www.pinkoi.com/apiv2/mission_game/mission_list',
  headers: {
    Cookie: 'sessionid=' + $persistentStore.read('CookiePinkoi') + ';',
  },
}

function completeMission(missionList) {
  missionList.forEach(mission => {
    achieveMission(mission)
    claimReward(mission)
  })
  $notification.post('Pinkoi Cookie 任務完成')
}

function getMissionList() {
  $httpClient.get(missionListURL, function (error, response, data) {
    if (error) {
      $notification.post('Pinkoi每日登入失敗‼️', '', '連線錯誤‼️')
      $done()
    } else {
      if (response.status == 200) {
        let obj = JSON.parse(data)
        completeMission(obj['result'])
        $done()
      } else {
        $notification.post('Pinkoi Cookie 已過期‼️', '', '請重新登入 🔓')
        $done()
      }
    }
  })
}

function achieveMission(mission) {
  let missionKey = mission['mission_key']
  let missionRule = mission['rule']
  let payloadHeaders = {
    headers: {
      Cookie: 'sessionid=' + $persistentStore.read('CookiePinkoi') + ';',
    },
  }

  if (
    missionKey === 'search_hot_keyword' ||
    missionKey === 'browse_three_subcategory' ||
    missionKey === 'view_topic'
  ) {
    let URLs = missionRule.match(
      /https:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w\u4E00-\u9FA5.,@?^=%&:\/~+#-]*)/g
    )

    URLs.forEach(url => {
      let payload = {
        ...payloadHeaders,
        url: url,
      }

      $httpClient.get(payload, function (error, response, data) {
        if (error) {
          $notification.post('Pinkoi任務失敗‼️', '', '連線錯誤‼️')
          $done()
        } else {
          if (response.status == 200) {
            return
          } else {
            $notification.post('Pinkoi Cookie 已過期‼️', '', '請重新登入 🔓')
            $done()
          }
        }
      })
    })
  }

  if (missionKey === 'add_fav_item') {
    let payload = {
      ...payloadHeaders,
      body: {
        tid: 'sdpgB9qS',
      },
      url: 'https://www.pinkoi.com/apiv2/item/fav',
    }
    $httpClient.post(payload, function (error, response, data) {
      if (error) {
        $notification.post('Pinkoi任務失敗‼️', '', '連線錯誤‼️')
        $done()
      } else {
        if (response.status == 200) {
          payload.url = 'https://www.pinkoi.com/apiv2/item/unfav'
          $httpClient.post(payload, function (error, response, data) {
            if (error) {
              $notification.post('Pinkoi任務失敗‼️', '', '連線錯誤‼️')
              $done()
            } else {
              if (response.status == 200) {
                return
              } else {
                $notification.post(
                  'Pinkoi Cookie 已過期‼️',
                  '',
                  '請重新登入 🔓'
                )
                $done()
              }
            }
          })
          return
        } else {
          $notification.post('Pinkoi Cookie 已過期‼️', '', '請重新登入 🔓')
          $done()
        }
      }
    })
  }

  if (missionKey === 'add_to_favlist') {
    let payload = {
      ...payloadHeaders,
      body: {
        tid: 'sdpgB9qS',
        name: 'pinkoi-surge',
        is_public: 1,
      },
      url: 'https://www.pinkoi.com/apiv3/favlist/add',
    }
    $httpClient.post(payload, function (error, response, data) {
      if (error) {
        $notification.post('Pinkoi任務失敗‼️', '', '連線錯誤‼️')
        $done()
      } else {
        if (response.status == 200) {
          payload.url = 'https://www.pinkoi.com/apiv3/favlist/delete'
          $httpClient.post(payload, function (error, response, data) {
            if (error) {
              $notification.post('Pinkoi任務失敗‼️', '', '連線錯誤‼️')
              $done()
            } else {
              if (response.status == 200) {
                return
              } else {
                $notification.post(
                  'Pinkoi Cookie 已過期‼️',
                  '',
                  '請重新登入 🔓'
                )
                $done()
              }
            }
          })
          return
        } else {
          $notification.post('Pinkoi Cookie 已過期‼️', '', '請重新登入 🔓')
          $done()
        }
      }
    })
  }
  if (missionKey === 'add_fav_shop') {
    let payload = {
      ...payloadHeaders,
      body: {
        sid: 'nuphy',
      },
      url: 'https://www.pinkoi.com/apiv2/shop/fav',
    }
    $httpClient.post(payload, function (error, response, data) {
      if (error) {
        $notification.post('Pinkoi任務失敗‼️', '', '連線錯誤‼️')
        $done()
      } else {
        if (response.status == 200) {
          payload.url = 'https://www.pinkoi.com/apiv2/shop/unfav'
          $httpClient.post(payload, function (error, response, data) {
            if (error) {
              $notification.post('Pinkoi任務失敗‼️', '', '連線錯誤‼️')
              $done()
            } else {
              if (response.status == 200) {
                return
              } else {
                $notification.post(
                  'Pinkoi Cookie 已過期‼️',
                  '',
                  '請重新登入 🔓'
                )
                $done()
              }
            }
          })
          return
        } else {
          $notification.post('Pinkoi Cookie 已過期‼️', '', '請重新登入 🔓')
          $done()
        }
      }
    })
  }
}

function claimReward(mission) {
  let missionKey = mission['mission_key']
  let claimRewardPayload = {
    url: 'https://www.pinkoi.com/apiv2/mission_game/redeem',
    headers: {
      Cookie: 'sessionid=' + $persistentStore.read('CookiePinkoi') + ';',
    },
    body: {
      mission_key: missionKey,
    },
  }

  $httpClient.post(claimRewardPayload, function (error, response, data) {
    if (error) {
      $notification.post('Pinkoi獲得獎勵失敗‼️', '', '連線錯誤‼️')
      $done()
    } else {
      if (response.status == 200) {
        return
      } else {
        $notification.post('Pinkoi Cookie 已過期‼️', '', '請重新登入 🔓')
        $done()
      }
    }
  })
}
getMissionList()
