// pages/details/detail.js
let mark=true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{},
    icon:true,
    col:"",
    click:''
  },
  col1:function(e){
    console.log(e);
    wx.getStorage({
      key: 'collection',
      success: (res)=> {
        if(res.data.length){
          let arr = [];
          let flag=false;
          res.data.forEach(val => {
            if (val.name != e.currentTarget.dataset.name) {
              flag=true;          
            }
          })
          if(flag){
            arr.push({
              name: e.currentTarget.dataset.name,
              mate: e.currentTarget.dataset.mate,
              pic: e.currentTarget.dataset.pic,
              href: e.currentTarget.dataset.href
              })
          }
          wx.setStorage({
            key: 'collection',
            data: arr.concat(res.data),
          })
        }else{
          let arr = [];
          arr.push({
              name: e.currentTarget.dataset.name,
              mate: e.currentTarget.dataset.mate,
              pic: e.currentTarget.dataset.pic,
              href: e.currentTarget.dataset.href              
          })
          wx.setStorage({
            key: 'collection',
            data: arr,
          })
        }
      },
      fail:()=>{
        let arr = [];        
        arr.push({
          name: e.currentTarget.dataset.name,
          mate: e.currentTarget.dataset.mate,
          pic: e.currentTarget.dataset.pic,
          href: e.currentTarget.dataset.href          
        })
        wx.setStorage({
          key: 'collection',
          data: arr,
        })
      },
      complete:()=>{
        this.setData({
          icon: false,
          col: "已收藏",
          click: 'col2'
        })
      }
    })
  },
  col2: function (e) {
    wx.getStorage({
      key: 'collection',
      success: (res) => {
        let arr = [];                
        if(res.data.length){
          arr=res.data.filter(val=>{
            return val.name != e.currentTarget.dataset.name
          })
          wx.setStorage({
            key: 'collection',
            data: arr,
            success: () => {
              this.setData({
                icon: true,
                col: "收藏",
                click: 'col1'
              })
            }
          })
        }
        
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    mark=true;
    wx.showLoading({
      title: '加载中',
    })
    wx.getStorage({
      key: 'collection',
      success: (res) => {
        let flag=false;
        if(res.data.length){
          res.data.forEach(val => {
            if (val.href == options.href) {
              flag=true;
            } 
          })
          if(flag){
            this.setData({
              icon: false,
              col: "已收藏",
              click: 'col2'
            })
          }else{
            this.setData({
              icon: true,
              col: "收藏",
              click: 'col1'
            })
          }
        }else{
          this.setData({
            icon: true,
            col: "收藏",
            click: 'col1'
          })
        }
      },
      fail: () => {
        this.setData({
          icon: true,
          col: "收藏",
          click: 'col1'
        })
      }
    })
    
    wx.request({
      url: "https://hljchat.duapp.com/detail?href="+options.href,
      success:res=>{
        wx.hideLoading();
        this.setData({
          obj:res.data
        })
      },
      fail:()=>{
        wx.hideLoading();
        wx.showToast({
          title: '加载失败',
          icon:"none",
          duration:1000
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
    if(mark){
      mark=false;
      wx.showToast({
        title: '已经到底了',
        icon: "none",
        duration: 1000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})