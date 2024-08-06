Page({
  data: {
    webviewUrl: ''
  },
  onLoad: function (options) {
    const htmlString = decodeURIComponent(options.html);
    this.setData({
      webviewUrl: 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlString)
    });
  }
});
