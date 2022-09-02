<template>
    <div>
        <el-container>
        <!-- <el-aside width="200px"> -->
          <home-aside></home-aside>
        <!-- </el-aside> -->
        <el-container>
            <el-header>
              <home-header ></home-header>
            </el-header>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
        </el-container>
        </el-container>
    </div>
</template>

<script> 
import HomeAside from './common/HomeAside';
import HomeHeader from './common/HomeHeader.vue';
export default {
  components: { HomeAside,HomeHeader },
  name: "Home",
  data() {
    return {

    };
  
  },
  methods:{
      
  },

  beforeCreate(){
      console.log("beforeCreate...");
  },

  created(){
    console.log("created...");
    // ajax
  },

  beforeMount(){
    console.log("beforeMount...");
  },
 
  mounted() {
    // 页面加载完成，需要执行的方法
    //  this.$nextTick(function(){
        // 调用需要执行的方法
    // })     
  }
};
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 100vh; /** 相对于视框的高度 */
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-container {
    height: 100vh;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
