// 数据格式看接口文档
export interface singleUserData {
  id: number,
  name: string,
  email: string,
  create_time: string,
  update_time: string,
  status: number
}

export interface FormValues {
  [name: string]: any
}