<template>
  <div class="HomeHeader">
    <span  @click="collapseChange(isCollapse)" style="margin-bottom: 20px;"> 
         <img v-if="this.isCollapse==false" src="~@/assets/img/侧边伸缩左伸.png" alt="正在加载图片" class="img"/>
         <img v-if="this.isCollapse==true" src="~@/assets/img/侧边伸缩右伸.png" alt="正在加载图片" class="img"/>
    </span>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
        isCollapse : true
    }
  },
  computed :{
    imgUrl: function () {
            return this.url;
        }
  },
  mounted(){
    
  },
  methods: {
    // 兄弟组件传值
    collapseChange (val) {
      this.isCollapse=!val;
      this.$eventBus.$emit('isCollapse', this.isCollapse)
    }
  }
}
</script>

<style scoped>
  .img{
      width: 20px;
      height: 20px;
      display: flex;
      margin-top: 20px;
  }
</style>
