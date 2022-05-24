import React, { useState } from 'react'
import { Table, Tag, Space } from 'antd';
import { connect } from "umi"
import { UserModal } from "./components/UserModal"

const index = ({ users, dispatch }) => {      //这里要传users
  const [modalVisble, setModalVisble] = useState(false);
  const [record, setRecord] = useState(undefined);


  function editHandeler(record) {
    setModalVisble(true);
    setRecord(record)
  }


  const closeModal = () => {
    setModalVisble(false);
  };

  const onFinish = (values: any) => {
    const id = record.id
    //console.log('Success:', values);
    //页面与service建立链接，通过dispatch到Effect再通过call到service,然后走Reducer返回到页面中
    dispatch({
      // 页面中dispatch要type加路径前缀
      type: "users/edit",
      payload: {
        id,
        values
      }
    })
  };

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
      render: text => <a>{text}</a>,
    },

    {
      title: 'Create Time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={(() => {
            editHandeler(record)
          })}>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];


  return (
    <div className="list-table">
      {/* 因为connect里return的users 所以dataSource={users} */}
      {/* 由于后端返回的数据是一个对象，对象里面有一个data，是我们要的数据源，所以dataSource={users.data} */}
      <Table columns={columns} dataSource={users.data} rowKey="id" />
      <UserModal visible={modalVisble} closeHandler={closeModal} record={record} onFinish={onFinish} />
    </div>
  )
}

// const mapStateProps = ({ users }) => {  //此处users对应model里的namespace
//   return {
//     users
//   }
// }

export default connect(({ users }) => {  //此处users对应model里的namespace
  return {
    users
  }
})(index)

