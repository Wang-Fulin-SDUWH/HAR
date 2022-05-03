# 试验设计与统计基础
A project to recognize different kinds of HIIT activities on Wechat miniprogram

电脑端部署的代码在"Python代码"文件夹下ipynb文件中；小程序端部署的文件是一些js文件。


关于小程序
小程序分为两部分：

在首页点击“下一步”会进入数据收集页面，在首页点击“动作识别”会进入动作识别与实时播报界面。机器学习模型和对实时数据的滤波均在get.js文件中体现。

作业内容
在电脑端、小程序端部署MLP机器学习分类算法，以六轴加速度和对它们进行统计量特征提取的结果对动作进行四分类，准确率达到90%以上。
