<template>
  <div>
    <iframe ref="frm" src="http://localhost:2002/editor"/>
  </div>
</template>
<script setup lange="ts">
  import {ref,onMounted} from 'vue';

  const frm=ref();

  onMounted(()=>{
    frm.value.contentWindow.onmessage=e=>{
      console.log(e,'msg')
    }
    // message(e=>{
    //   console.log(e,'msg')
    // })
    // frm.value.contentWindow.onmessage=e=>{
    //   console.log(e,'e')
    // }
  })

</script>
<style scope></style>