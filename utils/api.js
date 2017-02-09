'use strict'
const HOST_URL = 'https://api.piggif.com/v1/'
var TOKEN = 'token?appid={APPID}&secret={SECRET}';
var SEARCH = 'gifs/search?accessToken={TOKEN}&query={QUERY}&pageSize=20&pageNo=1 ';
var TOP = 'gifs/trending?accessToken={TOKEN}&pageSize=10';
var APPID = 'p3s965249';
var SECRET = 'b2c1964272505d0c2f6ed3dac5b39327';


function _getToken(){
  return HOST_URL + TOKEN.replace(/{APPID}/,APPID).replace(/{SECRET}/,SECRET);
}

function _getSearch(Token_key,Query_key,PageSize){
  var reg = 'pageSize='+PageSize;
  return HOST_URL + SEARCH.replace(/{TOKEN}/,Token_key).replace(/{QUERY}/,Query_key).replace(/pageSize=20/,reg);
}

function _getTop(Token_key,PageSize){
  var reg = 'pageSize='+PageSize;
  return HOST_URL+TOP.replace(/{TOKEN}/,Token_key).replace(/pageSize=10/,reg);
}

function _isNone(s){
  return s == '' || s == null || s == undefined;
}


module.exports = {
  getToken:_getToken,
  getSearch: _getSearch,
  getTop:_getTop,
  isNone: _isNone,
};