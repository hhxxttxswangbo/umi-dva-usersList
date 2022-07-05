import React, { useState, FC } from 'react'
import { Table, Space, Button } from 'antd';
import { connect, Dispatch, Loading, UserState } from 'umi'
import { UserModal } from "./components/UserModal"
import {singleUserData,FormValues} from "./data.d"

interface UserPageProps {
  users: UserState,
  dispatch: Dispatch,
  userListLoading: boolean
}

const UserListPage:FC<UserPageProps> = ({ users, dispatch, userListLoading }) => {      //这里要传users
  const [modalVisble, setModalVisble] = useState(false);
  const [record, setRecord] = useState<singleUserData|undefined>(undefined);


  function editHandeler(record:singleUserData) {
    setModalVisble(true);
    setRecord(record)        //赋值record(原来是undefined)
  }


  const closeModal = () => {
    setModalVisble(false);
  };


  const onFinish = (values:FormValues) => {
    let id = 0;
    if (record) {
      //编辑时要知道id,从record中取得
      id = record.id
      //console.log('Success:', values);
    }

    if (id) {
      //页面修改了数据，数据存在页面里，页面要与service建立链接，通过dispatch到Effect再通过call到service,然后走Reducer返回到页面中
      dispatch({
        // 页面中dispatch要type加路径前缀
        type: "users/edit",
        //payload传id和values给model
        payload: {
          id,
          values
        }
      })

    } else {
      dispatch({
        // 页面中dispatch要type加路径前缀
        type: "users/add",
        //payload传id和values给model
        payload: {
          values
        }
      })
    }
    setModalVisble(false)



  };

  function addHandler() {
    setModalVisble(true);
    //添加时record清空
    setRecord(undefined)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text:string) => <a>{text}</a>,
    },

    {
      title: 'Create Time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text:string, record:singleUserData) => (   //record就是当前行数据
        <Space size="middle">
          <a onClick={(() => {
            editHandeler(record)    //点击时要吧record传递出去，写成箭头函数形式
          })}>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];


  return (
    <div className="list-table">
      <Button type="primary" onClick={addHandler}>Add Button</Button>
      {/* 因为connect里return的users 所以dataSource={users} */}
      {/* 由于后端返回的数据是一个对象，对象里面有一个data，是我们要的数据源，所以dataSource={users.data} */}
      <Table columns={columns} dataSource={users.data} rowKey="id" loading={userListLoading} />
      <UserModal visible={modalVisble} closeHandler={closeModal} record={record} onFinish={onFinish} />
    </div>
  )
}

// const mapStateProps = ({ users }) => {  //此处users对应model里的namespace
//   return {
//     users
//   }
// }

export default connect(({ users, loading }: { users: UserState, loading: Loading }) => {  //此处一定解构出users对应model里的namespace
  // console.log(loading);   load为加载时转圈效果
  return {
    users,
    userListLoading: loading.models.users
  }
})(UserListPage)

