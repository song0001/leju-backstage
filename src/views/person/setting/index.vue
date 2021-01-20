<template>
  <el-card class="card" shadow="never">
    <el-tabs tab-position="left">
      <el-tab-pane label="安全设置">
        <div class="content">
          <div class="title">安全设置</div>
          <div class="security-item">
            <div>
              <div class="sec_text">账号密码</div>
              <div class="sec_text2">当前密码强度: 强</div>
            </div>
            <a style="color: rgb(64, 158, 255)">修改</a>
          </div>
          <div class="security-item">
            <div>
              <div class="sec_text">密保手机</div>
              <div class="sec_text2">已绑定手机：138****8293</div>
            </div>
            <a style="color: rgb(64, 158, 255)">修改</a>
          </div>
          <div class="security-item">
            <div>
              <div class="sec_text">密保问题</div>
              <div class="sec_text2">
                未设置密保问题，密保问题可有效保护账户安全
              </div>
            </div>
            <a style="color: rgb(64, 158, 255)">修改</a>
          </div>
          <div class="security-item">
            <div>
              <div class="sec_text">备用邮箱</div>
              <div class="sec_text2">已绑定邮箱：ant***sign.com</div>
            </div>
            <a style="color: rgb(64, 158, 255)">修改</a>
          </div>
          <div class="security-item">
            <div>
              <div class="sec_text">MFA 设备</div>
              <div class="sec_text2">未绑定 MFA 设备，绑定后，可以进行二次确认</div>
            </div>
            <a style="color: rgb(64, 158, 255)">修改</a>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="新消息通知">
        <div class="content">
          <div class="title">新消息通知</div>
          <div class="security-item">
            <div>
              <div class="sec_text">账户密码</div>
              <div class="sec_text2">其他用户的消息将以站内信的形式通知</div>
            </div>
            <div style="color: rgb(64, 158, 255)">
              <el-switch v-model="value1" :active-value="true" :inactive-value="false" />
            </div>
          </div>
          <div class="security-item">
            <div>
              <div class="sec_text">系统消息</div>
              <div class="sec_text2">系统消息将以站内信的形式通知</div>
            </div>
            <div style="color: rgb(64, 158, 255)">
              <el-switch v-model="value2" :active-value="true" :inactive-value="false" />
            </div>
          </div>
          <div class="security-item">
            <div>
              <div class="sec_text">待办任务</div>
              <div class="sec_text2">待办任务将以站内信的形式通知</div>
            </div>
            <div style="color: rgb(64, 158, 255)">
              <el-switch v-model="value3" :active-value="true" :inactive-value="false" />
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
    data() {
        return {
            value1: true,
            value2: true,
            value3: true
        }
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style scoped lang="scss">
.card {
  margin: 30px;
  // background-color: #f0f2f5;
  .content {
    position: relative;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    // height: 1500px;
    // background-color: orange;
    .title {
      font-size: 22px;
      margin-bottom: 20px;
    }
    .security-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      height: 80px;
      padding: 15px;
      border-bottom: 1px solid #f0f0f0;
      .sec_text {
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        margin-bottom: 10px;
      }
      .sec_text2 {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
