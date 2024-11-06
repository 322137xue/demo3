<template>
  <div>
    <el-main>
      <el-button @click="showDialog">添加</el-button>
      <el-button @click="addData">修改</el-button>
      <el-button @click="deleteData">删除</el-button>
      <el-button @click="getData">更新</el-button>
      <el-button @click="InputShow = !InputShow">显示输入框</el-button>
      <el-input v-if="InputShow" v-model="cont" />
      <el-table :data="tableData" data-index="1-1">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="password" label="密码" width="120" />
        <el-table-column prop="radio" label="性别" width="120" />
        <el-table-column prop="age" label="年龄" width="120" />
        <el-table-column prop="formattedDated" label="日期" width="120" />
        <el-table-column prop="className" label="班级名" width="120" />
        <el-table-column prop="Iph" label="手机号" width="120" />
        <el-table-column prop="Emit" label="电子邮箱" width="120" />
      </el-table>
      <!-- 注册/添加 -->
      <el-dialog :visible="dialogVisible" @close="closeDialog">
        <!-- 弹窗内容 -->
        <el-form ref="form" :model="form" label-width="80px" class="login-box" :rules="rules">
          <el-form-item label="账号" prop="login">
            <el-input v-model="form.login" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="性别" prop="radio">
            <el-radio v-model="form.radio" label="男">男</el-radio>
            <el-radio v-model="form.radio" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" placeholder="请输入年龄" />
          </el-form-item>
          <el-form-item label="出生日期" prop="data">
            <el-date-picker v-model="form.data" type="date" placeholder="选择出生日期" />
          </el-form-item>
          <el-form-item label="年级" prop="class">
            <el-select v-model="form.class" placeholder="请选择年级">
              <el-option label="一年级" value="一年级" />
              <el-option label="二年级" value="二年级" />
              <el-option label="三年级" value="三年级" />
              <el-option label="四年级" value="四年级" />
              <el-option label="五年级" value="五年级" />
              <el-option label="六年级" value="六年级" />
              <el-option label="七年级" value="七年级" />
              <el-option label="八年级" value="八年级" />
              <el-option label="九年级" value="九年级" />
              <el-option label="十年级" value="十年级" />
            </el-select>
          </el-form-item>
          <el-form-item label="电话" prop="Iph">
            <el-input v-model="form.Iph" placeholder="请输入电话" />
          </el-form-item>
          <el-form-item label="邮箱" prop="Emit">
            <el-input v-model="form.Emit" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="primary" @click="demo"></el-button> -->
            <!-- <el-button type="primary" @click="onSubmit">立即登录</el-button> -->
            <el-button type="primary" @click="onADmin">立即注册</el-button>
          </el-form-item>
        </el-form>
        <el-button @click="closeDialog">关闭弹窗</el-button>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ShopShow',
  data() {
    return {
      dialogVisible: false,
      InputShow: false,
      cont: '',
      form: {
        login: '',
        password: '',
        radio: '',
        age: '',
        data: '',
        class: '',
        Iph: '',
        Emit: ''
      },
      tableData: [],
      rules: {
        login: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur', min: 8 }
        ],
        radio: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        data: [{ required: true, message: '请输入出生日期', trigger: 'blur' }],
        class: [{ required: true, message: '请输入', trigger: 'blur' }],
        Iph: [
          { required: true, message: '请输入手机号', trigger: 'blur', max: 11 }
        ],
        Emit: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    showDialog() {
      this.dialogVisible = true // 打开弹窗
    },
    closeDialog() {
      this.dialogVisible = false // 关闭弹窗
    },

    getData() {
      const url = 'http://127.0.0.1:3000/data'
      console.log('Request URL:', url)
      fetch(url)
        .then((response) => response.json())
        .then((value) => {
          // 处理数据
          const formattedData = value.map((item) => ({
            name: item.NAME,
            password: item.PASSWORD,
            radio: item.RADIO,
            age: item.AGE,
            formattedDated: item.FORMATTEDDATED,
            className: item.CLASSNAME,
            Iph: item.IPH,
            Emit: item.EMIT
          }))
          this.tableData = formattedData
        })
        .catch((error) => {
          console.log('Error:', error)
        })
    },
    // 注册
    onADmin() {
      this.$refs.form.validate((value) => {
        if (value && this.form.login.length > 0 && this.form.password.length > 0) {
          const originalDate = this.form.data
          const formattedDate = moment(originalDate).format('YYYY-MM-DD')
          fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              login: this.form.login.toString(),
              password: this.form.password.toString(),
              radio: this.form.radio.toString(),
              age: this.form.age.toString(),
              // 出生日期
              formattedDate: formattedDate,
              class: this.form.class.toString(),
              Iph: this.form.Iph.toString(),
              Emit: this.form.Emit.toString()
            })
          })
            .then(response => {
              if (response) {
                if (response.status === 200) {
                  alert('注册成功')
                } else {
                  alert('注册失败')
                }
              }
            })
            .catch(error => {
              if (error) {
                alert('注册失败')
              }
            })
        } else {
          alert('请输入您的账号和密码')
        }
      })
    },
    deleteData() {
      var cont = this.cont
      var requestBody = { cont: cont }
      fetch('http://127.0.0.1:3000/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then((res) => {

        }).catch(error => {
          console.log('Error:', error)
        })
    },
    addData() {

    }
  }
}

</script>
<style></style>
