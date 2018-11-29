<template>
    <div style="padding: .5rem">
      <el-dialog title="投票详情" :visible.sync="Visible">
          <div class="item">
            <span>投票内容指纹</span>
            <span>{{metaItem? metaItem.etag : "no data"}}</span>
          </div>
          <div class="item">
            <span>投票历史指纹</span>
            <span>{{metaItem? metaItem['x-9baas-fingerprint'] : "no data"}}</span>
          </div>
          <div class="item">
            <span>投票节点ID</span>
            <span>{{metaItem? metaItem['x-9baas-userid'] : "no data"}}</span>
          </div>
          <div class="item">
            <span>投票用户</span>
            <span>{{metaItem? metaItem['x-9baas-meta-voter'] : "no data"}}</span>
          </div>
          <div class="item">
            <span>投票对象版本号</span>
            <span>{{metaItem? metaItem['x-9baas-version-id'] : "no data"}}</span>
          </div>
          <div class="item">
            <span>投票上传(最近修改)时间</span>
            <span>{{metaItem? metaItem['last-modified'] : "no data"}}</span>
          </div>

      </el-dialog>
      <el-dialog title="文件内容" :visible.sync="content_visible">
        <el-input
          type="textarea"
          autosize
          placeholder="no data"
          v-model="content">
        </el-input>
      </el-dialog>
      <h2>投票记录</h2>
      <div class="form_container">
          <el-table
            :data="items"
            max-height="65vh"
            border
            style="width: 100%">
            <el-table-column
              prop="timeStamp"
              label="时间戳"
              width="180">
            </el-table-column>
            <el-table-column
              prop="vote_id"
              label="投票项目id"
              width="180">
            </el-table-column>
            <el-table-column
              prop="options"
              label="选择选项">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看元信息</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleDelete(scope.$index, scope.row)">获取文件内容</el-button>
              </template>
            </el-table-column>

          </el-table>

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
        name: "History",
        data() {
          return {
            items: [],
            metaItem: null,
            Visible: false,
            content_visible: false,
            content: ""
          }
        },
        created() {
          instance.post('/getHistory', {
            userId: store.state.userId
          }).then(v => {
            this.$message.success("获取历史纪录成功");
              v.data.forEach(value=>{
                this.items.push({
                  ...value.data,
                  meta: value.meta,
                  options: value.data.options.join(", ")
                });
              })
          }).catch(e=>{
              this.$message.error("获取历史纪录失败");
              console.log(e);
          })
        },
        methods: {
          handleEdit(index, row) {
            this.setMeta(this.items[index].meta);
            console.log(this.items[index].meta);
            this.Visible = true;
          },
          handleDelete(index, row) {
            this.content_visible = true;
            instance.post('/download', {
                userId: this.items[index].userId,
                contentLength: this.items[index]['content-length'],
                vote_id: this.items[index].vote_id,
                timeStamp: this.items[index].timeStamp
            }).then(body=>{
              console.log(body);
               this.content = JSON.stringify(body.data);
            }).catch(e=>{
              this.$message.error("获取失败");
              console.log(e);
            })
          },
          setMeta(meta) {
            this.metaItem = meta;
          }

        }
    }
</script>

<style scoped>
  .form_container {
    width: 90%;
    margin: 0 auto;
  }
  .item {
    color: #161616;
    box-sizing: border-box;
    padding: 0 .5rem;
    width: 100%;
    display: flex;
    line-height: 3rem;
    border-bottom: 1px solid darkgrey;
  }
  .item:nth-of-type(even) {
    background-color: #fbfbfb;
  }
  .item:nth-of-type(odd) {
    background-color: rgba(238, 248, 255, 0.56);
  }
  .item span:nth-of-type(1) {
    flex: 1;
    text-align: left;
  }
  .item span:nth-of-type(2) {
    flex: 2;
    color: #0e466f;
    text-align: right;
  }
</style>
