Page({
  data: {
    url: ''
  },

  onLoad: function (options) {
    const url = decodeURIComponent(options.url);
    this.setData({
      url: url
    });
  }
});
