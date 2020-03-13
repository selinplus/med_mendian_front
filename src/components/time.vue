<template>
  <a-row  >
    <a-col :xs="24" :lg="22">
       <a-range-picker
      style="width:300px;margin-right:10px"
      :showTime="{ format: 'HH:mm' }"
      format="YYYY-MM-DD"
      :placeholder="['开始时间', '结束时间']"
      :defaultValue="[moment(begtime, dateFormat),moment(endtime, dateFormat)]"
      @change="onChange"
    />
      
    <a-button  style="" type="primary" icon="search" @click="btn">搜索</a-button>
    </a-col>
    <a-col :xs="24"  :lg="0" />
 
  
   
    <a-col :xs="22" :lg="1" >
        <a-button type="primary" shape="circle" icon="download" style="border:0px; background: cornflowerblue" @click="downcf"></a-button>
    </a-col>
    <a-col  :xs="2"  :lg="1">
      <a-popconfirm
      
    title="您确定删除全部处方单吗？"
    @confirm="confirm"
    
    okText="确定"
    cancelText="取消"
  >
    <a-button type="primary" shape="circle" icon="delete" style="border:0px; background: cornflowerblue"></a-button>
  </a-popconfirm>
      
    </a-col>
  </a-row>
</template>
<script>
import moment from 'moment';
  export default {
    data(){
return{
  begtime:'',
  endtime:'',
  dateFormat: 'YYYY-MMDD',
  id:'',
  mc:''

}
    },
    methods: {
      moment,
        confirm(e) {
           this.$axios.get("/api/v1/clearmdcf?id="+this.id).then(res=>{
             if(res.data.msg=="ok"){
          this.$message.success('删除成功')
             }
             
        })
       
      },
    
  downcf: function() {
      this.$axios
        .get(
         "/api/v1/mgroup/downloadcf?mendianID="+this.id+"&begtime="+this.begtime+"&endtime="+this.endtime
        )
        .then(res => {
          if (res.data.data) {
            var src = window.location.protocol + "//" + window.location.host + "/export/" + res.data.data;
            var iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = src;
            document.getElementsByTagName("body")[0].appendChild(iframe);
          }
        });
    },
      onChange(dates,dateString){
         this.begtime=dateString[0]
         console.log( this.begtime)
         this.endtime=dateString[1]
         console.log(this.endtime)
      },

      btn(){
      
         this.$axios.get("/api/v1/mgroup/presuri?mendianID="+this.id+"&begtime="+this.begtime+"&endtime="+this.endtime).then(res => {
          if (res.data.data) {
             this.$emit('cvalue', res.data.data)
          }
        })
      }

    },
    mounted(){
      this.btn();
    },
    created(){
      this.begtime= moment(new Date(), this.dateFormat)
      this.endtime= moment(new Date(), this.dateFormat)
      this.id=this.$store.state.mendianID;
      this.mc=this.$store.state.mc
    },
  };
</script>