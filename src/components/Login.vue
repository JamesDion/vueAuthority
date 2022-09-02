<template>
  <div class="login-bg">
    <!-- <transition name="fade"> -->
        <div class="login">
          <span class="title">王同学-后台管理系统</span>
          <el-row type="flex" class="row-bg">
          <el-col :span="18">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
                <el-form-item label="" prop="userName">
                  <el-input placeholder="请输入用户名" type="text"  v-model="ruleForm.userName" autocomplete="off" clearable>
                    <template slot="prepend"><img src="~@/assets/img/用户名.png" class="userImg" /></template>
                  </el-input>
                </el-form-item>
                <el-form-item label="" prop="pass" >
                  <el-input  placeholder="请输入密码" type="password" v-model="ruleForm.pass" autocomplete="off" clearable show-password>
                    <template slot="prepend"><img src="~@/assets/img/密码.png" class="userImg"/></template>
                  </el-input>
                </el-form-item>
                <el-form-item label="" >
                <el-col :span="16">
                  <el-form-item prop="verificationCode">
                      <el-input onkeyup="value=value.replace(/[^\d]/g,'')"  placeholder="验证码"  v-model.number="ruleForm.verificationCode" @keyup.enter.native="submitForm('ruleForm')" clearable  >
                        <template slot="prepend"><img src="~@/assets/img/验证码.png" class="userImg"/></template>
                      </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <a href="javascript:;" class="verification-code" @click="changeCodeImg()">
                     <!-- <el-image :src="codeImg" alt="图片加载失败" class="codeImg" /> -->
                     <el-image :src="codeImg" alt="图片加载失败"  class="codeImg">
                         <div slot="error" style="font-size: 14px;
                                                  color: rgb(127 123 123);
                                                  font-weight: 700;
                                                  background-color: #d3d0d0;
                                                  position: fixed;
                                                  margin-left: 5px;
                                                  height: 38px;
                                                  width: 80px;
                                                  border-radius: 5px;
                                                  margin-top: -7px;
                                                  line-height: inherit;">
                           加载失败
                         </div>
                     </el-image>
                  </a>
                </el-col>
              </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')" class="subForm" >登录</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
  <!-- </transition> -->
</div>
</template>

<script> 
import common from '../common/common';
export default {
  name: "Login",
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
     var checkVerificationCode = (rule, value, callback) => {
        if (value == '') {
          return callback(new Error('验证码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
              callback();
          }
        }, 1000);
      };
    return {
      codeImg:'',
      loading: true,
      ruleForm: {
        userName: '',
        pass: '',
        verificationCode: ''
      },
      rules: {
          userName: [
            { validator: validateUserName, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          code: [
            { validator: checkVerificationCode, trigger: 'blur' }
          ]
        }
      };
  },
  methods:{
    changeCodeImg:function(){
      //  let uuid = this.$uuid.v1();
      //  sessionStorage.setItem("verification",uuid);
      // 　var num=Math.ceil(Math.random()*10);//生成一个随机数（防止缓存）
        let uuid = "";
        let num=Math.ceil(Math.random()*10);//生成一个随机数（防止缓存）
        let verification = sessionStorage.getItem("verification");
        if(verification == null){
            uuid = this.$uuid.v1(); 
            sessionStorage.setItem("verification",uuid);
        }else{
          uuid = verification;
        }
　　　　this.codeImg = common.codeImg + '?verification='+uuid+'&'+num;
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = {"name":this.ruleForm.userName,
                        "password":this.ruleForm.pass,
                        "verification":sessionStorage.getItem("verification"),
                        "verificationCode":this.ruleForm.verificationCode};
            this.$post("/api/login",data).then(res=>{
              if(res.code == 201 || res.code == 401){
                this.$notify.error({
                  title:'',
                  message: res.msg
                });
              }else{
                this.$notify({
                  title: '',
                  message: '登录成功！',
                  type: 'success'
                });
                this.$router.push({path:'/home'})
              }
            }); 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      
  },
  /**
   * 3.这个钩子函数初始化阶段就会触发执行
   * 数据获取不到，并且真实dom也获取不到
   */
  beforeCreate(){
      console.log("beforeCreate...");
  },
  /**
   * 4.created钩子函数代表数据已经挂载完毕，但是真实dom节点还是没有渲染出来。
     通常在这个钩子函数里面，我们可以进行初始化的一些事件绑定与进行ajax异步请求
     注意：在这个钩子函数里面，如果同步的更改数据的话，是不会影响到运行时钩子函数执行
   */
  created(){
    console.log("created...");
    let uuid = "";
    let verification = sessionStorage.getItem("verification");
    if(verification == null){
        uuid = this.$uuid.v1(); 
        sessionStorage.setItem("verification",uuid);
    }else{
      uuid = verification;
    }
　　this.codeImg = common.codeImg + '?verification='+uuid;
  },
  /**
   * 5.接下来的过程，就是组件或者实例去查找各自的模板，将其编译成虚拟dom
     6.beforeMount代表真实dom马上要被渲染出来了，但是页面中还没有生成真实dom
     beforeMount与created钩子函数用法基本一致，也可以进行初始化事件绑定与ajax请求
   */
  beforeMount(){
    console.log("beforeMount...");
  },
  /**
   *  生成好了虚拟dom了，然后在render函数里面将虚拟dom进行初始化渲染成真实dom树
      相当于在render函数里面做了一个初始化渲染的操作    
       render(){
           console.log("render...")
       }
      7.mounted钩子函数是初始化阶段的最后一个钩子函数
      数据已经挂载完毕了，并且真实的dom元素也已经生成好了
      一般可以进行一些实例化操作 --> 拖拽
   */
  // render(){
  //   console.log("render...");
  // },
  mounted() {
    // 页面加载完成，需要执行的方法
    //  this.$nextTick(function(){
        // 调用需要执行的方法
    // })     
  }
};
</script>

<style scoped>
  .login-bg{
    width: 100%;
    height: 100%;
    display: flex;
    position: fixed;  /**生成绝对定位的元素，相对于浏览器窗口进行定位. */
    align-items: center;/* 横轴 */
    display: -webkit-flex;
    justify-content: center;/* 纵轴 */
    background-image: url('~@/assets/img/背景.png');
  }
  .login{
    border-radius: 10px;
    background-color: white;
    box-shadow:2px 2px 10px #909090;
    -moz-box-shadow: 2px 2px 10px #909090;
    -webkit-box-shadow: 2px 2px 10px #909090;
  }
  .codeImg{
    width: 107px;
    height: 20px;
    object-fit:cover;
    border-radius:8px;
    margin-top: 9px;
  }
  .userImg{
    width: 20px;
  }
  .el-input{
    font-size: 12px;
  }
  .subForm{
    width: 250px;
  }
  .title{
    display: flex;
    font-weight: 800;
    margin-top: 10px;
    margin-bottom: 15px;
    justify-content: center;/*主轴上的对齐方式 */

  }
/* transition 加入页面刷新无效果 */
/* https://cn.vuejs.org/v2/guide/transitions.html#%E5%8D%95%E5%85%83%E7%B4%A0-%E7%BB%84%E4%BB%B6%E7%9A%84%E8%BF%87%E6%B8%A1 */
/* demo元素显示动画 开始状态的效果i的css */
/* .t2-enter{
    opacity:0; 
    background-color: royalblue;
} */
/* active用于添加过度时间,插入过程 */
/* .t2-enter-acitve{
    transition:all  2s;
} */
/* 添加过度时间，离开过程 */
/* .t2-leave-active{
  transition:all 2s;
}    */
 /*to 结束动画时，结束状态的效果  */
/* .t2-leave-to {
    opacity:1 ;
    background-color:blue;
} */
</style>
