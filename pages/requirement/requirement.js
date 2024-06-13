Page({
  data: {
    vehicleType: '',
    requirementPackages: []
  },

  onLoad: function (options) {
    const app = getApp();
    this.setData({
      vehicleType: options.vehicleType || ''
    });
    this.loadRequirements(app.globalData.apiUrl, app.globalData.user, options.PLId);
  },

  loadRequirements: function(apiUrl, user, PLId) {
    let that = this;
    tt.request({
      url: apiUrl + '/server/operation?OptType=1',
      method: 'POST',
      header: {
        'user': user,
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.code === '200') {
          const vehicleData = res.data.data.result.find(item => item.PLId === PLId);
          if (vehicleData) {
            const requirementPackages = vehicleData.list.map(pkg => ({
              ...pkg,
              requirementList: pkg.requirementList.map(req => ({
                ...req,
                expanded: false,
                childrenExpanded: false
              }))
            }));
            that.setData({
              requirementPackages: requirementPackages
            });
          }
        } else {
          console.error('Failed to fetch requirements', res);
        }
      },
      fail(err) {
        console.error('Request failed', err);
      }
    });
  },

  toggleRequirement: function(e) {
    const packageIndex = e.currentTarget.dataset.packageIndex;
    const requirementIndex = e.currentTarget.dataset.requirementIndex;
    const updatedPackages = this.data.requirementPackages.map((pkg, i) => {
      if (i === packageIndex) {
        const updatedRequirementList = pkg.requirementList.map((req, j) => ({
          ...req,
          expanded: j === requirementIndex ? !req.expanded : req.expanded
        }));
        return {
          ...pkg,
          requirementList: updatedRequirementList
        };
      }
      return pkg;
    });
    this.setData({
      requirementPackages: updatedPackages
    });
  },

  toggleChildren: function(e) {
    const packageIndex = e.currentTarget.dataset.packageIndex;
    const requirementIndex = e.currentTarget.dataset.requirementIndex;
    const updatedPackages = this.data.requirementPackages.map((pkg, i) => {
      if (i === packageIndex) {
        const updatedRequirementList = pkg.requirementList.map((req, j) => ({
          ...req,
          childrenExpanded: j === requirementIndex ? !req.childrenExpanded : req.childrenExpanded
        }));
        return {
          ...pkg,
          requirementList: updatedRequirementList
        };
      }
      return pkg;
    });
    this.setData({
      requirementPackages: updatedPackages
    });
  },

  goToNewRequirement: function () {
    console.log('Navigating to add new requirement');
  }
});
