webpackJsonp([1],{"0o5P":function(t,a){},"2rQH":function(t,a){},NHnr:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("7+uW"),n=e("mvHQ"),r=e.n(n);function s(){return Math.random().toString(36).substring(2)}var c={name:"ConsoleSDK",appUid:"",makeId:s,init:function(){window.addEventListener("message",this.processMessage.bind(this),!1)},subscribe:function(t){this.sendEvent("Onion.CDK.Subscribe",{topic:t})},publish:function(t,a){},service:function(t,a,e){this.sendEvent("Onion.CDK.Service",{service:t,command:a})},sendEvent:function(t,a){var e=s();return window.parent.postMessage({event:t,instance:this.appUid,eventId:e,content:a},"*"),e},sendCmd:function(t,a){this.sendEvent("Onion.CDK.Command",{cmd:t,params:a})},sendToast:function(t){this.sendEvent("Onion.CDK.Toast",{message:t})},processMessage:function(t){if("Onion.CDK.Init"===t.data.event){var a=t.data.appUid;this.appUid=a,this.onInit()}else"Onion.CDK.Service"===t.data.event?this.onService(t.data.content.name,t.data.content.command,t.data.content.result):"Onion.CDK.Message"===t.data.event?this.onMessage(t.data.content.topic,t.data.content.content):"Onion.CDK.Command"===t.data.event&&this.onCmd(t.data.content.cmd,t.data.content.resp)},onInit:function(){},onService:function(t,a,e){},onMessage:function(){},onCmd:function(){}},o=e("ikxi"),h=e.n(o),l={name:"LineChart",components:{},data:function(){return{batteryChart:null,switcher:"0x48",chartSize:10,chartData:{ch0:[],ch1:[],ch2:[],ch3:[],timer:[]}}},methods:{getData:function(){c.sendCmd("adc-exp",["-j","-s",this.switcher,"all"])},updateData:function(t,a,e,i){var n,s,c,o=function(t,a){return t.length>29&&t.shift(),t.push(a),t},h=function(t,a){return t.slice(-a)};n=this.chartData.timer,s=new Date,c=(s.getHours()<=9?"0"+s.getHours():s.getHours())+":"+(s.getMinutes()<=9?"0"+s.getMinutes():s.getMinutes())+":"+(s.getSeconds()<=9?"0"+s.getSeconds():s.getSeconds()),n.length>29&&n.shift(),n.push(c),o(this.chartData.ch0,t),o(this.chartData.ch1,a),o(this.chartData.ch2,e),o(this.chartData.ch3,i),this.batteryChart.data.labels=h(this.chartData.timer,this.chartSize),this.batteryChart.data.datasets[0].data=h(this.chartData.ch0,this.chartSize),this.batteryChart.data.datasets[1].data=h(this.chartData.ch1,this.chartSize),this.batteryChart.data.datasets[2].data=h(this.chartData.ch2,this.chartSize),this.batteryChart.data.datasets[3].data=h(this.chartData.ch3,this.chartSize),localStorage.setItem("chartData",r()(this.chartData)),this.batteryChart.update(0)},switcherAction:function(){var t=this;setTimeout(function(){localStorage.setItem("switcher",r()(t.switcher))},10)},clearStorage:function(){localStorage.clear(),this.clearChart()},filterSize:function(){localStorage.setItem("filter",r()(this.chartSize))},getRandom:function(t){return(Math.random()*t).toFixed(2)},initChart:function(){this.batteryChart=new h.a(document.getElementById("line-chart"),{type:"line",data:{labels:this.chartData.timer,datasets:[{backgroundColor:"rgba(0,0,0,0)",borderColor:"#2ecc71",data:this.chartData.ch0,label:"A0"},{backgroundColor:"rgba(0,0,0,0)",borderColor:"#1298C4",data:this.chartData.ch1,label:"A1"},{backgroundColor:"rgba(0,0,0,0)",borderColor:"#C41232",data:this.chartData.ch2,label:"A2"},{backgroundColor:"rgba(0,0,0,0)",borderColor:"#DFE629",data:this.chartData.ch3,label:"A3"}]},options:{legend:{display:!0},animation:{easing:"linear"},scales:{xAxes:[{gridLines:{display:!1},scaleLabel:{display:!0,labelString:"Time"}}],yAxes:[{gridLines:{display:!1},scaleLabel:{display:!0,labelString:"Voltage"},ticks:{beginAtZero:!0,suggestedMin:0,suggestedMax:5}}]}}})},clearChart:function(){this.batteryChart.destroy(),this.chartData={ch0:[],ch1:[],ch2:[],ch3:[],timer:[]},this.initChart()}},mounted:function(){var t=this;localStorage.getItem("chartData")&&(t.chartData=JSON.parse(localStorage.getItem("chartData"))),localStorage.getItem("switcher")&&(t.switcher=JSON.parse(localStorage.getItem("switcher"))),localStorage.getItem("filter")&&(t.chartSize=JSON.parse(localStorage.getItem("filter"))),t.initChart(),c.onInit=function(){console.log("OnionCDK Initialzied"),setInterval(function(){t.getData()},1e3)},c.init(),c.onCmd=function(a,e){if("adc-exp"===a){var i=JSON.parse(e);t.updateData(i.A0,i.A1,i.A2,i.A3)}}.bind(t)}},d={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"line-chart__container"},[e("div",{staticClass:"container"},[e("div",{staticClass:"columns"},[e("div",{staticClass:"col-3 col-mr-auto  size__container"},[e("p",{staticClass:"size__text"},[t._v("Select range\n      "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.chartSize,expression:"chartSize"}],staticClass:"form-select",attrs:{name:"size",id:"chartSize"},on:{change:[function(a){var e=Array.prototype.filter.call(a.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.chartSize=a.target.multiple?e:e[0]},t.filterSize]}},[e("option",{attrs:{value:"10"}},[t._v("10")]),t._v(" "),e("option",{attrs:{value:"20"}},[t._v("20")]),t._v(" "),e("option",{attrs:{value:"30"}},[t._v("30")])])])]),t._v(" "),e("div",{staticClass:"col-4 col-ml-auto switch__container"},[e("div",{staticClass:"switcher__text"},[t._v(t._s(t.switcher)+"\n      "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.switcher,expression:"switcher"}],staticClass:"switcher__checkbox",attrs:{type:"checkbox",id:"switcher","true-value":"0x49","false-value":"0x48"},domProps:{checked:Array.isArray(t.switcher)?t._i(t.switcher,null)>-1:t._q(t.switcher,"0x49")},on:{change:function(a){var e=t.switcher,i=a.target,n=i.checked?"0x49":"0x48";if(Array.isArray(e)){var r=t._i(e,null);i.checked?r<0&&(t.switcher=e.concat([null])):r>-1&&(t.switcher=e.slice(0,r).concat(e.slice(r+1)))}else t.switcher=n}}}),t._v(" "),e("label",{staticClass:"switcher__label",attrs:{for:"switcher"},on:{click:t.switcherAction}},[e("div",{staticClass:"switcher__label--round"})])])])])]),t._v(" "),e("canvas",{attrs:{id:"line-chart"}}),t._v(" "),e("button",{staticClass:"clear",on:{click:t.clearStorage}},[t._v("Clear Cache")]),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",[this._v("Connect the "),a("a",{attrs:{href:"https://onion.io/store/adc-expansion/"}},[this._v("ADC Expansion")]),this._v(" to your Omega and capture samples from all four channels in real time!")])}]};var u={name:"App",components:{LineChart:e("VU/8")(l,d,!1,function(t){e("0o5P")},"data-v-1d91bbb2",null).exports}},v={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"data-chart"},[a("LineChart")],1)])},staticRenderFns:[]};var m=e("VU/8")(u,v,!1,function(t){e("2rQH")},null,null).exports;e("i8c9");i.a.config.productionTip=!1,new i.a({el:"#app",components:{App:m},template:"<App/>"})},i8c9:function(t,a){}},["NHnr"]);