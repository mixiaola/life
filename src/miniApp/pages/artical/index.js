// pages/artical/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:[{
      img:'../../img/item1.png',
      title:'1hahah厉hahah厉hahah厉hahah厉hahah厉hahah厉hahah厉hahah厉',
      text:'1哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案'
    },{
      img: '../../img/item1.png',
      title: '2hahah厉hahah厉hahah厉hahah厉hahah厉hahah厉hahah厉hahah厉',
      text: '2哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案哈哈哈哈这个是文案'
    }]
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
    setTimeout(function(){
      var app = getApp();
      console.log('globalData->', app.globalData.userInfo.nickName)
    },1000)
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
  
  }
})