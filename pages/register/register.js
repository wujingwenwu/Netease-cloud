const {
  default: api
} = require("../../http/api");

// pages/register/register.js
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '获取验证码', //倒计时 
    currentTime: 60,
    phone: '',
    password: '',
    code: '',
    username: '',

  },
  // 倒计时方法
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 60,
          disabled: false
        })
      }
    }, 1000)
  },
  // 获取验证码
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
    api.captcha(this.data.phone).then(res => {
      wx.showToast({
        title: '发送验证码成功！',
        icon: 'success',
        duration: 1000
      })
      console.log(res)
    }).catch(err => {

    })
  },
  // 前往登录页面
  danger() {
    wx.navigateTo({
      url: '../Sign/Sign',
    })
  },
  // 立即注册
  register() {
    api.verify({
      captcha: this.data.code,
      phone: this.data.phone
    }).then(res => {
      console.log(res)
      api.cellphone(this.data.phone).then(res => {
        console.log(res)
        api.register({
          captcha: this.data.code,
          phone: this.data.phone,
          password: this.data.password,
          nickname: this.data.username
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            wx.showToast({
              title: '注册成功！',
              icon: 'success',
              duration: 1000
            })
          }
          wx.navigateTo({
            url: `../Sign/Sign`,
          })
        }).catch(err => {
          if (err) {
            wx.showToast({
              title: err.response.data.message,
              icon: 'none',
            })
          }
          console.log(err)
        })
      }).catch(err => {
        if (err) {
          wx.showToast({
            title: err.response.data.message,
            icon: 'none',
          })
        }
        console.log(err)
      })

    }).catch(err => {
      console.log(err)
      if (err) {
        wx.showToast({
          title: err.response.data.message,
          icon: 'none',
        })
      }
    })
  },
  // 手机号
  input(e) {

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
  // 验证码
  code(e) {
    this.setData({
      code: e.detail
    })
  },
  // 用户名
  username(e) {
    this.setData({
      username: e.detail
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