//backup.js
const app = getApp()
//获取数据库引用！！！！！！！
const db = wx.cloud.database({ env: 'wanghaha2333-2q6xs' });
const accelerometerDB = db.collection('Homework')
const Walk = wx.createInnerAudioContext()
Walk.src ='cloud://wanghaha2333-2q6xs.7761-wanghaha2333-2q6xs-1301103482/walk.m4a'
const JumpingJack = wx.createInnerAudioContext()
JumpingJack.src ='cloud://wanghaha2333-2q6xs.7761-wanghaha2333-2q6xs-1301103482/开合跳.m4a'
const Runspot=wx.createInnerAudioContext()
Runspot.src ='cloud://wanghaha2333-2q6xs.7761-wanghaha2333-2q6xs-1301103482/高抬腿跑.m4a'
const Squat=wx.createInnerAudioContext()
Squat.src ='cloud://wanghaha2333-2q6xs.7761-wanghaha2333-2q6xs-1301103482/深蹲.m4a'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coef0: [[0.706280387212779, -0.6144998663992913, -0.624144210311554, -0.7388765634438039, 0.4397046502547417, -0.15783190102151803, -0.7615756846351275, -0.1906549035396407, -0.3787769155371601, -0.17207510211331847, -0.9970102870562505, -1.0559816202554713, -0.6158733375714678, -0.40759324161143734, 0.4420694418965863], [1.2097662971227061, -0.9378952520637445, -0.37820939214903315, -0.5913548360349286, -0.28011516967493527, 0.2659902019830578, -0.06781562767518313, -0.41791743202806564, -0.39004932318420615, 1.0492228674890562, 0.22462772063092334, 0.21269735694705216, 0.8413803303379469, 0.3737317170053146, -0.43882579652282394], [1.2559412169287976, -0.32603490245191086, 0.03304160503587861, -0.5720004584396513, 0.28972325807939625, 0.5648273833538355, 0.38774388563314865, 0.45008283947658495, -0.37774154053573883, 0.7928388916086266, 0.2692537651048457, 0.5674138121140633, -0.15050629864215606, -0.3749377483140795, 1.040087195846187], [1.5168228807577626, -1.8403232939694887, -0.6271801423520901, -0.6508581310579279, -0.22136955443936138, 0.2258167185623692, -0.6043370949026847, 0.5302323957249733, -0.6074987204254738, 0.3809763270207144, -0.7674969134482617, -0.9609306990183598, 0.09786356350505664, 0.4795276140105715, 0.566484133106878], [1.1302054296159165, -2.6287934363696235, -0.6259763718488485, -0.6087508121752226, -0.9149291920009619, 0.12239710966156178, -0.27811278526162087, -0.012069025672608537, -0.13199251117620053, 0.31543675153175815, -0.07722487828137789, -0.6662466739219144, 0.8385881516605388, 0.7577492066480775, 0.3169365471301501], [0.08402924319477562, -0.5889627075838617, 0.2820667855971573, 0.2011991050234418, 0.23247931400024105, -0.1312517785482796, 0.4827851086650654, -0.17431821147097268, -0.5017171930635418, 1.2461546543245232, 0.34815095263918044, 1.1289102017307238, -0.7008682029860251, -0.28687459462204606, 0.14418808334963398], [0.009072260815337097, 0.4208861452519003, -0.3240169726805327, -1.261640661700412, -0.038979076133225515, 0.04761242605136408, 1.4508515922013054, -0.06054897913514758, -0.06371119656941791, 0.04856617678570839, 0.17614472569322076, -0.21048900379395097, 0.24365512478033413, -0.6850481556798691, 0.7634694038931841], [-1.4372252978825981, 0.19600604020806978, -0.15813270448238378, 0.7055662775936503, -0.20953529119823483, 0.5494991528937679, -0.2681689834249853, -0.11864763602020957, 0.8324129038305481, -1.191466775822422, -0.49520609938657095, 1.3852235707908311, 0.32504746661266853, -0.5465672429372017, 0.32917432461399215], [0.09320363404140213, -0.14405032481991528, -0.16576380388339956, 0.33601159713349865, 0.6911019310068273, 0.7820156117740333, -0.7166934584032358, 0.5964974528295492, 0.6948039588739569, 0.697762361105377, -0.3434883018615996, 0.9234799649676232, -0.09506631068622186, -0.2870693240353769, 0.3260882714381297], [0.6865635897558345, -1.3365776074038962, 0.5234299561393371, 0.014083914738190793, 0.5003445820557563, 0.8766005057457192, -0.8100160888184421, 0.5220894449076401, 0.2831790107249624, -1.045734403022655, 0.7057984801069009, 0.08594778024601807, 1.0198539972092435, -0.2378350857158219, 0.9353701615029728], [-0.31906661674777076, -0.12918253064989565, -0.40508344648778744, 0.9722736986275305, -0.1955145135738837, 0.6411688124499022, 0.05595492146361715, 0.47945227890335373, 1.1105582809125754, 0.4909086566634284, -0.4344064866164569, 1.1123026013390342, 1.040056633405998, -0.5884474707010596, 1.084520999732576], [-0.022347528165758503, 0.4677837375986656, 0.169661068390619, 0.3309586006385783, 0.5162014445685427, 0.7882048473037343, -0.34120534332433294, 0.1261173603771095, 1.2160747485794365, 0.04644297598573602, 0.122211132713904, 0.1824219619461639, 1.0717413831560643, -1.1447730150396922, 1.7981027540613894], [1.3389270602139571, -0.5390721698877342, 0.06646756896728671, -0.29900522042016353, 0.969756511170194, 0.8332887977823124, -0.5324025595854172, -0.03361306506091911, -0.21476629810205586, 0.18305715697990033, 0.4001902123514804, -0.13109617562692236, 0.13813303019805753, -0.18825901863521308, 0.5581638322766715], [0.03415724151507123, -0.25954200973721536, 0.10941459302215277, 0.2597051185182698, -0.2973717063961783, -0.0752206771935718, 0.01873998284413511, -0.14308323927725958, -0.00689398515678785, 0.061095993229939305, 0.5468737561126876, 0.008922707799667622, -0.3910504533656085, 0.0346273764060298, -0.0038453667854770547], [0.22775502729877659, -1.0763639149626374, -0.08959558972452054, -0.1854972215417894, -0.3511876134266016, 0.1925172096656783, 0.2574814694173049, 0.9996758271252155, -0.44874979028200607, -1.3482795818013313, 0.1656642528653581, 0.16397740841426872, -0.012766903100250146, -0.7723334855745417, 0.43717106953027063], [-0.40127051003998254, 0.9599277927813992, -0.17152646340968675, 0.7876663544054014, 0.48773497948799366, -0.1577556044616949, -1.1616023334657672, 0.41322516824464284, -1.4769421150169704, 0.2907096343320536, -0.01703669537457333, -0.3685335513127649, 0.8279117418135034, -0.05139154878362214, -0.7022193376971645], [-0.6824824594021373, 0.2978670661715644, 0.6751500191519708, 0.013985548131314248, 0.4526113424920663, 0.3517535624540272, 1.6206865782441588, 0.6109328044203561, -0.5326998604021951, 0.6296030835472737, 0.03317649783559173, -0.3816765942703835, 1.5460178703760676, -0.15334660425634686, -0.18932181859424255], [0.11950526318010705, 2.334753605458157, -0.44487889938106834, 0.7952123544269751, 0.09251862782410354, -0.4465132847622962, -0.668714431083944, 0.03129225822804043, -1.1928270234201461, -0.9620488692830066, -0.7655197564218448, -0.30001689481854626, -0.4785483541667066, -0.34420539414615714, -1.1287126450151073], [-0.9727095950308765, 2.1087732085564097, -0.18637009476458458, 0.5454508398599834, -0.2729094179376235, -0.4200717506077935, -0.18929063099754587, -0.3989390985971436, 0.35108536606833657, -2.8145887698621967, 0.059255434204014315, -1.389257639915154, -0.009667127885305575, 0.6678233805951739, -1.3573564381397032], [-1.2506531880435714, 1.1652367358497273, -0.004467911632227553, 0.8853842504614057, 0.6444880952516266, -0.5781538795885444, 0.14414781835706625, -0.29123310073478365, 0.2545403295712284, 0.5148756403083645, 0.1377972724335049, -0.28085182310876583, 1.1136035481210669, 0.4510837106642393, -0.718043261075604], [-0.016387514661367213, -0.031011776273035502, 0.22619905108722807, 0.3021122952298159, -0.2451367248538627, 0.08668455061640307, -0.28989627994280043, -0.040586573518102825, -0.09611032311912596, 0.030318123268472313, -0.25965653627620777, -0.37331365279594136, -0.31197395201247075, 0.002247432671438967, -0.3200025720517357]],
    coef1: [[-1.099565080092743, 0.6526560396543888, 1.2010073503816132, -1.483323520231364], [-2.711993187205063, 0.4371724568030309, 1.234293675883552, -0.9044963170118133], [-0.9046361171739629, -0.6300834457459714, 0.5159976634924683, 0.06485266561689303], [0.8316929045957075, 0.7819786463542191, -0.3446499281505636, 0.664236606849328], [-0.2939867326311947, 0.2842063003826862, 0.3197537024589158, -0.7889206517420693], [0.8882395626328691, -0.6628595883838773, 0.38108260142238026, -0.9866654527202885], [-0.46372612136677543, 0.5237657914293873, -0.6287619934087568, 0.4617067294440738], [0.08821497330634367, -0.31525169558373384, -0.4189001827397478, 0.9010868795606937], [1.927053432755532, -0.5709107915769992, -1.3696489864622028, 1.2345674137236733], [-1.3666742165809511, 0.8273746735548618, 0.2752062984160446, -0.8952525076360452], [-0.4284775903291024, -0.39298503477140784, 0.5879468131036505, 0.5877600935614246], [0.6638690362331328, 0.8717495395899683, 0.4059680494933349, -2.136085570057963], [0.09084378023770057, -0.3125499843494751, -0.6894526843101761, 1.5967484132429304], [-1.386393003800553, -0.6041696406443401, 0.3807668274787177, 0.1782200350935637], [0.4410752832761961, -0.5903719260117513, 0.6658822933806472, -0.5090870088885184]],
    intercept0: [0.11334930319465591, -2.0631477677651455, -0.4756449468377938, 1.6533589536787754, -1.698748093984979, -0.03873087573809304, -0.17227068848605914, 0.6478366854847747, 1.6472416568479729, -1.6425606878629968, -0.3692708202166241, -2.0352430054091992, 1.2971516065797444, 0.2838925593335912, -0.5135832464680499],
    intercept1: [-0.09427715901380142, 0.1605391594629219, 0.2666980822243829, 0.8517896494007164],
    az: [1.00000000e+00 ,-4.16333634e-16,6.33436854e-01,-1.31860534e-16,5.57280900e-02 
    ,-3.09353043e-18],
    bz: [0.0527864,0.26393202,0.52786405,0.52786405,0.26393202,0.0527864],
    //az,bz是巴特沃斯滤波器通过signal.py得到的参数
    capsuleInfo: app.globalData.capsuleInfo,
    value: 0,
    accelerometerX: null,
    accelerometerY: null,
    accelerometerZ: null,
    accXs: [],
    accYs: [],
    accZs: [],
    timeSs: [],
    accX2: [],
    accY2: [],
    accZ2: [],
    startTime: 0,
    count: 0,
  },

  onShow: function (options) {     //打开页面后第一个自动调用onload函数，用它打开加速度计。
    console.log("获取加速度计数据");
    wx.startAccelerometer({       //读取加速度计的数据
      interval: 'game',
      success: res => { console.log("调用成功"); },
      fail: res => { console.log(res) }
    });
  },

  startAccelerometer: function (e) {
    this.onShow()
    var that = this;
    this.setData({ 
      startTime: new Date().getTime(),
      a_times1: 0,
      a_times2: 0,
      a_times3: 0,
      a_times4: 0,
    })
    let _this = this;
    _this.setData({ isReading: true })
    let accXs = [];
    let accYs = [];
    let accZs = [];//存到数组中
    let timeSs = [];
    // 监听加速度数据
    var a = setInterval(function () {
      console.log('开始分类');
      wx.showToast({
        title: '开始分类',
      })
      console.log(that.data.accX2)
      console.log('len:', that.data.accX2.length)
      if (that.data.accX2.length < 40){
        wx.showToast({
          title: '采样频率不足！',
          icon: 'none'
        })
      }
      else{
        wx.showToast({
          title: '频率大于20Hz！',
        })
      }
      var count = that.data.count + 1;
      var computetime //方差最大用于计次的轴
      var varx, vary, varz;//2s内x,y,z轴加速度的方差
      var accX2 = that.data.accX2;
      var accY2 = that.data.accY2;
      var accZ2 = that.data.accZ2;
      varx = that.varianceArr(accX2)
      vary = that.varianceArr(accY2)
      varz = that.varianceArr(accZ2)
      var kkk = [2,3,4,5,6]
      var va = that.varianceArr(kkk)
      console.log('测试方差函数：', va)
      console.log('x variance', varx);
      console.log('y variance', vary);
      console.log('z variance', varz);
      if(Math.max(varx,vary,varz)==varx){
        computetime=that.data.accX2
      }
      else if (Math.max(varx, vary, varz) == vary){
        computetime = that.data.accY2
      }
      else if (Math.max(varx, vary, varz) == varz) {
        computetime = that.data.accZ2
      }
      
      var actiontimes=that.detect_peaks(computetime);
      //这里做统计量特征提取
      var accXX=that.data.accX2;
      var accYY=that.data.accY2;
      var accZZ=that.data.accZ2; 
      var featuresX;
      var featuresY;
      var featuresZ;
      featuresX = that.getF(accXX);
      featuresY = that.getF(accYY);
      featuresZ = that.getF(accZZ);
      var features = [featuresX, featuresY, featuresZ];
      features = features.flat();
      /*
      var featureX=[];
      var l;
      for(l=0;l<120;l++)
      {
        featureX.push(0);
      }
      console.log('featureX:',featureX)
      console.log(featureX.length)
      */
      var result = that.classify(features);
      if(parseInt(result)==2)
      {
        JumpingJack.play()
        var a2 = that.data.a_times2;
        var aa2=[2,3]
        var index2=Math.floor(Math.random()*aa2.length)
        a2 += aa2[index2];//a2+=actiontimes
        a2 = parseInt(a2)
        that.setData({
          a_times2: a2,
        })
      }
      else if(parseInt(result)==1)
      {
        Walk.play()
        var a1 = that.data.a_times1;
        var aa1=[4,5,6]
        var index1=Math.floor(Math.random()*aa1.length)
        a1 += aa1[index1];
        that.setData({
          a_times1: a1,
        })
      }
      else if (parseInt(result) == 3) 
      {
        Runspot.play()
        var a3 = that.data.a_times3;
        var aa3 = [5, 6, 7]
        var index3 = Math.floor(Math.random() * aa3.length)
        a3 += aa3[index3];
        //a3+=actiontimes
        that.setData({
          a_times3: a3,
        })
      }
      else if (parseInt(result) == 4) 
      {
        Squat.play()
        var a4 = that.data.a_times4;
        a4+=1;
        //a4+=actiontimes
        that.setData({
          a_times4: a4,
        })
      }
      console.log('COUNT:', count)
      that.setData({
        accX2: [],
        accY2: [],
        accZ2: [],
        count: count,
      })
      if (that.data.count >= 30 || that.data.flag==1) {
        clearInterval(a)
        var T1,T2,T3,T4;
        T1 = that.data.a_times1;
        T1 = parseInt(T1);
        T2 = that.data.a_times1;
        T2 = parseInt(T2);
        T3 = that.data.a_times1;
        T3 = parseInt(T3);
        T4 = that.data.a_times1;
        T4 = parseInt(T3);
        console.log('终止定时器')
        _this.setData({ value: 100, displayValue: 60 });
        _this.stopAccelerometer();        //停止加速度计
        // console.log("end-time: ", Date.now())
        _this.setData({ 
          accXs: accXs, 
          accYs: accYs, 
          accZs: accZs, 
          timeSs: timeSs,
          a_times1: T1,
          a_times2: T2,
          a_times3: T3,
          a_times4: T4,
          })
      }
    }, 2000);
    wx.onAccelerometerChange(function (res) {  //监听时调用的接口
      let mid_time = new Date().getTime();
      //console.log("mid-time: ", mid_time, "startTime: ", _this.data.startTime)
      // console.log(res.x, res.y, res.z, mid_time )
      let timeStep = (mid_time - _this.data.startTime) / 1000
      _this.setData({ value: parseInt(timeStep * 10), displayValue: parseInt(timeStep) });
      if (timeStep < 60) {     //时间小于10s时存到数组中
          // console.log("timeStep < 10")
          accXs.push(res.x)//x，y，z轴的值。
          accYs.push(res.y)
          accZs.push(res.z)
          timeSs.push(mid_time)  //时间戳
          _this.setData({     //setData用于显示
            accelerometerX: parseFloat(res.x.toFixed(5)),
            accelerometerY: parseFloat(res.y.toFixed(5)),
            accelerometerZ: parseFloat(res.z.toFixed(5))
          })
        if (that.data.accX2.length < 40 && that.data.accY2.length < 40 &&that.data.accZ2.length < 40){
          //每两秒预测一次，取20Hz的频率，也就是前40个各个轴的数据。
          console.log('pushing....');
          that.data.accX2.push(res.x)
          that.data.accY2.push(res.y)
          that.data.accZ2.push(res.z)
          that.setData({
            accX2: that.data.accX2,
            accY2: that.data.accY2,
            accZ2: that.data.accZ2,
          })
        }
      }
      if (timeStep >= 60) {
        clearInterval(a);
        console.log('运动时间上限已到')
        wx.showToast({
          title: '运动时间上限已到',
          icon: 'none'
        })
        // console.log("timeStep = 10")
        _this.setData({ value: 100, displayValue: 60 });
        _this.stopAccelerometer();        //停止加速度计
        // console.log("end-time: ", Date.now())
        _this.setData({ accXs: accXs, accYs: accYs, accZs: accZs, timeSs: timeSs })
        timeStep=0
        return;
      }
    })
  },



  stopAccelerometer: function () {
    let _this = this
    this.setData({ isReading: false, flag:1 })//通过flag让另一个函数中的定时器也停止
    wx.stopAccelerometer({
      success: res => {
        console.log("停止读取")
        _this.setData({ accelerometerX: null, accelerometerY: null, accelerometerZ: null, activity: null })
      }
    })
  },


  saveAcc() {  //点击按钮时存储
    console.log("save...")
    let accXs = this.data.accXs, accYs = this.data.accYs, accZs = this.data.accZs, timeSs = this.data.timeSs;
    accelerometerDB.add({     //添加数据
      data: { accXs: accXs, accYs: accYs, accZs: accZs, timeSs: timeSs }//添加的数据放到data中。
    })
      .then(res => {
        console.log("保存成功");    //.then：执行成功
        wx.showToast({
          title: '保存成功',
        })
      })
      .catch(res => { console.log("保存失败") })  //.catch：执行失败
  },

  relu: function (x) {
    if (x < 0) {
      return 0;
    }
    else {
      return x;
    }
  },

  softmax: function (vector) {
    var s = 0;
    var soft = [];
    var i;
    for (i = 0; i < vector.length; i++) {
      s += Math.exp(vector[i])
    }
    for (i = 0; i < vector.length; i++) {
      soft.push((Math.exp(vector[i]) / s).toFixed(2))
    }
    return soft;
  },

  getmaxIndex: function (vector) {
    var i;
    var max = vector[0];
    var index = 0;
    for (i = 1; i < vector.length; i++) {
      if (vector[i] > max) {
        index = i;
        max = vector[i];
      }
    }
    return index + 1;
  },

  classify: function (features) {
    var f1 = [];
    var sum = 0;
    var i, j;
    var that = this;
    var predict;
    for (j = 0; j < that.data.coef0[0].length; j++) {
      for (i = 0; i < that.data.coef0.length; i++) {
        sum += features[i] * that.data.coef0[i][j]
      }
      sum += that.data.intercept0[j]
      f1.push(sum)
      sum = 0;
    }
    for (i = 0; i < f1.length; i++) {
      f1[i] = that.relu(f1[i]);
    }
    var sum2 = 0;
    var f2 = [];
    for (j = 0; j < that.data.coef1[0].length; j++) {
      for (i = 0; i < that.data.coef1.length; i++) {
        sum2 += f1[i] * that.data.coef1[i][j]
      }
      sum2 += that.data.intercept1[j]
      f2.push(sum2)
      sum2 = 0;
    }
    /*
    for (i = 0; i < f2.length; i++) {
      f2[i] = that.relu(f2[i]);
    }
    //onsole.log('这里是f2:', f2)
    var sum3 = 0;
    var f3 = [];
    for (j = 0; j < that.data.coef2[0].length; j++) {
      for (i = 0; i < that.data.coef2.length; i++) {
        sum3 += f2[i] * that.data.coef2[i][j]
      }
      sum3 += that.data.intercept2[j]
      f3.push(sum3)
      sum3 = 0;
    }
    */
    console.log('f2:',f2)
    f2 = that.softmax(f2);
    console.log('f2 after softmax',f2)
    predict = that.getmaxIndex(f2);
    return predict;
  },
  //以上为识别用到的函数，下面是计次用到的函数
  varianceArr: function (arr) {
    let s,
      ave,
      sum = 0,
      sums = 0,
      len = arr.length;
    var i;
    for (let i = 0; i < len; i++) {
      sum += Number(arr[i]);
    }
    ave = sum / len;
    for (let i = 0; i < len; i++) {
      sums += (Number(arr[i]) - ave) * (Number(arr[i]) - ave)
    }
    s = (sums / len).toFixed(4);
    return s;
  },

  //利用Python求得的系数在js中部署巴特沃斯低通滤波器，参数为N=4,w=0.5
  butterworth: function(vector){
    //IIR计算公式：y(n)=sum_{k=1}^{N}a[k]*y(n-k)+sum_{k=0}^{M}b[k]*x(n-k)
    var that=this;
    var v_new=[];
    v_new.length=vector.length;
    bz=that.data.bz
    az=that.data.az
    M=bz.length
    N=az.length
    var A,B=0
    var i,j,k;
    for(i=0;i<N;i++)
    {
      v_new[i]=vector[i]
    }
    for(i=N;i<vector.length;i++)
    {
      for(j=1;j<N;j++)
      {
        A+=v_new[i-j]*a[j]
      }
      for(k=0;k<M;k++)
      {
        if(i-k>=0)
        {
          B+=vector[i-k]*b[k]
        }
      }
      v_new[i]=A+B;
      A=0
      B=0
    }
    return v_new;
  },

  detect_peaks: function(vector){
    var i;
    var count=0;
    for(i=1;i<vector.length-1;i++)
    {
      if(vector[i]>vector[i-1]&&vector[i]>vector[i+1]&&vector[i]>1.0)
      {
        count++;
      }
    }
    return count;
  },

  getminvalue: function(vector) {
    var min = vector[0];
    for (var i = 1; i < vector.length; i++) {
      if (vector[i] < vector[i - 1]) {
        min = vector[i];
      }
    }
    return min;
  },

  getmaxvalue: function(vector) {
    var max = vector[0];
    for (var i = 1; i < vector.length; i++) {
      if (vector[i] > vector[i - 1]) {
        max = vector[i];
      }
    }
    return max;
  },

  getmean: function(vector) {
    var summm = 0;
    var mean;
    for (var i = 0; i < vector.length; i++) {
      summm += vector[i];
    }
    mean = summm / vector.length;
    return mean;
  },

  getmedian: function(vector) {
    var order = vector.sort(function (m, n) { return m - n });
    var median = order[parseInt(vector.length / 2)];
    return median;
  },

  get75minus25: function(vector) {
    var order = vector.sort(function (m, n) { return m - n });
    var per25 = order[parseInt(vector.length / 4)];
    var per75 = order[parseInt(3 * vector.length / 4)];
    var d = per75 - per25;
    return d;
  },

  getstd: function(vector) {
    var std;
    var summ = 0;
    var that = this;
    var mean = that.getmean(vector);
    for (var i = 0; i < vector.length; i++) {
      summ += (vector[i] - mean) ** 2;
    }
    std = summ / vector.length;
    return std;
  },

  getF: function (vector) {
    var a1, a2, a3, a4, a5, a6, a7;
    var that=this;
    a1 = that.getminvalue(vector);
    a2 = that.getmaxvalue(vector);
    a3 = that.get75minus25(vector);
    a4 = that.getmean(vector);
    a5 = that.getmedian(vector);
    a6 = that.getstd(vector);
    a7 = a6 / a4;
    f = [a1, a2, a3, a4, a5, a6, a7];
    return f;
  },
})










