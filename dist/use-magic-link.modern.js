import{useState as n,useEffect as e}from"react";import t from"event-emitter";import i from"isomorphic-unfetch";import{Sema as o}from"async-sema";const a=new t;let l=null,r=null,c=null;async function u(n){return c||(n&&l?(c=new l(n),c):(r||(console.log("Loading Magic"),r=window.document.createElement("script"),r.async=!0,r.src="https://cdn.jsdelivr.net/npm/magic-sdk/dist/magic.js",r.id="magic-link-sdk",r.onload=()=>{l=window.Magic,a.emit("loaded")},document.head.appendChild(r)),n?new Promise(e=>{a.once("loaded",()=>{c||(c=new l(n)),e(c)})}):void 0))}const s=new o(1),d=new o(1),g=new t;let f=null,w=null;async function m(n){await s.acquire();try{if(w&&w.expiredAt>Date.now())return w.token;const e=await u(n),t=await e.user.getIdToken();return h(t),t}finally{s.release()}}function h(n,e=9e5){w={token:n,expiredAt:Date.now()+e-6e4}}"undefined"!=typeof window&&u();export default function(t){if(!t)throw new Error("Magic Link publishableKey required as the first argument");const[o,a]=n(null!==f&&f),[l,r]=n(null===f),[c,s]=n(null),[y,p]=n(!1),[k,I]=n(!1);return e(()=>{function n(n){a(n)}return f||async function(n){await d.acquire();try{if(null!==f)return f;await m(n),f=!0}catch(n){f=!1}finally{d.release()}return f}(t).then(n=>{a(n)}).then(()=>r(!1)),g.on("loggedIn",n),()=>{g.off("loggedIn",n)}},[f]),{loggedIn:o,loading:l,error:c,loggingIn:y,loggingOut:k,login:async function(n){s(null),p(!0);try{const e=await u(t),i=await e.auth.loginWithMagicLink({email:n});f=!0,h(i),g.emit("loggedIn",!0),a(!0)}catch(n){s(n)}finally{p(!1)}},logout:async function(){s(null),I(!0);try{const n=await u(t);await n.user.logout(),f=null,w=null,g.emit("loggedIn",!1),a(!1)}catch(n){s(n)}finally{I(!1)}return null===f},fetch:async function(n,e={}){const o=await m(t);return o&&(e.headers=e.headers||{},e.headers.Authorization="Bearer "+o),i(n,e)},loginEvents:g}}
//# sourceMappingURL=use-magic-link.modern.js.map
