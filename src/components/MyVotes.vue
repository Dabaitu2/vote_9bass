<template>
    <div>
      <el-row :gutter="12">
        <ul class="no_ul scroll">
          <li v-for="item in items" class="no_li">
            <el-col :span="8" class="padding" >
              <el-card shadow="hover" >
                <div slot="header" class="clearfix" @click="handleClick(item)">
                  <el-tag v-if="item.status" type="success" size="small" style="float: left">进行中</el-tag>
                  <el-tag v-if="!item.status" type="info" size="small" style="float:left;">已结束</el-tag>
                  <span>{{item.voteTitle}}</span>
                </div>
                <div>
                  <span style="float: left">项目id</span><span>{{item.id}}</span>
                </div>
              </el-card>
            </el-col>
            </li>
        </ul>
      </el-row>
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
        name: "",
        data() {
            return {
              items: []
            }
        },
        created() {
            instance.post('/MyProjects', {
                userId: store.state.userId
            })
              .then(rst=>{
                if(rst.data.status === "success") {
                  console.log(rst);
                  const length = rst.data.rtr.length;
                  for (let i=0; i< length; i++) {
                     this.items.push({
                       ...rst.data.rtr[i],
                       status: new Date().getTime() <= rst.data.rtr[i].end
                     });
                  }
                }
              }).catch(e=>{
                this.$message.warning('没有获取到数据!');
                console.log(e);
            })

        },
        methods: {
          handleClick(item) {
            console.log("hhhh");
            this.$router.push({
                path: `/vote/${item.id}`
            });
          }
        }
    }
</script>


<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .scroll {
    max-height: 80vh;
    overflow-y: scroll;
    margin: 0;
  }

  .padding {
    margin: 10px 0;
  }

  .no_li {
    text-decoration: none;
    list-style: none;
  }

  .no_ul {
    width: 95%;
    padding: 0 20px;
    padding-top: 15px;
  }



</style>
