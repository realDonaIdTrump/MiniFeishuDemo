Page({
  data: {
    url: '',
    apiUrl:'',
    token:''
  },

  onLoad: function (options) {
    const url = decodeURIComponent(options.url);
    const app = getApp();
    this.setData({
      apiUrl: app.globalData.apiUrl,
      token :  app.globalData.token,
      url: url
    });
     // 调用接口
     this.openTransiton();
  },

  openTransiton: function () {
    tt.request({
      url: this.data.apiUrl + '/server/openTransaction',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.data.token
      },
      success: (res) => {
        console.log('openTransiton success:', res.data);
      } ,
      fail: (err) => {
        console.error('API调用失败', err);
      }
    });
  },

  onUnload: function () {
    // 页面卸载时的逻辑
    console.log('Page is being unloaded');
    // 可以在这里执行一些清理操作，例如清除定时器或保存状态
    this.commitTransaction();
  },

  commitTransaction: function () {
    tt.request({
      url: this.data.apiUrl + '/server/commitTransaction',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.data.token
      },
      success: (res) => {
        console.log('commitTransaction success:', res.data);
      } ,
      fail: (err) => {
        console.error('API调用失败', err);
      }
    });
  },

  goToHome: function () {
    tt.navigateTo({
      url: '/pages/home/home'
    });
  }
});
