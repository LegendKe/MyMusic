// pages/songlist/songlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chname: 'chname',
    result: [],
    path: 'http://tingapi.ting.baidu.com/v1/restserver/ting?from=qianqian&version=2.1.0&method=baidu.ting.radio.getChannelSong&format=json&pn=0&rn=10&channelname='
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      chname: options.chname
    });
  },
  onReady: function () {
    var that = this;
    //请求歌曲列表数据
    wx.request({
      url: that.data.path + that.data.chname,
      success: function (res) {
        console.log(res.data);
        console.log(res.data.result);
        that.setData({
          result: res.data.result
        });
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
        console.log("complete")
      }
    })
  },

/**
 * item点击调用,点击进入歌曲详情，进行播放
 */
  itemClick: function (event) {
    console.log("itemClick  event.type:" + event.type);
    var songid = event.currentTarget.dataset.songid;
    console.log("itemClick  songid:" + songid);
    wx.navigateTo({
      url: '../music/playsong/playsong?songid=' + songid
    })
  }

})