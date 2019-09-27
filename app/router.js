'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const verification = app.middleware.verification();
  const isadmin = app.middleware.isadmin();

  //用户登陆注册
  router.post('/api/auth/signup', controller.auth.signup);
  router.post('/api/auth/login', controller.auth.login);
  router.post('/api/auth/faceLogin', controller.auth.faceLogin);
  router.get('/user/user/userinfo', verification, controller.user.userinfo);

  //管理员登陆注册
  router.post('/api/user/login', controller.admin.login);
  router.post('/api/user/signup', controller.admin.signup);

  router.post(
    '/user/face/faceVerify',
    verification,
    controller.face.faceVerify
  );
  router.post('/user/face/addFace', verification, controller.face.addFace);
  router.resources(
    'user',
    '/admin/users',
    isadmin,
    verification,
    controller.user
  );

  //=========user===========
  router.get('/api/user/getall', controller.user.getall);
  router.post('/api/user/editpassword', controller.user.editpassword);
  router.get('/api/wechat/code2Session', controller.wechat.code2Session);
  router.get('/api/user/userinfo/:id', controller.user.show)

  // 用户登录注册
  router.post('/user/login', controller.user.login);
  router.post('/user/signup', controller.user.signup);

  // 城市增删改查
  router.post('/api/cityCreate', controller.city.create);
  router.get('/api/getAllCity', controller.city.getall);

  //=============== 门票增删改查 ================
  router.post('/api/ticketsCreate', controller.tickets.create);
  router.get('/api/ticketsShowDetial/:id', controller.tickets.show);

  //按名字查询某个景点
  router.get('/api/searchOne', controller.tickets.index);

  //某城的景点门票
  router.get('/api/showCityTickets/:cityId', controller.tickets.showCityTickets);
  
  //=============== 订单的增删改查 ================
  
  // 生成订单
  router.post('/api/createOders', controller.orders.create);

  //获取某个用户的所有订单
  router.get('/api/getUserAllOders/:userId', controller.orders.getall);

  //创建账单
  router.post('/api/createAccount', controller.account.create);
  router.get('/api/getAllAccount', controller.account.allAccount);

};
