/*
 * @Author: yaodongyi
 * @Description: 报错日志
 * @Date: 2019-05-08 14:57:13
 */
/**
 * 捕获报错日志
 * @exports
 * @param {String} fun 错误信息方法名
 * @param  {...any} params 错误信息
 * @todo console.error( path, fun_name, ...params )
 * @example path：页面路径 ，fun_name：方法名 ，错误信息参数
 */
export const catchInfo = function (fun, ...params) {
  let pages = getCurrentPages()    //获取加载的页面
  let currentPage = pages[pages.length - 1]    //获取当前页面的对象
  let path = "path:" + currentPage.route;   //由哪个页面报的错误
  let fun_name = fun ? "方法名:" + fun : '';  //哪个方法
  // catchInfo(方法名,参数);
  console.error(path, fun_name, ...params);
};

/**
 * 捕获警示信息
 * @exports
 * @param {String} fun 警示信息方法名
 * @param  {...any} params 警示信息
 * @todo console.error( path, fun_name, ...params )
 * @example path：页面路径 ，fun_name：方法名 ，错误信息参数
 */
export const warnInfo = function (fun, ...params) {
  let pages = getCurrentPages()    //获取加载的页面
  let currentPage = pages[pages.length - 1]    //获取当前页面的对象
  let path = "path:" + currentPage.route;   //由哪个页面报的警示信息
  let fun_name = fun ? "方法名:" + fun : '';  //哪个方法
  // catchInfo(方法名,参数);
  console.warn(path, fun_name, ...params);
};

