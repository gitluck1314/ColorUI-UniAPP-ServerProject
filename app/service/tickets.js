'use strict';
const Service = require('egg').Service;
const Sha256 = require('crypto-js/hmac-sha256');
const rand = require('csprng');
module.exports = class extends Service {
  /**
   * 筛选
   */
  async index(payload) {
    const { currentPage = 1, pageSize = 10, search } = payload;
    console.log(search);
    let res = [];
    let count = 0;
    let skip = (Number(currentPage) - 1) * Number(pageSize);
    if (search) {
      res = await this.ctx.model.Tickets.find({
        name: { $regex: search }
      })
        .skip(skip)
        .limit(Number(pageSize))
        .sort({ createdAt: -1 })
        .exec();
      count = await this.ctx.model.Tickets.count({
        name: { $regex: search }
      }).exec();
    } else {
      res = await this.ctx.model.Tickets.find({})
        .skip(skip)
        .limit(Number(pageSize))
        .sort({ createdAt: -1 })
        .exec();
      count = await this.ctx.model.Tickets.count({}).exec();
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
  async create(payload) {
    const { ctx } = this;
    const ticket = await ctx.model.Tickets.findOne({
      name: payload.name
    });
    if (!ticket){
      return ctx.model.Tickets.create(payload);
    }else{
      return '该门票已存在';
    }
    
  }
  /**
   * 获取一个某张门票信息
   * @param {*} _id id
   */
  async show(_id) {
    return this.ctx.model.Tickets.findOne({
      _id: _id
    });
  }

  /**
  * 获取某个城市的门票
  * @param {*} _id id
  */
  async showCityTickets(_id) {
    return this.ctx.model.Tickets.find({
      cityId: _id
    });
  }


  
  /**
   * 删除一个
   * @param {*} _id id
   */
  async destroy(_id) {
    return this.ctx.model.Tickets.findOneAndRemove({
      _id: _id
    });
  }
  /**
   * 更新
   * @param {*} _id id
   * @param {*} payload
   */
  async update(_id, payload) {
    return this.ctx.model.Tickets.findOneAndUpdate(
      {
        _id: _id
      },
      payload
    );
  }
  async getall() {
    console.log('调用一会');

    return this.ctx.model.Tickets.find({});
  }

};
