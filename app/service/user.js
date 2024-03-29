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
      match.search = { username: { $regex: search } };
    }
    // 排序
    order
      ? (sort[order.substr(0, 1) === '-' ? order.substring(1) : order] =
          order.substr(0, 1) === '-' ? -1 : 1)
      : (sort = { createdAt: -1 });
    res = await this.ctx.model.User.find(match, { password: 0, salt: 0 })
      .skip(skip)
      .limit(Number(pageSize))
      .sort(sort)
      .exec();
    count = await this.ctx.model.User.count({
      username: { $regex: search }
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
    const salt = rand(256, 36);
    payload.password = Sha256(
      payload.password + salt,
      ctx.app.config.secret
    ).toString();
    payload.salt = salt;
    console.log('用户注册Service', payload);
    const res = await ctx.model.User.findOne({
      mobile: payload.mobile
    });
    console.log('service' , res);
    
    if(res == null ){
      const result = await ctx.model.User.create(payload);
      console.log('-------------', result);
      return {
        code: 1,
        result
      }
     
    }else{
      return {
        code: 0,
        message: '该用户已注册！'
      }
    }

    
  }
  /**
   * 获取一个
   * @param {*} _id id
   */
  async show(_id) {
    return this.ctx.model.User.findOne(
      {
        _id: _id
      },
      { password: 0, salt: 0 }
    ).populate('cityId', ['provinceName', 'cityName', 'regionName','countyName']);
  }
  /**
   * 删除一个
   * @param {*} _id id
   */
  async destroy(_id) {
    return this.ctx.model.User.findOneAndRemove({
      _id: _id
    });
  }
  /**
   * 更新
   * @param {*} _id id
   * @param {*} payload
   */
  async update(_id, payload) {
    return this.ctx.model.User.findOneAndUpdate(
      {
        _id: _id
      },
      payload
    );
  }
 

  async editpassword(_id, payload) {
    const { ctx } = this;
    const newPassword = payload.newPassword;
    const oldPassword = payload.oldPassword;
    const user = await this.ctx.model.User.findById(_id);
    if (
      !user ||
      user.password !==
        Sha256(oldPassword + user.salt, ctx.app.config.secret).toString()
    ) {
      ctx.throw(400, '失败');
    }
    const salt = rand(256, 36);
    return this.update(_id, {
      password: Sha256(newPassword + salt, ctx.app.config.secret).toString(),
      salt
    });
  }
  async getall() {
    return this.ctx.model.User.find({}, { username: 1 });
  }

  async login(payload) {
    const { ctx, service } = this;
    const user = await ctx.model.User.findOne({
      mobile: payload.mobile
    });
    console.log('登录',user);
    
    if (
      !user ||
      user.password !==
      Sha256(payload.password + user.salt, ctx.app.config.secret).toString()
    ) {
      // ctx.throw(400, '手机号或密码错误');
      return{
        code:0,
        message:'手机号或密码错误'
      }
    }
    return {
      code: 1,
      userinfo: {
        _id: user._id,
        username: user.username,
        mobile: user.mobile,
        avatar: user.avatar,
        cityId:user.cityId
      },
      token: await service.token.generate(user)
    };
  }
};
