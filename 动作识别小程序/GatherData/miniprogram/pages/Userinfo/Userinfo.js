// miniprogram/pages/Userinfo/Userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age: '',
    sex: '',
    height: '',
    weight: ''
  },

  inputAge(event) {
    wx.setStorageSync('age', event.detail.value);
  },
  inputSex(event) {
    wx.setStorageSync('sex', event.detail.value);
  },
  inputH(event) {
    wx.setStorageSync('height', event.detail.value);
  },
  inputW(event) {
    wx.setStorageSync('weight', event.detail.value);
  },
  submit:function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  test: function () {
    wx.navigateTo({
      url: '../test/test',
    })
  },
  second2: function () {
    wx.navigateTo({
      url: '../get/get',
    })
  },

  show: function () {
    wx.navigateTo({
      url: '../SelectShow/SelectShow',
    })
  },

  timer: function () {
    wx.navigateTo({
      url: '../timer/timer',
    })
  },


})