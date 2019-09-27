'use strict';
const Service = require('egg').Service;
const Sha256 = require('crypto-js/hmac-sha256');
const rand = require('csprng');
const mongoose = require('mongoose')

module.exports = class extends Service {
  /**
   * 筛选
   */
  async index(payload) {
    const { currentPage = 1, pageSize = 10, search } = payload;
    let res = [];
    let count = 0;
    let skip = (Number(currentPage) - 1) * Number(pageSize);
    if (search) {
      res = await this.ctx.model.Orders.find({
        username: { $regex: search }
      })
        .skip(skip)
        .limit(Number(pageSize))
        .sort({ createdAt: -1 })
        .exec();
      count = await this.ctx.model.Orders.count({
        username: { $regex: search }
      }).exec();
    } else {
      res = await this.ctx.model.Orders.find({})
        .skip(skip)
        .limit(Number(pageSize))
        .sort({ createdAt: -1 })
        .exec();
      count = await this.ctx.model.Orders.count({}).exec();
    }
    let data = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc);
      jsonObject.key = i;
      return jsonObject;
    });
    return {
      pageSize: Number(pageSize),
      currentPage: Number(currentPage),
      count: count,
      totalPages: Math.ceil(count / Number(pageSize)),
      data: data
    };
  }

  //  生成订单
  async create(payload) {
    const { ctx } = this;
    return ctx.model.Orders.create(payload);
  }
  /**
   * 获取一个
   * @param {*} _id id
   */
  async show(_id) {
    return this.ctx.model.Orders.findOne({
      _id: _id
    });
  }
  /**
   * 删除一个
   * @param {*} _id id
   */
  async destroy(_id) {
    return this.ctx.model.Orders.findOneAndRemove({
      _id: _id
    });
  }
  /**
   * 更新
   * @param {*} _id id
   * @param {*} payload
   */
  async update(_id, payload) {
    return this.ctx.model.Orders.findOneAndUpdate(
      {
        _id: _id
      },
      payload
    );
  }
  async getall(userId) {
    console.log('调用userId一会', userId);

    const userOrders = await this.ctx.model.Orders.find(
      {
        'userId': mongoose.Types.ObjectId(userId)
      }
    )
      .populate('ticketsId')
      .sort({ createdAt: -1 })
    ;

    return userOrders;
  }

};
