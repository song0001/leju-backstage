export default {
    data() {
        return {
            page: {
                currentPage: 1,
                size: 10,
                pageSizes: [10, 20, 30, 40], // pageSizes得是 pageSize的整数倍
                total: 0
            }
        }
    },
}