// miniprogram/pages/Show/Show.js
Page({
  data: {
    gifUrl: 'cloud://wanghaha2333-2q6xs.7761-wanghaha2333-2q6xs-1301103482/4286339af46b5beb304826bade1170a6.gif',//线上地址
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