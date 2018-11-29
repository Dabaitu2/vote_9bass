<template>
  <div class="background">
    <div class="container">
      <el-form status-icon  ref="ruleForm2" label-width="100px" class="form" >
        <h2 class="title">用户登录</h2>
        <el-form-item label="账户" prop="pass">
          <el-input type="string" v-model="userId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input type="password" v-model="password" autocomplete="off"></el-input>
        </el-form-item>
        <div style="display: flex; width: 100%; justify-content: flex-end">
          <el-button type="primary" @click="submit()">提交</el-button>
          <el-button type="primary" @click="clear()" plain>重置</el-button>
          <el-button><router-link to="/register" class="route">
            去注册
          </router-link></el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    import {SERVER} from "../constants/config";
    import store from '../store/store';
    const instance = axios.create({
      baseURL: SERVER,
      timeout: 1000,
    });
    export default {
        name: "login",
        data() {
          return {
            userId: "",
            password: ""
          }
        },
        methods: {
           submit() {
              if (this.userId.length === 0 || this.password.length ===0 ) {
                this.$message.error('请先完善信息');
                return;
              }
              instance.post('/login', {
                userId: this.userId,
                password: this.password
              }).then(rst=>{
                this.$message.success('登陆成功');
                store.setLogin(this.userId);
                this.$cookies.set('userId', this.userId, 24 * 15 * 3600 * 1000);
                this.$router.push('/center');
              }).catch(e=>{
                this.$message.error('登陆失败');
                console.log(e);
              })

           },
           clear() {
             this.userId = "";
             this.password = "";
           },
        }
    }
</script>

<style scoped>
    .background {
        background-color: #f0f0f0;
        min-height: 100vh;
        padding-top: 30vh;
        box-sizing: border-box;
    }
    .container {
        width: 40%;
        margin: 0 auto;
        border-radius: 6px;
        box-shadow: 0 0 6px #cfcfcf;
    }
    .form {
        background-color: #fff;
        border-radius: 6px;
        padding: 1rem 3rem 2rem 0;
    }
    .title {
      padding-left: 3rem;
      font-weight: normal;
      font-family: "PingFang SC", 'Hiragino Sans GB', 'Microsoft JhengHei UI', "Microsoft YaHei UI";
    }
    .route {
      text-decoration: none;
      color: #858585;
    }
</style>
