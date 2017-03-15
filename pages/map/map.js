// 引入SDK核心类
// var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
// var qqmapsdk;
// Page({
//   onLoad: function () {
//     // 实例化API核心类
//     qqmapsdk = new QQMapWX({
//       key: 'EA4BZ-22B32-CKYUB-CKCNZ-F4Z3S-FDBCF'
//     });
//   },
//   onShow: function () {
//     // 调用接口
//     qqmapsdk.search({
//       keyword: '酒店',
//       success: function (res) {
//         console.log(res)
//       },
//       fail: function (res) {
//         console.log(res)
//       },
//       complete: function (res) {
//         console.log(res)
//       }
//     })
//   }
// })

// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {}
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
  },
  onLoad: function () {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'DesAE6zrkaq431QNVFyfNr4KfLc8Khdn'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude
      });
    }
    // 发起POI检索请求 
    BMap.search({
      "query": '厕所',
      fail: fail,
      success: success
    });
  },
  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      placeData: {
        title: '名称：' + data[i].title + '\n',
        address: '地址：' + data[i].address
      }
    });
  }
})