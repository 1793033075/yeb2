<template>
  <div>
    <el-form :rules="rules"
             v-loading="loading"
             element-loading-text="正在登录..."
             element-loading-spinner="el-icon-loading"
             element-loading-background="rebg(0,0,0,0.8)"
             ref="loginForm"
             :model="loginForm"
             class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" v-model="loginForm.password" aria-placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width: 250px;margin-right: 5px
"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha">
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRember">记住我</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitlogin">登录</el-button>

    </el-form>

  </div>

</template>

<script>
// import { postRequest } from '../utils/api'

export default {
  name: 'login',
  data () {
    return {
      captchaUrl: '/captcha?time' + new Date(),
      loginForm: {
        username: 'admin',
        password: '123',
        code: ''

      },
      loading: false,
      checked: true,
      rules: {
        // eslint-disable-next-line no-labels,no-unused-expressions
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    updateCaptcha () {
      this.captchaUrl = '/captcha?time=' + new Date()
    },
    submitlogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.postRequest('/login', this.loginForm).then(resp => {
            if (resp) {
              const tokenStr = resp.obj.tokenHead + resp.obj.token
              window.sessionStorage.setItem('tokenStr', tokenStr)
              // 跳转首页
              this.$router.replace('home')
              this.loading = false
            }
          })
        } else {
          this.$message.error('请输入所有字段')
          // console.log('error submit')
          return false
        }
      })
    }
  }
}
</script>

<style>
  .loginContainer{
    border-radius: 15px;
    background-clip:padding-box;
    margin: 188px auto;
    width: 358px;
    padding: 15px 35px 15px 35px;
    background: #fff;
    border:1px solid #eaeaea;
    box-shadow: 0 0 25px #7e77ca;
  }
  .loginTitle{
    margin: 0 auto 40px auto;
    text-align: center;
  }
  .loginRember{
    text-align: left;
    margin: 0 0 15px 0;
  }
  .el-form-item__content{
    display: flex;
    align-items: center;
  }

</style>
