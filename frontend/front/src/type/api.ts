// OSS 对象存储接口声明
export interface OSSAPI {
  // 查询 oss sts token
  selectOssStsToken: (data: any) => object;
}

// API 接口合集
export interface API {
  oss: OSSAPI
}
