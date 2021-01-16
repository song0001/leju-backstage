import { getToken } from '@/utils/myAuth'

export default {
    data() {
        return {
            page: {
                currentPage: 1,
                size: 10,
                pageSizes: [10, 20, 30, 40], // pageSizes得是 pageSize的整数倍
                total: 0
            },
            uploadUrl1: '/lejuAdmin/material/uploadFileOss', //当前接口用于通用上传到oss,不保存至数据库 除了素材管理都用此接口 
            uploadUrl: '/lejuAdmin/material/uploadFileOssSave', //素材被上传到oss,同时保存至数据库
            uploadHeaders: {
                token: getToken()
            }
        }
    },
}