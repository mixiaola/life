// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData()
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
  getPageData: function(){
    x.request({
      url: getApp().globalData.host + '/getWxTicketById',
      data: {
        city: that.data.city,
        openid: id
      },
      method: 'get',
      success: function (res) {
        let dialog;
        if (res.data.data.isGetTicket) {
          if (res.data.data.subscription[0].isShow) {
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
  }
})