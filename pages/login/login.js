App({
  globalData: {
    user: '' ,// 全局保存用户名
    token: '' // 全局保存token
  }
});


Page({
  data: {
    user: 'bruce',
    password: 'bruce',
    role: 'API Admin Role'
  },

  bindUsernameInput: function(e) {
    this.setData({
      user: e.detail.value
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
    const { user, password, role } = this.data;
    var app = getApp();
    console.log('Logging in with:', { user, password, role }); // Debug 信息
    tt.request({
      url: app.globalData.apiUrl + '/server/authenticationUser',
      method: 'POST',
      data: {
        user, // 确保我们发送了 `user` 字段
        password,
        role
      },
      success: function(res) {
        if (res.statusCode === 200) {
          const app = getApp();
          app.globalData.user = user; // 将用户名保存到全局数据中
          app.globalData.token = res.data.data;
          console.log(app.globalData.token);
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
