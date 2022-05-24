import { request } from "umi"

export const getRemoteList = async () => {  //异步操作加async  下面一定记得return
  return request('http://public-api-v1.aspirantzhang.com/users', {
    method: 'get',
  })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error);
    });
}


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