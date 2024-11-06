<template>
  <el-image :src="url + '?' + data" alt="换一张" style="width:100%; cursor:pointer" @click="refresh">
    <template #placeholder>
      <div class="tip">
        loading...
      </div>
    </template>
  </el-image>
</template>
<script>
export default {
  name:'VCode',
  data(){
    return {
      date:'',
    }
  },
  computed:{
     url(){
      return 'http://47.105.96.116:8082/ptcp-demo/api/captcha'
     }
  },
  methods:{
    refresh(){
      const currentTime = new Date().getTime()
      const randomNumber = new floor(Math.random() *1000)
      this.date=currentTime+randomNumber.toString().padStart(3,'0')
    }
  }
}
</script>
<style scoped>
.tip{
  background-color:#fff;
  width:100%;
  height: 100%;
}
</style>
