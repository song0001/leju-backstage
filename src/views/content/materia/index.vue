<template >
  <div>
    <el-card class="card" shadow="never">
      <el-upload
        class="upload-demo"
        :action="uploadUrl"
        :headers="uploadHeaders"
        :on-success="getImg"
        multiple
        :show-file-list="false"
      >
        <el-button size="small" type="primary">点击上传素材</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col
          style="margin-bottom: 20px; width: 20%"
          v-for="item in FileList"
          :key="item.id"
        >
          <el-card shadow="always">
            <span class="date">创建时间:{{ item.createTime }}</span>
            <img
              style="width: 100%; height: 250px"
              :src="item.ossUrl"
              class="image"
            />
            <div style="padding: 14px">
              <div class="bottom clearfix" align="right">
                <el-button
                  type="danger"
                  size="mini"
                  style="width: 90px; margin-top: 20px"
                  @click="del(item.id)"
                  >删除</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        :current-page="page.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import mixin from '@/mixins/index'
import { findMaterialByPage, materialDeleteApi } from '@/api/content/upload'
export default {
  mixins: [mixin],
  data() {
    return {
      fileUrl: [],
      FileList: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      findMaterialByPage(this.page.currentPage, this.page.size).then((res) => {
        // console.log(res);
        this.FileList = res.data.rows
        this.page.total = res.data.total
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          materialDeleteApi(id).then((res) => {
            console.log(res)
            if (res.success) {
              this.$message.success('删除素材成功')
              this.init()
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    getImg(res) {
      console.log(res)
      if (res.success) {
        this.$message.success('素材上传成功')
        this.init()
      } else {
        this.$message.error('素材上传失败')
      }
    },
    handleSizeChange(val) {
      //   console.log(val);
      this.page.size = val
      this.page.currentPage = 1
      this.init()
    },
    handleCurrentChange(val) {
      //  console.log(e)
      this.page.currentPage = val
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/myScss.scss';
.date {
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>