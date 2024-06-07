Page({
  data: {
    name: '',
    isHeading: true,
    creationUser: '',
    jwtToken: ''
  },

  onLoad: function () {
    const app = getApp();
    const jwtToken = app.globalData.jwtToken;
    const creationUser = app.globalData.username; // Get the username from global data
    this.setData({
      jwtToken,
      creationUser
    });
    console.log('页面加载完成，JWT:', this.data.jwtToken); // 页面加载调试信息
  },

  bindNameInput: function (e) {
    this.setData({
      name: e.detail.value
    });
    console.log('输入的需求名称:', this.data.name); // 输入调试信息
  },

  bindIsHeadingChange: function (e) {
    this.setData({
      isHeading: e.detail.value
    });
    console.log('是否为标题:', this.data.isHeading); // 输入调试信息
  },

  createRequirement: function () {
    const { name, isHeading, creationUser, jwtToken } = this.data;
    const transactionUrl = 'http://100.64.1.26:8143/vCollabAPI/APIModel/transactions';
    const requirementUrl = 'http://100.64.1.26:8143/vCollabAPI/APIModel/artifacts/1370684/features/requirementChildren';
    const currentTransactionUrl = 'http://100.64.1.26:8143/vCollabAPI/APIModel/transactions/current';

    const requirementData = {
      mofType: "requirementslayer.Requirement",
      name: name,
      isHeading: isHeading,
      creationUser: creationUser
    };

    // 第一步：创建事务
    tt.request({
      url: transactionUrl,
      method: 'POST',
      header: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      },
      success: (res) => {
        console.log('事务创建成功:', res);

        // 第二步：创建需求
        tt.request({
          url: requirementUrl,
          method: 'POST',
          header: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          },
          data: requirementData,
          success: (res) => {
            console.log('需求创建成功:', res);

            // 第三步：提交事务
            tt.request({
              url: currentTransactionUrl,
              method: 'POST',
              header: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
              },
              success: (res) => {
                console.log('事务提交成功:', res);
                tt.showToast({
                  title: '需求创建成功',
                  icon: 'success'
                });
              },
              fail: (err) => {
                console.log('事务提交失败:', err);
                tt.showToast({
                  title: '事务提交失败',
                  icon: 'none'
                });
              }
            });
          },
          fail: (err) => {
            console.log('需求创建失败:', err);
            tt.showToast({
              title: '需求创建失败',
              icon: 'none'
            });
          }
        });
      },
      fail: (err) => {
        console.log('事务创建失败:', err);
        tt.showToast({
          title: '事务创建失败',
          icon: 'none'
        });
      }
    });
  }
});
