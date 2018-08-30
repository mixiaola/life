// pages/artical/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.getPageData()
  },
  goWeb: function (e){
    getApp().globalData.webUrl = e.currentTarget.dataset.url
    console.log('e-->', e.currentTarget.dataset.url)
    wx.navigateTo({
      url: '../web/web'
    })
  },
  getPageData: function(){
    var that = this
    wx.request({
      url: getApp().globalData.host + '/getWxArticle',
      data: {},
      method: 'get',
      success: function (res) {
        if (res.data.ec == 200){
          that.setData({
            content:res.data.data
          })
        }else {
          wx.showModal({
            content: res.data.ec
          })
        }
        console.log('res-->', res)
      },
      fail: function (e) {
        wx.showModal({
          content: e.errMsg
        })
      }
    })
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
  }
})