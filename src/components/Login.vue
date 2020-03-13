
<template>
<div class="login">
  <a-row style="height:100%" type="flex" align="middle" justify="center" >
    <a-col  :lg="4" :xs="0" >
      
<img src="../assets/login1.jpg" style="width:300px;margin-left:20px" alt="">
      
    </a-col>
     <a-col :lg="10" :xs="24" >
<div  class="card" >      
          <a-card  style="background-color:#E9EAEB;" :title="mc"  :bodyStyle='bs' :headStyle="hs">  
         <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="andleSubmit"
  >
    <a-form-item>
      <a-input
        style="width:350px"
        v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入您的用户名!' }] },
        ]"
        placeholder="用户名"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
      style="width:350px"
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入您的密码!' }] },
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
 
<div style="
      display: flex;
      align-items: center;
      justify-content: center;">
        <a-button type="primary" html-type="submit" style="width:100px;background-color:cornflowerblue;" class="login-form-button">
        登录
      </a-button>
</div>
    </a-form-item>
  </a-form> 
    </a-card>
  </div> 
     </a-col>
  </a-row>
  

       
    </div>


</template>

<script>
import { mapMutations } from "vuex";
  export default {
    data(){
      return {
        snackbar:false,
        xs:'',
      mc:'药店管理端',
    hs:{
      "background-color":"cornflowerblue","width":"490px", "border-radius":"10px","color":"#ffffff",   "display": "flex",
      "align-items": "center",
      "justify-content": "center"
    },
    bs:{
      "display": "flex",
      "align-items": "center",
      "justify-content": "center"
    }
    
      }
    },
     beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
 watch: {
      xs(val) {
        console.log(val)
      },},
  mounted(){
  
  },
    methods:{
        ...mapMutations({
      addToken: "setToken",
      addUsername: "setUsername",
      addMc: "setMc",
      addMendianID:"setMendianID"
    }),
      andleSubmit(e) {
       
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {   
         let self = this;
        
        this.axios.get(
            "/mendian/webauth" +
              "?username=" +
              values.userName +
              "&password=" +
              values.password
          )
          .then(res => {
           console.log(res)
            if (res.data.code == 200) {
            
              self.addToken(res.data.data.token);
              self.addUsername( values.userName);
              self.addMendianID(res.data.data.data.ID);
              self.addMc(res.data.data.data.mc);
              self.text = res.data.data.msg;
              self.snackbar = true;
              self.$router.push("index/prescription");
            } else {
              self.snackbar = true;
              self.$message.error('账号或密码不正确！')  }
          });
      } 
        
      });
    },
   
    }
  }
</script>
<style>
 


 
  #app{
    margin-top:0px
  }

  .card{
   
     border-radius:20px;
     width: 490px;
     height:280px;
     background:#E9EAEB;
     box-shadow:2px 2px 50px 2px rgba(0,0,0,0.3);
  }
  .login{

    width: 100vw;
    height: 100vh;
 }

body{
  background:#F0F2F5
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>