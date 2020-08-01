const {
  default: api
} = require("../../http/api")
const ba = wx.getBackgroundAudioManager()
// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    song: [],
    image: '',
    name: '',
    names: '',
    flag: true,
    num: 0,
    number: 0,
    flags: true,
    lyrics: '',
    lyricresult: [],
    lyricresults: [],
    lyricArray: [],
    maginTop: 0,
    currentIndex: 0,
    id: '',
    ids: [],
    time: '00:00',
    times: '00:00',
    duration: '',
    value: '',
    prevIndex:0,
  },
  //放歌
  getData() {
    api.songs(this.data.id).then(res => {
      ba.src = res.data[0].url

      console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },
  //获取歌词
  getback() {
    api.lyric(this.data.id).then(res => {
      this.setData({
        lyrics: res.lrc.lyric
      })
      this.passlyrics()
      this.sliceNull()
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  result() {
    if (this.data.flags == true) {
      this.setData({
        flags: false
      })
    } else {
      this.setData({
        flags: true
      })
    }
  },
  tabber() {
    if (this.data.flag == true) {
      ba.pause()
      this.setData({
        flag: false
      })
    } else {
      this.setData({
        flag: true
      });
      ba.play()
    }
  },
  //上一曲
  play() {
    //获取当前歌曲的id
    let currentId = this.data.id
    let name = this.data.name
    let names = this.data.names
    console.log(name)
    let index = 0
    //根据当前id值找出当前歌曲的下标
    for (var i = 0; i < this.data.ids.length; i++) {
      if (currentId == this.data.ids[i].id) {
        index = i;
        break;
      }
    }
    let prevIndex = index == 0 ? this.data.ids.length - 1 : index - 1
    //上一首歌曲的id
    let prevId = this.data.ids[prevIndex].id
    let prevname = this.data.ids[prevIndex].name
    let prevnames = this.data.ids[prevIndex].names
    let picUrl = this.data.ids[prevIndex].picUrl

    this.setData({
      id: prevId
    })
    console.log(this.data.id)
    api.songs(this.data.id).then(res => {
      ba.stop()
      ba.src = res.data[0].url
      ba.title = prevnames
      this.setData({
        name: prevname,
        names: prevnames,
        maginTop: 0,
        currentIndex: 0,
        image: picUrl
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
    this.getback()
  },
  //下一曲
  preaplay() {
    //获取当前歌曲的id
    let currentId = this.data.id
    let name = this.data.name
    let names = this.data.names
    console.log(name)
    let index = 0
    //根据当前id值找出当前歌曲的下标
    for (var i = 0; i < this.data.ids.length; i++) {
      if (currentId == this.data.ids[i].id) {
        index = i;
        break;
      }
    }
     
    let prevIndex = index == this.data.ids.length-1 ? 0 : index + 1
    //下一首歌曲的id
    let prevId = this.data.ids[prevIndex].id
    //获取下一首的歌名
    let prevname = this.data.ids[prevIndex].name
    //获取下一曲的歌手名字
    let prevnames = this.data.ids[prevIndex].names
    //获取下一曲的图片
    let picUrl = this.data.ids[prevIndex].picUrl
    console.log(picUrl)
    console.log(prevId)
    this.setData({
      id: prevId
    })
    console.log(this.data.id)
    api.songs(this.data.id).then(res => {
      ba.stop()
      ba.src = res.data[0].url
      ba.title = prevnames
      this.setData({
        name: prevname,
        names: prevnames,
        image: picUrl,
        maginTop: 0,
        currentIndex: 0,
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    });
    this.getback()
  },
  //切换模式
  images() {
    if (this.data.num == 0) {
      //切换成单曲循环
      this.setData({
        num: 1
      })
    } else if (this.data.num == 1) {
      //切换成随机播放
      this.setData({
        num: 2
      })
    } else {
      //切换成顺序播放
      this.setData({
        num: 0
      })
    }
  },
  //收藏
  image() {
    if (this.data.number == 0) {
      this.setData({
        number: 1
      });

    } else {
      this.setData({
        number: 0
      })
    }
  },
  //解析歌词
  passlyrics() {
    let lyricresult = []
    //将所有歌词组成的字符串切割成为每句歌词组成的数组
    //使用split(切割方法)对换行字符（\n \r:回车 \t:bab键位)进行切割
    let lyricArray = this.data.lyrics.split('\n')

    //判断最后一个元素（歌词和时间）是否为空 如果为空 删掉
    if (lyricArray[lyricArray.length - 1] == "") {
      lyricArray.pop()
    }
    //书写时间正则表达式 \[:使用转义字符仅仅表示中括号 数字[0~9]===\d  {m}前面字符的数量m个
    let pattern = /\[\d{2}\:\d{2}\.\d{1,3}\]/
    //遍历歌词数组中的每一个元素
    lyricArray.forEach((v /*数组中每个元素*/ , i /*数组中每个元素所对应的下标*/ , a /*正在遍历的数组*/ ) => {
      //replace替换
      let real_lyric = v.replace(pattern, "")
      // console.log(real_lyric)
      //对每一句单词处理，将时间提取出来 
      let time = v.match(pattern)
      if (time !== null) {
        let result = time[0].slice(1, -1)
        // console.log(result)
        let timeArray = result.split(":")
        let finalTime = parseFloat(timeArray[0]) * 60 + parseFloat(timeArray[1])

        lyricresult.push([finalTime, real_lyric])
        this.setData({
          lyricresult: lyricresult
        })


      }

    })
  },
  sliceNull() {
    let lyricresults = []
    for (var i = 0; i < this.data.lyricresult.length; i++) {
      if (this.data.lyricresult[i][1] !== "") {
        lyricresults.push(this.data.lyricresult[i])
        this.setData({
          lyricresults: lyricresults
        })

      }
    }
  },
  //滑动条
  slider2change(e) {

    console.log(e)
    let timea = e.detail.value
    ba.seek(timea)
  },
  /**
   * 生命周期函数--监听页面加载           
   */
  onLoad: function (options) {
    console.log(options.id)
    console.log(options.name)
    console.log(options.names)
    let ids = wx.getStorageSync('idss')
    ba.title = options.name
    let image = wx.getStorageSync('image')
    this.setData({
      image: image,
      name: options.name,
      names: options.names, //歌手
      id: options.id,
      ids: ids
    })
    // console.log(this.data.ids)
    this.getData()
    this.getback()


    ba.onTimeUpdate(() => {
      let duration = ba.duration //当前音频的总长度
      this.setData({
        duration: duration
      })
      let currentTime = ba.currentTime //当前音频的播放位置
      let values = ba.currentTime //当前音频的播放位置
      let lyricArray = this.data.lyricresults

      //计算滚动条的位置
      if (this.data.currentIndex >= 6 && this.data.currentIndex) {
        this.setData({
          maginTop: (this.data.currentIndex - 6) * 30
        })
      }
      //最后一句的歌词没有下一句，不需要跟下一句做比较
      if (this.data.currentIndex == lyricArray.length - 2) {
        //判断当前时间大于等于最后一句的时间
        if (currentTime >= lyricArray[lyricArray.length - 1[0]]) {
          //正在唱最后一句
          this.setData({
            currentIndex: lyricArray.length - 1
          })
        }
      } else {
        //遍历所有歌词
        for (var i = 0; i < lyricArray.length; i++) {
          if (currentTime >= lyricArray[i][0] && currentTime < lyricArray[i + 1][0]) {
            //设置正在播放的行号
            this.setData({
              currentIndex: i
            })
          }
        }
      };
      let durations = '0' + parseInt(parseInt(duration) / 60)
      let durationa = (parseInt(duration) % 60)
      if (durationa < 10) {
        durationa = '0' + durationa
      } else {
        durationa = durationa
      }
      let durationb = durations + ':' + durationa

      this.setData({
        times: durationb
      });

      let currentTimer = '' //分
      let currentTimess = '' // 秒

      if (currentTime < 10) {
        currentTime = '00' + ':' + '0' + parseInt(currentTime)
      }
      if (currentTime >= 10 && currentTime < 60) {
        currentTime = '00' + ':' + parseInt(currentTime)
      }
      if (currentTime >= 60) {
        currentTimer = parseInt(currentTime / 60)
        currentTimess = parseInt(currentTime % 60)
        if (currentTimer < 10) {
          currentTimer = '0' + currentTimer
        }
        if (currentTimess < 10) {
          currentTimess = '0' + currentTimess
        }
        currentTime = currentTimer + ':' + currentTimess


      }
      this.setData({
        time: currentTime,
        value: values
      });

    });
    ba.onEnded(() => {

      if (this.data.num == 0) {

        this.preaplay()
      } else if (this.data.num == 1) {
        this.setData({
          id: this.data.id
        })
        //放歌     
        api.songs(this.data.id).then(res => {
          ba.src = res.data[0].url
          ba.title = options.name
          this.setData({
            maginTop: 0,
            currentIndex: 0,
          })

          console.log(res)
        }).catch(err => {
          console.log(err)
        });
        this.getback()
      } else {
        //获取当前歌曲的id
        let currentId = this.data.id
        let name = this.data.name
        let names = this.data.names
        console.log(currentId)
        let index = 0
        //根据当前id值找出当前歌曲的下标
        for (var i = 0; i < this.data.ids.length; i++) {
          if (currentId == this.data.ids[i].id) {
            index = i;
            break;
          }
        }
        // if(index==0){
        // this.data.prevIndex+1
        // }else{
        //   this.data.prevIndex
        // }
        console.log(index)
        let indexs= Math.floor(Math.random()*this.data.ids.length)
        // let prevIndex = index == 0 ? this.data.ids.length + indexs : index + Math.ceil(Math.random() * (index + 2))
        //下一首歌曲的id
        // this.setData({
        //   prevIndex:prevIndex
        // })

        let prevId = this.data.ids[indexs].id
        //获取下一首的歌名
        let prevname = this.data.ids[indexs].name
        //获取下一曲的歌手名字
        let prevnames = this.data.ids[indexs].names
        //获取下一曲的图片
        let picUrl = this.data.ids[indexs].picUrl
        console.log(picUrl)
        console.log(prevId)
        this.setData({
          id: prevId
        })
        console.log(this.data.id)
        api.songs(prevId).then(res => {
          // ba.stop()
          ba.src = res.data[0].url
          ba.title = prevnames
          this.setData({
            name: prevname,
            names: prevnames,
            image: picUrl,
            maginTop: 0,
            currentIndex: 0,
          })
          // console.log(res)
        }).catch(err => {
          console.log(err)
        });
        this.getback()
      }
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