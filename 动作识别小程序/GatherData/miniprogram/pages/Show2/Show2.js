// miniprogram/pages/Show/Show.js
Page({
  data: {
    gifUrl: 'cloud://wanghaha2333-2q6xs.7761-wanghaha2333-2q6xs-1301103482/af90824cf4df263c7da930f90d2ac1bc.gif',//线上地址
  },
  //图片加载成功之后执行
  gifImgLoad(e) {
    var gifurl = this.data.gifUrl;
    var nowTime = +new Date();
    setTimeout(() => {
      this.setData({
        gifUrl: gifurl + '?' + nowTime
      })
    }, 10000000)//一秒钟之后消失
  }
})