<template>
  <div>
    <el-main>
      <el-button @click="showDialog">添加</el-button>
      <el-button>修改</el-button>
      <el-button @click="commodity_delete">删除</el-button>
      <el-button @click="commodity_getData">更新</el-button>
      <el-button @click="InputShow = !InputShow">显示输入框</el-button>
      <el-input v-if="InputShow" v-model="cont" />
      <el-table :data="tableData" data-index="1-1">
        <el-table-column prop="commodity_name" label="商品名称" width="120" />
        <el-table-column prop="commodity_img" label="商品图片" width="120">
          <template slot-scope="scope">
            <el-image :src="getImageUrl(scope.row.commodity_img)" fit="contain" alt="商品图片" />
          </template>
        </el-table-column>
        <el-table-column prop="commodity_price" label="商品价格" width="120" />
        <el-table-column prop="commodity_data" label="商品上架日期" width="120" />
        <el-table-column prop="commodity_state" label="商品状态" width="120" />
      </el-table>
      <!-- 自定义弹窗 -->
      <el-dialog :visible="dialogVisible" @close="closeDialog">
        <el-form ref="form" :model="form" label-width="80px" class="login-box">
          <el-form-item label="商品名称" prop="commodity_name">
            <el-input v-model="form.commodity_name" placeholder="请输入商品名称" />
          </el-form-item>
          <!--图片上传 -->
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:3000/updateFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-success="handleUploadSuccess"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <!-- 商品价格 -->
          <el-form-item label="商品价格" prop="commodity_price">
            <el-input v-model="form.commodity_price" placeholder="请输入商品价格" />
          </el-form-item>
          <!-- 商品日期 -->
          <el-form-item label="商品日期" prop="commodity_data">
            <el-date-picker v-model="form.commodity_data" type="date" placeholder="选择商品日期" />
          </el-form-item>
          <!-- 商品状态 -->
          <el-form-item label="商品状态" prop="commodity_state">
            <el-select v-model="form.commodity_state" placeholder="请选择商品状态">
              <el-option label="上架" value="上架" />
              <el-option label="缺货" value="缺货" />
              <el-option label="预售" value="预售" />
              <el-option label="下架" value="下架" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-button @click="closeDialog">关闭弹窗</el-button>
        <el-button @click="commodity_addData">添加</el-button>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Showshow',
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      InputShow: false,
      cont: '',
      form: {
        commodity_name: '',
        commodity_price: '',
        commodity_data: '',
        commodity_state: ''
      },
      tableData: [
        {
          commodity_name: '',
          commodity_img: '',
          commodity_price: '',
          commodity_data: '',
          commodity_state: ''
        }
      ]
    }
  },
  mounted() {
    this.commodity_getData()
  },
  methods: {
    getImageUrl(img) {
      return `/img/${img}`
    },
    commodity_getData() {
      const url = 'http://127.0.0.1:3000/commodity_getData'
      console.log(url)
      fetch(url).then((response) => response.json())
        .then(value => {
          const formattedData = value.map((item) => ({
            commodity_name: item.NAME,
            commodity_img: item.IMG,
            commodity_price: item.Price,
            commodity_data: item.FORMATTEDDATED,
            commodity_state: item.STORT
          }))
          this.tableData = formattedData
        }).catch((error) => {
          console.log('Error:', error)
        })
    },
    commodity_delete() {
      var cont = this.cont
      var requestBody = { cont: cont }
      fetch('http://127.0.0.1:3000/commodity_delete', {
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
    commodity_addData() {
      const formattedDate = moment(this.form.commodity_data).format('YYYY-MM-DD')
      var url = 'http://127.0.0.1:3000/addCommodity'
      console.log(url)
      const dataToSend = {
        commodity_name: this.form.commodity_name,
        commodity_price: this.form.commodity_price,
        commodity_img: this.form.commodity_img,
        commodity_date: formattedDate,
        commodity_state: this.form.commodity_state
      }
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      }
      ).then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok')
      })
        .then((data) => {
          console.log('数据发送成功，服务器返回:', data)
        })
        .catch((error) => {
          console.error('数据发送错误:', error)
        })
      // console.log(this.form.commodity_name, this.form.commodity_price, formattedDate, this.form.commodity_state);
    },
    showDialog() {
      this.dialogVisible = true // 打开弹窗
    },
    closeDialog() {
      this.dialogVisible = false // 关闭弹窗
    },
    handleUploadSuccess(response, file, fileList) {
      console.log('上传成功，服务器返回数据：', response)
      console.log(response.fileName)
      console.log('上传的文件信息：', file)
      console.log('文件列表：', fileList)
      if (response.status === 'success') {
        // 保存文件名到form对象
        this.form.commodity_img = response.fileName
        // 假设你想更新`fileList`以显示新上传的文件信息
      }
      // 可以在这里根据服务器返回的数据进行进一步的操作，比如更新页面显示
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }

  }
}
</script>
