'use strict';
const Sha256 = require('crypto-js/hmac-sha256');
const rand = require('csprng');
const Service = require('egg').Service;

module.exports = class extends Service {
  /**
   * 筛选
   */
  async index(payload) {
    const { currentPage = 1, pageSize = 10, search, order } = payload;
    let res = [];
    let count = 0;
    let skip = (Number(currentPage) - 1) * Number(pageSize);
    let sort = {};
    let match = {};
    //查询
    if (search) {
      match.search = { Accountname: { $regex: search } };
    }
    // 排序
    order
      ? (sort[order.substr(0, 1) === '-' ? order.substring(1) : order] =
        order.substr(0, 1) === '-' ? -1 : 1)
      : (sort = { createdAt: -1 });
    res = await this.ctx.model.Account.find(match, { password: 0, salt: 0 })
      .skip(skip)
      .limit(Number(pageSize))
      .sort(sort)
      .exec();
    count = await this.ctx.model.Account.count({
      Accountname: { $regex: search }
    }).exec();

    return {
      pageSize: Number(pageSize),
      currentPage: Number(currentPage),
      count: count,
      totalPages: Math.ceil(count / Number(pageSize)),
      data: res
    };
  }

  async create(payload) {
    const { ctx } = this;
    return ctx.model.Account.create(payload);
  }
  /**
   * 获取一个
   * @param {*} _id id
   */
  async show(_id) {
    return this.ctx.model.Account.findOne(
      {
        _id: _id
      },
      { password: 0, salt: 0 }
    ).populate('cityId', ['provinceName', 'cityName', 'regionName', 'countyName']);
  }
  /**
   * 删除一个
   * @param {*} _id id
   */
  async destroy(_id) {
    return this.ctx.model.Account.findOneAndRemove({
      _id: _id
    });
  }
  /**
   * 更新
   * @param {*} _id id
   * @param {*} payload
   */
  async update(_id, payload) {
    return this.ctx.model.Account.findOneAndUpdate(
      {
        _id: _id
      },
      payload
    );
  }

  async allAccount() {
    console.log('获取或有账单');

    return this.ctx.model.Account.find({});
  }
};
