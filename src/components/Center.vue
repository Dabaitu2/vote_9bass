<template>
    <div class="container">
      <el-row class="tac full">
        <el-col :span="4" >
          <h5 class="center_header">个人中心</h5>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo full"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
                <span slot="title">
                  <router-link to="/center/myVotes">
                    我的投票
                  </router-link>
                </span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">
                <router-link to="/center/newVote">
                    发起投票
                  </router-link>
              </span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">历史信息</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <div class="panel">
            <router-view />
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {}
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
  .container {
    background-color: #f4f4f4;
  }
  .full {
    height: 100vh;
    overflow: hidden;
  }
  
  .center_header {
    border-right: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    padding: 0;
    margin: 0;
    line-height: 4rem;
    background-color: #fff;
  }

  .panel {
    box-sizing: border-box;
    margin: 5%;
    height: 85vh;
    width: 90%;
    border-radius: 5px;
    box-shadow: 0 0 6px #828282;
    background-color: white;
  }
</style>
