Page({
  data: {
    htmlUrl: ''
  },
  onLoad: function (options) {
    const app = getApp();
    this.setData({
      htmlUrl: app.globalData.apiUrl + "/server/testHtml"
    });
  }
});
