<template>
  <div class="login-container">
      <div class="loginbox">
         <el-form  id="login" class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" status-icon ref="loginForm" label-position="left">
          <h3 class="title">hy-vue-admin</h3>
          <el-form-item label="账号" prop="username">
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"></el-input>
          </el-form-item>
          <el-form-item class="el-form-item-button">
            <el-button type="primary" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { isValidUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isValidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        userename: '',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername}],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      loginFlag: false
    }
  },
  created () {
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm)
                    .then(() => {
                      console.log('登录成功')
                      this.$router.push({ path: '/Admin' })
                      this.loading = false
                    }).catch(err => {
                      console.log('登录失败: ' + err)
                      this.loading = false
                    })
        } else {
          console.log('Error Submit!')
          return false
        }
      })
    },
    switchPages () {
      this.loginStatus = !this.loginStatus
    },
    register () {},
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  components: {
  }
}
</script>

<style lang="stylus">
$bg = #2d3a4b
$light_gray = #616161
.login-container
  .el-input
    display inline-block
    height 47px
    width 85%
    input
      background transparent
      border 0
      -webkit-appearance none
      border-radius 0
      padding 12px 5px 12px 15px
      color $light_gray
      height 47px
      &:-webkit-autofill
        -webkit-box-shadow 0 0 0 1000px $bg inset!important
        -webkit-text-fill-color #fff!important
  .el-form-item
    // border 1px solid rgba(255, 255, 255, 0.1)
    background rgba(0, 0, 0, 0.1)
    border-radius 5px
    color #eee
</style>

<style lang="stylus" scoped>
$bg = #2d3a4b
$dark_gray = #889aa4
$light_gray = #90aeff
.login-container
  position fixed
  height 100%
  width 100%
  background-color $bg
  .login-form
    position absolute
    // background-color #d5def5
    left 0
    right 0
    width 520px
    padding 35px 35px 15px 35px
    margin 120px auto
    .title
      font-size 26px
      font-weight 400
      color $light_gray
      margin 0 auto 40 auto
      text-align center
      font-weight bold
    .el-form-item
      &:last-child
        display flex
        justify-content center
</style>