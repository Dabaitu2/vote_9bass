<template>
    <div>
      <div class="container">
      <h1 class="title">发起投票</h1>
      <el-form  ref="ruleForm2" label-width="100px" class="form">
        <el-form-item label="投票标题">
          <el-input type="string"  autocomplete="off" v-model="voteTitle"></el-input>
        </el-form-item>
        <el-form-item label="投票详情">
          <el-input type="textarea"  autocomplete="off" v-model="voteDesc"></el-input>
        </el-form-item>
        <el-form-item label="名单限制" style="float: left">
          <el-switch
            v-model="setDefault"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开启"
            inactive-text="关闭"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <el-form  ref="ruleForm2" label-width="100px" class="form" v-if="setDefault">
        <el-form-item
          v-for="(user, index) in default_voters"
          :label="'用户' + index"
          :key="user.key"
          :rules="{
              required: true, message: '用户不能为空', trigger: 'blur'
           }"
          class="listItem"
        >
          <el-input v-model="default_voters[index].value" style="float: left; width: 60%"></el-input>
          <el-button @click.prevent="removeDefaultVoter(user)" style="float: left;" >删除</el-button>
        </el-form-item>
        <el-form-item style="float: left">
          <el-button type="primary" @click="addDefaultVoter">新增用户</el-button>
          <el-button type="danger" @click="clearDefault">清空</el-button>
        </el-form-item>
      </el-form>
      <el-form  ref="ruleForm2" label-width="100px" class="form">
        <el-form-item
          v-for="(option, index) in options"
          :label="'选项' + index"
          :key="option.key"
          :rules="{
            required: true, message: '选项不能为空', trigger: 'blur'
         }"
          class="listItem"
        >
          <el-input v-model="options[index].value" style="float: left; width: 60%"></el-input>
          <el-button @click.prevent="removeOption(option)" style="float: left" >删除</el-button>
        </el-form-item>
        <el-form-item  label="最大选择数">
          <el-input-number v-model="max" :min="1" :max="optionNum" style="float: left"></el-input-number>
        </el-form-item>
        <el-form-item  label="最少选择数">
          <el-input-number v-model="min" :min="1" :max="max" style="float: left"></el-input-number>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="start"
            type="datetime"
            style="float:left;"
            placeholder="开始时间"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="end"
            style="float:left;"
            type="datetime"
            placeholder="结束时间"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float: left">
          <el-button type="primary" @click="addOption">新增选项</el-button>
          <el-button type="danger" @click="clearOptions">清空</el-button>
        </el-form-item>
      </el-form>
        <el-button
          type="success"
          style="width: 95%;
                 margin-top: 4rem;
                 font-size: 1rem;
                "
          @click="submit"
        >发起投票</el-button>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import {SERVER} from "../constants/config";
  import store from "../store/store";
  const instance = axios.create({
    baseURL: SERVER,
    timeout: 1000,
  });
    export default {
      name: "",
      data() {
        return {
          userId: store.state.userId,
          voteTitle: "",
          voteDesc: "",
          setDefault: false,
          default_voters: [{
            value: '',
            key: Date.now()
          }],
          options: [{
            value: '',
            key: Date.now()
          }],
          max: 0,
          min: 0,
          start: '',
          end: ''
        }
      },
      computed: {
          optionNum: function () {
            return this.options.length
          },
          submit_options: function () {
            return this.options.map((v, index)=>{
                return v.value;
            }).filter((v)=>{
                return v !== '';
            })
          },
          submit_default_voters: function () {
            return this.default_voters.map((v, index)=>{
              return v.value;
            }).filter((v)=>{
              return v !== '';
            })
          }
      },
      methods: {
          addDefaultVoter() {
            this.default_voters.push({
              value: '',
              key: Date.now()
            });
          },
          removeDefaultVoter(item) {
            const index = this.default_voters.indexOf(item);
            if (index !== -1) {
              this.default_voters.splice(index, 1)
            }
          },
          clearDefault() {
            this.default_voters = [];
          },
          addOption() {
            this.options.push({
              value: '',
              key: Date.now()
            })
          },
          removeOption(item) {
            const index = this.options.indexOf(item);
            if (index !== -1) {
              this.options.splice(index, 1)
            }
          },
          clearOptions() {
            this.options = []
          },
          submit () {
            if (this.submit_options.length < 2) {
              this.$message.error('至少需要有超过一个选项');
              return;
            }
            if (this.start === "" || this.end === "") {
              this.$message.error('请设置开始/结束时间');
              return;
            }
            if (this.start >= this.end) {
              this.$message.error('结束时间必须在开始时间之后!');
              return;
            }
            instance.post('/votes', {
                voteTitle: this.voteTitle,
                voteDesc: this.voteDesc,
                min: this.min,
                max: this.max,
                restrict: this.setDefault,
                options: this.submit_options,
                default_voters: this.submit_default_voters,
                voteStarter: store.state.userId
            })
          }
       }
    }
</script>


<style scoped>
  .container {
    font-family: "Microsoft JhengHei UI";
    height: 80vh;
    overflow-y: scroll;
    padding: 0 1rem;
  }
  .form {
    width: 95%;
    float: left;
  }
  .title {
    padding: 1rem 0;
    color: #219eff;
  }
  .listItem {
    width: 60%;
  }
</style>
