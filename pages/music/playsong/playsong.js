// pages/playsong/playsong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songId: '',
    song: null,
    innerAudioContext: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad' + options.songid);
    this.setData({
      songId: options.songid
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.request({
      url: 'http://ting.baidu.com/data/music/links?songIds=' + that.data.songId,
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          song: res.data.data.songList[0]
        });
        // that.playmusic(res.data.data.songList[0].songLink);
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
        console.log("complete")
      }
    })
  },

  playmusic: function (event) {
    var songlink = event.currentTarget.dataset.songlink;
    console.log("playmusic  songlink:" + songlink);
    var innerAudioContext = wx.createInnerAudioContext()
   this.setData({
     audio: innerAudioContext
   })
   innerAudioContext.autoplay = true;
   innerAudioContext.src = songlink;
   innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  stop: function () {
    this.data.audio.stop()
  },
  pause: function () {
    this.data.audio.pause()
  },
  play: function () {
    this.data.audio.play()
  },
  onUnload: function () {
    this.data.audio.destroy()
  }
})