/*
 Version: v3.5.0-dev
 The MIT License: Copyright (c) 2010-2017 LiosK.
*/
var UUID;
UUID=function(f){function b(){}b.generate=function(){var a=b._getRandomInt,c=b._hexAligner;return c(a(32),8)+"-"+c(a(16),4)+"-"+c(16384|a(12),4)+"-"+c(32768|a(14),4)+"-"+c(a(48),12)};b._getRandomInt=function(a){return 0>a?NaN:30>=a?0|Math.random()*(1<<a):53>=a?(0|1073741824*Math.random())+1073741824*(0|Math.random()*(1<<a-30)):NaN};"object"===typeof crypto&&"function"===typeof crypto.getRandomValues&&(b._getRandomInt=function(a){if(0>a||53<a)return NaN;var c=crypto.getRandomValues(new Uint32Array(32>=a?
1:2));return 32>=a?c[0]>>>32-a:c[0]+4294967296*(c[1]>>>64-a)});b._hexAligner=function(a,c){for(var b=a.toString(16),d=c-b.length,e="0";0<d;d>>>=1,e+=e)d&1&&(b=e+b);return b};b.overwrittenUUID=f;"undefined"!==typeof module&&module&&module.exports&&(module.exports=b);return b}(UUID);
