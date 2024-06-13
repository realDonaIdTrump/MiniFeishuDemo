Page({
  data: {
    vehicleTypes: [],
    selectedVehicleType: 'SUV',
    requirementCount: 0,     // 用于显示需求数量
    PLId: null               // 存储选中的PLId
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
      url: app.globalData.apiUrl + '/server/operation?OptType=1', // 使用 localhost 作为 URL
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
    const selectedVehicleType = this.data.vehicleTypes[e.detail.value];
    this.setData({
      selectedVehicleType: selectedVehicleType
    });

    this.updateRequirementCountAndPLId(selectedVehicleType);
  },

  updateRequirementCountAndPLId: function(selectedVehicleType) {
    let that = this;
    const app = getApp();
    const user = app.globalData.user; // 获取全局数据中的用户名

    tt.request({
      url: app.globalData.apiUrl + '/server/operation?OptType=1', // 使用 localhost 作为 URL
      method: 'POST',
      header: {
        'user': user, // 使用登录时获取的用户名
        'Content-Type': 'application/json' // 确保内容类型为 JSON
      },
      success(res) {
        if (res.data.code === '200') {
          const vehicleData = res.data.data.result.find(item => item.name === selectedVehicleType);
          if (vehicleData) {
            const requirementCount = vehicleData.list.reduce((count, pkg) => {
              return count + pkg.requirementList.length;
            }, 0);
            that.setData({
              requirementCount: requirementCount,
              PLId: vehicleData.PLId
            });
          }
        } else {
          console.error('Failed to fetch vehicle data', res);
        }
      },
      fail(err) {
        console.error('Request failed', err);
      }
    });
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
