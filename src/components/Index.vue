<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider collapsedWidth=0   width=240 :trigger="null" collapsible v-model="collapsed" breakpoint="lg" style="background-color:cornflowerblue;height:100vh;;box-shadow:2px 2px 5px 2px rgba(0,0,0,0.3);">
    
      
      <div class="logo" >
             <div style=" 
    height: 32px; 
    display: flex;
    align-items: center;
    justify-content: center;
    color:#fff;
    font-size:19px;
      ">
      <span style="font-weight: 550 ">   {{mc}}</span>
         
       </div>
      </div>
          
      <a-menu  :defaultOpenKeys="openKeys" mode="inline" style="background-color:cornflowerblue;width:100%;">
 <a-sub-menu key="sub1" >
    <span slot="title"><span>管理功能</span></span>
        <a-menu-item @click="home" key="1"  >
          <a-icon type="home" />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item @click="cf" key="2"  >
          <a-icon type="pie-chart" />
          <span>处方统计</span>
        </a-menu-item>
 </a-sub-menu>  
 <a-sub-menu key="sub2">   
    <span slot="title"><span>辅助功能</span></span> 
        <a-menu-item @click="option" key="3" >
         <a-icon type="snippets" />
         <span>查询到期时间</span> 
        </a-menu-item>
 </a-sub-menu>  
      </a-menu>
      
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="display:flex;justify-content: space-between; background: cornflowerblue; padding: 0;box-shadow:2px 2px 10px 2px rgba(0,0,0,0.7);">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <div style="margin-right:40px;">
            <div style="display:flex;justify-content:center">
                <my-button ></my-button>
                &nbsp;   &nbsp;
                <div>
                     <a-button type="primary" shape="circle" icon="poweroff" style="border:0; background: cornflowerblue" @click="tc"></a-button>
                </div>
               
             </div>
                
               
        </div>
      </a-layout-header>
      <a-layout-content 
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
          <transition mode="out-in">
          <router-view v-if="true" :key="$route.path"></router-view>
       </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { mapMutations } from "vuex";
import xg from './HelloWorld'
  export default {
    data() {
      return {
        collapsed: false,
        mc:'',
        openKeys:["sub1","sub2"]
      };
    },
    components:{
        'my-button':xg
    },
    mounted(){
    this.mc = this.$store.state.mc
   
  },
    methods:{
      ...mapMutations({
      addToken: "setToken",
      getUsername: "getUsername",
      getMc: "getMc"
    }),

        tc(){

      this.addToken("");
      this.$router.push("/");
        },
        home(){
                 this.collapsed=true
            this.$router.push('/index/home')
        },
        cf(){
                this.collapsed=true
            this.$router.push('/index/prescription')
        },
        option(){
                this.collapsed=true
            this.$router.push('/index/Expiration')
        }
    },

  };
</script>
<style>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  

  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

.ant-menu-submenu > .ant-menu{
 background-color: cornflowerblue !important
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
  background-color: skyblue !important;
}
.ant-menu-item span{
  color: #fff;
  font-size: 14px;
  font-family:Arial, Helvetica, sans-serif ;
}
</style>