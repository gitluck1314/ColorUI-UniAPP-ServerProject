'use strict';

const Controller = require('./../core/base_controller');
module.exports = class extends Controller {
  async index() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.account.index(payload);
    this.success(res);
  }
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.account.create(payload);
    console.log('zhangdan ',res);
    
    this.success(res._id);
  }
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    console.log('ctx.params;', ctx.params);
    const res = await service.account.show(id);
    this.success(res);
  }
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.account.destroy(id);
    this.success(res._id);
  }
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    const res = await service.account.update(id, payload);
    this.success(res._id);
  }
  async allAccount(){
    const { ctx, service } = this;
    const res = await service.account.allAccount();
    this.success(res);
  }
 
};
