// pages/list/list.js
let page=0;
let arr=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    url:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
      wx.request({
        url: "https://hljchat.duapp.com/list?url="+options.url+"&page="+page,
        success:res=>{
          wx.hideLoading();
          arr=res.data;
          console.log(arr);
          this.setData({
              list:arr,
              url:options.url
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    page++;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: "https://hljchat.duapp.com/list?url=" + this.data.url + "&page=" + page,
      success: res => {
        arr = arr.concat(res.data)
        wx.hideLoading();
        if (!res.data.length) {
          wx.showToast({
            title: '没有更多了',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '增加' + res.data.length + "条数据",
            duration: 1000
          })
          this.setData({
            list: arr
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})