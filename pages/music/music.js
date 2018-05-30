// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:'data',
    path:'http://tingapi.ting.baidu.com/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.radio.getCategoryList&format=json'
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(){
    var that = this;
    //网络请求json数据
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.radio.getCategoryList&format=json',
      success: function (res) {//请求成功的回调
        console.log(res.data);
        //往data中设置数据，固定刷新页面数据方式:setData({})
        that.setData({
          result: res.data.result[0],
          channellist: res.data.result[0].channellist
        });
      },
      fail: function () {//请求失败
        console.log("fail")
      },
      complete: function () {//请求完成
        console.log("complete")
      }
    })
  },

  /**
   * item点击调用,点击进入歌曲列表
   */
  itemClick:function(event){
    //获取传递过来的参数
    var chname = event.currentTarget.dataset.chname;
    //页面跳转
    wx.navigateTo({
      url: '../music/songlist/songlist?chname=' + chname
    })
  },
})