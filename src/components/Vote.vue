<template>
    <div class="background">
      <h3>当前ID: {{id}}</h3>
      <h3>发起人: {{voteStarter}}</h3>
      <div class="form_container">
        <h3>{{voteTitle}}</h3>
        <h5>{{voteDesc}}</h5>
        <el-checkbox-group
          v-model="checks"
          :min="min"
          :max="real_max">
          <el-checkbox v-for="item in items" :label="item" :key="item.title">{{item.title}}</el-checkbox>
        </el-checkbox-group>
        <div >
        <el-table
          :data="items"
          border
          style="margin-top: 30px">
          <el-table-column
            prop="title"
            label="选项"
            width="180">
          </el-table-column>
          <el-table-column
            prop="num"
            label="投票数"
            width="180">
          </el-table-column>
        </el-table>
        </div>
        <el-button type="success" class="btn" @click="submit">确定投票</el-button>
      </div>
    </div>
</template>

<script>
  const Options = ['上海', '北京', '广州', '深圳'];
  import axios from 'axios';
  import {SERVER} from "../constants/config";
  import store from '../store/store';
  const instance = axios.create({
    baseURL: SERVER,
    timeout: 1000,
  });
  export default {

        name: "",
        data() {
            return {
              id: null,
              userId: null,
              items: [],
              checks: [],
              voteTitle: "等待加载",
              voteStarter: "等待加载",
              voteDesc: "等待加载",
              min: 1,
              max: 0
            }
        },
        computed: {
            real_max: function () {
                return this.max > 0 ? this.max : this.items.length
            },
            action: function () {
               return this.checks.map((v)=>({
                  id:   v.selector_id,
                  title: v.title
               }))
            }
        },
        created() {
          this.id = this.$route.params['id'];
          instance.get(`votes/${this.id}`).then(rst=>{
            console.log(rst);
             this.voteTitle = rst.data[0].voteTitle;
             this.voteDesc = rst.data[0].voteDesc;
             this.voteStarter = rst.data[0].voteStarter;
             this.max = rst.data[0].max ? rst.data[0].max : 0;
             rst.data[0].selectors.forEach(v=>{
                this.items.push(v)
            });
          }).catch(err=>{
            this.$message.error("数据获取失败!");
            console.log(err);
          })
        },
        methods: {
          submit() {
            const send = {
              voteTitle: this.voteTitle,
              id: this.id,
              userId: store.state.userId,
              action: this.action
            };
            console.log(send);
            instance.post('/addVote', send)
              .then(rst=>{
                console.log(rst);
                this.$message.success("投票成功!");
              })
              .catch(e=>{
                console.log(e);
                this.$message.error("投票失败!");
              })
          }
        }
    }
</script>


<style scoped>
  .form_container {
    width: 70%;
    min-height: 50vh;
    box-shadow: 0 0 6px #d6d6d6;
    margin: 0 auto;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

  }

  .background {
    background-color: #dfe9ff;
    height: 100vh;
    overflow: hidden;
  }

  .btn {
    margin: 30px auto;
    width: 60%;
  }
</style>
