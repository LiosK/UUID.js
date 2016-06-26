/*
 Version: v3.3.1
 The MIT License: Copyright (c) 2010-2016 LiosK.
*/
var UUID;
UUID=function(f){function c(){}function d(b,d){for(var a=b.toString(16),c=d-a.length,e="0";0<c;c>>>=1,e+=e)c&1&&(a=e+a);return a}c.generate=function(){return d(a(32),8)+"-"+d(a(16),4)+"-"+d(16384|a(12),4)+"-"+d(32768|a(14),4)+"-"+d(a(48),12)};var a=function(){return"object"===typeof crypto&&"function"===typeof crypto.getRandomValues?function(b){if(0>b||53<b)return NaN;var a=crypto.getRandomValues(new Uint32Array(32>=b?1:2));return 32>=b?a[0]>>>32-b:a[0]+4294967296*(a[1]>>>64-b)}:function(a){return 0>a?
NaN:30>=a?0|Math.random()*(1<<a):53>=a?(0|1073741824*Math.random())+1073741824*(0|Math.random()*(1<<a-30)):NaN}}();c.overwrittenUUID=f;return c}(UUID);
