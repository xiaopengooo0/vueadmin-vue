<template>
    <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
        <h2>欢迎来到VueAdmin管理系统</h2>
        <el-image :src="require('@/assets/logo.png')" style="height:180px;width:180px"></el-image>
         <h2>欢迎来到VueAdmin管理系统</h2>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider></el-col>
    <el-col :xl="6" :lg="7">
       <el-form ref="loginform" :model="LoginForm" :rules="rules" label-width="80px">
         <el-form-item label="账号" prop="username" style="width:380px">
           <el-input v-model="LoginForm.username"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="password" style="width:380px">
           <el-input v-model="LoginForm.password" type="password"></el-input>
         </el-form-item>
         <el-form-item label="验证码" prop="code" style="width:380px">
           <el-input v-model="LoginForm.code" style="width:172px;float:left" ></el-input>
           <el-image class="image" :src='captchaImg' @click="getCaptcha"></el-image>
         </el-form-item>
          <el-form-item>
    <el-button type="primary" @click="submitForm('loginform')">登录</el-button>
    <el-button @click="resetForm('loginform')">重置</el-button>
  </el-form-item>
       </el-form>
    </el-col>
</el-row>
</template>

<script>
import qs from 'qs'
export default {
  data (){
    return{
      LoginForm:{
        username:'admin',
        password:'111111',
        code:'12345',
        token:''
      },
      captchaImg:null,
      rules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 5, max: 5, message: '长度 5 个字符', trigger: 'blur' }
          ]
      }
    };
  },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //console.log(qs.stringify(this.LoginForm));
            this.$axios.post('/login?'+qs.stringify(this.LoginForm)).then(res=>{
              
                const jwt = res.headers['authorization']
                //Authorization
                //console.log(jwt);
                this.$store.commit('SET_TOKEN',jwt)
                //console.log(this.$store.state.token);
                this.$router.push('/index')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getCaptcha(){
        this.$axios.get('/captcha').then(res=>{
          //console.log(res);
                this.LoginForm.token=res.data.data.token;
                this.captchaImg=res.data.data.base64Img;
                this.LoginForm.code='';
            })
      }
    },
    created(){
      this.getCaptcha();
    }
    

}
</script>

<style>
    .el-row {
      background-color: #fafafa;
      height: 100%;
      display: flex;
      align-items: center;
      text-align: center;
    }
    .el-divider{
      height: 200px;
    }
    .image{
      float: left;
      margin-left: 8px;
      border-radius: 5px;
    }
</style>