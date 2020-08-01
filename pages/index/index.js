const { default: api } = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    result:[],
    newsong:[],
    newsong1:[],
    newsong2:[],
    radio:[],
    dish:[],
    dishs:[],
    dishs1:[],
    program:[],
   
  },
  //每日推荐
  recommend(){
    wx.showToast({
      title: '抱歉，此功能正在开发中!',
      icon: 'none',
      duration: 2000
    })
  },
   //歌单
   sheet(){
    wx.navigateTo({
      url: '../song/song',
    })
  },
  //排行榜
  ranking(){
    wx.navigateTo({
      url: '../ranking/ranking',
    })
  },
  //搜索
  onSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //轮播图
    api.banner().then(res=>{
      this.setData({
        banners:res.banners
      })
    }).catch(err=>{

    });
    //发现好歌单
    api.personalized().then(res=>{
      
      res.result.map(item=>{
        item.playCount=parseInt(item.playCount/10000)+'万'
      })
      this.setData({
        result:res.result.slice(0,6)
      })
      
  
    }).catch(err=>{
    });
    //推荐新音乐
    api.newsong().then(res=>{
      this.setData({
        newsong:res.result.slice(0,3),
        newsong1:res.result.slice(3,6),
        newsong2:res.result.slice(6,9)
      })
    }).catch(err=>{
      console.log(err)
    });
    //推荐电台
    api.djprogram().then(res=>{
       this.setData({
         radio:res.result
       })
   
    }).catch(err=>{
      console.log(err)
    });
    //新歌速递
    api.song().then(res=>{
      this.setData({
        dish:res.data.slice(0,3),
        dish1:res.data.slice(3,6)
      })
     
   }).catch(err=>{
     console.log(err)
   });
   //新碟上架
   api.album().then(res=>{
    this.setData({
      dishs:res.albums.slice(0,3),
      dishs1:res.albums.slice(3,6)
    })
 }).catch(err=>{
   console.log(err)
 });
    //推荐节目
    api.program().then(res=>{
      this.setData({
        program:res.programs
        
      })
      console.log(this.data.program)
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