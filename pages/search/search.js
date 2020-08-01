const {
  default: api
} = require("../../http/api")

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    values: [],
    ass: [],
  asr:[],
  valuea:''
  },
  //返回首页
  onCancel() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  //获取输入框内容
  search(e) {
    console.log(e)
    let obj = {}
    obj.value = e.detail
    let values = []
    this.data.values.push(obj)
    let hash = {};
    this.data.values = this.data.values.reduce((item, next) => {
      hash[next.value] ? '' : hash[next.value] = true && item.push(next);
      return item
    }, [])
    wx: wx.setStorageSync('values', this.data.values)
    wx.navigateTo({
      url: `../detail/detail?value=${obj.value}`,
    })
  },
  //监听跳转
  value(){
    wx.navigateTo({
      url: `../detail/detail?value=${this.data.valuea}`,
    })
  },
  //推荐跳转
  allMatch(e){
   let values=e.currentTarget.dataset.item.keyword
   wx.navigateTo({
    url: `../detail/detail?value=${values}`,
  })
  },
  //热搜跳转
  iconUrl(e){
     console.log(e)
     let valueq=e.currentTarget.dataset.item.searchWord
     wx.navigateTo({
      url: `../detail/detail?value=${valueq}`,
    })
  },
  ass(e){
    console.log(e)
    let valueq=e.currentTarget.dataset.item.value
    wx.navigateTo({
     url: `../detail/detail?value=${valueq}`,
   })
  },
  //删除历史记录
  image() {
    wx.showModal({
      title: '提示',
      content: '您是否要全部删除？',
      success:(res)=> {
        if (res.confirm) {
          wx.removeStorageSync('values')
          let ass= wx.getStorageSync('values')
          this.setData({
            ass:ass
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //监听页面变化
  change(e){
    this.setData({
      valuea:e.detail
    })
    console.log(this.data.valuea)
    api.suggest(this.data.valuea).then(res=>{
      this.setData({
        allMatch:res.result.allMatch
      })
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
     },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let arr = wx.getStorageSync('values')
    if (arr) {
      this.setData({
        values: arr
      })
    };
    let ass = wx.getStorageSync('values')
    this.setData({
      ass: ass
    });
    api.hots().then(res => {
      this.setData({
        asr:res.data.slice(0,10)
      })
      console.log(this.data.asr)
      
    }).catch(err => {
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