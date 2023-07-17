"use strict";(self.webpackChunkcosmos_sdk_docs=self.webpackChunkcosmos_sdk_docs||[]).push([[7026],{3905:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>g});var a=t(67294);function p(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){p(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,a,p=function(e,n){if(null==e)return{};var t,a,p={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(p[t]=e[t]);return p}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(p[t]=e[t])}return p}var l=a.createContext({}),s=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},m=function(e){var n=s(e.components);return a.createElement(l.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,p=e.mdxType,o=e.originalType,l=e.parentName,m=r(e,["components","mdxType","originalType","parentName"]),d=s(t),g=p,u=d["".concat(l,".").concat(g)]||d[g]||c[g]||o;return t?a.createElement(u,i(i({ref:n},m),{},{components:t})):a.createElement(u,i({ref:n},m))}));function g(e,n){var t=arguments,p=n&&n.mdxType;if("string"==typeof e||p){var o=t.length,i=new Array(o);i[0]=d;var r={};for(var l in n)hasOwnProperty.call(n,l)&&(r[l]=n[l]);r.originalType=e,r.mdxType="string"==typeof e?e:p,i[1]=r;for(var s=2;s<o;s++)i[s]=t[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},89264:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>r,toc:()=>s});var a=t(87462),p=(t(67294),t(3905));const o={sidebar_position:1},i="Overview of app_v2.go",r={unversionedId:"building-apps/app-go-v2",id:"building-apps/app-go-v2",title:"Overview of app_v2.go",description:"The Cosmos SDK allows much easier wiring of an app.go thanks to App Wiring and depinject.",source:"@site/docs/building-apps/01-app-go-v2.md",sourceDirName:"building-apps",slug:"/building-apps/app-go-v2",permalink:"/main/building-apps/app-go-v2",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Overview of app.go",permalink:"/main/building-apps/app-go"},next:{title:"Application Mempool",permalink:"/main/building-apps/app-mempool"}},l={},s=[{value:"<code>app_config.go</code>",id:"app_configgo",level:2},{value:"Complete <code>app_config.go</code>",id:"complete-app_configgo",level:3},{value:"Alternative formats",id:"alternative-formats",level:3},{value:"<code>app_v2.go</code>",id:"app_v2go",level:2},{value:"Advanced Configuration",id:"advanced-configuration",level:3},{value:"Complete <code>app_v2.go</code>",id:"complete-app_v2go",level:3}],m={toc:s};function c(e){let{components:n,...t}=e;return(0,p.kt)("wrapper",(0,a.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,p.kt)("h1",{id:"overview-of-app_v2go"},"Overview of ",(0,p.kt)("inlineCode",{parentName:"h1"},"app_v2.go")),(0,p.kt)("admonition",{title:"Synopsis",type:"note"},(0,p.kt)("p",{parentName:"admonition"},"The Cosmos SDK allows much easier wiring of an ",(0,p.kt)("inlineCode",{parentName:"p"},"app.go")," thanks to App Wiring and ",(0,p.kt)("a",{parentName:"p",href:"/main/packages/depinject"},(0,p.kt)("inlineCode",{parentName:"a"},"depinject")),".\nLearn more about the rationale of App Wiring in ",(0,p.kt)("a",{parentName:"p",href:"/main/architecture/adr-057-app-wiring"},"ADR-057"),".")),(0,p.kt)("admonition",{type:"note"},(0,p.kt)("h3",{parentName:"admonition",id:"pre-requisite-readings"},"Pre-requisite Readings"),(0,p.kt)("ul",{parentName:"admonition"},(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"/main/architecture/adr-057-app-wiring"},"ADR 057: App Wiring")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"/main/packages/depinject"},"Depinject Documentation")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",{parentName:"li",href:"/main/building-modules/depinject"},"Modules depinject-ready")))),(0,p.kt)("p",null,"This section is intended to provide an overview of the ",(0,p.kt)("inlineCode",{parentName:"p"},"SimApp")," ",(0,p.kt)("inlineCode",{parentName:"p"},"app_v2.go")," file with App Wiring."),(0,p.kt)("h2",{id:"app_configgo"},(0,p.kt)("inlineCode",{parentName:"h2"},"app_config.go")),(0,p.kt)("p",null,"The ",(0,p.kt)("inlineCode",{parentName:"p"},"app_config.go")," file is the single place to configure all modules parameters."),(0,p.kt)("ol",null,(0,p.kt)("li",{parentName:"ol"},(0,p.kt)("p",{parentName:"li"},"Create the ",(0,p.kt)("inlineCode",{parentName:"p"},"AppConfig")," variable:"),(0,p.kt)("pre",{parentName:"li"},(0,p.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.50.0-alpha.0/simapp/app_config.go#L103\n"))),(0,p.kt)("li",{parentName:"ol"},(0,p.kt)("p",{parentName:"li"},"Configure the ",(0,p.kt)("inlineCode",{parentName:"p"},"runtime")," module:"),(0,p.kt)("pre",{parentName:"li"},(0,p.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.50.0-alpha.0/simapp/app_config.go#L103-L167\n"))),(0,p.kt)("li",{parentName:"ol"},(0,p.kt)("p",{parentName:"li"},"Configure the modules defined in the ",(0,p.kt)("inlineCode",{parentName:"p"},"BeginBlocker")," and ",(0,p.kt)("inlineCode",{parentName:"p"},"EndBlocker")," and the ",(0,p.kt)("inlineCode",{parentName:"p"},"tx")," module:"),(0,p.kt)("pre",{parentName:"li"},(0,p.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.50.0-alpha.0/simapp/app_config.go#L112-L129\n")),(0,p.kt)("pre",{parentName:"li"},(0,p.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.50.0-alpha.0/simapp/app_config.go#L200-L203\n")))),(0,p.kt)("h3",{id:"complete-app_configgo"},"Complete ",(0,p.kt)("inlineCode",{parentName:"h3"},"app_config.go")),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.50.0-alpha.0/simapp/app_config.go\n")),(0,p.kt)("h3",{id:"alternative-formats"},"Alternative formats"),(0,p.kt)("admonition",{type:"tip"},(0,p.kt)("p",{parentName:"admonition"},"The example above shows how to create an ",(0,p.kt)("inlineCode",{parentName:"p"},"AppConfig")," using Go. However, it is also possible to create an ",(0,p.kt)("inlineCode",{parentName:"p"},"AppConfig")," using YAML, or JSON.",(0,p.kt)("br",{parentName:"p"}),"\n","The configuration can then be embed with ",(0,p.kt)("inlineCode",{parentName:"p"},"go:embed")," and read with ",(0,p.kt)("a",{parentName:"p",href:"https://pkg.go.dev/cosmossdk.io/core/appconfig#LoadYAML"},(0,p.kt)("inlineCode",{parentName:"a"},"appconfig.LoadYAML")),", or ",(0,p.kt)("a",{parentName:"p",href:"https://pkg.go.dev/cosmossdk.io/core/appconfig#LoadJSON"},(0,p.kt)("inlineCode",{parentName:"a"},"appconfig.LoadJSON")),", in ",(0,p.kt)("inlineCode",{parentName:"p"},"app_v2.go"),"."),(0,p.kt)("pre",{parentName:"admonition"},(0,p.kt)("code",{parentName:"pre",className:"language-go"},"//go:embed app_config.yaml\nvar (\n    appConfigYaml []byte\n    appConfig = appconfig.LoadYAML(appConfigYaml)\n)\n"))),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-yaml"},'modules:\n  - name: runtime\n    config:\n      "@type": cosmos.app.runtime.v1alpha1.Module\n      app_name: SimApp\n      begin_blockers: [staking, auth, bank]\n      end_blockers: [bank, auth, staking]\n      init_genesis: [bank, auth, staking]\n  - name: auth\n    config:\n      "@type": cosmos.auth.module.v1.Module\n      bech32_prefix: cosmos\n  - name: bank\n    config:\n      "@type": cosmos.bank.module.v1.Module\n  - name: staking\n    config:\n      "@type": cosmos.staking.module.v1.Module\n  - name: tx\n    config:\n      "@type": cosmos.tx.module.v1.Module\n')),(0,p.kt)("p",null,"A more complete example of ",(0,p.kt)("inlineCode",{parentName:"p"},"app.yaml")," can be found ",(0,p.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk/blob/91b1d83f1339e235a1dfa929ecc00084101a19e3/simapp/app.yaml"},"here"),"."),(0,p.kt)("h2",{id:"app_v2go"},(0,p.kt)("inlineCode",{parentName:"h2"},"app_v2.go")),(0,p.kt)("p",null,(0,p.kt)("inlineCode",{parentName:"p"},"app_v2.go")," is the place where ",(0,p.kt)("inlineCode",{parentName:"p"},"SimApp")," is constructed. ",(0,p.kt)("inlineCode",{parentName:"p"},"depinject.Inject")," facilitates that by automatically wiring the app modules and keepers, provided an application configuration ",(0,p.kt)("inlineCode",{parentName:"p"},"AppConfig")," is provided. ",(0,p.kt)("inlineCode",{parentName:"p"},"SimApp")," is constructed, when calling the injected ",(0,p.kt)("inlineCode",{parentName:"p"},"*runtime.AppBuilder"),", with ",(0,p.kt)("inlineCode",{parentName:"p"},"appBuilder.Build(...)"),".",(0,p.kt)("br",{parentName:"p"}),"\n","In short ",(0,p.kt)("inlineCode",{parentName:"p"},"depinject")," and the ",(0,p.kt)("a",{parentName:"p",href:"https://pkg.go.dev/github.com/cosmos/cosmos-sdk/runtime"},(0,p.kt)("inlineCode",{parentName:"a"},"runtime")," package")," abstract the wiring of the app, and the ",(0,p.kt)("inlineCode",{parentName:"p"},"AppBuilder")," is the place where the app is constructed. ",(0,p.kt)("a",{parentName:"p",href:"https://pkg.go.dev/github.com/cosmos/cosmos-sdk/runtime"},(0,p.kt)("inlineCode",{parentName:"a"},"runtime"))," takes care of registering the codecs, KV store, subspaces and instantiating ",(0,p.kt)("inlineCode",{parentName:"p"},"baseapp"),"."),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.50.0-alpha.0/simapp/app_v2.go#L101-L245\n")),(0,p.kt)("admonition",{type:"warning"},(0,p.kt)("p",{parentName:"admonition"},"When using ",(0,p.kt)("inlineCode",{parentName:"p"},"depinject.Inject"),", the injected types must be pointers.")),(0,p.kt)("h3",{id:"advanced-configuration"},"Advanced Configuration"),(0,p.kt)("p",null,"In advanced cases, it is possible to inject extra (module) configuration in a way that is not (yet) supported by ",(0,p.kt)("inlineCode",{parentName:"p"},"AppConfig"),".",(0,p.kt)("br",{parentName:"p"}),"\n","In this case, use ",(0,p.kt)("inlineCode",{parentName:"p"},"depinject.Configs")," for combining the extra configuration and ",(0,p.kt)("inlineCode",{parentName:"p"},"AppConfig"),", and ",(0,p.kt)("inlineCode",{parentName:"p"},"depinject.Supply")," to providing that extra configuration.\nMore information on how work ",(0,p.kt)("inlineCode",{parentName:"p"},"depinject.Configs")," and ",(0,p.kt)("inlineCode",{parentName:"p"},"depinject.Supply")," can be found in the ",(0,p.kt)("a",{parentName:"p",href:"https://pkg.go.dev/cosmossdk.io/depinject"},(0,p.kt)("inlineCode",{parentName:"a"},"depinject")," documentation"),"."),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.50.0-alpha.0/simapp/app_v2.go#L114-L146\n")),(0,p.kt)("h3",{id:"complete-app_v2go"},"Complete ",(0,p.kt)("inlineCode",{parentName:"h3"},"app_v2.go")),(0,p.kt)("admonition",{type:"tip"},(0,p.kt)("p",{parentName:"admonition"},"Note that in the complete ",(0,p.kt)("inlineCode",{parentName:"p"},"SimApp")," ",(0,p.kt)("inlineCode",{parentName:"p"},"app_v2.go")," file, testing utilities are also defined, but they could as well be defined in a separate file.")),(0,p.kt)("pre",null,(0,p.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.50.0-alpha.0/simapp/app_v2.go\n")))}c.isMDXComponent=!0}}]);