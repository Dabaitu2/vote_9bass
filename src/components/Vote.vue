<template>
    <div class="background">
      这是投票页面
      <h3>当前ID: {{id}}</h3>
      <h3>发起人: {{userId}}</h3>
      <div class="form_container">
        <h3>选择你最喜欢的城市</h3>
        <el-checkbox-group
          v-model="checks"
          :min="1"
          :max="2">
          <el-checkbox v-for="item in items" :label="item" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
</template>

<script>
  const Options = ['上海', '北京', '广州', '深圳'];
  export default {

        name: "",
        data() {
            return {
              id: null,
              userId: null,
              items: Options,
              checks: []
            }
        },
        created() {
          this.id = this.$route.params['id'];
        }
    }
</script>


<style scoped>
  .form_container {
    width: 70%;
    min-height: 50vh;
    box-shadow: 0 0 6px gray;
    margin: 0 auto;
    padding: 10px;
    background-color: #fff;
  }

  .background {
    background-color: #c2e1ff;
    height: 100vh;
    overflow: hidden;
  }
</style>
