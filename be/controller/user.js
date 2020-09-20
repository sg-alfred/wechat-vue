/**
 * 微信用户类
 *
 * Created by chenjz on 2017/10/18.
 */
'use strict';

import UserModel from '../models/user';
import aipFaceClient from '../middlewares/baiduAip';

import multer from 'multer';
import path from 'path';
import baseUtil from './utils/baseUtil';

// const GROUP_IDS = ['wx_test_group']
const GROUP_IDS = ['test_group2'];

class User {
  constructor() {
    // 实例化 百度AI
    // this.client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

    // 基本信息，不包含敏感信息
    this.baseinfo = 'headimgurl mobilephone alias gender age';

    // 原来是这样！this默认指向类的实例！单独使用该方法，就可能报错。http://es6.ruanyifeng.com/#docs/class
    this.login = this.login.bind(this);
    this.updateUser = this.updateUser.bind(this);

    // this.loginByPassword = this.loginByPassword.bind(this)
  }

  // 权限控制，每个请求都需要检查是否登陆了！
  async checkLogin(req, res) {
    console.log('index登录否？: ', req.session.userid);
    let resultObj = {
      code: 0,
      message: !!req.session.userid,
    };
    baseUtil.appResponse(res, JSON.stringify(resultObj));
  }

  /**
   * 用户登录，post请求，区别 密码和扫脸登录
   * ---------------------------------------------
   * @param req
   * @param res
   * @param next
   * @returns {Promise.<void>}
   */
  async login(req, res, next) {
    let resultObj = {};

    // 可能是 微信号，可能是 手机号等等。
    // let params = req.body;

    // 这样多简洁！！
    const { username, password = '', base64Img = '' } = req.body;

    let dbUserinfo; // 数据库用户信息

    // 需要吗？需要吧，如果用 password 可能会有问题！
    const loginType = req.query.type || 'password'; // 登录类型
    // const { loginType = 'password' } = req.query       // 这个名称不一样啊～

    // 根据用户名查询！如果没有直接抛出
    try {
      // 如果用手机号的，需要校验属否为数字，否则，这样查找会异常！—— CastError
      dbUserinfo = await UserModel.findOne({
        mobilephone: username,
        deleted: false,
      });

      if (!dbUserinfo) throw new Error('用户名错误!');

      if (loginType === 'face') {
        await this.loginByFace(dbUserinfo._id, base64Img);
      } else {
        // await this.loginByPassword(dbUserinfo, password)
        const frontpwd = baseUtil.createMd5(
          dbUserinfo.salt + baseUtil.createMd5(password)
        );

        if (frontpwd !== dbUserinfo.password) throw new Error('密码错误!');
      }

      // 删除一些字段！
      delete dbUserinfo.password;

      req.session.userid = dbUserinfo._id;
      req.session.userinfo = dbUserinfo; // 缓存用户信息

      resultObj = {
        code: 0,
        message: '登录成功!',
        userinfo: dbUserinfo,
      };
    } catch (err) {
      console.log('登录出错', err.message);
      resultObj = {
        code: 2,
        message: err.message,
      };
    } finally {
      console.log('登录结果：', resultObj);
      baseUtil.appResponse(res, JSON.stringify(resultObj));
    }
  }

  async loginByFace(uid, base64Img) {
    console.log('人脸验证入参 uid：', uid, typeof uid);

    // 去掉前缀 —— data:image/png;base64,

    // {"error_code":216100,"error_msg":"uid值非法","log_id":3799143292103116}
    // 报个毛子啊！！都没有什么问题啊，长度限制128B，没有超过啊！59c4bd72b7f42d575aba5415，直接用就可以～～

    const response = await aipFaceClient.verifyUser(
      String(uid),
      GROUP_IDS,
      base64Img,
      { top_num: 1 }
    );

    console.log(JSON.stringify(response));

    if (response.error_code) {
      throw new Error(`系统错误：${response.error_msg}`);
    } else if (response.result[0] < 80) {
      throw new Error(`扫脸登录失败，匹配度：${response.result[0]}。`);
    }
  }

  async logout(req, res) {
    delete req.session.userid;
    let resultObj = {
      code: 0,
      message: '退出登录成功',
    };
    baseUtil.appResponse(res, JSON.stringify(resultObj));
  }

  async register(req, res) {
    let resultObj = {};

    let params = req.body;

    const random = Math.floor(Math.random() * 24);
    params.headimgurl = `/images/${random}.jpg`;

    // 加盐的这一步，移到  presave 里面！！ 更加合理！
    params.salt = baseUtil.getRandomStr(4);
    params.password = baseUtil.createMd5(
      params.salt + baseUtil.createMd5(params.password)
    );

    try {
      const doc = await new UserModel(params).save();
      resultObj = {
        code: 0,
        message: '注册成功',
        data: doc,
      };
    } catch (err) {
      // 已存在！，这样判断 虽然只要 插入一次，而不用 findOne 一下，但感觉，这样判断好奇怪！
      let errmsg = '';
      if (err.message.indexOf('duplicate key') > -1) {
        errmsg = '该用户已存在!';
      }
      resultObj = {
        code: 2,
        message: errmsg || '创建用户失败!',
      };
    } finally {
      console.log('注册结果', resultObj);
      baseUtil.appResponse(res, JSON.stringify(resultObj));
    }
  }

  /**
   * 按照微信号、手机号精确搜索
   * @param req
   * @param res
   * @returns {Promise.<void>}
   */
  async searchUser(req, res) {
    let resultObj = {};
    let userinfo;

    const keyword = req.params.keyword;

    try {
      if (typeof keyword === 'undefined') throw new Error('查询条件不能为空！');

      // 如果是 11位，按照手机号码尝试，不行这用微信号查找
      if (/^\d{11}$/.test(keyword)) {
        userinfo = await UserModel.findOne({
          mobilephone: keyword,
          deleted: false,
        });
      } else {
        // 用微信号查询。
        userinfo = await UserModel.findOne({
          wechatno: keyword,
          deleted: false,
        });
      }

      if (!userinfo) throw new Error('没有查到此用户！');

      // const contact = await ContactModel.find({
      //     uid, fid: userinfo._id, status: 1
      // }).populate('fid', '-salt -password -createtime -updatetime').exec()

      resultObj = {
        code: 0,
        message: '查询成功',
        data: userinfo,
      };
    } catch (err) {
      resultObj = {
        code: 2,
        message: err.message,
      };
    } finally {
      console.log('查询结果', resultObj);
      baseUtil.appResponse(res, JSON.stringify(resultObj));
    }
  }

  /**
   * 更新用户信息
   * @param req
   * @param res
   * @returns {Promise.<void>}
   */
  async updateUser(req, res) {
    let resultObj = {};

    const uid = req.session.userid;

    // 更新的用户id，自己或别人的？？不是的！！如果不一样的话，那就是非法的！
    const updateId = req.params.id;

    // 更新类型
    const updateType = req.query.type;

    if (uid !== updateId && updateType in ['base', 'avatar', 'face']) {
      throw new Error('非法操作！');
    }

    let updateParams = req.body;

    try {
      if (updateType === 'avatar') {
        // 上传用户头像
      } else if (updateType === 'face') {
        // 设置人脸密码，包括 增改删
        const userinfo = req.session.userinfo;
        const info = userinfo.wechatno || userinfo.mobilephone;

        let response;

        switch (updateParams.type) {
          case 'add':
            response = await aipFaceClient.addUser(
              uid,
              info,
              GROUP_IDS,
              updateParams.base64Img
            );
            console.log('百度AI，注册结果：', JSON.stringify(response));

            if (response.error_code)
              throw new Error(`注册失败：${response.error_msg}`);

            updateParams.face = true;
            break;
          case 'update':
            response = await aipFaceClient.updateUser(
              uid,
              info,
              GROUP_IDS,
              updateParams.base64Img
            );
            console.log('百度AI，更新结果：', JSON.stringify(response));

            if (response.error_code)
              throw new Error(`更新失败：${response.error_msg}`);
            break;
          case 'delete':
            response = await aipFaceClient.deleteUser(uid);
            console.log('百度AI，删除结果：', JSON.stringify(response));

            if (response.error_code)
              throw new Error(`删除失败：${response.error_msg}`);

            updateParams.face = false;
            break;
          default:
            throw new Error(`设置人脸密码出现错误`);
        }

        delete updateParams.type;
        delete updateParams.base64Img;
      } else {
        // 一般的修改，就啥也不需要操作！
      }

      // const oldUserinfo = UserModel.findById({_id}, 'mobilephone')
      // console.log('旧信息：', {_id}, oldUserinfo);

      // 不管如何，之后还是 要更新一下信息～
      const newUserinfo = await UserModel.findByIdAndUpdate(
        { _id: uid },
        { $set: updateParams },
        { new: true }
      );

      resultObj = {
        code: 0,
        message: '更新成功',
        data: newUserinfo,
      };
    } catch (err) {
      resultObj = {
        code: 2,
        message: err.message,
      };
    } finally {
      console.log('更新结果：', resultObj);
      baseUtil.appResponse(res, JSON.stringify(resultObj));
    }
  }

  /**
   * 上传图片
   * @param req
   * @param res
   * @returns {Promise.<void>}
   */
  async uploadImg(req, res) {
    let resultObj = {};

    let filename = '';

    // 图片保存路径
    const imgPath = path.join(__dirname, '../../static/image/headimg');

    const Storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, imgPath); // 这个路径，还是可以更好一些！
      },
      filename: function (req, file, callback) {
        filename = file.fieldname + '_' + Date.now() + '_' + file.originalname;
        callback(null, filename);
      },
    });

    const upload = multer({ storage: Storage }).array('imgUploader', 3); // Field name and max count

    console.log('到底又没有上传图片啊？', imgPath, filename);

    try {
      upload(req, res, (err) => {
        if (err) {
          // throw new Error(err.message)
        } else {
          resultObj = {
            code: 0,
            message: '上传成功！',
            data: {
              filename,
            },
          };
        }
      });

      // 不对，这样之后 还要修改到相应的数据
      //  const newUserinfo = await UserModel.findByIdAndUpdate({_id: uid}, {$set: updateParams}, {new: true})
    } catch (err) {
      resultObj = {
        code: 2,
        message: err.message,
      };
    } finally {
      console.log('上传图片结果', resultObj);
      baseUtil.appResponse(res, JSON.stringify(resultObj));
    }
  }
}

export default new User();
