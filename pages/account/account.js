// pages/account/account.js
const { default: api } = require("../../http/api")
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store,{

  /**
   * 页面的初始数据
   */
  use:['userId'],
  data: {
   user:'',
   type:''
  },
  button(){
    wx.showModal({
      title: '提示',
      content: '您是否要退出登录',
      success:res => {
        if (res.confirm) {
          api.logout().then(res=>{
            this.store.data.userId = ''
            console.log(this.store.data.userIds)
          }).catch(err=>{
            console.log(err)
          })
          wx.removeStorage({
            key: 'userId',
          })
         wx.navigateTo({
           url: '../Sign/Sign',
         })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  qian(){
   if(this.data.user !==''){
    wx.showToast({
      title: '恭喜签到成功',
      duration: 2000,
       icon:"success"
    })
   }else{
    wx.showModal({
      title: '提示',
      content: '您还没有登录是否要登录',
      success (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../Sign/Sign',
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
   
  },
  // 编辑资料
  edit(){
   if(this.data.user==''){
    wx.showModal({
      title: '提示',
      content: '您是否要登录？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '../Sign/Sign',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   }else{
    wx.navigateTo({
      url: '../edit/edit',
    })
  }
  },
  // 跳转登录页
  sigon(){
    wx.showModal({
      title: '提示',
      content: '您是否要登录？',
      success:res=> {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '../Sign/Sign',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    if (this.store.data.userId !=='') {
      api.user(this.store.data.userId).then(res=>{
        this.setData({
         user:res.profile,
         type:res.bindings[0].type
        })
         console.log(res)
         console.log(this.data.type)
       }).catch(err=>{
         console.log(err)
       })
    }
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
