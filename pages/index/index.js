//index.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');

var app = getApp()
Page({
  data: {
    DevInfo:{},
    // Dev_Height:'1170rpx' ,
    Dev_Height:'1055rpx' ,
    gifs:{},
    id:0,
    PageSize:21,
    Init_PageSize:18,
    Query_key:'',
    TOKEN:'',
    Hidden_detail: true,
    SendMode:false,
    gif_url:'',
    APPID:'p3s965249',
    SECRET:'b2c1964272505d0c2f6ed3dac5b39327'

  },
  
  getSysInfo: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
      console.log(res),
      that.setData({
        DevInfo : res,
      })}
      })
    that.data.Dev_Height=that.data.DevInfo.windowWidth-100+'px',
    console.log('屏幕高度是',that.data.Dev_Height)
  },

  onLoad: function () {
    console.log('onLoad');
    var that = this;
    that.getSysInfo();
    //require TOKEN
    wx.request({
      url: Api.getToken(),
      success: function(res) {
        that.setData({TOKEN : res.data.token
        })
      }    
    });   
  },

  onReady: function() {
    //require top GIF
    var that= this;
    console.log("request TOKEN is",that.data.TOKEN)
    console.log("request top  GIF",Api.getTop(that.data.TOKEN,that.data.PageSize))
    wx.request({
      url:Api.getTop(that.data.TOKEN,that.data.Init_PageSize),
      success:function(res){
      console.log('request top_gif',res.data)
      that.setData({gifs:res.data})
     } 
    })
  },

  SearchInputEvent: function(event){
    var that  = this;
    console.log("(searching )request TOKEN is",that.data.TOKEN)
    that.setData({
      Query_key:event.detail.value,
    });
    console.log("Query_key is :",that.data.Query_key)
  },

  Search_Gif : function(event){
    var that = this;

    if(that.data.Query_key!=''){
      wx.request({
        url: Api.getSearch(that.data.TOKEN,that.data.Query_key,that.data.PageSize),
        success: function(res){
        console.log('searching gif...',res.data)
        that.setData({gifs:res.data.data})
        }
      })
    } 
    
    console.log("Search_GIF...ing")
    //look gif detail
    
  },

  LoadMore : function(e) {
      //load more gifs
      var that = this;
      var New_PageSize = that.data.gifs.list.length;
      if(that.data.Query_key==''){
            wx.request({
            url:Api.getTop(that.data.TOKEN,New_PageSize+6),
            success:function(res){
            // console.log('request top_gif',res.data)
            that.setData({gifs:res.data})
            }
            });
      }else {
            console.log('there is query key',that.data.Query_key)
            // console.log('pagesize is',New_PageSize)
            wx.request({
            url:Api.getSearch(that.data.TOKEN,that.data.Query_key,New_PageSize+6),
            success:function(res){
            that.setData({gifs:res.data.data})
            } 
            })
      } 
  },
      
  Refresh_GIF : function(){
    //refresh gifs list
    var that =this;
    that.onLoad();
  }, 

  Look_GIF : function(event){
    var that = this;
    console.log(event.target.dataset.src) 
    that.setData({
      gif_url:event.target.dataset.src,
      Hidden_detail:false
    })

    // wx.previewImage({
    //    urls: gif_url, // 需要预览的图片http链接列表
    //    success:function(){
    //      console.log('image_url',urls)
    //    }
    // })
  },
  Send_GIF: function(){
    var that = this;
    wx.previewImage({
      urls: [that.data.gif_url] // 需要预览的图片http链接列表
    })
  },
  Cancel_detail: function(){
      var that = this;
      that.setData({
        Hidden_detail:true
      })
    }

  })

