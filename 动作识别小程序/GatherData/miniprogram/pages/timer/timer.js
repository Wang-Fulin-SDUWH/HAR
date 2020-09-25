// miniprogram/pages/timer/timer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    heyhey:100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var a = setInterval(function () {
      console.log('开始分类');
      var count = that.data.count + 1;
      console.log('COUNT:', count)
      that.setData({
        count: count,
      })
      if (that.data.count >= 5) {
        clearInterval(a)
        console.log('终止定时器')
      }
    }, 2000);
  },
  
  
})