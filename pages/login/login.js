App({
  globalData: {
    username: '' // 全局保存用户名
  }
});

Page({
  data: {
    username: '',
    password: '',
    role: ''
  },

  bindUsernameInput: function(e) {
    this.setData({
      username: e.detail.value
    });
  },

  bindPasswordInput: function(e) {
    this.setData({
      password: e.detail.value
    });
  },

  bindRoleInput: function(e) {
    this.setData({
      role: e.detail.value
    });
  },

  login: function() {
    const { username, password, role } = this.data;
    tt.request({
      url: 'http://10.86.8.19:8085/server/authenticationUser',
      method: 'POST',
      data: {
        username,
        password,
        role
      },
      success: function(res) {
        if (res.statusCode === 200) {
          const app = getApp();
          app.globalData.username = username; // 将用户名保存到全局数据中
          tt.navigateTo({
            url: '/pages/home/home'
          });
        } else {
          console.error('Login failed', res);
        }
      },
      fail: function(err) {
        console.error('Request failed', err);
      }
    });
  }
});
