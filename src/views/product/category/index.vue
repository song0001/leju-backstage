<template >
  <div>
    <el-card shadow="never" class="card">
      <div slot="header">
        <span>分类管理</span>
      </div>
      <!-- 乐居分类 -->
      <div>
        <span class="leju">乐居分类:</span>
        <el-row :gutter="20">
          <el-col
            :span="6"
            v-for="item in categoryList"
            :key="item.id"
            :offset="0"
          >
            <el-card
              :body-style="{ padding: '0px' }"
              class="cageCard"
              align="center"
            >
              <div style="bottom: 14px" class="title">
                <span>{{ item.name }}</span>
              </div>
              <div class="img_card">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl1"
                  :headers="uploadHeaders"
                  :show-file-list="false"
                  :on-success="handleSuccess"
                >
                  <img
                    v-if="item.icon"
                    :src="item.icon"
                    class="image"
                    @click="selectImg(item)"
                  />
                  <!-- <el-button  @click="selectImg(item)"></el-button> -->
                </el-upload>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import mixin from '@/mixins/index'
import { getCategory, updateCategory } from '@/api/product/category/index'
export default {
  mixins: [mixin],
  data() {
    return {
      categoryList: [],
      imageUrl: '',
      SeleList: []
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    // 获取乐居分类
    getCategory() {
      getCategory().then((res) => {
        console.log('分类列表', res)
        this.categoryList = res.data.items[1].children
      })
    },
    handleSuccess(res) {
      console.log(res)
  
      console.log('1111', this.SeleList)
      this.$confirm('确定修改图片?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      })
        .then(() => {
          // 请求api

          updateCategory({
            icon: res.data.material.ossUrl,
            id: this.SeleList.id,
            level: this.SeleList.level,
            parentId:this.SeleList.parentId
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.getCategory()
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch((rej) => {
          console.log(rej)
        })
    },
    selectImg(row) {
          this.SeleList = Object.assign({}, row)
      console.log(row)
      this.SeleList=row
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/myScss.scss';
.leju {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
  font-size: 16px;
  display: block;
  margin-bottom: 20px;
}
.cageCard {
  height: 400px;
  .img_card {
    height: 345px;
    display: flex;
    justify-content: center;
    align-items: center;

    .image {
      width: 270px;
      height: 300px;
    }
  }

  .title {
    text-align: left;
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
  }
}
</style>