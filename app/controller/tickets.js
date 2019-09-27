'use strict';

const Controller = require('./../core/base_controller');
module.exports = class extends Controller {
  async index() {
    const { ctx, service } = this;
    
    
    const payload = ctx.query;
    const res = await service.tickets.index(payload);
    this.success(res);
  }
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.tickets.create(payload);
    this.success(res._id);
  }
  async show() {
    const { ctx, service } = this;
    console.log('ctx.params', ctx.params);
    const {id}  = ctx.params;
    console.log('门票的ID',id);
    
    const res = await service.tickets.show(id);
    this.success(res);
  }
  // 查询某个城的景点门票
  async showCityTickets() {
    const { ctx, service } = this;
    const { cityId } = ctx.params;
    const res = await service.tickets.showCityTickets(cityId);
    this.success(res);
  }

  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.tickets.destroy(id);
    this.success(res._id);
  }
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    const res = await service.tickets.update(id, payload);
    this.success(res._id);
  }
  //获取所有的tickets
  async getall() {
    const { ctx, service } = this;
    const res = await service.tickets.getall();
    this.success(res);
  }

  async searchOneTickets() {
    const { ctx, service } = this;
    console.log('查询摸个景点',ctx.query);
    
    const payload = ctx.query;
    const res = await service.tickets.index(payload);
    this.success(res);
  }

};
