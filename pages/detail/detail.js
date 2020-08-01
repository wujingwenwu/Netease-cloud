const { default: api } = require("../../http/api")
import dayjs from '../../lib/dayjs.min.js'
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  arr:[],
  value:'',
  list:[
    {
      name:'综合',
      num:0,
    },
    {
      name:'单曲',
      num:1,
    },
    {
      name:'歌单',
      num:2,
    },
    {
      name:'歌手',
      num:3,
    },
    {
      name:'专辑',
      num:4,
    },
    {
      name:'视频',
      num:5,
    },
    {
      name:'歌词',
      num:6,
    },

    {
      name:'电台',
      num:7,
    },
    {
      name:'用户',
      num:8,
    },   
  ],
  indexs:'0',
  song:[],
  playList:[],
  video:[],
  mlog:[],
  talk:[],
  artist:[],
  album:[],
  songs:[],
  playLists:[],
  artists:[],
  albums:[],
  videos:[],
  userprofiles:[],
  },
  //播放视频
  video(e){
   console.log(e)
   let mvid = e.currentTarget.dataset.item.vid
   wx.navigateTo({
     url: `../videos/videos?mvid=${mvid}`,
   })
  },
  focus(){
    wx.navigateTo({
      url: '../search/search',
    }) 
  },
  name(e){
   this.setData({
     indexs:e.currentTarget.dataset.index
   });
  },
  song(){
  this.setData({
    indexs:1
  })
  },
  playList(){
    this.setData({
      indexs:2
    })
  },
  artist(){
    this.setData({
      indexs:3
    })
  },
  album(){
    this.setData({
      indexs:4
    })
  },
  user(){
    this.setData({
      indexs:8
    })
  },
  songsq(e){
   console.log(e)
   let id =e.currentTarget.dataset.item.id
   let image=e.currentTarget.dataset.item.al.picUrl
   let name=e.currentTarget.dataset.item.name
   let names=e.currentTarget.dataset.item.ar[0].name
wx.navigateTo({
 url: `../play/play?id=${id}&name=${name}&names=${names}`,
});
wx.setStorageSync('image', image)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options.value)
   let value=options.value
   this.setData({
     value:value
   })
  api.searchs({keywords:options.value,type:1018}).then(res=>{
    res.result.playList.playLists.map(item=>{
      if(item.playCount>10000){
        item.playCount=parseInt(item.playCount/10000).toFixed(1)+'万'
      }else{
        item.playCount
      }
    })
    res.result.video.videos.map(item=>{
      if(item.playTime>10000){
        item.playTime=parseInt(item.playTime/10000)+'万'
      }else{
        item.playTime
      }
      item.durationms=Math.floor(item.durationms/1000/60)+':'+ parseInt((item.durationms/1000%60).toFixed(2))
    })
    res.result.album.albums.map(item=>{
     item.publishTime=dayjs(item.publishTime).format('YYYY-MM-DD')
    })
    this.setData({
      song:res.result.song,
      playList:res.result.playList,
      video:res.result.video,
      mlog:res.result.mlog,
      talk:res.result.talk,
      artist:res.result.artist,
      album:res.result.album,
      user:res.result.user,
    })
    // console.log(this.data.mlog)
    // console.log(this.data.user)
    // console.log(res)
  }).catch(err=>{
    console.log(err)
  });
  //单曲
  api.searchs({keywords:options.value,type:1}).then(res=>{
    this.setData({
      songs:res.result.songs
    })
    // console.log(res)
    // console.log(this.data.songs)
  }).catch(err=>{
    console.log(err)
  });
   //歌单
   api.searchs({keywords:options.value,type:1000}).then(res=>{
    res.result.playlists.map(item=>{
      if(item.playCount>100000){
        item.playCount=parseInt(item.playCount/10000).toFixed(1)+'万'
      }else{
        item.playCount
      }
    })
    this.setData({
      playLists:res.result.playlists
    })
    // console.log(res)
    // console.log(this.data.playLists)
  }).catch(err=>{
    console.log(err)
  });
  //歌手
  api.searchs({keywords:options.value,type:100}).then(res=>{
    this.setData({
      artists:res.result.artists
    })
    // console.log(res)
    // console.log(this.data.artists)
  }).catch(err=>{
    console.log(err)
  });
   //专辑
   api.searchs({keywords:options.value,type:10}).then(res=>{
    res.result.albums.map(item=>{
      item.publishTime=dayjs(item.publishTime).format('YYYY-MM-DD')
     })
    this.setData({
      albums:res.result.albums
    })
    // console.log(res)
    // console.log(this.data.albums)
  }).catch(err=>{
    console.log(err)
  });
  //视频
  api.searchs({keywords:options.value,type:1014}).then(res=>{
    res.result.videos.map(item=>{
      if(item.playTime>10000){
        item.playTime=parseInt(item.playTime/10000)+'万'
      }else{
        item.playTime
      }
      item.durationms=Math.floor(item.durationms/1000/60)+':'+ parseInt((item.durationms/1000%60).toFixed(2))
    })

    this.setData({
      videos:res.result.videos
    })
    // console.log(res)
    console.log(this.data.videos)
  }).catch(err=>{
    console.log(err)
  });
   //歌词
   api.searchs({keywords:options.value,type:1006}).then(res=>{
    this.setData({
     songa:res.result.songs
    })
    // console.log(res)
    //  console.log(this.data.songa)
  }).catch(err=>{
    console.log(err)

  });
  //电台
  api.searchs({keywords:options.value,type:1009}).then(res=>{
    this.setData({
      djRadios:res.result.djRadios
    })
    // console.log(res)
    //  console.log(this.data.djRadios)
  }).catch(err=>{
    console.log(err)
  });
    //电台
    api.searchs({keywords:options.value,type:1002}).then(res=>{
      this.setData({
        userprofiles:res.result.userprofiles
      })
      // console.log(res)
      //  console.log(this.data.userprofiles)
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