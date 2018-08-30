//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    indicatorDots:true,
    autoplay:false,
    interval:2000,
    dialogTypeFlag:false,
    musicFLag:0,
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
    // var app = getApp();
    // this.setData({
    //   city: app.globalData.city
    // })
    // if (app.globalData.openid) {
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
  getDateToStr: function(str){
    return str.split('-').join('.')
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
              getApp().globalData.openid = res.data.data.openid
              that.getPageData(res.data.data.openid)
            } else {
              wx.showModal({
                content: '获取openid失败'
              })
            }
          },
          fail: function (e) {
            wx.showModal({
              content: e.errMsg
            })
          }
        })

      }
    })
  },
  shuffle: function (arr) {
    let i = arr.length;
    while(i) {
      let j = Math.floor(Math.random() * i--);
      var tem;
      tem = arr[j]
      arr[j] = arr[i]
      arr[i] = tem
    }
    return arr;
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
        if (res.data.ec != 200){
          wx.showModal({
            content: res.data.em,
          })
          return
        }
        if (res.data.data.isGetTicket){
          if (res.data.data.subscription[0].isShow && getApp().globalData.subscriptionFlag){
            dialog = 3
            getApp().globalData.subscriptionFlag = false
          } else {
            dialog = 10
          }
        } else {
          dialog = 0
        }
        if (!that.data.shopList[0]){
          var list = res.data.data.ticket
          for (var i = 0; i < list.length; i++) {
            list[i].validtiyStartStr = that.getDateToStr(list[i].validtiyStart)
            list[i].validtiyEndStr = that.getDateToStr(list[i].validtiyEnd)
          }
          list = that.shuffle(list)
          that.setData({
            imgUrls: res.data.data.banner,
            shopList: list,
            dialog: dialog,
            subscription: res.data.data.subscription,
            command: res.data.data.command
          })
        } else {
          that.setData({
            dialog: dialog,
            subscription: res.data.data.subscription,
            command: res.data.data.command
          })
        }
        
      },
      fail: function (e) {
        wx.showModal({
          content: e.errMsg
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
        if (res.data.ec == 200){
          that.getPageData()
          that.setData({
            dialog: 10
          })
          wx.showModal({
            content: res.data.em
          })
        } else {
          wx.showModal({
            content: res.data.em
          })
        }
        
      },
      fail: function (e) {
        wx.showModal({
          content: e.errMsg
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
            wx.showModal({
              content: '下载成功'
            })
          },
          fail: function (res) {
            wx.showModal({
              content: res.errMsg
            })
          }
        })
      },
      fail: function (res) {
        wx.showModal({
          content: res.errMsg
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
    this.setData({
      dialog: 0
    })
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
  },
  onShareAppMessage: function () {

  }
})
