const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
// const { connect } = require('http2');
const multer = require('multer');
const fs = require('fs');
// const { console } = require('inspector');
// const EventEmitter = require('events');//事件发生器
const port = 3000;
// 创建学生数据库的链接
const content = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'zhangyao123456',
  database: 'mocksvuenode',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// 创建商品数据库的链接
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 登录验证
app.post('/admin', (req, res) => {
  const data = req.body;
  const login = data.login;
  const password = data.password;
  var sql = `SELECT name ,password FROM lusename WHERE NAME = '${login}' AND password = '${password}'`;
  content.query(sql, (err, rustle) => {
    if (err) {
      console.log('sql+err' + err);
    }
    if (rustle) {
      res.set('Custom-Status', 'success');
      if (rustle.length > 0) {
        res.status(200).json({ message: 'Login successful' });
        // console.log('sql+rustle' + rustle);
      } else {
        res.set('Custom-Status', 'error');
        res.status(401).json({ message: 'Login failed' });
      }
    }
  })
});

// 注册验证
app.post('/login', (req, res) => {
  const data = req.body;
  const login = data.login;
  const password = data.password;
  const radio = data.radio;
  const age = data.age;
  const formattedDated = data.formattedDate;
  const className = data.class;
  const Iph = data.Iph;
  const Emit = data.Emit;
  let YTph;
  let YEmit;
  // console.log(req.body);
  //正则匹配
  const phoneNumberRegex = /^1[3-9]\d{9}$/;
  if (phoneNumberRegex.test(Iph)) {
    // 手机号格式正确
    YTph = Iph;
  } else {
    // 手机号格式不正确
    alert('请输入正确的手机号');
  }
  const EmitRegex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?$/;
  if (EmitRegex.test(Emit)) {
    // 邮箱格式正确
    YEmit = Emit;
  } else {
    // 邮箱格式不正确
    alert('请输入正确的邮箱');
  }
  // console.log( login, password, radio, className, Iph, Emit);
  var sql = `insert into  lusename (NAME, password,radio,age,formattedDated,className,Iph,Emit) values (?,?,?,?,?,?,?,?)`;
  content.query(sql, [login, password, radio, age, formattedDated, className, YTph, YEmit], (err, rustle) => {
    if (err) {
      console.log("sql" + err);
    }
    if (rustle) {
      if (rustle.length > 0) {
        console.log(rustle);
        res.status(200).json({ message: 'admin success' });
      }
    }
  })``
});

//获取数据库中的数据
app.get('/data', (req, res) => {
  req.data;
  var sql = `select * from lusename`;
  content.query(sql, (err, data) => {
    if (err) {
      console.log("sql err" + err);
      return;
    }
    res.send(JSON.stringify(data));
  })
});

//
app.post('/delete', (req, res) => {
  const data = req.body;
  const deleteData = data.cont;
  var sql = `delete  from lusename where NAME = ?`;
  content.query(sql, [deleteData], (err, data) => {
    if (err) {
      console.log("sql err" + err);
      return;
    }
    res.status(200).json({ message: 'delete success' });
  })
})

//
app.get('/commodity_getData', (req, res) => {
  req.data;
  var sql = `select * from showshow`;
  content.query(sql, (err, data) => {
    if (err) {
      console.log("sql err" + err);
      return;
    }
    res.send(JSON.stringify(data));
  })
})

app.post('/commodity_delete', (req, res) => {
  const data = req.body;
  const deleteData = data.cont;
  var sqlImg = `select  IMG from showshow where NAME = ?`;
  content.query(sqlImg, [deleteData], (err, imgData) => {
    if (err) {
      console.log("sql err" + err);
      return;
    }
    const imageNames = imgData.map(item => item.IMG);
    const textFormat = imageNames.join(', ');
    const imagePath = path.join(__dirname, 'public/img', textFormat); // 图片存储路径
    if (fs.existsSync(imagePath)) {
      // 删除图片
      fs.unlinkSync(imagePath);
    } else {
      res.status(404).send('Image not found');
    }
    var sql = `delete  from showshow where NAME = ? AND IMG = ?`;
    content.query(sql, [deleteData, textFormat], (err, data) => {
      if (err) {
        console.log("sql err" + err);
        return;
      }
      res.status(200).json({ message: 'delete success' });
    })
  })
})



// 图片上传

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/img'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50000000 * 1024 // 500kb
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('只允许上传jpg或png文件'));
    }
  }
});

app.post('/updateFile', upload.single('file'), (req, res) => {
  try {
    console.log(req.file.path, "+", req.file.originalname);
    res.send({ status: 'success', filePath: req.file.path, fileName: req.file.originalname });
  } catch (error) {
    console.error('文件上传错误:', error);
    res.status(500).send('文件上传失败');
  }
});

app.post('/addCommodity', (req, res) => {
  const { commodity_name, commodity_img, commodity_price, commodity_date, commodity_state } = req.body;
  // 在这里可以对接收的数据进行进一步的处理，比如保存到数据库
  // console.log('接收到商品数据:', { commodity_name, commodity_img, commodity_price, commodity_date, commodity_state });

  var sql = `INSERT INTO showshow (NAME,IMG,FORMATTEDDATED,STORT,Price) VALUES (?,?,?,?,?)`;
  content.query(sql, [commodity_name, commodity_img, commodity_date, commodity_state, commodity_price], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('插入数据失败');
      return;
    }
    res.send({ status: 'success', message: '商品数据接收成功' });
  })
});
// if (login === loginDemo && password === loginPassword) {
// 登录成功
// console.log("success")
// res.set('Custom-Status', 'success');
// res.status(200).json({ message: 'Login successful' });
// } else {
// 登录失败
// res.set('Custom-Status', 'error');
// res.status(401).json({ message: 'Login failed' });
// console.log("error")
// }
// var loginDemo = "admin";
// var loginPassword = "admin123";
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on port - success: ' + port);
});

