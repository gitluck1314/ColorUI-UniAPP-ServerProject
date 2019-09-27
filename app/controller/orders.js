'use strict';

const Controller = require('./../core/base_controller');
module.exports = class extends Controller {
  async index() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.orders.index(payload);
    this.success(res);
  }
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.orders.create(payload);
    this.success(res._id);
  }
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.orders.show(id);
    this.success(res);
  }
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.orders.destroy(id);
    this.success(res._id);
  }
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    const res = await service.orders.update(id, payload);
    this.success(res._id);
  }
  async getall() {
    const { ctx, service } = this;
    console.log('userId', ctx.params);
    const userId = ctx.params.userId
    const res = await service.orders.getall(userId);
    console.log('获取该用户的所有的订单');
    this.success(res);
  }
};
