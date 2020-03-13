<template>
  <div>
    <a-button type="primary" shape="circle" icon="user" style="border:0px; background: cornflowerblue" @click="showModal"></a-button>
    <a-modal title="修改密码" v-model="visible" @ok="hideModal" okText="确认" cancelText="取消">
    <a-form :form="form" @submit="hideModal">
    <a-form-item  v-bind="formItemLayout" label="新密码">
      <a-input
   
        v-decorator="[
          'password',
          {
            rules: [
              {            
                required: true,
                message: '新密码不能低于5位',
                min:5
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />
      </a-form-item>
    <a-form-item v-bind="formItemLayout" label="确认新密码">
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '',
               
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
  </a-form>
    </a-modal>
   
  </div>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
        id:"",
         formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      };
    },
     beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'xgmm' });
  },
  mounted(){
    this.id=this.$store.state.mendianID
  },
    methods: {
      showModal() {
        this.visible = true;
      },
      validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('您输入的两次密码不一致！');
      } else {
        callback();
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    hideModal(e) {
      var self=this
        this.visible = false;
         e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
         if((values.password==values.confirm)!=""){
          self.$axios
          .post("/api/v1/mendians/eidtpass", { id: self.id, password: values.confirm})
          .then(res => {
            console.log(res)
            if (res.data.code == 200) {

            self.$message.success('密码修改成功！',5);
            } else {
            self.$message.error('密码修改失败！',5);
            }
          });
         }
        
        }else{
          
               self.$message.error("密码修改失败！",5); 
         }
      });
      },
    },
  };
</script>
<style >

.ant-modal-header{
  background-color:cornflowerblue !important
}

</style>