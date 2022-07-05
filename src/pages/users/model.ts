//仓库文件
//model是一个对象
import { Reducer, Effect, Subscription } from 'umi'
import { getRemoteList, editRecord, addRecord } from './service'
import {singleUserData} from "./data.d"

// 数据格式看接口文档
export interface UserState {
  data: singleUserData[],
  meta: {
    total: number,
    per_page: number,
    page: number
  }
}

interface UserModelType {
  namespace: "users",
  state: UserState,  //Table的dataSource只认识 “数组或者undefined”，因此dataSource={users.data}
  reducers: {
    getList: Reducer<UserState>     //Reducer的泛型<UserState>
  },
  effects: {
    getRemote: Effect,
    edit: Effect,
    add: Effect
  },
  subscriptions: {
    setup: Subscription
  },
}

const UserModel: UserModelType = {
  namespace: "users",  //该model唯一标识
  state: {             //仓库初始值
    data: [],
    meta: {
      total: 0,
      per_page: 5,
      page: 1
    }
  },           
  reducers: {
    getList(state, { payload }) {  //action里解构出payload
      return payload;
    }
  },
  effects: {
    *getRemote(action, { put, call }) {  //异步前面加* effects中解构 put, call
      const data = yield call(getRemoteList)
      console.log(data, 111);
      yield put({  //通过put传给同步，异步前面要加yield
        type: "getList",
        payload: data,   //后端返回一个对象，将整个对象传给reducers return payload
      })
    },

    // 连续解构赋值，payload中解构出index中传来的id和values
    * edit({ payload: { id, values } }, { put, call }) {
      //console.log(id);
      //console.log(values);
      //注意call的传参方式，逗号后面写参数
      const data = yield call(editRecord, { id, values })
      // console.log(data);

      // 页面自动刷新，调用getRemote
      yield put({
        type: "getRemote"
      })
    },
    * add({ payload: { values } }, { put, call }) {
      const data = yield call(addRecord, { values })
      yield put({
        type: "getRemote"
      })
    }
  },

  //约定俗成的便利操作使用subscriptions，如进入users路径即为获取列表
  //数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。
  subscriptions: {
    setup({ dispatch, history }) {   //解构两个参数，dispatch, history
      return history.listen((location) => {
        if (location.pathname === "/users") {
          dispatch({
            type: "getRemote"
          })
        }
      })
    }
  }
}

export default UserModel