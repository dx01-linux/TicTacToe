(()=>{"use strict";let e=1,t=1,s={x:0,o:0,draw:0},r=()=>pos,o=()=>isOwn,l=()=>owner,n=(e="x||o")=>0==o()&&(((e=!1)=>{isOwn=e})(!0),owner=e,u(),!0),u=()=>{"x"==l()?HtmlElement.innerHTML="<i class = 'fa-solid fa-x'></i>":"o"==l()&&(HtmlElement.innerHTML="fa-regular fa-circle")},b=()=>{isOwn=!1,owner="",HtmlElement.innerText=""};function i(e){document.querySelector(`#${t}`);let t=e;return{getPos:r,getIsOwn:o,getOwner:l,setOwner:n,reset:b}}let c=1==(e=>{let t=(e,t)=>{let s=[],r=0,o=["a","b","c"].map((e=>e+t)),l=0;return Object.keys(e).forEach((r=>{o[l]==e[r][t]?s.push(!0):s.push(!1),l+=1})),s.forEach((e=>{1==e&&(r+=1)})),3==r};return 1==t(e,0)||1==t(e,1)||1==t(e,2)})(E)||1==(e=>{let t=(e,t)=>{let s=[],r=!1,o=[0,1,2].map((e=>t.toLowerCase()+e)),l=0;return o.forEach((r=>{r==e[t][l]?s.push(!0):s.push(!1),l+=1})),s.forEach((e=>{r=0!=e})),r};return 1==t(e,"A")||1==t(e,"B")||1==t(e,"C")})(E)||1==(e=>{let t=(e,t)=>{let s=0;return Object.keys(e).forEach((r=>{e[r].forEach((e=>{e==t[r]&&(s+=1)}))})),3==s};return 1==t(e,{A:"a0",B:"b1",C:"c2"})||1==t(e,{A:"a2",B:"b1",C:"c0"})})(E),a=(e="draw")=>{s[e]+=1},p=()=>{e++},w=()=>{t++,3==t&&(t=1)},h=()=>t,g=()=>(console.log(`Results : Round#${e}`),console.log(`x : ${s.x} , o : ${s.o} , draws : ${s.draw}`),s),f={A:[i("a0"),i("a1"),i("a2")],B:[i("b0"),i("b1"),i("b2")],C:[i("c0"),i("c1"),i("c2")]},d=e=>`request_title_${e}`,O=e=>`request_title_resp_${e}`,T=e=>`submit_titles_owned_${e}`,$=e=>{switch(!0){case 1==h()&&"x"==e.Owner:case 2==h()&&"o"==e.Owner:_(e),w();break;default:console.log("not your turn")}},_=(e={Group:"A",Pos:0,Owner:"x"})=>{let t={};t=f[e.Group];let s=t[e.Pos],r=s.setOwner(e.Owner);0==r?(console.log(`${s.getPos()} is owned by ${s.getOwner()}`),pubSub.publish(O(e.Owner),{resp:!1,pos:s.getPos()})):1==r&&(console.log(`${s.getPos()} was take by ${s.getOwner()}`),pubSub.publish(O(e.Owner),{resp:!0,pos:s.getPos()}))},x=()=>{Object.keys(f).forEach((e=>{f[e].forEach((e=>{e.reset()}))}))},S=e=>{console.log(`${e} won round`),a(e),g(),p(),x(),pubSub.emit("reset")};var E;function m(e,t){let s=e,r=function(){let e={A:[],B:[],C:[]};return{getTitles:()=>e,setTitle:(t="")=>{let s=t.split(""),r=s[0].toUpperCase();e[r].push(s[0]+s[1]),e[r].length>1&&((t="")=>{let s=[];s=e[t];let r="";for(let e=0;e<s.length;e++)for(let t=0;t<s.length;t++){let o=e=>s[e].split("")[1];o(e)<o(t)&&(r=s[t],s[t]=s[e],s[e]=r)}})(r)},reset:()=>{Object.keys(e).forEach((t=>{e[t]=[]}))}}}(),o={requestTitle:`request_title_${s}`,reqTitleResponse:`request_title_resp_${s}`,reqTitlesOwned:`submit_titles_owned_${s}`,reset:"reset"},l=(e={resp:!0,pos:"a0"})=>{let s=e.resp,l=e.pos;1==s&&r.setTitle(l),t.publish(o.reqTitlesOwned,r.getTitles())};return t.subscribe(o.reqTitleResponse,l),t.subscribe(o.reset,r.reset),{setTitel:l,requestTitle:(e="A",r=0)=>{const l={Group:e,Pos:r,Owner:s};t.publish(o.requestTitle,l)},getTitles:r.getTitles,reset:r.reset}}window.pubSub=(()=>{let e={};return{publish:(t,s)=>{switch(e[t]){case null==e[t]:console.log(` PubSub : ${t}  does not exsist`);break;case 0==e[t].lenght:console.log(` PubSub : ${t} does'n have any callback-fn`);break;default:e[t].forEach((e=>{e(s)}))}},subscribe:(t,s)=>{null==e[t]&&(e[t]=[]),e[t].push(s)},emit:t=>{null==e[t]?console.log(`PubSub : ${t} does not exist`):e[t].forEach((e=>{e()}))},events:e}})(),window.board=(pubSub,pubSub.subscribe(d("x"),$),pubSub.subscribe(d("o"),$),pubSub.subscribe(T("x"),(function(e){1==c.check(e)&&S("x")})),pubSub.subscribe(T("o"),(function(e){1==c.check(e)&&S("o")})),{playTurn:$,setTitle:_,resetTitles:x,winner:S}),window.playerOne=m("x",pubSub),window.playerTwo=m("o",pubSub)})();