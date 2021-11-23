<template>
      <el-header>
      <strong>VueAdmin后台管理系统</strong>
      <div class="header-avtar">
          <el-avatar> user </el-avatar>
      <el-dropdown>
        <span class="el-dropdown-link">
            Admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
    </el-header>
</template>

<script>
export default {

}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    width: 100%;
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
</style>