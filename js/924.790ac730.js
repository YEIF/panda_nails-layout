"use strict";(self["webpackChunkpanda_nails"]=self["webpackChunkpanda_nails"]||[]).push([[924],{908:function(t,e,i){function s(t){const e=new Date(1e3*t);return e.toLocaleDateString()}function a(t){const e=new Date(1e3*t),i=` ${e.getFullYear()}/${e.getMonth()+1}/${e.getDate()}  ${e.getHours()}:${e.getMinutes()}:${e.getSeconds()}`;return i}function o(t){const e=t.toString().split(".");return e[0]=e[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),e.join(".")}i.d(e,{D:function(){return s},lf:function(){return a},$E:function(){return o}})},94:function(t,e,i){var s=i(4902);e["Z"]={methods:{toggleFavorite(t,e){const i=this.favoriteList.findIndex((e=>e===t));-1===i?(this.favoriteList.push(t),s.Z.emit("push-message",{style:"success",title:`${e}已 加入我的最愛`})):(this.favoriteList.splice(i,1),s.Z.emit("push-message",{style:"danger",title:`${e}已 取消我的最愛`}))},getFavorite(){const t=localStorage.getItem("Favorite")||"[]";this.favoriteList=JSON.parse(t)}}}},799:function(t,e,i){i.d(e,{Z:function(){return u}});var s=i(6252);const a={class:"loadingio-spinner-spin-gw0b9unmls"},o=(0,s._)("div",{class:"ldio-jjk31xq51n"},[(0,s._)("div",null,[(0,s._)("div")]),(0,s._)("div",null,[(0,s._)("div")]),(0,s._)("div",null,[(0,s._)("div")]),(0,s._)("div",null,[(0,s._)("div")]),(0,s._)("div",null,[(0,s._)("div")]),(0,s._)("div",null,[(0,s._)("div")]),(0,s._)("div",null,[(0,s._)("div")]),(0,s._)("div",null,[(0,s._)("div")])],-1),n=[o];function r(t,e){return(0,s.wg)(),(0,s.iD)("div",a,n)}var l=i(3744);const c={},d=(0,l.Z)(c,[["render",r]]);var u=d},4227:function(t,e,i){i.d(e,{Z:function(){return _}});var s=i(6252),a=i(3577),o=i(9963);const n={"aria-label":"Page navigation example"},r={class:"pagination justify-content-center mb-0 pb-3"},l=(0,s._)("span",{"aria-hidden":"true"},"«",-1),c=[l],d=["onClick"],u=(0,s._)("span",{"aria-hidden":"true"},"»",-1),g=[u];function p(t,e,i,l,u,p){return(0,s.wg)(),(0,s.iD)("nav",n,[(0,s._)("ul",r,[(0,s._)("li",{class:(0,a.C_)(["page-item",{disabled:!i.pages.has_pre}])},[(0,s._)("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:e[0]||(e[0]=(0,o.iM)((t=>p.changePages(i.pages.current_page-1)),["prevent"]))},c)],2),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.pages.total_pages,(t=>((0,s.wg)(),(0,s.iD)("li",{class:(0,a.C_)(["page-item",{active:t===i.pages.current_page}]),key:t+123},[(0,s._)("a",{class:"page-link",href:"#",onClick:(0,o.iM)((e=>p.changePages(t)),["prevent"])},(0,a.zw)(t),9,d)],2)))),128)),(0,s._)("li",{class:(0,a.C_)(["page-item",{disabled:!i.pages.has_next}])},[(0,s._)("a",{class:"page-link",href:"#","aria-label":"Next",onClick:e[1]||(e[1]=(0,o.iM)((t=>p.changePages(i.pages.current_page+1)),["prevent"]))},g)],2)])])}var h={props:["pages"],methods:{changePages(t){this.$emit("change-pages",t)}},mounted(){document.body.scrollTop=document.documentElement.scrollTop=0}},v=i(3744);const m=(0,v.Z)(h,[["render",p]]);var _=m},8924:function(t,e,i){i.r(e),i.d(e,{default:function(){return G}});var s=i(6252),a=i(3577),o=i(9963);const n={class:"background-secondary"},r={class:"container"},l={class:"breadcrumb pt-4"},c={class:"breadcrumb-item"},d=(0,s.Uk)(" 首頁 "),u=(0,s._)("li",{class:"breadcrumb-item active","aria-current":"page"},"產品頁面",-1),g={class:"row"},p={class:"btn-group d-md-none",role:"group"},h={id:"btnGroupDrop1",type:"button",class:"btn btn-primary dropdown-toggle mb-3","data-bs-toggle":"dropdown","aria-expanded":"false"},v={class:"dropdown-menu p-3 text-center w-100 border-0","aria-labelledby":"btnGroupDrop1"},m=["onClick"],_={class:"col-md-3",role:"button","data-aos":"fade-up-right"},f={class:"list-group d-none d-md-block sticky-md-top",style:{top:"190px"}},b=["onClick"],y={class:"col-md-9"},k={class:"row list-unstyled row-cols-1 row-cols-md-2 row-cols-xl-3 g-3"},w={class:"products-card position-relative"},C={class:"card p-3"},L={class:"card-img position-relative"},$={class:"img-pseudo"},x=["onClick","disabled"],P=(0,s.Uk)(" 加入購物車 "),D={key:0,class:"fas fa-spinner fa-pulse"},Z=(0,s._)("i",{class:"bi bi-cart-plus fs-3"},null,-1),M=["onClick"],I={class:"card-body px-0"},A={class:"card-title text-start text-primaryDark text-nowrap"},T=["onClick"],z={class:"card-text d-flex mt-5 text-danger"},S={class:"me-4 text-blackGray"},F={class:"text-center"};function H(t,e,i,H,Y,j){const N=(0,s.up)("LoadingComponent"),U=(0,s.up)("VLoading"),W=(0,s.up)("RouterLink"),E=(0,s.up)("PaginationComponent");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(U,{active:Y.isLoading,"z-index":1060},{default:(0,s.w5)((()=>[(0,s.Wm)(N)])),_:1},8,["active"]),(0,s._)("div",n,[(0,s._)("div",r,[(0,s._)("ol",l,[(0,s._)("li",c,[(0,s.Wm)(W,{to:"/",class:"nav-link active p-0"},{default:(0,s.w5)((()=>[d])),_:1})]),u]),(0,s._)("div",g,[(0,s._)("div",p,[(0,s._)("button",h,(0,a.zw)(Y.isActive?Y.isActive:"所有產品"),1),(0,s._)("ul",v,[(0,s._)("li",{class:(0,a.C_)(["list-group-item list-group-item-action",{active:""==Y.isActive}]),"aria-current":"true",onClick:e[0]||(e[0]=t=>j.filterProducts())}," 所有產品 ",2),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(Y.MenuCategory,((t,e)=>((0,s.wg)(),(0,s.iD)("li",{class:(0,a.C_)(["list-group-item list-group-item-action",{active:Y.isActive==t}]),key:e,onClick:e=>j.filterProducts(1,t)},(0,a.zw)(t),11,m)))),128))])]),(0,s._)("div",_,[(0,s._)("ul",f,[(0,s._)("li",{class:(0,a.C_)(["list-group-item list-group-item-action",{active:""==Y.isActive}]),"aria-current":"true",onClick:e[1]||(e[1]=t=>j.filterProducts())}," 所有產品 ",2),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(Y.MenuCategory,((t,e)=>((0,s.wg)(),(0,s.iD)("li",{class:(0,a.C_)(["list-group-item list-group-item-action",{active:Y.isActive==t}]),key:e,onClick:e=>j.filterProducts(1,t)},(0,a.zw)(t),11,b)))),128))])]),(0,s._)("div",y,[(0,s._)("ul",k,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(j.filterProduct,(e=>((0,s.wg)(),(0,s.iD)("li",{class:"col",key:e.id,"data-aos":"fade-up"},[(0,s._)("div",w,[(0,s._)("div",C,[(0,s._)("div",L,[(0,s.Wm)(W,{to:`/product/${e.id}`,class:"product-img",style:(0,a.j5)([{},{backgroundImage:`url(${e.imageUrl})`}])},{default:(0,s.w5)((()=>[(0,s._)("div",$,[(0,s._)("button",{type:"button",onClick:(0,o.iM)((t=>j.addToCart(e.id,e.title)),["prevent"]),disabled:Y.isLoadingItem===e.id,class:"btn btn-dark w-100 py-2 pseudo-text d-block"},[P,Y.isLoadingItem===e.id?((0,s.wg)(),(0,s.iD)("i",D)):(0,s.kq)("",!0),Z],8,x)]),(0,s._)("button",{type:"button",class:"btn text-danger position-absolute fs-4 p-1",style:{right:"8%",top:"5%"},onClick:(0,o.iM)((i=>t.toggleFavorite(e.id,e.title)),["prevent"])},[(0,s._)("i",{class:(0,a.C_)(Y.favoriteList.includes(e.id)?"bi-heart-fill":"bi-heart")},null,2)],8,M)])),_:2},1032,["to","style"])]),(0,s._)("div",I,[(0,s._)("h5",A,[(0,s.Uk)((0,a.zw)(e.title)+" ",1),(0,s._)("span",{type:"button",class:"badge rounded-pill bg-primary fs-6 ms-4",onClick:(0,o.iM)((t=>j.filterProducts(1,e.category)),["prevent"])},(0,a.zw)(e.category),9,T)]),(0,s._)("p",z,[(0,s._)("del",S," NT $"+(0,a.zw)(j.toThousandths(e.origin_price))+" 元",1),(0,s.Uk)(" NT $"+(0,a.zw)(j.toThousandths(e.price))+" 元 ",1)])])])])])))),128))])])]),(0,s._)("div",F,[(0,s.Wm)(E,{pages:Y.pagination,onChangePages:j.filterProducts},null,8,["pages","onChangePages"])])])])],64)}var Y=i(4902),j=i(4227),N=i(799),U=i(908),W=i(94),E={mixins:[W.Z],components:{PaginationComponent:j.Z,LoadingComponent:N.Z},data(){return{products:[],pagination:{},isLoadingItem:!1,loadingStatus:{loadingItem:""},isLoading:!1,favoriteList:[],MenuCategory:[],isActive:""}},computed:{filterProduct(){return this.products.filter((t=>this.isActive?t.category.includes(this.isActive):this.products))}},methods:{toThousandths:U.$E,getProducts(){this.isLoading=!0,this.$http.get("https://vue3-course-api.hexschool.io/v2/api/clothes/products").then((t=>{if(this.products=t.data.products,this.pagination=t.data.pagination,this.isLoading=!1,this.products.forEach((t=>{-1===this.MenuCategory.indexOf(t.category)&&this.MenuCategory.push(t.category)})),this.$route.params.category){const{category:t}=this.$route.params;this.filterProducts(1,t)}})).catch((t=>{this.isLoading=!1,Y.Z.emit("push-message",{style:"danger",title:`${t.response.data.message}`})}))},filterProducts(t=1,e=""){this.isLoading=!0,this.isActive="all"===e?"all":e,this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/clothes/products/?page=${t}&category=${e}`).then((t=>{this.products=t.data.products,this.pagination=t.data.pagination,this.isLoading=!1,window.scrollTo(0,0)})).catch((t=>{this.isLoading=!1,Y.Z.emit("push-message",{style:"danger",title:`${t.response.data.message}`})}))},addToCart(t,e,i=1){const s={product_id:t,qty:i};this.isLoadingItem=t;const a="https://vue3-course-api.hexschool.io/v2/api/clothes/cart/";this.$http.post(a,{data:s}).then((t=>{this.isLoadingItem="",Y.Z.emit("push-message",{style:"success",title:`${e}${t.data.message}`}),Y.Z.emit("get-cart-num")})).catch((t=>{this.isLoadingItem="",Y.Z.emit("push-message",{style:"danger",title:`${t.response.data.message}`})}))}},watch:{favoriteList:{handler(){localStorage.setItem("Favorite",JSON.stringify(this.favoriteList)),Y.Z.emit("get-favorite-num")},deep:!0}},mounted(){this.getProducts(),this.getFavorite()}},K=i(3744);const q=(0,K.Z)(E,[["render",H]]);var G=q}}]);
//# sourceMappingURL=924.790ac730.js.map