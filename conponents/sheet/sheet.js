// conponents/sheet/sheet.js
const { default: api } = require("../../http/api")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    result:{
      type:Array
    }
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
    sheet(e){
     console.log(e)
     let mvid = e.currentTarget.dataset.item.id
     wx.navigateTo({
       url: `../../pages/videos/videos?mvid=${mvid}`,
     })
    }
  }
})
