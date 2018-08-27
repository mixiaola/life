// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo:{},
    isSharePage: false,
    phoneShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.shareFlag){
      this.setData({
        isSharePage: options.shareFlag
      })
    }
    if (options.id){
      getApp().globalData.shopid = options.id
    }
  },
  openLocation: function(){
    let lagList = this.data.shopInfo.lag.split(';');
    var that = this
    if (lagList.length != 2){
      wx.showToast({
        title: '经纬度异常！',
      })
    } else {
      wx.openLocation({
        longitude: parseInt(lagList[0]),
        latitude: parseInt(lagList[1]),
        name: that.data.shopInfo.shopTitle
      })
    }
  },
  changeDialog: function(){
    this.setData({
      phoneShow: !this.data.phoneShow
    })
  },
  goIndex: function(){
    if (this.data.isSharePage){
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      wx.navigateBack({
        delta: 4
      })
    }
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
  cancel: function(){
    this.setData({
      useFlag: false
    })
  },
  open: function(){
    this.setData({
      useFlag: true
    })
  },
  useTicket: function(){
    var that = this
    wx.request({
      url: getApp().globalData.host + '/useWxTicketById',
      data: {
        shopid: getApp().globalData.shopid,
        openid: getApp().globalData.openid
      },
      method: 'get',
      success: function (res) {
        if (res.data.ec != 200) {
          wx.showToast({
            title: res.data.em,
          })
          return
        }
        wx.showToast({
          title: res.data.em
        })
        that.getPageData()
        that.setData({
          useFlag:false
        })
      },
      fail: function (e) {
        wx.showToast({
          title: e.errMsg
        })
      }
    })
  },
  getPageData: function(){
    var that = this
    wx.request({
      url: getApp().globalData.host + '/getWxTicketById',
      data: {
        shopid: getApp().globalData.shopid,
        openid: getApp().globalData.openid
      },
      method: 'get',
      success: function (res) {
        if (res.data.ec != 200) {
          wx.showToast({
            title: res.data.em,
          })
          return
        }
        let list = res.data.data[0]
        list.introInfo = JSON.parse(list.introInfo)
        that.setData({
          shopInfo: list
        })
      },
      fail: function (e) {
        wx.showToast({
          title: e.errMsg
        })
      }
    })
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.shopInfo.phone, //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  copy: function () {
    wx.setClipboardData({
      data: this.data.shopInfo.phone,
      success: function () {
        wx.showToast({
          title: '复制电话号成功！',
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '复制电话号失败！' + e,
        })
      }
    })
  },
  add: function(){
    wx.addPhoneContact({
      mobilePhoneNumber: this.data.shopInfo.phone,
      nickName: this.data.shopInfo.shopTitle,
      remark: this.data.shopInfo.ticketTitle
    })
  },
  onShareAppMessage:function(){
    return {
      title: this.data.shopInfo.shopTitle,
      path: '/pages/shop/shop?id=' + this.data.shopInfo.id + '&shareFlag=true',
      imageUrl: this.data.shopInfo.imgUrl
    }
  }
})