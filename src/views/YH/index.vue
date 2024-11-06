<template>
  <div>
    <!-- 头部 -->
    <div class="nav">
      <div class="nav_nav">
        <div class="nav_nav_nav">
          <div><span>用户名 :</span> <input type="text" placeholder="请输入用户名" v-model="Yh"></div>
          <div><span>学工号 :</span> <input type="text" placeholder="请输入学工号" v-model="xgh"></div>
          <div><span>性别 :</span> <input type="text" placeholder="请输入性别" v-model="sex"></div>
          <div><span>角色 :</span> <input type="text" placeholder="请输入角色" v-model="roles"></div>
        </div>
        <div class="Se"><el-button @click="getData">查询</el-button></div>
        <div class="UPdate"><el-button @click="getData">刷新</el-button></div>
      </div>
    </div>
    <!-- 下部 -->
    <div>
      <div>
        <el-main>
          <el-button @click="showDialog">添加</el-button>
          <el-button @click="addData">修改</el-button>
          <el-button @click="deleteData">删除</el-button>
          <el-button @click="getData">更新</el-button>
          <el-button @click="InputShow = !InputShow">显示输入框</el-button>
          <el-input v-if="InputShow" v-model="cont" />
          <el-table :data="tableData" data-index="1-1">
            <el-table-column prop="id" label="序号" width="120" />
            <el-table-column prop="user_id" label="用户id" width="120" />
            <el-table-column prop="student_id" label="学工号" width="120" />
            <el-table-column prop="name" label="姓名" width="120" />
            <el-table-column prop="sex" label="性别" width="120" />
            <el-table-column prop="class" label="年级" width="120" />
            <el-table-column prop="roles" label="角色" width="120" />
            <el-table-column prop="commit" label="备注" width="120" />
            <el-table-column label="操作" width="120" />
          </el-table>
          <!-- 注册/添加 -->
          <el-dialog :visible="dialogVisible" @close="closeDialog">
            <!-- 弹窗内容 -->
            <el-form ref="form" :model="form" label-width="80px" class="login-box" :rules="rules">
              <el-form-item label="用户id" prop="user_id">
                <el-input v-model="form.user_id" placeholder="请输入用户id" />
              </el-form-item>
              <el-form-item label="学工号" prop="student_id">
                <el-input v-model="form.student_id" type="password" placeholder="请输入学工号" />
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" type="text" placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-radio v-model="form.sex" label="男">男</el-radio>
                <el-radio v-model="form.sex" label="女">女</el-radio>
              </el-form-item>
              <el-form-item label="年级" prop="class">
                <el-date-picker v-model="form.class" type="text" placeholder="请输入年级" />
              </el-form-item>
              <el-form-item label="角色" prop="roles">
                <el-select v-model="form.roles" placeholder="请选择角色">
                  <el-option label="admin" value="admin" />
                  <el-option label="普通" value="普通" />
                </el-select>
              </el-form-item>
              <el-form-item label="备注" prop="commit">
                <el-input v-model="form.commit" placeholder="请输入备注" />
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
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex';
import Cookies from 'js-cookie'
import store from '@/store';

//  假设你的store目录在src下，根据实际情况调整路径
export default {
  name: 'YH',
  data() {
    return {
      dialogVisible: false,
      InputShow: false,
      cont: '',
      form: {
        user_id: '',
        student_id: '',
        name: '',
        sex: '',
        class: '',
        roles: '',
        commit: '',
      },
      tableData: [],
      // tableData: [
      //   {
      //     id: '1',
      //     user_id: '1',
      //     student_id: '1',
      //     name: '1',
      //     sex: '1',
      //     age: '1',
      //     roles: '1',
      //     commit: '1',
      //   }
      // ]
    }
  },
  methods: {
    showDialog() {
      this.dialogVisible = true // 打开弹窗
    },
    closeDialog() {
      this.dialogVisible = false // 关闭弹窗
    },
    getData() {
      const PHPSESSID = 'PHPSESSID';
      const PHPSESSID_token = Cookies.get(PHPSESSID);
      console.log(PHPSESSID_token);
      const url = "/api/userApp/UserAdmin/selectUsers?onePageNumber=10&targetPage=1";
      console.log("Request URL:", url);
      var myHeaders = new Headers();
      // myHeaders.append("x-token", PHPSESSID_token);
      myHeaders.append("x-token",store.getters.token);

      fetch(url, {
        method: 'GET',
        headers: myHeaders
      })
        .then((response) => response.json())
        .then((value) => {
          console.log(value);
          // const formattedData = value.map((item) => ({
          //   // 这里假设你的数据结构中有这些属性，根据实际情况调整
          //   name: item.NAME,
          //   user_id: item.USER_ID,
          //   student_id: item.STUDENT_ID,
          //   sex: item.SEX,
          //   class: item.CLASS,
          //   roles: item.ROLES,
          // commit: item.COMMIT
          // }));
          // this.tableData = formattedData;
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    },
  },
  mounted() {
    this.getData();
  },
}
</script>
<style>
.nav {
  height: 80px;
  width: calc(100% - 40px);
  background-color: #ffffff;
  margin: 20px;
  display: flex;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  align-content: space-around;
  justify-content: center;
  align-items: center;
  font-family: "楷体";
}

.nav_nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: space-around;
  justify-content: flex-end;
  align-items: center;
}

.nav_nav_nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: space-around;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  right: 20px;
}
</style>
