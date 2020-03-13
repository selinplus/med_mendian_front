<template>
<div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;bord:1px solid red">
<div>
    <a-modal title="查询到期时间" v-model="visible" @ok="hideModal" okText="确认" cancelText="取消">
      <p>您好，您的到期时间为{{message}}</p>

    </a-modal>
    <br />
    <br />
    
  </div>
</div>
  
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
        id:'',
        message:''
      };
    },
    mounted(){
      this.id=this.$store.state.mendianID
      this.showModal()
    },
    methods: {
      showModal() {
        var self =this
        this.$axios.get("/api/v1/mendian/expdate?id="+this.id).then(res=>{
          self.message=res.data.data
          self.visible = true;
        })
        
      },
      hideModal() {
        this.visible = false;
        this.$router.push('/index/prescription')
      },
 
    },
  };
</script>