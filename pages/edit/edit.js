// pages/edit/edit.js
const { default: api } = require("../../http/api")
import create from '../../utils/store/create'
import store from '../../store/index'
import dayjs from '../../lib/dayjs.min.js'
import area from '../../lib/area.js'
create.Page(store,{

  /**
   * 页面的初始数据
   */
  use:['userId'],
  data: {
    birthday:'', //出生日
    city:'',
    gender:'',//性别
    nickname:'',
    province:'',//省份
    signature:'',//用户签名
    show:'',
    show1:false,
    show2:'',
    show3:'',
    value:'',
    city1:'',
    city2:'',
    city3:'',
    citys:'',
    values:'AEBD',
    columns: ['保密', '男', '女'],
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    area:area,
  },
  nickname(){
   this.setData({
     show:true,
     value:this.data.nickname
   })
  },
  gender(){
    this.setData({
      show1:true,
      
    })
  },
  birthday(){
    this.setData({
      show2:true,
      
    })
  },
  city(){
    this.setData({
      show3:true,
      
    })
  },
  onClose(){
    this.setData({
      show1:false,
      
    })
  },
  onClose(){
    this.setData({
      show2:false,
      
    })
  },
  onClose(){
    this.setData({
      show3:false,
      
    })
  },
  onChange(val){
    this.setData({
      value:val.detail
    })
  },
  onClose(){
    this.setData({
      show:false,
    })
  },
  onCance(){
    this.setData({
      show1:false,
    })
  },
  onCancel1(){
    this.setData({
      show2:false,
    })
  },
  onCancel2(){
    this.setData({
      show3:false,
    })
  },
  onCancel(){
    this.setData({
      show1:false,
    })
  },
//更改性别
  onConfirm(e){
   console.log(e)
   this.setData({
    show1:false,
    gender:e.detail.value
  })
  },
  //更改生日
  onConfirm1(e){
    console.log(e)
    this.setData({
     show2:false,
     birthday:dayjs(e.detail).format('YY-MM-DD')
   })
  },
  //更改城市
  onConfirm2(e){
    console.log(e)
    this.setData({
     show3:false,
     city1:e.detail.values[0].name,
     city2:e.detail.values[1].name,
     city3:e.detail.values[2].name,
     city: `${this.data.city1}${this.data.city2}${this.data.city3}`
   })
   console.log(this.data.city1)
  },
  //更改名字
  getUserInfo(e){
   console.log(e)
   this.setData({
    nickname:this.data.value
  })
  },
  //点击修改
  button(){
    wx.showModal({
      title: '提示',
      content: '您是否要修改',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '抱歉，此功能正在开发中！',
            duration: 2000,
             icon:"none"
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //拿省份
    let  province_list = this.data.area. province_list
    var arr = []
    for (let key in province_list) {
      // 每遍历一次，就创建一个字典对象
      let dict = {};
      dict.name = province_list[key];
      dict.id=key
      arr.push(dict);
    }
    console.log(arr);
    //拿城市
   let city_list= this.data.area.city_list
   var ass = []
   for (let key in city_list) {
     // 每遍历一次，就创建一个字典对象
     let dict = {};
  
     dict.name = city_list[key];
     dict.id=key
     ass.push(dict);
   }
 //请求页面数据
  api.user(this.store.data.userId).then(res=>{
    this.setData({
      birthday:dayjs(res.profile.birthday).format('YY-MM-DD'),
      citys:res.profile.city,
      gender:res.profile.gender,
      nickname:res.profile.nickname,
      province:res.profile.province,
      signature:res.profile.signature,
     
    })
    console.log(this.data.province)
    if(this.data.gender==0){
       this.setData({
        gender:'保密'
       })
    }
    //过滤省份
   let obj= arr.filter(item=>{
       if(item.id == this.data.province){
        return   this.data.province=item.name
       }  
    })
    let citya=obj[0].name
    console.log(citya)
    //过滤城市
  let object =ass.filter(item=>{
    if(item.id == this.data.citys){
      return   this.data.province=item.name
     }
  })
  let cityb=object[0].name
  console.log(cityb)
  //省份跟城市拼接
  this.setData({
    city:`${citya}${cityb}`
  })
    console.log(res)
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
