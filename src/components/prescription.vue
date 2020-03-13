<template>
<div>
  <div>

   <atime v-on:cvalue="cvalue"></atime>
  </div>
  <div style="margin-top:10px">
  <a-table sorter="true" rowKey="ID" :columns="columns" :dataSource="data" @change="onChange"  />
  </div>
</div>
</template>
<script>
import shijian from './time'
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      sorter: (a, b) => a.ID - b.ID,
      sortDirections: ['descend','ascend'],
    },
    {
      title: '开具时间',
      dataIndex: 'cfkjsj',
      sorter: (a, b) => new Date(a.cfkjsj) - new Date(b.cfkjsj),
      sortDirections: ['descend', 'ascend'],
    },
     {
      title: '病人姓名',
      dataIndex: 'patient_name',
      sorter: (a, b) => a.patient_name.length - b.patient_name.length,
      sortDirections: ['descend', 'ascend'],
    },
     {
      title: '医师',
      dataIndex: 'yishi_name',
      sorter: (a, b) => a.yishi_name.length - b.yishi_name.length,
      sortDirections: ['descend', 'ascend'],
    },
     {
      title: '病症描述',
      dataIndex: 'bzms',
      sorter: (a, b) => a.bzms.length - b.bzms.length,
      sortDirections: ['descend', 'ascend'],
    }
  ];

  const data = [];

  function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }

  export default {
    data() {
      return {
        data,
        columns,
       test:''
      };
    },
    components:{
     'atime':shijian
    },
      mounted() {
 
  },
    methods: {
      onChange,
      cvalue(cvalue){
      
          this.data=cvalue
      },

    },
  };
</script>
