const app = getApp()
//获取数据库引用！！！！！！！
const db = wx.cloud.database({ env: 'wanghaha2333-2q6xs' });
const accelerometerDB = db.collection('JumpingJack')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    capsuleInfo: app.globalData.capsuleInfo,
    value: 0,
    accelerometerX: null,
    accelerometerY: null,
    accelerometerZ: null,
    gyroscopeX: null,
    gyroscopeY: null,
    gyroscopeZ: null,
    accXs: [],
    accYs: [],
    accZs: [],
    gyroXs: [],
    gyroYs: [],
    gyroZs: [],
    timeSs: [],
    startTime: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {     //打开页面后第一个自动调用onload函数，用它打开加速度计。
    wx.stopPullDownRefresh();
    console.log("获取加速度计数据");
  },

  startAG: function (e) {
    wx.startAccelerometer({       //读取加速度计的数据
      interval: 'game',
      success: res => { console.log("加速度计调用成功"); },
      fail: res => {
        wx.showToast({
          title: '加速度计崩溃了！',
        })
        console.log(res)
      }
    });
    wx.startGyroscope({       //读取陀螺仪计的数据
      interval: 'game',
      success: res => { console.log("陀螺仪调用成功"); },
      fail: res => {
        wx.showToast({
          icon: 'none',
          title: '您的设备没有陀螺仪计！',
        })
        console.log(res)
      }
    });
    this.setData({ startTime: new Date().getTime() })
    let _this = this;
    _this.setData({ isReading: true })
    let accXs = [];
    let accYs = [];
    let accZs = [];//存到数组中
    let gyroXs = [];
    let gyroYs = [];
    let gyroZs = [];
    let timeSs = [];
    // 监听加速度数据
    wx.onAccelerometerChange(function (res) {  //监听时调用的接口
      let mid_time = new Date().getTime();
      console.log("mid-time: ", mid_time, "startTime: ", _this.data.startTime)
      // console.log(res.x, res.y, res.z, mid_time )
      let timeStep = (mid_time - _this.data.startTime) / 1000
      _this.setData({ value: parseInt(timeStep * 2.857), displayValue: parseInt(timeStep) });
      if (timeStep < 35) {     //时间小于35s时存到数组中
        // console.log("timeStep < 10")
        console.log('x轴加速度计：', res.x)
        console.log('y轴加速度计：', res.y)
        console.log('z轴加速度计：', res.z)
        accXs.push(res.x)//x，y，z轴的值。
        accYs.push(res.y)
        accZs.push(res.z)
        timeSs.push(mid_time)  //时间戳
        _this.setData({     //setData用于显示
          accelerometerX: parseFloat(res.x.toFixed(5)),
          accelerometerY: parseFloat(res.y.toFixed(5)),
          accelerometerZ: parseFloat(res.z.toFixed(5))
        })
      }
      if (timeStep >= 35) {
        // console.log("timeStep = 10")
        _this.setData({ value: 350, displayValue: 35 });
        _this.stopAccelerometer();        //停止加速度计
        // console.log("end-time: ", Date.now())
        _this.setData({ accXs: accXs, accYs: accYs, accZs: accZs, timeSs: timeSs })
        return;
      }
    })

    wx.onGyroscopeChange(function (res) {  //监听时调用的接口
      let mid_time = new Date().getTime();
      console.log("mid-time: ", mid_time, "startTime: ", _this.data.startTime)
      // console.log(res.x, res.y, res.z, mid_time )
      let timeStep = (mid_time - _this.data.startTime) / 1000
      _this.setData({ value: parseInt(timeStep * 2.857), displayValue: parseInt(timeStep) });
      if (timeStep < 35) {     //时间小于10s时存到数组中
        // console.log("timeStep < 10")
        console.log('x轴陀螺仪计：', res.x)
        console.log('y轴陀螺仪计：', res.y)
        console.log('z轴陀螺仪计：', res.z)
        gyroXs.push(res.x)//x，y，z轴的值。
        gyroYs.push(res.y)
        gyroZs.push(res.z)
        //timeSs.push(mid_time)  //时间戳
        _this.setData({     //setData用于显示
          gyroscopeX: parseFloat(res.x.toFixed(5)),
          gyroscopeY: parseFloat(res.y.toFixed(5)),
          gyroscopeZ: parseFloat(res.z.toFixed(5))
        })
      }
      if (timeStep >= 35) {
        // console.log("timeStep = 10")
        _this.setData({ value: 350, displayValue: 35 });
        _this.stopGyroscope();        //停止加速度计
        // console.log("end-time: ", Date.now())
        _this.setData({ gyroXs: gyroXs, gyroYs: gyroYs, gyroZs: gyroZs, timeSs: timeSs })
        return;
      }
    })
  },

  stopAccelerometer: function () {
    let _this = this
    this.setData({ isReading: false })
    wx.stopAccelerometer({
      success: res => {
        console.log("停止读取")
        _this.setData({ accelerometerX: null, accelerometerY: null, accelerometerZ: null, activity: null })
      }
    })
  },

  stopGyroscope: function () {
    let _this = this
    this.setData({ isReading: false })
    wx.stopGyroscope({
      success: res => {
        console.log("停止读取")
        _this.setData({ gyroscopeX: null, gyroscopeY: null, gyroscopeZ: null, activity: null })
      }
    })
  },

  saveAcc() {  //点击按钮时存储
    console.log("save...")
    let accXs = this.data.accXs, accYs = this.data.accYs, accZs = this.data.accZs, gyroXs = this.data.gyroXs, gyroYs = this.data.gyroYs, gyroZs = this.data.gyroZs, timeSs = this.data.timeSs;
    var age = wx.getStorageSync('age');
    var sex = wx.getStorageSync('sex');
    var height = wx.getStorageSync('height');
    var weight = wx.getStorageSync('weight');
    console.log('age', age);
    console.log('sex', sex);
    console.log('height', height);
    console.log('weight', weight);
    accelerometerDB.add({     //添加数据
      data: { accXs: accXs, accYs: accYs, accZs: accZs, gyroXs: gyroXs, gyroYs: gyroYs, gyroZs: gyroZs, timeSs: timeSs, age: age, sex: sex, height: height, weight: weight }//添加的数据放到data中。
    })
      .then(res => {
        console.log("保存成功");    //.then：执行成功
        wx.showToast({
          title: '保存成功',
        })
        wx.offAccelerometerChange();
        wx.offGyroscopeChange();
      })
      .catch(res => { console.log("保存失败") })  //.catch：执行失败
  },

  onPullDownRefresh: function () {
    var that = this;
    that.onLoad();
  },

  stopAG: function () {
    let _this = this
    this.setData({ isReading: false })
    wx.stopAccelerometer({
      success: res => {
        console.log("停止读取")
        _this.setData({ accelerometerX: null, accelerometerY: null, accelerometerZ: null, activity: null })
      }
    })
    wx.stopGyroscope({
      success: res => {
        console.log("停止读取")
        _this.setData({ gyroscopeX: null, gyroscopeY: null, gyroscopeZ: null, activity: null })
      }
    })
  },
})