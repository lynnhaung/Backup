/*
YUI 3.13.0 (build 508226d)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("color-hsl",function(e,t){Color={REGEX_HSL:/hsla?\(([.\d]*), ?([.\d]*)%, ?([.\d]*)%,? ?([.\d]*)?\)/,STR_HSL:"hsl({*}, {*}%, {*}%)",STR_HSLA:"hsla({*}, {*}%, {*}%, {*})",toHSL:function(t){var n=e.Color._convertTo(t,"hsl");return n.toLowerCase()},toHSLA:function(t){var n=e.Color._convertTo(t,"hsla");return n.toLowerCase()},_rgbToHsl:function(t,n){var r,i,s,o=e.Color.REGEX_RGB.exec(t),u=o[1]/255,a=o[2]/255,f=o[3]/255,l=Math.max(u,a,f),c=Math.min(u,a,f),h=!1,p=l-c,d=l+c;return u===a&&a===f&&(h=!0),p===0?r=0:u===l?r=(60*(a-f)/p+360)%360:a===l?r=60*(f-u)/p+120:r=60*(u-a)/p+240,s=d/2,s===0||s===1?i=s:s<=.5?i=p/d:i=p/(2-d),h&&(i=0),r=Math.round(r),i=Math.round(i*100),s=Math.round(s*100),n?[r,i,s]:"hsl("+r+", "+i+"%, "+s+"%)"},_hslToRgb:function(t,n){var r=e.Color.REGEX_HSL.exec(t),i=parseInt(r[1],10)/360,s=parseInt(r[2],10)/100,o=parseInt(r[3],10)/100,u,a,f,l,c;return o<=.5?c=o*(s+1):c=o+s-o*s,l=2*o-c,u=Math.round(Color._hueToRGB(l,c,i+1/3)*255),a=Math.round(Color._hueToRGB(l,c,i)*255),f=Math.round(Color._hueToRGB(l,c,i-1/3)*255),n?[u,a,f]:"rgb("+u+", "+a+", "+f+")"},_hueToRGB:function(e,t,n){return n<0?n+=1:n>1&&(n-=1),n*6<1?e+(t-e)*6*n:n*2<1?t:n*3<2?e+(t-e)*(2/3-n)*6:e}},e.Color=e.mix(Color,e.Color),e.Color.TYPES=e.mix(e.Color.TYPES,{HSL:"hsl",HSLA:"hsla"}),e.Color.CONVERTS=e.mix(e.Color.CONVERTS,{hsl:"toHSL",hsla:"toHSLA"})},"3.13.0",{requires:["color-base"]});
