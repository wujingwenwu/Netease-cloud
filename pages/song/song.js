const { default: api } = require("../../http/api")

// pages/song/song.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    song:[],
    songs:[],
    indicatorDots: true,
  autoplay: true,
  interval: 2000,
  duration: 1000,
  circular: true,
  playlists:[],
  playlists1:[],
  swiperIndex: 0,
 
  },

  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('haha');
    let that = this;
    //歌单 ( 网友精选碟 )
   api.playlist().then(res=>{
     this.setData({
       song:res.playlists.slice(0,3),
       songs:res.playlists.slice(3,48)
     })
     this.data.songs.map(item=>{
       if(item.playCount>100000 &&item.playCount<100000000){
        item.playCount=parseInt (item.playCount/10000)+'万'
       }else if(item.playCount>100000000){
        item.playCount=(item.playCount / 100000000).toFixed(1)+'亿 '
       }else{
         item.playCount
       } 
     })
     this.setData({
      songs:res.playlists.slice(3,48)
     })
     
   }).catch(err=>{
     console.log(err)
   });
   //获取精品歌单
   api.playlists().then(res=>{
    
     this.setData({
      playlists:res.playlists.slice(0,24),
      playlists1:res.playlists.slice(24,48)
     })
     this.data.playlists.map(item=>{
      if(item.playCount>100000 &&item.playCount<100000000){
       item.playCount=parseInt (item.playCount/10000)+'万'
      }else if(item.playCount>100000000){
       item.playCount=(item.playCount / 100000000).toFixed(1)+'亿 '
      }else{
        item.playCount
      } 
    })
    this.data.playlists1.map(item=>{
      if(item.playCount>100000 &&item.playCount<100000000){
       item.playCount=parseInt (item.playCount/10000)+'万'
      }else if(item.playCount>100000000){
       item.playCount=(item.playCount / 100000000).toFixed(1)+'亿 '
      }else{
        item.playCount
      } 
    })
    this.setData({
      playlists:res.playlists.slice(0,24),
      playlists1:res.playlists.slice(24,48)
     })
     
   }).catch(err=>{
     console.log(err)
   });
   
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