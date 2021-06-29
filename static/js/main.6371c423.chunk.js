(this["webpackJsonpvisual-analytics-firebase-react"]=this["webpackJsonpvisual-analytics-firebase-react"]||[]).push([[0],{216:function(e,t,a){},217:function(e,t,a){},339:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(24),c=a.n(i),o=(a(216),a(203)),l=a(111),s=(a(217),a(384)),d=a(402),u=a(393),h=a(389),j=a(394),b=a(397),f=a(401),p=a(398),g=a(406),x=a(407),y=a(396),O=a(14),v=function(e){var t=e.rawData,a=e.ageGroups,n=["red","blue","green","cool","grayscale","red","blue","green","cool","grayscale"],r=Object(j.a)("zoom","voronoi");return Object(O.jsx)("div",{style:{paddingLeft:"10px"},children:Object(O.jsxs)(b.a,{padding:{top:100,left:100,bottom:50,right:30},domainPadding:60,width:1e3,height:550,scale:{x:"time"},horizontal:!1,containerComponent:Object(O.jsx)(r,{labels:function(e){var t=e.datum;return t.ethnicity+" Population of \n"+a[t._stack-1]+" olds in "+t.year.getFullYear()+": \n"+t.value}}),children:[Object(O.jsx)(f.a,{text:"Visual Analysis: Singapore Population Breakdown",x:500,y:30,textAnchor:"middle",style:{fontSize:20,fontWeight:"bold"}}),Object(O.jsx)(f.a,{text:"Year",x:500,y:530,textAnchor:"middle",style:{fontSize:16,fontWeight:"bold"}}),Object(O.jsx)(f.a,{text:"Population Size",x:10,y:225,textAnchor:"middle",style:{fontSize:16,fontWeight:"bold"},angle:270}),Object(O.jsx)(p.a,{x:175,y:55,orientation:"horizontal",gutter:20,style:{border:{stroke:"black"}},colorScale:["red","blue","green","turquoise","grey","red","blue","green","turquoise","grey"],data:function(){var e=[];return t.forEach((function(t){return t.show?e.push({name:t.ethnicity}):null})),e}()}),Object(O.jsx)(g.a,{offset:15,style:{data:{width:12}},children:t.map((function(e,t){return e.show?Object(O.jsx)(x.a,{colorScale:n[t],children:e.data.map((function(e,t){return Object(O.jsx)(y.a,{data:e,x:"year",y:"value"},t)}))},t):null}))})]})})},m=a(399),w=a(387),S=a(388),C=a(403),k=a(395),D=a(340),N=Object(s.a)((function(e){return Object(d.a)({root:{display:"flex",justifyContent:"center"},filter:{display:"flex",justifyContent:"flex-start",padding:20}})})),z=function(e){var t=e.rawData,a=e.handleChange,n=N(),r=t.filter((function(e){return e.show})).length>=5;return Object(O.jsx)("div",{className:n.root,children:Object(O.jsxs)(m.a,{required:!0,component:"fieldset",children:[Object(O.jsx)(D.a,{variant:"h6",noWrap:!0,children:"Filters"}),Object(O.jsx)(w.a,{children:t.map((function(e,t){return Object(O.jsx)(S.a,{control:Object(O.jsx)(k.a,{checked:e.show,onChange:function(){a(e.ethnicity)},name:e.ethnicity,disabled:!(0!==t&&(!r||e.show)),className:n.filter,color:"primary"}),label:e.ethnicity},t)}))}),Object(O.jsx)(C.a,{className:n.filter,children:"Note: Cannot select more than 5 filters"})]})})},P=Object(s.a)((function(e){return Object(d.a)({root:{display:"flex"},drawer:{width:300,flexShrink:0},drawerPaper:{width:300},toolbar:e.mixins.toolbar,content:{flexGrow:1,backgroundColor:e.palette.background.default,padding:e.spacing(3)}})})),_=function(e){var t=e.rawData,a=e.handleChange,n=e.ageGroups,r=P();return Object(O.jsxs)("div",{className:r.root,children:[Object(O.jsx)("main",{className:r.content,children:Object(O.jsx)(v,{rawData:t,ageGroups:n})}),Object(O.jsxs)(u.a,{className:r.drawer,variant:"permanent",classes:{paper:r.drawerPaper},anchor:"right",children:[Object(O.jsx)("div",{className:r.toolbar}),Object(O.jsx)(z,{rawData:t,handleChange:a}),Object(O.jsx)(h.a,{})]})]})},A=a(138);a(335);A.a.initializeApp({apiKey:"AIzaSyD_ENUiMdHvQHHQVXac_choleElOmg7Uv8",authDomain:"singapore-population-3dc7b.firebaseapp.com",projectId:"singapore-population-3dc7b",storageBucket:"singapore-population-3dc7b.appspot.com",messagingSenderId:"740592941650",appId:"1:740592941650:web:3b167fd71ac78eb570bd8b"});var E=A.a,I=a(390),F=a(391),G=Object(s.a)((function(e){return Object(d.a)({loading:{display:"flex",justifyContent:"center"}})})),B=function(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),a=t[0],r=t[1],i=Object(n.useState)([]),c=Object(l.a)(i,2),s=c[0],d=c[1],u=Object(n.useState)(!0),h=Object(l.a)(u,2),j=h[0],b=h[1],f=G(),p=E.database().ref("singapore-population");return Object(n.useEffect)((function(){!function(){var e=[],t=[];p.on("value",(function(a){console.log(a.val()),Object.keys(a.val()).forEach((function(n){var r=a.val()[n];t.includes(r.level_2)||t.push(r.level_2);var i=!1;if(e.forEach((function(e,a){if(r.level_1===e.ethnicity){var n=t.indexOf(r.level_2);"undefined"===typeof e.data[n]?(e.data.push([{year:new Date(r.year,1,1),value:r.value,ethnicity:e.ethnicity}]),i=!0):(e.data[n].push({year:new Date(r.year,1,1),value:r.value,ethnicity:e.ethnicity}),i=!0)}})),!1===i){var c=r.level_1+"",o=new Date(r.year,1,1),l=parseInt(r.value);e.push({ethnicity:c,show:!1,data:[[{year:o,value:l,ethnicity:c}]]})}})),e[0].show=!0,r(e),d(t),b(!1)}))}()}),[]),j?Object(O.jsx)("div",{className:f.loading,children:Object(O.jsx)(I.a,{size:400,thickness:1.8,className:f.loading,color:"primary"})}):Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)(F.a,{}),Object(O.jsx)(_,{rawData:a,handleChange:function(e){var t=Object(o.a)(a);t.map((function(t){return t.ethnicity===e?t.show=!t.show:null})),r(t)},ageGroups:s})]})},W=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,409)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;a(e),n(e),r(e),i(e),c(e)}))};c.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(B,{})}),document.getElementById("root")),W()}},[[339,1,2]]]);
//# sourceMappingURL=main.6371c423.chunk.js.map