const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.get('/token', function (req, res) {
  const token = req.query.token;
  if (token) {
    const userInfo = {
      'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin',
      }
    };
    // 直接返回用户信息对象，而不是包含 data 属性的对象
    res.json(userInfo);
  } else {
    res.status(400).json({ message: 'Token is required' });
  }
});


app.post('/logout', function (req, res) {
  const token = req.body.token;
  if (token) {
    res.status(200).json({ message: 'success' });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on port ' + port);
});
