// conponents/sheet/sheet.js
const { default: api } = require("../../http/api")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newsong:{
      type:Array
    },
    newsong1:{
      type:Array
    },
    newsong2:{
      type:Array
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    newsong(e){
      console.log(e)
      let id =e.currentTarget.dataset.item.id
      let image=e.currentTarget.dataset.item.picUrl
      let name=e.currentTarget.dataset.item.name
      let names=e.currentTarget.dataset.item.song.artists[0].name
  wx.navigateTo({
    url: `../../pages/play/play?id=${id}&name=${name}&names=${names}`,
  });
  wx.setStorageSync('image', image)
    }
  }
})