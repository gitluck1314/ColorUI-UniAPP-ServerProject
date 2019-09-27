'use strict';

const Controller = require('./../core/base_controller');
module.exports = class extends Controller {
  async index() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.user.index(payload);
    this.success(res);
  }
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.user.create(payload);
    this.success(res._id);
  }
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    console.log('ctx.params;', ctx.params);
    const res = await service.user.show(id);
    this.success(res);
  }
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.destroy(id);
    this.success(res._id);
  }
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    const res = await service.user.update(id, payload);
    this.success(res._id);
  }
  async userinfo() {
    const { ctx, service } = this;
    const res = await service.user.show(ctx.state.userid);
    this.success(res);
  }
  async editpassword() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.user.editpassword(ctx.state.userid, payload);
    this.success(res);
  }
  async getall() {
    const { ctx, service } = this;
    const res = await service.user.getall();
    this.success(res);
  }
  async signup() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    console.log('用户注册', payload);
    const res = await service.user.create(payload);
    console.log('用户注册返回的数据', res);
    if (res.code == 0){
      this.fail(res.message);
    } else if (res.code ==1){
      this.success(res.result);
    }

  }
  async login() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    // console.log('用户登录 数据', payload);
    const res = await service.user.login(payload);
    // console.log('用户登录返回的数据', res);
    if (res.code == 0) {
      this.fail(res.message);
    } else if (res.code == 1) {
      this.success(res);
    }
  }
};
