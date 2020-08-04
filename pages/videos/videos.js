const { default: api } = require("../../http/api")

// pages/videos/videos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    src: '',
    danmuList:
    [{
      text: '看这个视频的一定很帅',
      color: '#ff0000',
      time: 1
    }, {
      text: '哎呦！你很帅额',
      color: '#ff00ff',
      time: 3
    }],
    flag:''
  },
 getData(){
   if(this.data.flag !==undefined){
    api.mvids(this.data.id).then(res=>{
      this.setData({
        video:res.data.url
      })
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
   }else{
    api.videos(this.data.id).then(res=>{
      this.setData({
        video:res.urls[0].url
      })
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
   }
 
 },

 onShareAppMessage() {
  return {
    title: 'video',
    path: 'page/component/pages/video/video'
  }
},

onReady() {
  this.videoContext = wx.createVideoContext('myVideo')
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options.id)
    
     console.log(options.flag)
     this.setData({
       id:options.id,
    
       flag:options.flag
     })
     console.log(this.data.flag)
     this.getData()
     
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