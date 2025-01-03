Page({
  data: {
    requirementPackages: [],
    vehicleType: ''
  },

  onLoad: function (options) {
    this.loadRequirements();
  },

  loadRequirements: function () {
    let that = this;
    const app = getApp();
    const apiUrl = app.globalData.apiUrl;
    const PLId = app.globalData.PLId;
  
    tt.request({
      url: apiUrl + '/server/operation/getRequirement',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + app.globalData.token
      },
      success: function (res) {
        if (res.data.code === '200') {
          const vehicleData = res.data.data.result.find(item => item.PLId === PLId);
          if (vehicleData) {
            // Recursive function to count all requirements in a package
            function calculateTotalRequirements(packageItem) {
              let total = packageItem.requirementList ? packageItem.requirementList.length : 0;
              if (packageItem.childPackages) {
                packageItem.childPackages.forEach(child => {
                  total += calculateTotalRequirements(child);
                });
              }
              return total;
            }
  
            const requirementPackages = vehicleData.list.map(pkg => {
              const totalRequirements = calculateTotalRequirements(pkg); // Calculate total recursively
              return {
                ...pkg,
                vehicleType: vehicleData.name,
                totalRequirements, // Add total requirement count
                requirementList: pkg.requirementList.map(req => ({
                  ...req,
                  expanded: false
                }))
              };
            });
  
            that.setData({
              requirementPackages: requirementPackages,
              vehicleType: vehicleData.name
            });
  
            app.globalData.selectedVehicleType = vehicleData.name; // Set the selected vehicle type in global data
          }
        } else {
          console.error('Failed to fetch requirements', res);
        }
      },
      fail: function (err) {
        console.error('Request failed', err);
      }
    });
  },
  

  goToRequirementChild: function (e) {
    const index = e.currentTarget.dataset.index;
    const pkg = this.data.requirementPackages[index];
    const app = getApp();
    app.globalData.selectedVehicleType = this.data.vehicleType; // Ensure the selected vehicle type is available globally
    tt.navigateTo({
      url: '/pages/requirementChild/requirementChild?package=' + encodeURIComponent(JSON.stringify(pkg))
    });
  }
});
