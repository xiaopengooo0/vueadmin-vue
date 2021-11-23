<template>
<el-container>
  <el-aside width="200px">
      <SideMenu></SideMenu>
  </el-aside>
  <el-container>
      <el-header>
      <strong>VueAdmin后台管理系统</strong>
      <div class="header-avtar">
          <el-avatar :src="userInfo.avatar"></el-avatar>
      <el-dropdown>
        <span class="el-dropdown-link">
            {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link :to="{name: 'UserCenter'}">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <Tabs></Tabs>
      <div style="margin:0px 15px">
        <router-view/>
      </div>
       
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import Tabs from './inc/Tabs.vue'
import SideMenu from '../views/inc/SideMemu.vue'
export default {
    name:'Home',
    components:{
        SideMenu,Tabs
    },
    data(){
      return{
        userInfo:{
          id:'',
          username:'',
          avatar:''
        },

        
      }
    },
    created(){
      this.getUserInfo()
    },
    methods:{
      getUserInfo(){
        this.$axios.get("/sys/userInfo").then(res=>{
          //console.log(res.data);
          this.userInfo=res.data.data
        })
      },
      logout(){
        // alert("ok")
        this.$axios.post('/logout').then(res=>{
          // console.log(res.data);
          localStorage.clear()
          sessionStorage.clear()
          this.$store.commit('resetState')
          this.$router.push('/login')
        })
      }
    }
}
</script>

<style>
  .el-container{
    padding: 0;
    margin: 0;
    height: 100%;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .header-avtar{
      float: right;
      width: 110px;
      height: 60px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      size: medium;
  }
    .el-dropdown-link {
    cursor: pointer;
    
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
    text-align: left;
  }
  
  .el-main {
    background-color: #E9EEF3;
    padding: 0px !important;
    /* text-align: center; */
    /* line-height: 160px; */
  }
  a{
    text-decoration: none;
  }
</style>