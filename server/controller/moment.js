/**
 * Created by chenjz on 2017/10/19.
 */
'use strict'

import MomentModel from '../models/moment'
import CommentModel from '../models/comment'

import baseUtil from './utils/baseUtil'

class Moment {
    constructor() {

    }

    /**
     * 获取所有的朋友圈状态
     * ---------------------------------------------
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
    async getAllMoments(req, res) {
        let resultObj = {}
        const uid = req.session.uid

        try {
            let moments = await MomentModel.find({ uid })

            // 找到之后再根据这个 momentid 找 评论？有点累啊，但是，又没有其他的办法吧～～
            moments.forEach((moment) => {
                moment.comments = []

                // await 报错！ forEach 已经是个同步的操作！
                const comments = CommentModel.find({ mid: moment._id })

                moment.comments.push(comments)
            })

            resultObj = {
                code: 2,
                message: '获取朋友圈成功！',
                data: moments
            }
        } catch (err) {
            resultObj = {
                code: 2,
                message: err.message
            }
        } finally {
            console.log('获取朋友圈结果-', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }

    }

    /**
     * 点赞? 获取应该是 和评论一致的！ 用 get 参数控制！
     * 评论只要保存, 前端相应改变 就好了，
     * 而点赞，需要修改 改状态上面的 upvote 字段！
     * 不一样啊！！没事，路由应该是一样的～不然，就不能设计了～
     * ---------------------------------------------
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
    async makeUpvote (req, res) {

    }

    /**
     * 做评论
     * ---------------------------------------------
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
    async makeComment (req, res) {
        let resultObj = {}

        let commentParam = req.body
        commentParam.uid = req.session.uid

        try {
            const comment = new CommentModel(commentParam).save()

            resultObj = {
                code: 2,
                message: '评论成功！',
                data: comment
            }
        } catch (err) {
            resultObj = {
                code: 2,
                message: err.message
            }
        } finally {
            console.log('获取朋友圈结果-', resultObj)
            baseUtil.appResponse(res, JSON.stringify(resultObj))
        }
    }

}

export default new Moment()