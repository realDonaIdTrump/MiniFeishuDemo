Page({
  data: {
    requirements: [],
    packageTitle: '',
    vehicleType: '',
  },

  onLoad: function (options) {
    const pkg = JSON.parse(decodeURIComponent(options.package));
    const packageTitle = pkg.requirementPackageName;
    const vehicleType = getApp().globalData.selectedVehicleType; // Assuming vehicleType is stored globally
    this.setData({
      requirements: this.initializePackagesAndRequirements(pkg, 0),
      packageTitle: packageTitle,
      vehicleType: vehicleType
    });
  },

  initializePackagesAndRequirements: function (pkg, level) {
    // Combine requirements and childPackages under the same parent level
    const requirements = pkg.requirementList.map(req => ({
      ...req,
      level: level,
      expanded: false,
      isPackage: false, // Distinguishes requirements from childPackages
    }));

    const childPackages = (pkg.childPackages || []).map(childPkg => ({
      ...childPkg,
      level: level,
      expanded: false,
      isPackage: true, // Marks this as a child package
    }));

    return [...requirements, ...childPackages];
  },

  toggleRequirement: function (e) {
    const index = e.currentTarget.dataset.index;
    let requirements = this.data.requirements;
    let clickedItem = requirements[index];

    if (clickedItem.isPackage) {
      // Handle child packages
      if (!clickedItem.childPackages && !clickedItem.requirementList) return;

      clickedItem.expanded = !clickedItem.expanded;

      if (clickedItem.expanded) {
        const children = this.initializePackagesAndRequirements(clickedItem, clickedItem.level + 1);
        requirements = [
          ...requirements.slice(0, index + 1),
          ...children,
          ...requirements.slice(index + 1)
        ];
      } else {
        const level = clickedItem.level;
        let i = index + 1;
        while (i < requirements.length && requirements[i].level > level) {
          i++;
        }
        requirements = [
          ...requirements.slice(0, index + 1),
          ...requirements.slice(i)
        ];
      }
    } else {
      // Handle requirements
      if (!clickedItem.children || clickedItem.children.length === 0) return;

      clickedItem.expanded = !clickedItem.expanded;

      if (clickedItem.expanded) {
        const children = this.initializePackagesAndRequirements({
          requirementList: clickedItem.children
        }, clickedItem.level + 1);
        requirements = [
          ...requirements.slice(0, index + 1),
          ...children,
          ...requirements.slice(index + 1)
        ];
      } else {
        const level = clickedItem.level;
        let i = index + 1;
        while (i < requirements.length && requirements[i].level > level) {
          i++;
        }
        requirements = [
          ...requirements.slice(0, index + 1),
          ...requirements.slice(i)
        ];
      }
    }

    this.setData({
      requirements: requirements
    });
  },

  goToRequirementContents: function (e) {
    const index = e.currentTarget.dataset.index;
    const req = this.data.requirements[index];
    tt.navigateTo({
      url: '/pages/requirementContents/requirementContents?requirement=' + encodeURIComponent(JSON.stringify(req))
    });
  }
});
