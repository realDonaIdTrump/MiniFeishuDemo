Page({
  data: {
      placeholder: 'Hello editor!',
      readOnly: false,
      contents: {
          html: `<div id="magicdomid-1_19" class="ace-line align-center heading-h1  locate lineguid-B2nSe8" dir="auto"><span class=" ">飞书</span></div><div id="magicdomid-1_26" class="ace-line blockquote blockquote  locate lineguid-17mqsc" dir="auto"><span class=" ">        飞书是字节跳动旗下办公平台，整合即时沟通、日历、音视频会议、云文档、云盘、工作台等功能于一体，成就组织和个人，更高效、更愉悦。</span></div><div id="magicdomid-1_27" class="ace-line locate lineguid-6UxLlZ" dir="auto"><span class=" ">           2020年2月24日，字节跳动旗下办公套件飞书宣布，向全国所有企业和组织免费开放，不限规模，不限使用时长，所有用户均可使用飞书全部套件功能。2020年11月18日，飞书在北京举办“2020飞书未来无限大会”。会上，飞书推出全新版本“π”，发布独立App“飞书文档”，并在视频会议、即时沟通等功能上宣布了重大更新。</span></div><div id="magicdomid-1_37" class="ace-line locate lineguid-AWIi9E" dir="auto"><span class=" ">          </span><span class=" backgroundcolor " style="background-color: #FFF362; ">公众评价：小米选用了飞书，目前已经有一段时间了，飞书在信息创建、分享，以及协同办公方面，非常简洁、高效，的确越用越顺手。 ​​​（小米公司创始人、董事长兼CEO 评价）</span></div><div id="magicdomid-1_38" class="ace-line" dir="auto"><br></div><div id="magicdomid-1_34" class="ace-line" dir="auto"><br></div><div id="magicdomid-1_35" class="ace-line image-upload single-line" dir="auto"><span><div contenteditable="false" class="image-container single-elem-cls"><span class="image-wrapper"><span class="point tl n-icon-dragable"></span><span class="point tr n-icon-dragable"></span><span class="point br n-icon-dragable"></span><span class="point bl n-icon-dragable"></span><img src="https://sf3-cn.feishucdn.com/obj/open-platform-opendoc/37338d385a39166169f6bfeaaee5b32f_B6WlUG5Z3o.png" data-faketext=" " data-uuid="LxW0dlVX" class="editor_image" style="width: 88px;height: 88px"></span></div></span></div><div id="magicdomid-1_36" class="ace-line" dir="auto"><br></div>`
      },
      plugins: ['attribution', 'mention', 'undo', 'redo','indentRight','indentLeft'],
      placeholderStyle: {
          color: '#FFFD00',
          fontSize:"25px"
      }
  },
  onLoad: function () {

  },
  onShow: function () {

  },
  onHide: function () {
  },

  onEditorReady: function (res) {
      console.log('onEditorReady '  + JSON.stringify(res))
  },
  onEditorInputValueChange: function(res) {
      console.log('onEditorInputValueChange '  + JSON.stringify(res))
  },

  onMentionSelect: function(res) {
      console.log('onMentionSelect ' + JSON.stringify(res))
  },

  onMentionClick: function(res) {
      console.log('onMentionClick ' + JSON.stringify(res))
  },

  onInsertImages: function (res) {
      console.log('onInsertImages '  + JSON.stringify(res));
      const images = res.detail.images.map(item => ({
          ...item,
          src: item.filePath,
      }))
      res.insertImagesCallback({ images });
  }
})
