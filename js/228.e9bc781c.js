"use strict";(self["webpackChunkpanda_nails"]=self["webpackChunkpanda_nails"]||[]).push([[228],{228:function(t,e,s){s.r(e),s.d(e,{default:function(){return tt}});var a=s(6252),i=s(3577),o=s(9963);const r={class:"background-primary"},d={key:0,class:"container py-5","data-aos":"fade-up","data-aos-offset":"100"},c={class:"row row-cols-1 row-cols-md-2"},l={class:"col"},n={class:"col"},p={"aria-label":"breadcrumb"},u={class:"breadcrumb pt-3"},g={class:"breadcrumb-item"},h=(0,a.Uk)("產品頁面"),m={class:"breadcrumb-item active","aria-current":"page"},b={class:"text-start fs-2 d-flex align-items-center"},v={class:"fw-bold mb-0 me-2 text-primaryDark"},y=(0,a._)("div",{class:"text-start my-2"},null,-1),f={class:"product-description text-coffeeDark text-start fs-5 mt-3"},_={class:"product-content text-coffeeDark text-start fs-5 mt-3"},k={class:"fw-bold text-end text-danger fs-3 mt-4"},w={class:"text-end fs-6 small text-blackGray d-block"},x={class:"input-group mt-4"},L={class:"background-secondary"},$=(0,a._)("div",{class:"primary-top_bg"},null,-1),C={class:"container py-5"},T={key:0},z=(0,a._)("h2",{class:"my-5","data-aos":"fade-up","data-aos-offset":"100"},"為您推薦",-1),q={class:"products-card position-relative","data-aos":"fade-up"},S={class:"card p-3"},Z={class:"card-img position-relative"},D={class:"img-pseudo"},I=["onClick","disabled"],P=(0,a.Uk)(" 加入購物車 "),U={key:0,class:"fas fa-spinner fa-pulse"},F=(0,a._)("i",{class:"bi bi-cart-plus fs-3"},null,-1),N=["onClick"],O={class:"card-body px-0"},j={class:"card-title text-start text-primaryDark text-nowrap"},W=["onClick"],V={class:"card-text d-flex mt-5 text-danger"},B={class:"me-4 text-blackGray"};function M(t,e,s,M,E,G){const H=(0,a.up)("LoadingComponent"),J=(0,a.up)("VLoading"),Y=(0,a.up)("RouterLink"),K=(0,a.up)("SwiperSlide"),R=(0,a.up)("Swiper");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(J,{active:E.isLoading,"z-index":1060},{default:(0,a.w5)((()=>[(0,a.Wm)(H)])),_:1},8,["active"]),(0,a._)("div",r,[Object.keys(E.product).length>0?((0,a.wg)(),(0,a.iD)("div",d,[(0,a._)("div",c,[(0,a._)("div",l,[(0,a._)("div",{class:"h-100 product-img",style:(0,i.j5)([{backgroundImage:`url(${E.product.imagesUrl})`},{"background-size":"cover",position:"relative","background-repeat":"no-repeat","background-position":"center 50%"}])},null,4)]),(0,a._)("div",n,[(0,a._)("nav",p,[(0,a._)("ol",u,[(0,a._)("li",g,[(0,a.Wm)(Y,{to:"/products",class:"text-decoration-none"},{default:(0,a.w5)((()=>[h])),_:1})]),(0,a._)("li",m,(0,i.zw)(E.product.title),1)])]),(0,a._)("div",null,[(0,a._)("div",b,[(0,a._)("h3",v,(0,i.zw)(E.product.title),1),(0,a._)("small",{type:"button",class:"badge rounded-pill bg-primary fs-7",onClick:e[0]||(e[0]=t=>G.goToCategory(E.product.category))},(0,i.zw)(E.product.category),1)]),y,(0,a._)("div",f,(0,i.zw)(E.product.description),1),(0,a._)("div",_,(0,i.zw)(E.product.content),1),(0,a._)("div",k,[(0,a._)("del",w," 原價 : "+(0,i.zw)(G.toThousandths(E.product.origin_price))+" 元",1),(0,a.Uk)(" NT $"+(0,i.zw)(G.toThousandths(E.product.price))+" 元 ",1)]),(0,a._)("div",x,[(0,a._)("button",{type:"button",class:"btn btn-primary fs-4 p-1 me-2",style:{},onClick:e[1]||(e[1]=t=>G.toggleFavorite(E.product.id,E.product.title))},[(0,a._)("i",{class:(0,i.C_)(E.favoriteList.includes(E.product.id)?"bi-heart-fill":"bi-heart")},null,2)]),(0,a.wy)((0,a._)("input",{type:"number",class:"form-control","onUpdate:modelValue":e[2]||(e[2]=t=>E.qty=t),min:"1"},null,512),[[o.nr,E.qty,void 0,{number:!0}]]),(0,a._)("button",{type:"button",class:"btn btn-primary",onClick:e[3]||(e[3]=t=>G.addToCart(E.product.id,E.product.title,E.qty))}," 加入購物車 ")])])])])])):(0,a.kq)("",!0)]),(0,a._)("div",L,[$,(0,a._)("div",C,[E.products.length>0?((0,a.wg)(),(0,a.iD)("div",T,[z,(0,a.Wm)(R,{modules:E.modules,Navigation:"",pagination:{clickable:!1},loop:!1,breakpoints:{640:{slidesPerView:1,spaceBetween:0},768:{slidesPerView:2,spaceBetween:30},1024:{slidesPerView:3,spaceBetween:30}},autoplay:{delay:1500,disableOnInteraction:!1,pauseOnMouseEnter:!0}},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(E.products,(e=>((0,a.wg)(),(0,a.j4)(K,{key:e.id},{default:(0,a.w5)((()=>[(0,a._)("div",q,[(0,a._)("div",S,[(0,a._)("div",Z,[(0,a.Wm)(Y,{to:`/product/${e.id}`,class:"product-img",style:(0,i.j5)([{},{backgroundImage:`url(${e.imageUrl})`}])},{default:(0,a.w5)((()=>[(0,a._)("div",D,[(0,a._)("button",{type:"button",onClick:(0,o.iM)((t=>G.addToCart(e.id,e.title)),["prevent"]),disabled:t.isLoadingItem===e.id,class:"btn btn-dark w-100 py-2 pseudo-text d-block"},[P,t.isLoadingItem===e.id?((0,a.wg)(),(0,a.iD)("i",U)):(0,a.kq)("",!0),F],8,I)]),(0,a._)("button",{type:"button",class:"btn text-danger position-absolute fs-4 p-1",style:{right:"8%",top:"5%"},onClick:(0,o.iM)((t=>G.toggleFavorite(e.id,e.title)),["prevent"])},[(0,a._)("i",{class:(0,i.C_)(E.favoriteList.includes(e.id)?"bi-heart-fill":"bi-heart")},null,2)],8,N)])),_:2},1032,["to","style"])]),(0,a._)("div",O,[(0,a._)("h5",j,[(0,a.Uk)((0,i.zw)(e.title)+" ",1),(0,a._)("span",{type:"button",class:"badge rounded-pill bg-primary fs-6 ms-4",onClick:(0,o.iM)((t=>G.goToCategory(e.category)),["prevent"])},(0,i.zw)(e.category),9,W)]),(0,a._)("p",V,[(0,a._)("del",B," NT $"+(0,i.zw)(G.toThousandths(e.origin_price))+" 元",1),(0,a.Uk)(" NT $"+(0,i.zw)(G.toThousandths(e.price))+" 元 ",1)])])])])])),_:2},1024)))),128))])),_:1},8,["modules"])])):(0,a.kq)("",!0)])])],64)}var E=s(799),G=s(4902),H=s(8722),J=s(3181),Y=s(1911),K=s(908),R=s(94),A={mixins:[R.Z],components:{LoadingComponent:E.Z,Swiper:J.tq,SwiperSlide:J.o5},data(){return{product:{},products:{},qty:1,isLoading:!1,BannerImage:H,modules:[Y.W_,Y.tl,Y.pt],favoriteList:[]}},watch:{qty(t,e){(t<=0||-1!==String(t).indexOf("."))&&(this.qty=e)},$route(t){t.path.includes("/product/")&&this.getProduct()},favoriteList:{handler(){localStorage.setItem("Favorite",JSON.stringify(this.favoriteList)),G.Z.emit("get-favorite-num")},deep:!0}},methods:{toThousandths:K.$E,getProducts(t=1){this.isLoading=!0;const e=this.product.category;this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/clothes/products/?page=${t}&category=${e}`).then((t=>{this.products=t.data.products;const{id:e}=this.product;this.products=Object.values(this.products).filter((t=>t.id!==e)),this.isLoading=!1})).catch((t=>{this.isLoading=!1,G.Z.emit("push-message",{style:"danger",title:`${t.response.data.message}`})}))},getProduct(){const{id:t}=this.$route.params;this.isLoading=!0;const e=`https://vue3-course-api.hexschool.io/v2/api/clothes/product/${t}`;this.$http.get(e).then((t=>{this.product=t.data.product,document.title=`${this.product.title} | Panda_Nails`,this.getProducts(),this.isLoading=!1})).catch((t=>{this.isLoading=!1,G.Z.emit("push-message",{style:"danger",title:`${t.response.data.message}`})}))},addToCart(t,e,s=1){const a={product_id:t,qty:s};this.isLoading=!0;const i="https://vue3-course-api.hexschool.io/v2/api/clothes/cart/";this.$http.post(i,{data:a}).then((t=>{this.qty=1,G.Z.emit("get-cart-num"),G.Z.emit("push-message",{style:"success",title:`${e}${t.data.message}`}),this.isLoading=!1})).catch((t=>{this.isLoading=!1,G.Z.emit("push-message",{style:"danger",title:`${t.response.data.message}`})}))},toggleFavorite(t,e){const s=this.favoriteList.findIndex((e=>e===t));-1===s?(this.favoriteList.push(t),G.Z.emit("push-message",{style:"success",title:`${e}已 加入我的最愛`})):(this.favoriteList.splice(s,1),G.Z.emit("push-message",{style:"danger",title:`${e}已 取消我的最愛`}))},getFavorite(){const t=localStorage.getItem("Favorite")||"[]";this.favoriteList=JSON.parse(t)},goToCategory(t){this.$router.push({name:"產品頁面",params:{category:t}})}},mounted(){this.getProduct(),this.getFavorite()}},Q=s(3744);const X=(0,Q.Z)(A,[["render",M]]);var tt=X},8722:function(t,e,s){t.exports=s.p+"img/banner3.3ef48998.jpg"}}]);
//# sourceMappingURL=228.e9bc781c.js.map