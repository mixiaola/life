//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    indicatorDots:true,
    autoplay:true,
    interval:2000,
    dialogTypeFlag:false,
    musicFLag:true,
    dialogone: false,
    dialogtwo: false,
    dialogthree:false,
    status: '1',
    statusName:'全部',
    city:"",
    imgUrls: [],
    shopList:[],
    mode:'aspectFill'
  },
  //事件处理函数
  goCityPage: function(){
    wx.navigateTo({
      url: '../changecity/changecity'
    })
  },
  goSerachPage: function(){
    wx.navigateTo({
      url: '../serach/serach'
    })
  },
  changedialogTypeFlag: function(){
    this.setData({
      dialogTypeFlag: !this.data.dialogTypeFlag
    })
  },
  changeMusicFLag: function(){
    this.setData({
      musicFLag: !this.data.musicFLag
    })
  },
  changeType:function(e){
    console.log('e->', e.currentTarget.dataset.text, e.currentTarget.dataset.num)
    this.setData({
      status: e.currentTarget.dataset.num,
      statusName: e.currentTarget.dataset.text,
      dialogTypeFlag: false
    })
  },
  onLoad: function () {
    // var app = getApp();
    // this.setData({
    //   city: app.globalData.city
    // })
    // if (app.globalData.openid){
    //   this.getPageData(app.globalData.openid)
    // } else {
    //   this.getOpenIdFn()
    // }
  },
  onShow: function () {
    var app = getApp();
    this.setData({
      city: app.globalData.city
    })
    if (app.globalData.openid) {
      this.getPageData(app.globalData.openid)
    } else {
      this.getOpenIdFn()
    }
  },
  getOpenIdFn: function () {
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
              that.getPageData(res.data.data.openid)
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
  getPageData: function(id) {
    var that = this
    wx.request({
      url: getApp().globalData.host+ '/getWxIndexInfo',
      data: {
        city: that.data.city,
        openid:id
      },
      method: 'get',
      success: function (res) {
        that.setData({
          imgUrls: res.data.data.banner,
          shopList: res.data.data.ticket
        })
        console.log('res--->', res)
      },
      fail: function (e) {
        wx.showToast({
          title: e.errMsg
        })
      }
    })
  }
})
