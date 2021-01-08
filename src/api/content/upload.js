import request from '@/api/request'
// 上传图片地址
function upload(data) {
  return request({
    url: `/lejuAdmin/material/uploadFileOss`,
    method: 'POST',
    data
  })
}
export default {
  upload
}
