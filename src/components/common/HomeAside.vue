<template>
  <div class="homeAside">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
     <el-menu-item index="0">
        <!-- <i class="el-icon-menu"> -->
          <img src="~@/assets/img/网站图标.png" class="imgTb"/>
        <!-- </i> -->
        <span class="title">小王管理系统</span>
    </el-menu-item>
    <!-- <el-submenu index="1">
        <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
    </el-submenu> -->
    <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
    </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'HomeAside',
  data () {
    return {
        isCollapse: ''
    }
  },
  mounted(){
    // 兄弟传值
    this.$eventBus.$on('isCollapse', (val) => {
      this.isCollapse = val
    })
  },
  methods: {
    handleOpen(key, keyPath) {
    console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
    console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
  }
  .homeAside{
    display: flex;
    margin-left: -15px;
  }
  .imgTb{
    width: 20px;
    height: 20px;
    margin-left: 10px;
    display: inline-grid;
  }
  .title{
    color: black;
    font-size: 14px;
    font-weight: 700;
    margin-left: 3px;
  }
</style>
