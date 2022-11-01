"use strict";(self["webpackChunkpanda_nails"]=self["webpackChunkpanda_nails"]||[]).push([[61],{908:function(e,t,a){function l(e){const t=new Date(1e3*e);return t.toLocaleDateString()}function n(e){const t=new Date(1e3*e),a=` ${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()}  ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;return a}function r(e){const t=e.toString().split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),t.join(".")}a.d(t,{D:function(){return l},lf:function(){return n},$E:function(){return r}})},4227:function(e,t,a){a.d(t,{Z:function(){return b}});var l=a(6252),n=a(3577),r=a(9963);const s={"aria-label":"Page navigation example"},d={class:"pagination justify-content-center mb-0 pb-3"},i=(0,l._)("span",{"aria-hidden":"true"},"«",-1),o=[i],c=["onClick"],u=(0,l._)("span",{"aria-hidden":"true"},"»",-1),p=[u];function g(e,t,a,i,u,g){return(0,l.wg)(),(0,l.iD)("nav",s,[(0,l._)("ul",d,[(0,l._)("li",{class:(0,n.C_)(["page-item",{disabled:!a.pages.has_pre}])},[(0,l._)("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:t[0]||(t[0]=(0,r.iM)((e=>g.changePages(a.pages.current_page-1)),["prevent"]))},o)],2),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(a.pages.total_pages,(e=>((0,l.wg)(),(0,l.iD)("li",{class:(0,n.C_)(["page-item",{active:e===a.pages.current_page}]),key:e+123},[(0,l._)("a",{class:"page-link",href:"#",onClick:(0,r.iM)((t=>g.changePages(e)),["prevent"])},(0,n.zw)(e),9,c)],2)))),128)),(0,l._)("li",{class:(0,n.C_)(["page-item",{disabled:!a.pages.has_next}])},[(0,l._)("a",{class:"page-link",href:"#","aria-label":"Next",onClick:t[1]||(t[1]=(0,r.iM)((e=>g.changePages(a.pages.current_page+1)),["prevent"]))},p)],2)])])}var h={props:["pages"],methods:{changePages(e){this.$emit("change-pages",e)}},mounted(){document.body.scrollTop=document.documentElement.scrollTop=0}},_=a(3744);const m=(0,_.Z)(h,[["render",g]]);var b=m},9412:function(e,t,a){a.r(t),a.d(t,{default:function(){return Pe}});var l=a(6252),n=a(3577),r=a(9963);const s={class:"container"},d={class:"table mt-4"},i=(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",null,"購買時間"),(0,l._)("th",null,"Email"),(0,l._)("th",null,"購買款項"),(0,l._)("th",null,"應付金額"),(0,l._)("th",null,"是否付款"),(0,l._)("th",null,"編輯")])],-1),o=["textContent"],c={class:"list-unstyled"},u={class:"text-right"},p={class:"form-check form-switch"},g=["id","onUpdate:modelValue","onChange"],h=["for"],_={key:0},m={key:1},b={class:"btn-group"},y=["onClick"],w=["onClick"];function O(e,t,a,O,f,k){const v=(0,l.up)("VLoading"),D=(0,l.up)("PaginationComponent"),C=(0,l.up)("OrderModalComponent"),M=(0,l.up)("DelOrderModalComponent");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(v,{active:f.isLoading,"z-index":1060},null,8,["active"]),(0,l._)("div",s,[(0,l._)("table",d,[i,(0,l._)("tbody",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(f.orders,((e,t)=>((0,l.wg)(),(0,l.iD)(l.HY,{key:e.id+t},[f.orders.length?((0,l.wg)(),(0,l.iD)("tr",{key:0,class:(0,n.C_)({"text-secondary":!e.is_paid})},[(0,l._)("td",null,(0,n.zw)(k.DateFn(e.create_at)),1),(0,l._)("td",null,[e.user?((0,l.wg)(),(0,l.iD)("span",{key:0,textContent:(0,n.zw)(e.user.email)},null,8,o)):(0,l.kq)("",!0)]),(0,l._)("td",null,[(0,l._)("ul",c,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.products,((e,t)=>((0,l.wg)(),(0,l.iD)("li",{key:t},(0,n.zw)(e.product.title)+" 數量："+(0,n.zw)(e.qty)+" "+(0,n.zw)(e.product.unit),1)))),128))])]),(0,l._)("td",u,(0,n.zw)(Math.round(e.total)),1),(0,l._)("td",null,[(0,l._)("div",p,[(0,l.wy)((0,l._)("input",{class:"form-check-input",type:"checkbox",id:`paidSwitch${e.id}`,"onUpdate:modelValue":t=>e.is_paid=t,onChange:t=>k.updatePaid(e)},null,40,g),[[r.e8,e.is_paid]]),(0,l._)("label",{class:"form-check-label",for:`paidSwitch${e.id}`},[e.is_paid?((0,l.wg)(),(0,l.iD)("span",_,"已付款")):((0,l.wg)(),(0,l.iD)("span",m,"未付款"))],8,h)])]),(0,l._)("td",null,[(0,l._)("div",b,[(0,l._)("button",{class:"btn btn-outline-primary btn-sm",type:"button",onClick:t=>k.openModal("view",e)}," 檢視 ",8,y),(0,l._)("button",{class:"btn btn-outline-danger btn-sm",type:"button",onClick:t=>k.openModal("del",e)}," 刪除 ",8,w)])])],2)):(0,l.kq)("",!0)],64)))),128))])]),(0,l.Wm)(D,{pages:f.pagination,onChangePages:k.getOrders},null,8,["pages","onChangePages"]),(0,l.Wm)(C,{ref:"orderModal","temp-order":f.tempOrder,"current-page":f.pagination.current_page,onGetOrders:k.getOrders,onUpdatePaid:k.updatePaid},null,8,["temp-order","current-page","onGetOrders","onUpdatePaid"]),(0,l.Wm)(M,{ref:"delOrderModal","temp-order":f.tempOrder,"current-page":f.pagination.current_page,onGetOrders:k.getOrders},null,8,["temp-order","current-page","onGetOrders"])])],64)}var f=a(908);const k={id:"delOrderModal",ref:"modal",class:"modal fade",tabindex:"-1","aria-labelledby":"delOrderModalLabel","aria-hidden":"true"},v={class:"modal-dialog"},D={class:"modal-content border-0"},C=(0,l._)("div",{class:"modal-header bg-danger text-white"},[(0,l._)("h5",{id:"delOrderModalLabel",class:"modal-title"},[(0,l._)("span",null,"刪除產品")]),(0,l._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),M={class:"modal-body"},x=(0,l.Uk)(" 是否刪除 "),$={class:"text-danger"},z=(0,l.Uk)(" 訂單(刪除後將無法恢復)。 "),P={class:"modal-footer"};function L(e,t,a,r,s,d){const i=(0,l.up)("VLoading");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(i,{active:s.isLoading,"z-index":1060},null,8,["active"]),(0,l._)("div",k,[(0,l._)("div",v,[(0,l._)("div",D,[C,(0,l._)("div",M,[x,(0,l._)("strong",$,(0,n.zw)(a.tempOrder.id),1),z]),(0,l._)("div",P,[(0,l._)("button",{type:"button",class:"btn btn-outline-secondary",onClick:t[0]||(t[0]=(...t)=>e.hideModal&&e.hideModal(...t))}," 取消 "),(0,l._)("button",{type:"button",class:"btn btn-danger",onClick:t[1]||(t[1]=(...e)=>d.delOrder&&d.delOrder(...e))}," 確認刪除 ")])])])],512)],64)}var Z=a(6716),S=a(4902),H={props:{tempOrder:{type:Object,default(){return{}}},currentPage:{type:Number}},emits:["get-orders"],mixins:[Z.Z],data(){return{isLoading:!1}},methods:{delOrder(){this.isLoading=!0;const e=`https://vue3-course-api.hexschool.io/v2/api/clothes/admin/order/${this.tempOrder.id}`;this.$http.delete(e).then((e=>{this.isLoading=!1,S.Z.emit("push-message",{style:"success",title:this.tempOrder.id+"訂單"+e.data.message}),this.$emit("get-orders",this.currentPage),this.hideModal()})).catch((e=>{this.isLoading=!1,S.Z.emit("push-message",{style:"danger",title:`${e.response.data.message}`})}))}}},U=a(3744);const Y=(0,U.Z)(H,[["render",L]]);var N=Y,F=a(4227);const j={class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},q={class:"modal-dialog modal-xl",role:"document"},V={class:"modal-content border-0"},W={class:"modal-header bg-dark text-white"},E=(0,l._)("h3",{class:"modal-title",id:"exampleModalLabel"},[(0,l._)("span",null,"訂單細節")],-1),G={class:"modal-body"},J={class:"row"},K={class:"col-md-4"},T=(0,l._)("h3",null,"用戶資料",-1),I={class:"table"},B={key:0},A=(0,l._)("th",{style:{width:"100px"}},"姓名",-1),Q=(0,l._)("th",null,"Email",-1),R=(0,l._)("th",null,"電話",-1),X=(0,l._)("th",null,"地址",-1),ee={class:"col-md-8"},te=(0,l._)("h3",null,"訂單細節",-1),ae={class:"table"},le=(0,l._)("th",{style:{width:"100px"}},"訂單編號",-1),ne=(0,l._)("i",{class:"far fa-copy"},null,-1),re=[ne],se=(0,l._)("th",null,"下單時間",-1),de=(0,l._)("th",null,"付款時間",-1),ie={key:0},oe={key:1},ce=(0,l._)("th",null,"付款狀態",-1),ue={key:0,class:"text-success"},pe={key:1,class:"text-muted"},ge=(0,l._)("th",null,"總金額",-1),he=(0,l._)("h3",null,"選購商品",-1),_e={class:"table"},me=(0,l._)("thead",null,[(0,l._)("tr")],-1),be={class:"text-end"},ye={class:"d-flex justify-content-end"},we={class:"form-check"},Oe={class:"form-check-label",for:"flexCheckDefault"},fe={key:0},ke={key:1},ve={class:"modal-footer"};function De(e,t,a,s,d,i){return(0,l.wg)(),(0,l.iD)("div",j,[(0,l._)("div",q,[(0,l._)("div",V,[(0,l._)("div",W,[E,(0,l._)("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=(...t)=>e.hideModal&&e.hideModal(...t)),"aria-label":"Close"})]),(0,l._)("div",G,[(0,l._)("div",J,[(0,l._)("div",K,[T,(0,l._)("table",I,[d.localOrder.user?((0,l.wg)(),(0,l.iD)("tbody",B,[(0,l._)("tr",null,[A,(0,l._)("td",null,(0,n.zw)(d.localOrder.user.name),1)]),(0,l._)("tr",null,[Q,(0,l._)("td",null,(0,n.zw)(d.localOrder.user.email),1)]),(0,l._)("tr",null,[R,(0,l._)("td",null,(0,n.zw)(d.localOrder.user.tel),1)]),(0,l._)("tr",null,[X,(0,l._)("td",null,(0,n.zw)(d.localOrder.user.address),1)])])):(0,l.kq)("",!0)])]),(0,l._)("div",ee,[te,(0,l._)("table",ae,[(0,l._)("tbody",null,[(0,l._)("tr",null,[le,(0,l._)("td",null,[(0,l.Uk)((0,n.zw)(d.localOrder.id)+" ",1),(0,l._)("span",{class:"ms-3",type:"button",onClick:t[1]||(t[1]=e=>i.copyOrderId(d.localOrder.id))},re)])]),(0,l._)("tr",null,[se,(0,l._)("td",null,(0,n.zw)(i.DateFn(d.localOrder.create_at)),1)]),(0,l._)("tr",null,[de,(0,l._)("td",null,[d.localOrder.paid_date?((0,l.wg)(),(0,l.iD)("span",ie,(0,n.zw)(i.DateFn(d.localOrder.paid_date)),1)):((0,l.wg)(),(0,l.iD)("span",oe,"時間不正確"))])]),(0,l._)("tr",null,[ce,(0,l._)("td",null,[d.localOrder.is_paid?((0,l.wg)(),(0,l.iD)("strong",ue,"已付款")):((0,l.wg)(),(0,l.iD)("span",pe,"尚未付款"))])]),(0,l._)("tr",null,[ge,(0,l._)("td",null,(0,n.zw)(Math.round(d.localOrder.total)),1)])])]),he,(0,l._)("table",_e,[me,(0,l._)("tbody",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(d.localOrder.products,(e=>((0,l.wg)(),(0,l.iD)("tr",{key:e.id},[(0,l._)("th",null,(0,n.zw)(e.product.title),1),(0,l._)("td",null,(0,n.zw)(e.qty)+" / "+(0,n.zw)(e.product.unit),1),(0,l._)("td",be,(0,n.zw)(Math.round(e.final_total)),1)])))),128))])]),(0,l._)("div",ye,[(0,l._)("div",we,[(0,l.wy)((0,l._)("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault","onUpdate:modelValue":t[2]||(t[2]=e=>d.localOrder.is_paid=e)},null,512),[[r.e8,d.localOrder.is_paid]]),(0,l._)("label",Oe,[d.localOrder.is_paid?((0,l.wg)(),(0,l.iD)("span",fe,"已付款")):((0,l.wg)(),(0,l.iD)("span",ke,"未付款"))])])])])])]),(0,l._)("div",ve,[(0,l._)("button",{type:"button",class:"btn btn-outline-secondary",onClick:t[3]||(t[3]=(...t)=>e.hideModal&&e.hideModal(...t))}," 取消 "),(0,l._)("button",{type:"button",class:"btn btn-primary",onClick:t[4]||(t[4]=t=>e.$emit("update-paid",d.localOrder,a.currentPage))}," 修改付款狀態 ")])])])],512)}var Ce={props:{tempOrder:{type:Object,default(){return{}}},currentPage:{type:Number}},emits:["update-paid"],mixins:[Z.Z],data(){return{localOrder:{}}},watch:{tempOrder(){this.localOrder=this.tempOrder}},methods:{DateFn:f.D,copyOrderId(e){navigator.clipboard&&(navigator.clipboard.writeText(e),S.Z.emit("push-message",{style:"success",title:`${e}\n已複製到剪貼簿`}))}}};const Me=(0,U.Z)(Ce,[["render",De]]);var xe=Me,$e={components:{PaginationComponent:F.Z,OrderModalComponent:xe,DelOrderModalComponent:N},data(){return{tempOrder:{},orders:[],pagination:{},isLoading:!1}},methods:{getOrders(e=1){const t=`https://vue3-course-api.hexschool.io/v2/api/clothes/admin/orders?page=${e}`;this.isLoading=!0,this.$http.get(t,this.tempProduct).then((e=>{this.orders=e.data.orders,this.pagination=e.data.pagination,this.isLoading=!1})).catch((e=>{S.Z.emit("push-message",{style:"danger",title:`${e.response.data.message}`})}))},DateFn:f.D,openModal(e,t){"view"===e?(this.tempOrder=JSON.parse(JSON.stringify(t)),this.$refs.orderModal.openModal()):"del"===e&&(this.tempOrder=JSON.parse(JSON.stringify(t)),this.$refs.delOrderModal.openModal())},updatePaid(e){this.isLoading=!0;const t=`https://vue3-course-api.hexschool.io/v2/api/clothes/admin/order/${e.id}`,a={is_paid:e.is_paid};this.$http.put(t,{data:a}).then((e=>{this.isLoading=!1,this.$refs.orderModal.hideModal(),this.getOrders(this.pagination.current_page),S.Z.emit("push-message",{style:"success",title:"更新付款狀態"})})).catch((e=>{this.isLoading=!1,S.Z.emit("push-message",{style:"danger",title:"付款狀態更新失敗",content:String(e.response.data.message)})}))}},mounted(){this.getOrders()}};const ze=(0,U.Z)($e,[["render",O]]);var Pe=ze}}]);
//# sourceMappingURL=61.f92c5714.js.map