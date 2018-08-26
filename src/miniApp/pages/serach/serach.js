// pages/serach/serach.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serachText:'',
    shopList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  clear: function(){
    this.setData({
      serachText: '',
      shopList:[]
    })
  },
  userNameInput: function(e){
    this.serachData(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  goShop:function(e){
    getApp().globalData.shopid = e.currentTarget.dataset.shopid
    wx.navigateTo({
      url: '../shop/shop',
    })
  },
  cancal: function(){
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 300)
  },
  clickTag:function(e){
    this.serachData(e.currentTarget.dataset.tag)
  },
  serachData: function (value){
    var that = this
    this.setData({
      serachText: value
    })
    if (value){
      wx.request({
        url: getApp().globalData.host + '/getWxSerachList',
        data: {
          label: that.data.serachText,
        },
        method: 'get',
        success: function (res) {
          if (res.data.ec != 200) {
            wx.showToast({
              title: res.data.em,
            })
            return
          }
          that.setData({
            shopList: res.data.shopList
          })
        },
        fail: function (e) {
          wx.showToast({
            title: e.errMsg
          })
        }
      })
    } else {
      that.setData({
        shopList: []
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: getApp().globalData.host + '/getLabelList',
      data: {},
      method: 'get',
      success: function (res) {
        if (res.data.ec == 200){
          that.setData({
            tag: res.data.data.list
          })
        } else {
          wx.showToast({
            title: res.data.data
          })
        }
        console.log('res--->', res)
      },
      fail: function (e) {
        wx.showToast({
          title: e.errMsg
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
  
  }
})