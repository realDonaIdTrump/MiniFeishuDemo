Page({
  data: {
    vehicleTypes: [],
    selectedVehicleType: 'SUV',
    arrowDirection: 'right',  // 用于控制箭头方向
    isPickerVisible: false  // 控制picker显示状态
  },

  onLoad: function () {
    console.log('首页加载完成'); // 页面加载调试信息
    this.loadVehicleTypes();  // 加载车辆类型
  },

  loadVehicleTypes: function() {
    let that = this;
    const app = getApp();
    const user = app.globalData.user; // 获取全局数据中的用户名

    tt.request({
      url: 'http://10.86.8.19:8085/server/operation?OptType=1', // URL 包含查询参数
      method: 'POST',
      header: {
        'user': user, // 使用登录时获取的用户名
        'Content-Type': 'application/json' // 确保内容类型为 JSON
      },
      success(res) {
        if (res.data.code === '200') {
          const vehicleTypes = res.data.data.result.map(item => item.name);
          that.setData({
            vehicleTypes
          });
        } else {
          console.error('Failed to fetch vehicle types', res);
        }
      },
      fail(err) {
        console.error('Request failed', err);
      }
    });
  },

  bindVehicleTypeChange: function (e) {
    this.setData({
      selectedVehicleType: this.data.vehicleTypes[e.currentTarget.dataset.value],
      arrowDirection: 'right',
      isPickerVisible: false
    });
  },

  toggleArrowDirection: function () {
    const newDirection = this.data.arrowDirection === 'right' ? 'down' : 'right';
    this.setData({
      arrowDirection: newDirection,
      isPickerVisible: !this.data.isPickerVisible
    });
  },

  hidePicker: function (e) {
    if (this.data.isPickerVisible && !e.target.dataset.picker) {
      this.setData({
        arrowDirection: 'right',
        isPickerVisible: false
      });
    }
  },

  goToRequirement: function () {
    tt.navigateTo({
      url: '/pages/requirement/requirement'
    });
  },

  goToTicket: function () {
    tt.navigateTo({
      url: '/pages/ticket/ticket' // 假设有一个票务页面
    });
  }
});
