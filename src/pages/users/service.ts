import { request } from "umi"

export const getRemoteList = async () => {  //异步操作加async  下面一定记得return
  return request('http://public-api-v1.aspirantzhang.com/users', {
    method: 'get',       // params: {        umi-request中get请求传参方式params
    //   id: 1
    // }   
  })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error);
    });
}

//编辑时要接受从model中传过来的参数id和values，因为call传参需要在第二个大括号中写成对象形式，因此写成{values,id}
export const editRecord = async ({ values, id }) => {
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    // post方式传参
    data: values
  })
    .then(function (response) {
      console.log("ok");

    })
    .catch(function (error) {
      console.log(error);
    });
}