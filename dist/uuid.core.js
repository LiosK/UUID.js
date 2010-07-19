/*
 The MIT License: Copyright (c) 2010 LiosK.
*/
function UUID(){}UUID.generate=function(){var a=UUID._getRandomInt,b=UUID._hexAligner;return b(a(32),8)+"-"+b(a(16),4)+"-"+b(16384|a(12),4)+"-"+b(32768|a(14),4)+"-"+b(a(48),12)};UUID._getRandomInt=function(a){if(a<0)return NaN;if(a<=30)return 0|Math.random()*(1<<a);if(a<=53)return(0|Math.random()*1073741824)+(0|Math.random()*(1<<a-30))*1073741824;return NaN};UUID._getIntAligner=function(a){return function(b,f){for(var c=b.toString(a),d=f-c.length,e="0";d>0;d>>>=1,e+=e)if(d&1)c=e+c;return c}};
UUID._hexAligner=UUID._getIntAligner(16);