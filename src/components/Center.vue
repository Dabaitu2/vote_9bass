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

                  <router-link to="/center/myVotes" class="route">
                    <el-menu-item index="1">
                      <i class="el-icon-menu"></i>
                      <span slot="title">
                        我的投票
                        </span>
                    </el-menu-item>
                  </router-link>


                <router-link to="/center/newVote" class="route">
                  <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">
                      发起投票
                      </span>
                  </el-menu-item>
                  </router-link>

            <router-link to="/center/history" class="route">
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">历史信息</span>
            </el-menu-item>
            </router-link>


            <el-menu-item index="4" @click="logout" style="position: absolute; bottom: 10vh; width: 100%">
              <i class="el-icon-menu"></i>
              <span slot="title">
                      退出登录
              </span>
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
  import store from '../store/store'
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
          },
          logout() {
            store.clearLogin();
            this.$router.replace('/login');
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
    box-shadow: 0 0 8px #d6d6d6;
    background-color: white;
  }
  
  .route {
    text-decoration: none;
  }
</style>
