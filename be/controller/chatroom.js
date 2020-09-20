/**
 * Created by chenjz on 2017/8/3.
 */
'use strict';

import ContactModel from '../models/contact';
import ChatroomModel from '../models/chatroom';
import MessageModel from '../models/message';

// import elasticsearchClient from '../middlewares/elasticsearch'
import socketCtx from '../socket';
import baseUtil from './utils/baseUtil';

class Chatroom {
  /**
   * 获取未被清除历史消息的聊天室列表
   * 用 userid 关联查好友，再查聊天室信息
   * ---------------------------------------------
   */
  async getChatrooms(req, res) {
    let resultObj = {};

    const uid = req.session.userid;

    try {
      // 必须找到的是 有聊天记录的，且未被删除的！
      const chatrooms = await ContactModel.find(
        { uid },
        'chatid fid uid nickname cleartime'
      )
        .populate('fid', 'headimgurl mobilephone alias')
        .populate('chatid')
        .exec();

      // 1、找所有的通讯录，获取 chatid(同时关联，获取最后一条信息的时间) 和 cleartime
      // 2、对比，如果 已被删除，则 不展示出来～

      // 这个时候再过滤掉？ 不然也不知道数据库 怎么写查询语句
      // 必须聊天过即存在 lastmsgid；如果没有 cleartime 或者 有新聊天，这展示～
      let newrooms = chatrooms.filter((ele, index) => {
        return (
          !!ele.chatid.lastmsgid &&
          (!ele.cleartime || ele.chatid.sendtime > ele.cleartime)
        );
      });

      // 这个也需要循环遍历，还不如冗余出来！！
      // const lastMessage = MessageModel.find({_id: chatrooms.chatid.lastmsgid})

      console.log('聊天室的信息～', chatrooms, newrooms);

      // 这样也就够了！
      resultObj = {
        code: 2,
        message: '获取聊天室成功',
        data: newrooms,
      };
    } catch (err) {
      resultObj = {
        code: 2,
        message: err.message,
      };
    } finally {
      console.log('获取聊天室结果-', resultObj);
      baseUtil.appResponse(res, JSON.stringify(resultObj));
    }
  }

  /**
   * 根据好友获取聊天室的设置
   * 设置，还有聊天信息
   * ---------------------------------------------
   */
  async getMessages(req, res) {
    let resultObj = {};

    const chatid = req.params.chatid;

    // 请求时 一定有，默认 限制20 和当前时间 ， sendtimeGe —— 发送时间大于，没有用？
    const { limit, sendtimeLt } = req.query;

    // sendtimeLt = Date.parse(sendtimeLt)

    const uid = req.session.userid;

    try {
      // 聊天室设置，现在不需要了！！都放在 contacts 里面！！
      // 前端都可以传过来的，没有必要仔查一次～
      const contactInfo = await ContactModel.findOne({ uid, chatid })
        .populate('fid', 'mobilephone headimgurl cleartime')
        .exec();

      let cleartime = contactInfo.cleartime || new Date('1970-01-01');

      console.log('清除时间～', cleartime, sendtimeLt);

      // 按照发送时间升序！！
      const allMessages = await MessageModel.find({
        chatid,
        sendtime: { $gt: cleartime, $lt: sendtimeLt },
      })
        .limit(Number(limit))
        .sort({ sendtime: -1 });

      resultObj = {
        code: 0,
        message: '查询历史记录成功！',
        data: allMessages,
        /* data: {
         contactInfo,
         allMessages
         } */
      };
    } catch (err) {
      resultObj = {
        code: 2,
        message: err.message,
      };
    } finally {
      // console.log('获取结果', resultObj)
      baseUtil.appResponse(res, JSON.stringify(resultObj));
    }
  }

  async searchHistory(req, res) {
    let params = {
      index: 'wechat', // 获取都可以一样！
      type: 'chatroom',
      query: {
        content: req.params.keyword,
      },
    };

    let resultObj = {};

    try {
      // resultObj = await elasticsearchClient.search(params)
    } catch (err) {
      resultObj = {
        code: 2,
        message: err.message,
      };
    } finally {
      // console.log('获取结果', resultObj)
      baseUtil.appResponse(res, JSON.stringify(resultObj));
    }
  }

  /**
   * 发送信息
   * 其实，应该是可以放在 vuex 里的，销毁界面之前 (beforeDestroy) 执行一下插入就够了！！
   * 这样，每次插入还要更改 lastmsgid 太累了！！
   */
  async sendMessage(req, res) {
    let resultObj = {};

    const uid = req.session.userid;
    const chatid = req.params.chatid;

    let messageParams = req.body;
    messageParams.fromid = uid;
    messageParams.chatid = chatid;

    console.log('发送到消息详情', chatid, messageParams);

    try {
      // 还要根据 chatid 和 uid 找到 fid
      const contactInfo = await ContactModel.findOne({ chatid, uid }).exec();

      console.log('聊天室查通讯录！！', contactInfo);

      const messageInfo = await new MessageModel(messageParams).save();
      messageParams.lastmsgid = messageInfo._id;

      // 保存后修改 chatid 的最后一条记录指向？会不会太累了？
      await ChatroomModel.findOneAndUpdate(
        { _id: chatid },
        { $set: messageParams }
      );

      // 检查对方用户是否在线！！
      let onlineUsers = socketCtx.getOnlineUsers();

      // console.log('在线用户--', onlineUsers, Object.keys(onlineUsers))

      if (contactInfo.fid in onlineUsers) {
        // 判断是否 在线
        // 在线就要 推送了，怎么弄？这个可以保存起来～～
        const currentSocket = onlineUsers[uid].socket;

        const fsocketid = onlineUsers[contactInfo.fid].socket.id;

        console.log('contactInfo.fid-- 在线', currentSocket.id, fsocketid);

        currentSocket.to(fsocketid).emit('send.msg', messageInfo);
      }

      resultObj = {
        code: 0,
        message: '发送成功！',
        data: messageInfo,
      };
    } catch (err) {
      resultObj = {
        code: 2,
        message: '发送失败！',
      };
    } finally {
      console.log('信息发送结果', resultObj);
      baseUtil.appResponse(res, JSON.stringify(resultObj));
    }

    // 触发 socket,
    // 保存到数据库，聊天记录，最后一条短信！
    // 但是，看到最后一条 都是 用 vuex 来维护的，确实！！没有必要记录到数据库，然后每次都做更新！！

    // socket.emit();
  }
}

export default new Chatroom();
