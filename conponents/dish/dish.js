// conponents/dish/dish.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dish:{
      type:Array
    },
    dish1:{
      type:Array
    },
    dishs:{
      type:Array
    },
    dishs1:{
      type:Array
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
   num:1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dish(){
      this.setData({
        num:1
      })
    },
    dishs(){
      this.setData({
        num:0
      })
    }
  }
})
