// pages/Sign/Sign.js
const {
  default: api
} = require("../../http/api")
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store,{

  /**
   * 页面的初始数据
   */
  use:['userId'],
  data: {
    flag: true,
    phone: '',
    password: '',
    passwords: '',
    email: '',
   
  },
  phones() {
    this.setData({
      flag: true
    })
  },
  email() {
    this.setData({
      flag: false
    })
  },
  // 前往注册页面
  register() {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  // 登录
  danger() {
    if (this.data.flag == true) {
      api.statistics({
        phone:this.data.phone,
        password:this.data.password,
      }).then(res => {
        if (res.code === 200) {
          wx.showToast({
            title: '登录成功！',
            icon: 'success',
            duration: 1000
          })
        }
        this.store.data.userId = res.bindings[0].userId
        wx.switchTab({
          url: '../account/account',
        })
        console.log(res)
      }).catch(err => {
        if (err) {
          wx.showToast({
            title: '手机号或密码错误',
            image:'../../images/tabber/提醒.png'
          })
        }
        console.log(err)
      })
    } else {
      api.login({
        email:this.data.email,
        password:this.data.passwords
      }).then(res => {
        wx.switchTab({
          url: '../account/account',
        })
        if (res.code === 200) {
          wx.showToast({
            title: '登录成功！',
            icon: 'success',
            duration: 3000
          },)
        }
       
        console.log(res)
      }).catch(err => {
        if (err) {
          wx.showToast({
            title: '邮箱或密码错误',
            image:'../../images/tabber/提醒.png'
          })
        }
        console.log(err)
      })
    }

  },
  phone(e) {

    this.setData({
      phone: e.detail
    })
  },
  // 密码
  password(e) {
    this.setData({
      password: e.detail
    })
  },
  passwords(e) {
    this.setData({
      passwords: e.detail
    })
  },
  emails(e) {
    this.setData({
      email: e.detail
    })
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

