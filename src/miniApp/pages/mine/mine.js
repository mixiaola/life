// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    title:'',
    id:'',
    imageUrl:'',
    userInfo:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindGetUserInfo: function(e){
    if (e && e.detail && e.detail.userInfo){
      this.setData({
        userInfo: e.detail.userInfo
      })
    }
  },
  onLoad: function () {
    var app = getApp()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log(this.data.userInfo)
    this.getPageData()
  },
  goShop: function(e){
    getApp().globalData.shopid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../shop/shop',
    })
  },
  getPageData: function (){
    var that = this
    wx.request({
      url: getApp().globalData.host + '/getWxUseTicket',
      method:"get",
      data:{
        openid: getApp().globalData.openid
      },
      success:function(res){
        if (res.data.ec != 200) {
          wx.showModal({
            content: res.data.em,
          })
          return
        }
        that.setData({
          list:res.data.data
        })
      },
      fail: function(e){
        wx.showModal({
          content: e.errMsg
        })
      }
    })
  },
  getUserInfo: function (e) {
    var app = getApp();
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  goIndex: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  goMore: function () {
    wx.redirectTo({
      url: '../artical/index'
    })
  },
  goMine: function () {
    wx.redirectTo({
      url: '../mine/mine'
    })
  },
  onShareAppMessage:function(ops){
    return {
      title: ops.target.dataset.title,
      path: '/pages/shop/shop?id=' + ops.target.dataset.id + '&shareFlag=true',
      imageUrl: ops.target.dataset.imgurl
    }
  }
})