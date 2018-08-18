//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    this.getOpenIdFn()
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getOpenIdFn: function(){
    var that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'http://simplelifeapp.streetvoice.cn/getOpenId',
          data: {
            code: res.code,
            city: '全部',
            curPage: 1,
            pageSize: 10
          },
          method: 'get',
          success: function (res) {
            if (res.data && res.data.data && res.data.data.openid) {
              console.log('12312321-->', res.data.data.openid)
              that.globalData.openid = res.data.data.openid
            } else {
              wx.showToast({
                title: '获取openid失败'
              })
            }
          },
          fail: function (e) {
            wx.showToast({
              title: e.errMsg
            })
          }
        })

      }
    })
  },
  globalData: {
    userInfo: null,
    city:'全部',
    webUrl:'',
    host:'http://localhost:3000'
  }
})