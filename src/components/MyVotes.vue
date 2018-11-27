<template>
    <div>
      <el-row :gutter="12">
        <ul class="no_ul scroll">
          <li v-for="item in items" class="no_li">
            <el-col :span="8" class="padding" >
              <el-card shadow="hover" >
                <div slot="header" class="clearfix" @click="handleClick(item)">
                  <span>{{item.title}}</span>
                </div>
                <div>
                  <span>投票项目id: {{item.id}}</span>
                </div>
              </el-card>
            </el-col>
            </li>
        </ul>
      </el-row>
    </div>
</template>

<script>

    const MOCK_DATA = [
      {
        title: "测试投票数据1",
        id: 1,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据2",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据3",
        id: 3,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据4",
        id: 4,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据5",
        id: 5,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 1,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      },
      {
        title: "测试投票数据1",
        id: 2,
        userId: 'test_user_01'
      }
    ];

    export default {
        name: "",
        data() {
            return {
              items: MOCK_DATA.slice(0)
            }
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
