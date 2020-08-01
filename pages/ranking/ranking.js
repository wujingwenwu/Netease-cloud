const { default: api } = require("../../http/api")

// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   rangking:[],
   rangking2:[],
   rangking1:[],
   rangking3:[],
   rangking4:[],
   rangking5:[],
   rangking6:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //所有榜单内容摘要
  api.detail().then(res=>{
   this.setData({
    rangking:res.list.slice(30,34),
    rangking1:res.list.slice(0,4),
    rangking2:res.list.slice(4,7),
    rangking3:res.list.slice(7,13),
    rangking4:res.list.slice(13,16),
    rangking5:res.list.slice(16,22),
    rangking6:res.list.slice(22,34),
   })
    console.log(this.data.rangking1)
  }).catch(err=>{
    console.log(err)
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

  }
})