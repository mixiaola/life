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
    musicFLag:1,
    dialog: 10,
    status: '1',
    statusName:'全部',
    city:"",
    imgUrls: [],
    shopList:[],
    mode:'aspectFill',
    ticketValue:''
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
      musicFLag: (this.data.musicFLag == '1') ? '0' : '1'
    })
  },
  changeType:function(e){
    this.setData({
      status: e.currentTarget.dataset.num,
      statusName: e.currentTarget.dataset.text,
      dialogTypeFlag: false
    })
  },
  onLoad: function () {
    
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
  bannerClick:function(e){
    getApp().globalData.webUrl = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '../web/web'
    })
  },
  getOpenIdFn: function () {
    var that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: getApp().globalData.host + '/getOpenId',
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
    if(!id){
      id = getApp().globalData.openid
    }
    var that = this
    wx.request({
      url: getApp().globalData.host+ '/getWxIndexInfo',
      data: {
        city: that.data.city,
        openid:id
      },
      method: 'get',
      success: function (res) {
        let dialog;
        if (res.data.data.isGetTicket){
          if (res.data.data.subscription[0].isShow){
            dialog = 3
          } else {
            dialog = 10
          }
        } else {
          dialog = 0
        }
        that.setData({
          imgUrls: res.data.data.banner,
          shopList: res.data.data.ticket,
          dialog: dialog,
          subscription: res.data.data.subscription,
          command: res.data.data.command
        })
      },
      fail: function (e) {
        wx.showToast({
          title: e.errMsg
        })
      }
    })
  },
  userNameInput: function(e){
    this.setData({
      ticketValue: e.detail.value
    })
  },
  getWxTicket: function(){
    var that = this
    wx.request({
      url: getApp().globalData.host + '/getWxTicket',
      data: {
        command: that.data.ticketValue,
        openid: getApp().globalData.openid
      },
      method: 'get',
      success: function (res) {
        that.getPageData()
        that.setData({
          dialog:10
        })
      },
      fail: function (e) {
        wx.showToast({
          title: e.errMsg
        })
      }
    })
  },
  downloadFile:function(){
    var that = this
    wx.downloadFile({
      url: that.data.subscription[0].img,
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '下载成功'
            })
          },
          fail: function (res) {
            wx.showToast({
              title: e.errMsg
            })
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: e.errMsg
        })
      }
    })
  },
  goIndex: function(){
    wx.redirectTo({
      url: '../index/index'
    })
  },
  goMore: function (){
    wx.redirectTo({
      url: '../artical/index'
    })
  },
  goMine: function (){
    wx.redirectTo({
      url: '../mine/mine'
    })
  },
  goDialog2: function(){
    this.setData({
      dialog:2
    })
  },
  dialog2Click: function(){
    if (this.data.subscription[0].isShow){
      this.setData({
        dialog:3
      })
    } else {
      this.setData({
        dialog: 10
      })
    }
  },
  dialog3Click: function (){
    this.setData({
      dialog: 10
    })
  },
  goShop: function(e){
    getApp().globalData.shopid = e.currentTarget.dataset.shopid
    wx.navigateTo({
      url: '../shop/shop',
    })
  }
})
