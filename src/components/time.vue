<template>
  <a-row  >
    <a-col :xs="24" :lg="22">
       <a-range-picker
        :ranges="{ 当天: [moment(), moment()], '本月': [moment().startOf('month'), moment().endOf('month')] }"
      style="width:300px;margin-right:10px"
      format="YYYY-MM-DD"
      :placeholder="['开始时间', '结束时间']"
      :defaultValue="[moment(begtime, dateFormat),moment(endtime, dateFormat)]"
      @change="onChange"
    />
      
    <a-button  style="" type="primary" icon="search" @click="btn">搜索</a-button>
    </a-col>
    <a-col :xs="24"  :lg="0" />
 
  
   
    <a-col :xs="22" :lg="1" >
        <a-button type="primary" :disabled="disabled" shape="circle" icon="download" style="border:0px; background: #2196F3" @click="downcf"></a-button>
    </a-col>
    <a-col  :xs="2"  :lg="1">
      <a-popconfirm
      
    title="您确定删除全部处方单吗？"
    @confirm="confirm"
    
    okText="确定"
    cancelText="取消"
  >
    <a-button type="primary" shape="circle" icon="delete" style="border:0px; background: #2196F3"></a-button>
  </a-popconfirm>
      
    </a-col>
  </a-row>
</template>
<script>
import moment from 'moment';
import 'moment/locale/zh-cn'; 
moment.locale('zh-cn');
  export default {
    data(){
return{
  begtime:'',
  endtime:'',
  dateFormat: 'YYYY-MM-DD',
  id:'',
  mc:'',
  disabled:false

}
    },
    methods: {
      moment,
        confirm() {
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
         this.endtime=dateString[1]
      },

      btn(){
      
         this.$axios.get("/api/v1/mgroup/presuri?mendianID="+this.id+"&begtime="+this.begtime+"&endtime="+this.endtime).then(res => {
           if(res.data.data==null){
               this.disabled=true
           }else{
          this.disabled=false
           }
        
             this.$emit('cvalue', res.data.data)
         
        })
      },


    },
    mounted(){
        this.btn();
    },
    created(){
      this.begtime=moment().format('YYYY-MM-DD')
      this.endtime= moment().format('YYYY-MM-DD')
      this.id=this.$store.state.mendianID;
      this.mc=this.$store.state.mc;
    
    },
  };
</script>