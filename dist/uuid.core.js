/*
 Version: v3.5.0-dev
 The MIT License: Copyright (c) 2010-2017 LiosK.
*/
var UUID;UUID=function(f){function b(){}function c(d){return 0>d?NaN:30>=d?0|Math.random()*(1<<d):53>=d?(0|1073741824*Math.random())+1073741824*(0|Math.random()*(1<<d-30)):NaN}function a(d,c){for(var a=d.toString(16),b=c-a.length,e="0";0<b;b>>>=1,e+=e)b&1&&(a=e+a);return a}b.generate=function(){return a(c(32),8)+"-"+a(c(16),4)+"-"+a(16384|c(12),4)+"-"+a(32768|c(14),4)+"-"+a(c(48),12)};b.overwrittenUUID=f;"undefined"!==typeof module&&module&&module.exports&&(module.exports=b);return b}(UUID);
