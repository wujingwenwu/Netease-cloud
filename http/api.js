const fly = require("./index")
export default {
  //1.手机登录
  statistics({
    phone,
    password
  }) {
    return fly.get(`/login/cellphone?phone=${phone}&password=${password}`)
  },
  //2.轮播图
  banner() {
    return fly.get(`/banner`)
  },
  //3.推荐歌单
  personalized() {
    return fly.get(`/personalized`)
  },
  //4.注册
  register({
    captcha,
    phone,
    password,
    nickname
  }) {
    // captcha:验证码,phone:手机号,password:密码,nickname:用户名
    return fly.get(`/register/cellphone?captcha=${captcha}&phone=${phone}&password=${password}&nickname=${nickname}`)
  },
  //5.获取验证码
  captcha(phone) {
    return fly.get(`/captcha/sent?phone=${phone}`)
  },
  //6.验证验证码
  verify({
    phone,
    captcha
  }) {
    return fly.get(`/captcha/verify?phone=${phone}&captcha=${captcha}`)
  },
  //7.邮箱登录
  login({
    email,
    password
  }) {
    return fly.get(`/login?email=${email}&password=${password}`)
  },
  //8.检测手机号码是否已注册
  cellphone(phone) {
    return fly.get(`/cellphone/existence/check?phone=${phone}`)
  },
  //9.获取用户详情
  user(uid) {
    return fly.get(`/user/detail?uid=${uid}`)
  },
  //10.退出登录
  logout() {
    return fly.get(`/logout`)
  },
  //11.更新用户信息
  update({
    gender, //性别
    birthday, //出生日期
    nickname, //昵称
    province, //省份
    city, //城市
    signature //用户签名
  }) {
    return fly.get(`/user/update?gender=${gender}&birthday=${birthday}&nickname=${nickname}&province=${province}&city=${city}&signature=${signature}`)
  },
  //12.获取用户信息
  subcount() {
    return fly.get(`/user/subcount`)
  },
  //13.签到
  daily(type) {
    return fly.get(`/daily_signin?type=${type}`)
  },
  //14.获取精品歌单
  playlists() {
    return fly.get(`/top/playlist/highquality`)
  },
  //15.新歌速递
  song() {
    return fly.get(`/top/song?type=7`)
  },
  //16.推荐新音乐
  newsong() {
    return fly.get(`/personalized/newsong`)
  },
  //17.推荐电台
  djprogram() {
    return fly.get(`/personalized/djprogram`)
  },
  //18.新碟上架
  album() {
    return fly.get(`/top/album`)
  },
  //19.推荐节目
  program() {
    return fly.get(`/program/recommend`)
  },
  //20.歌单 ( 网友精选碟 )
  playlist() {
    return fly.get(`/top/playlist`)
  },
  //21.歌单分类
  catlist() {
    return fly.get(`/playlist/catlist`)
  },
  //22.欧美
  playlistss() {
    return fly.get(`/top/playlist/highquality?cat=欧美`)
  },
  //23.所有榜单内容摘要
  detail() {
    return fly.get(`/toplist/detail`)
  },
  //24.所有榜单
  toplist() {
    return fly.get(`/toplist`)
  },
  //25.搜索
  search() {
    return fly.get(`/search`)
  },
  //26.默认搜索关键词
  default () {
    return fly.get(`/search/default`)
  },
  //27.热搜列表(简略)
  hot() {
    return fly.get(`/search/hot`)
  },
  //28.热搜列表(详细)
  hots() {
    return fly.get(`/search/hot/detail`)
  },
  //29.搜索建议
  suggest(keywords) {
    return fly.get(`/search/suggest?keywords=${keywords}&type=mobile`)
  },
  //30.搜索建议
  searchs({
    keywords,
    type
  }) {
    return fly.get(`/search?keywords=${keywords}&type=${type}`)
  },
  //31.歌手分类列表
  artist({
    initial,
    type,
    area
  }) {
    return fly.get(`/artist/list?area=${area}&type=${type}&initial=${initial}`)
  },
  //32.获取歌手描述
  desc(id) {
    return fly.get(`/artist/desc?id=${id}`)
  },
  //33.获取歌手单曲
  artists(id) {
    return fly.get(`/artists?id=${id}`)
  },
  //34.获取歌手专辑
  album(id) {
    return fly.get(`/artist/album?id=${id}`)
  },
  //35.获取歌手专辑
  album(id) {
    return fly.get(`/artist/album?id=${id}`)
  },
  //36.获取歌手mv
  mv(id) {
    return fly.get(`/artist/mv?id=${id}`)
  },
  //37.歌手热门50首歌曲
  top(id) {
    return fly.get(`/artist/top/song?id=${id}`)
  },
  //38.心动模式/智能播放
  intelligence({
    id,
    pid
  }) {
    return fly.get(`/playmode/intelligence/list?id=${id}&pid=${pid}`)
  },
  //39.获取音乐 url
  songs(id) {
    return fly.get(`/song/url?id=${id}`)
  },
  //40.获取歌词
  lyric(id) {
    return fly.get(`/lyric?id=${id}`)
  },
  //40.获取歌曲详情
  songer(id) {
    return fly.get(`/song/detail?id=${id}`)
  },
  //41.获取 mv 数据
  mvid({
    id,
    type
  }) {
    return fly.get(`/mv/detail?id=${id}&type=${type}`)
  },
  //42.mv 地址
  mvids(id) {
    return fly.get(`/mv/url?id=${id}`)
  },
  //43.全部 mv
  all() {
    return fly.get(`/mv/all`)
  },
  //44.获取视频播放地址
  videos(id) {
    return fly.get(`/video/url?id=${id}`)
  },
   //45.获取全部视频列表
   group() {
    return fly.get(`/video/group/list`)
  },

}