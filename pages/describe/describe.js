const { default: api } = require("../../http/api")
import dayjs from '../../lib/dayjs.min.js'
// pages/describe/describe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSongs:[],
    list:[
      {
        name:'主页'
      },
      {
        name:'歌曲'
      },
      {
        name:'专辑'
      },
      {
        name:'视频'
      },
      
    ],
    indexq:0,
    hotSongss:[],
    arr:[],
    hotAlbums:[],
    mvs:[],
 
  },
  list(e){
  
  this.setData({
    indexq:e.currentTarget.dataset.index
  })
  },
  hotSongss(e){
  console.log(e)
  let id =e.currentTarget.dataset.item.id
  let image=e.currentTarget.dataset.item.al.picUrl
  let name=e.currentTarget.dataset.item.name
  let names=e.currentTarget.dataset.item.ar[0].name//歌手
wx.navigateTo({
url: `../play/play?id=${id}&name=${name}&names=${names}}`,
});
wx.setStorageSync('image', image)
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options.id)
  //获取歌手描述
  api.desc(options.id).then(res=>{
    // console.log(res)
  }).catch(err=>{
    console.log(err)
  });
  //获取歌手单曲
  api.artists(options.id).then(res=>{
    let idss=[]
    res.hotSongs.map(item=>{
      let ids={}
       ids.id=item.id
       ids.name=item.name
       ids.names=item.ar[0].name
       ids.picUrl=item.al.picUrl
     idss.push(ids)
      wx.setStorageSync('idss', idss)
  
    })
    this.setData({
      hotSongs:res.artist,
      hotSongss:res.hotSongs.slice(0,3),
      arr:res.hotSongs
    })
    // console.log(this.data.hotSongss)
    console.log(res)
  }).catch(err=>{
    console.log(err)
  });
  //获取歌手mv
  api.mv(options.id).then(res=>{
    res.mvs.map(item=>{
      item.publishTime=dayjs(item.publishTime).format('YYYY-MM-DD')
    })
    this.setData({
      mvs:res.mvs
    })
   
    // console.log(res)
  }).catch(err=>{
    console.log(err)
  });
    //获取歌手专辑
    api.album(options.id).then(res=>{
      res.hotAlbums.map(item=>{
        item.publishTime=dayjs(item.publishTime).format('YYYY-MM-DD')
      })
      this.setData({
        hotAlbums:res.hotAlbums
      })
      // console.log(res)
    }).catch(err=>{
      console.log(err)
    });
     //歌手热门50首歌曲
     api.top(options.id).then(res=>{
      // console.log(res)
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