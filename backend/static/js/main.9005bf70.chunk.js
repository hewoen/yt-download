(this["webpackJsonpyt-download"]=this["webpackJsonpyt-download"]||[]).push([[0],{67:function(t,e,n){},92:function(t,e,n){},93:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),s=n(49),r=n.n(s),c=(n(67),n(21)),o=n(16),u=n(17),l=n(19),d=n(18),h=n(111),j=n(113),b=n(107),p=n(109),f=n(112),O=n(108),v=n(110),m=n(24),x=n.n(m),g=n(1),w="https://yt-download.woenne.de/api.php";function y(t){var e=new FormData;e.append("mail",t),x.a.post(w+"?action=storeMailAddress",e)}function k(t){var e=new Date(1e3*t);return e.getDate()+"."+(e.getMonth()+1)+"."+e.getFullYear()+" - "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()}var C=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).state={render:!0},a.row=a.props.row,a}return Object(u.a)(n,[{key:"removeChild",value:function(){var t=this;window.confirm("Do you realy want remove this job?")&&function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(t){},n=new FormData;n.append("id",t),x.a.post(w+"?action=removeJob",n).then((function(t){return e(t.data)}))}(this.row.id,(function(){return t.setState({render:!1})}))}},{key:"render",value:function(){var t,e=this;return console.log("Job Row"),this.state.render?Object(g.jsxs)(O.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(g.jsx)(b.a,{children:k(this.row.ts_start)}),Object(g.jsx)(b.a,{children:this.row.type}),Object(g.jsx)(b.a,{children:Object(g.jsx)("a",{href:this.row.url,target:"_blank",children:this.row.title})}),Object(g.jsx)(b.a,{children:(t=this.row.status,{1:Object(g.jsx)("span",{className:"status-in-queue",children:"In queue"}),2:Object(g.jsx)("span",{className:"status-in-progress",children:"In progress"}),3:Object(g.jsx)("span",{className:"status-finished",children:"Finished"})}[t])}),Object(g.jsx)(b.a,{children:3==this.row.status?Object(g.jsx)("a",{href:this.row.download_url,children:"Download here"}):""}),Object(g.jsx)(b.a,{children:Object(g.jsx)("span",{onClick:function(t){return e.removeChild()},className:"btn-remove",children:"x"})})]}):null}}]),n}(i.a.Component),M=C,S=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(g.jsxs)("div",{children:[Object(g.jsx)("h2",{children:"Queue"}),Object(g.jsx)(p.a,{component:v.a,children:Object(g.jsxs)(h.a,{sx:{minWidth:650},"aria-label":"simple table",children:[Object(g.jsx)(f.a,{children:Object(g.jsxs)(O.a,{children:[Object(g.jsx)(b.a,{children:"Start"}),Object(g.jsx)(b.a,{children:"Type"}),Object(g.jsx)(b.a,{children:"Title"}),Object(g.jsx)(b.a,{children:"Current status"}),Object(g.jsx)(b.a,{}),Object(g.jsx)(b.a,{})]})}),Object(g.jsx)(j.a,{children:this.props.rows.map((function(t){return Object(g.jsx)(M,{row:t})}))})]})})]})}}]),n}(i.a.Component),E=S;var T=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).captionDisabled="In Progress...",a.captionEnabled=a.props.captionEnabled,a}return Object(u.a)(n,[{key:"render",value:function(){var t=this;return Object(g.jsx)("button",{class:"btn",disabled:!this.props.enabled,id:"btn_confirm",onClick:function(){return t.props.onClick()},children:this.props.enabled?this.captionEnabled:this.captionDisabled})}}]),n}(i.a.Component),B=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).state={matched:!1,currentValue:a.props.value},a}return Object(u.a)(n,[{key:"valueChanged",value:function(t){this.setState({currentValue:t.target.value}),this.props.pattern.test(t.target.value)&&(this.props.onMatch(t.target.value),this.setState({matched:!0}))}},{key:"render",value:function(){var t=this,e=this.state.matched?"pattern-input-matched":"pattern-input-unmatched";return Object(g.jsx)("input",{value:this.state.currentValue,placeholder:this.props.placeholder,disabled:!this.props.enabled,type:"text",onChange:function(e){return t.valueChanged(e)},className:e})}}]),n}(i.a.Component),D=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).url="",a.type="",a.mail="",a.pattern=/^[a-zA-Z0-9\-_\.]+@[a-zA-Z0-9\-_\.]+\.[a-z]{2,}$/,a.mail=function(t){for(var e=t+"=",n=decodeURIComponent(document.cookie).split(";"),a=0;a<n.length;a++){for(var i=n[a];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(e))return i.substring(e.length,i.length)}return""}("mail"),a.state={rows:[],url:"",type:"",confirmationButtonEnabled:!0,useMailNotification:!1},a}return Object(u.a)(n,[{key:"update",value:function(){var t,e=this;this.unsetTicker(),t=function(t){var n=[];for(var a in t)n.push(t[a]);e.setState({rows:[]}),e.setState({rows:n}),e.setTicker()},x.a.get(w+"?action=getQueue").then((function(e){return t(e.data)}))}},{key:"setTicker",value:function(){var t=this;this.ticker=setInterval((function(){return t.update()}),1e4)}},{key:"unsetTicker",value:function(){clearInterval(this.ticker)}},{key:"componentDidMount",value:function(){this.setTicker(),this.update()}},{key:"componentDidUnmount",value:function(){this.unsetTicker()}},{key:"storeMailAddress",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.useMailNotification;y(t?this.mail:"")}},{key:"mailPatternMatched",value:function(t){this.mail=t,this.storeMailAddress(),function(t,e,n){var a=new Date;a.setTime(a.getTime()+24*n*60*60*1e3);var i="expires="+a.toUTCString();document.cookie=t+"="+e+";"+i+";path=/"}("mail",t,28)}},{key:"addJobButtonClicked",value:function(){var t=this;if(""!==this.type){for(var e in this.state.rows)if(this.state.rows[e].url===this.url)return void alert("This clip is aleady in your queue!");this.unsetTicker(),this.setState({confirmationButtonEnabled:!1}),function(t,e,n){var a=new FormData;a.append("url",t),a.append("type",e),x.a.post(w+"?action=addJob",a).then((function(t){return n(t.data)}))}(this.url,this.type,(function(e){null!=e.title?(t.storeMailAddress(),alert("The download job was added sucessfully to your queue."),t.setState({rows:t.state.rows.concat([e]),confirmationButtonEnabled:!0})):(alert("Invalid URL: "+t.url),t.setState({confirmationButtonEnabled:!0})),t.setTicker()}))}else alert("Please select a format")}},{key:"render",value:function(){var t=this;return Object(g.jsxs)("div",{id:"jobForm",children:[Object(g.jsxs)("fieldset",{children:[Object(g.jsx)("legend",{children:"URL"}),Object(g.jsx)("input",{type:"text",id:"url",onChange:function(e){return t.url=e.target.value}})]}),Object(g.jsxs)("fieldset",{children:[Object(g.jsx)("legend",{children:"Gew\xfcnschtes Format"}),"Audio",Object(g.jsx)("input",{type:"radio",name:"type",value:"audio",onChange:function(e){return t.type=e.target.value}}),"Video",Object(g.jsx)("input",{type:"radio",name:"type",value:"video",onChange:function(e){return t.type=e.target.value}})]}),Object(g.jsx)(T,{captionEnabled:"Add job to queue",enabled:this.state.confirmationButtonEnabled,onClick:this.addJobButtonClicked.bind(this)}),Object(g.jsx)("hr",{}),Object(g.jsx)("p",{children:Object(g.jsxs)("fieldset",{children:[Object(g.jsx)("legend",{children:"E-Mail notification"}),Object(g.jsx)("input",{type:"checkbox",checked:this.state.useMailNotification,onClick:function(){t.setState({useMailNotification:!t.state.useMailNotification}),t.storeMailAddress(!t.state.useMailNotification)}}),Object(g.jsx)(B,{value:this.mail,placeholder:"E-Mail",enabled:this.state.useMailNotification,pattern:this.pattern,onMatch:function(e){return t.mailPatternMatched(e)}})]})}),Object(g.jsx)("div",{children:Object(g.jsx)(E,{rows:this.state.rows})})]})}}]),n}(i.a.Component),F=D,N=n(40),A=n(4),I=(n(92),function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).password="",a.state={confirmationButtonEnabled:!0,remember:!0,success:!1},a}return Object(u.a)(n,[{key:"loginButtonClicked",value:function(){var t=this;this.setState({confirmationButtonEnabled:!1}),function(t,e,n){var a=new FormData;a.append("password",t),a.append("remember",e?"true":"false"),x.a.post(w+"?action=login",a).then((function(t){return n(t.data)}))}(this.password,this.state.remember,(function(e){e.success?t.setState({success:!0}):(alert("Wrong password!"),t.setState({confirmationButtonEnabled:!0}))}))}},{key:"render",value:function(){var t=this;if(!this.state.success)return Object(g.jsx)("div",{id:"loginForm",children:Object(g.jsxs)("fieldset",{children:[Object(g.jsx)("legend",{children:"Password"}),Object(g.jsx)("input",{type:"password",size:"20",onChange:function(e){return t.password=e.target.value}}),Object(g.jsx)("br",{}),"Remember me",Object(g.jsx)("input",{type:"checkbox",checked:this.state.remember,onClick:function(e){return t.setState({remember:!t.state.remember})}}),Object(g.jsx)("br",{}),Object(g.jsx)(T,{captionEnabled:"Login",enabled:this.state.confirmationButtonEnabled,onClick:this.loginButtonClicked.bind(this)})]})});window.location.reload()}}]),n}(i.a.Component));function J(){return Object(g.jsx)("div",{id:"header",children:Object(g.jsx)("h1",{children:"YT-Downloader"})})}function P(){var t=Object(A.h)().uid;console.log(t),function(t,e){x.a.get(w+"?action=createSession&uid="+t).then((function(t){return e(t.data.success)}))}(t,(function(t){t||alert("Session was not found. Maybe it is expired. If you use the remember function a new session with empty queue will started."),window.location.href="/login"}))}var _=function(){var t=Object(a.useState)(null),e=Object(c.a)(t,2),n=e[0],i=e[1];return x.a.defaults.withCredentials=!0,Object(a.useEffect)((function(){var t;t=function(t){i(t.logged_in)},x.a.get(w+"?action=checkLogin").then((function(e){return t(e.data)}))}),[]),Object(g.jsxs)("div",{className:"App",children:[Object(g.jsx)(J,{}),Object(g.jsx)("div",{id:"main",children:Object(g.jsx)(N.a,{children:Object(g.jsxs)(A.d,{children:[Object(g.jsx)(A.b,{path:"/login/:uid/",element:Object(g.jsx)(P,{})}),Object(g.jsx)(A.b,{path:"/login",element:n?Object(g.jsx)(A.a,{push:!0,to:"/"}):Object(g.jsx)(I,{})}),Object(g.jsx)(A.b,{path:"/",element:n?Object(g.jsx)(F,{}):Object(g.jsx)(A.a,{push:!0,to:"/login"})})]})})})]})},q=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,114)).then((function(e){var n=e.getCLS,a=e.getFID,i=e.getFCP,s=e.getLCP,r=e.getTTFB;n(t),a(t),i(t),s(t),r(t)}))};r.a.render(Object(g.jsx)(i.a.StrictMode,{children:Object(g.jsx)(_,{})}),document.getElementById("root")),q()}},[[93,1,2]]]);
//# sourceMappingURL=main.9005bf70.chunk.js.map