<template>
  <div class="person-main">
    <el-card shadow="never" class="card">
      <div class="flex_wrapper">
        <el-card class="slide-left" shadow="never">
          <div class="slide_item head">
            <div style="text-align: center; margin-bottom: 10px">
              <el-avatar
                style="width: 100px; height: 100px"
                size="large"
                :src="userInfo.icon"
              />
            </div>
            <div class="text_center" style="font-size: 20px">
              {{ userInfo.username }}
            </div>
            <div class="text">
              <i class="el-icon-collection-tag" /> 交互专家
            </div>
            <div class="text">
              <i class="el-icon-s-check" />
              不凡学院－某某某事业群－某某平台部－某某技术部－UED
            </div>
            <div class="text">
              <i class="el-icon-location-outline" />
              河南省 郑州市 金水区 绿地新都会
            </div>
          </div>
          <div class="slide_item">
            <div style="font-size: 16px" class="text">标签</div>
            <div class="text">
              <el-tag
                v-for="(item, index) in tagList"
                :key="index"
                style="margin-right: 8px; margin-bottom: 8px"
                size="mini"
              >{{ item }} <i
                class="el-icon-close"
                @click="deleteTag(item)"
              /></el-tag>
              <span style="margin-left: 8px; margin-bottom: 8px">
                <span class="tagInput">
                  <el-input
                    v-show="isInput"
                    v-model="tag"
                    class="input"
                    placeholder="标签"
                    size="mini"
                    @blur="onInputBlur"
                  />
                </span>
                <i
                  v-show="!isInput"
                  style="cursor: pointer"
                  class="el-icon-plus"
                  @click="goAdd"
                />
              </span>
            </div>
          </div>
          <div class="slide_item">
            <div class="team">
              <div v-for="item in teamList" :key="item.name" class="team_item">
                <img
                  style="margin-top: 10px; margin-right: 10px"
                  :src="item.icon"
                  class="teamImg"
                  alt=""
                >
                {{ item.name }}
              </div>
            </div>
          </div>
        </el-card>
        <el-card class="slide-right" shadow="never">
          <el-tabs v-model="activeName">
            <el-tab-pane label="文章" name="first">
              <div class="article_wrapper">
                <div
                  v-for="(item, index) in article_list"
                  :key="index"
                  class="article_item"
                >
                  <div class="text article_title">{{ item.title }}</div>
                  <div class="text article_tag">
                    <el-tag
                      v-for="(tagItem, tagIndex) in item.tags"
                      :key="tagIndex"
                      style="margin-right: 8px; margin-bottom: 8px"
                      size="mini"
                    >{{ tagItem }}
                    </el-tag>
                  </div>
                  <div class="text article_content">{{ item.article }}</div>
                  <div class="text flexRight">
                    <span>{{ item.time }}</span>
                    <span style="margin-right: 10px">{{ item.author }}</span>
                  </div>
                  <div class="text article_icon">
                    <span><i class="el-icon-s-flag" /> {{ item.collection }}</span>
                    <span style="margin: 0 10px">丨</span>
                    <span><i class="el-icon-thumb" /> {{ item.good }}</span>
                    <span style="margin: 0 10px">丨</span>
                    <span><i class="el-icon-chat-line-round" />
                      {{ item.comment }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="项目" name="second">
              <div class="product_wrapper">
                <el-row :gutter="20">
                  <el-col
                    v-for="(proItem, proIndex) in product_list"
                    :key="proIndex"
                    :span="6"
                    :offset="0"
                  >
                    <el-card
                      shadow="hover"
                      style="padding: 0"
                      class="product_item"
                    >
                      <img
                        style="width: 100%; height: 150px"
                        :src="proItem.img"
                        alt=""
                      >
                      <div style="margin-left: 5px" class="title">
                        {{ proItem.title }}
                      </div>
                      <div
                        class="text"
                        style="margin-top: 10px; font-size: 12px; margin: 4px"
                      >
                        {{ proItem.content }}
                      </div>
                      <div class="bottom">
                        <span
                          style="font-size: 12px; color: gray; margin-left: 5px"
                        >
                          {{ proItem.time }}
                        </span>
                        <span style="margin-right: 5px">
                          <div class="img_group">
                            <img
                              v-for="(imgItem, imgIndex) in proItem.visitorList"
                              :key="imgItem"
                              :style="{ zIndex: imgIndex }"
                              :src="imgItem"
                              alt=""
                            >
                          </div>
                        </span>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/myAuth'
import info from './mixin/info'
export default {
    mixins: [info],
    data() {
        return {
            activeName: 'first', // tabl触发第几个
            isInput: false,
            tag: '',
            tagList: ['不凡人', '学霸', '专业设计', '高颜值', '随便', '无所谓']
        }
    },
    computed: {
        userInfo() {
            return getUserInfo()
        }
    },
    created() {
        console.log(this.userInfo)
    },
    mounted() {},
    methods: {
        goAdd() {
            this.isInput = true
        },
        deleteTag(item) {
            var index = this.tagList.indexOf(item)
            this.tagList.splice(index, 1)
        },
        onInputBlur() {
            this.isInput = false
            if (this.tag.trim()) {
                this.tagList.push(this.tag.trim())
            } else {
                console.log('空')
            }
        }
    }
}
</script>

<style scoped lang="scss">
.person-main {
  .card {
    margin: 30px;
    .flex_wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;

      // background-color: red;
      .slide-left {
        float: left;
        width: 32%;
        .tagInput {
          width: 100px;
          .input {
            width: 100px;
            // background-color: red;
          }
        }
        .slide_item {
          position: relative;
          padding-bottom: 20px;
          padding-top: 10px;
          border-bottom: 1px dashed rgba(0, 0, 0, 0.06);
          .icon {
            display: block;
            margin: 0 auto 5px auto;
            width: 150px;
            height: 150px;
            border-radius: 50%;
          }
          .text_center {
            margin: 15px auto;
            text-align: center;
          }
          .text {
            margin-top: 10px;
            font-size: 13px;
          }
          .team {
            position: relative;
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            .team_item {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
              height: 30px;
              width: 45%;
              font-size: 16px;
              .teamImg {
                width: 25px;
                height: 25px;
                border-radius: 50%;
              }
            }
          }
        }
      }
      .slide-right {
        margin-left: 10px;
        float: left;
        width: 67%;
        .article_wrapper {
          box-sizing: border-box;
          padding: 20px;
          width: 100%;
          // height: 1100px;
          // overflow-y: auto;
          // background-color: red;
          .article_item {
            position: relative;
            width: 100%;
            border-bottom: 1px dashed gray;
            padding-bottom: 10px;
            margin-bottom: 15px;
            .text {
              margin-bottom: 10px;
              color: rgba(0, 0, 0, 0.85);
              font-size: 16px;
            }
            .article_content {
              font-size: 14px;
            }
            .article_icon {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.45);
              margin-bottom: 0;
            }
            .flexRight {
              display: flex;
              flex-direction: row-reverse;
              font-size: 13px;
              margin-top: 15px;
              color: rgba(0, 0, 0, 0.45);
              width: 100%;
            }
          }
        }
        .product_wrapper {
          position: relative;
          width: 100%;
          .product_item {
            height: 260px;
            margin-bottom: 15px;
            .bottom {
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 40px;
              .img_group {
                position: relative;
                width: 100px;
                // background-color: red;
                height: 25px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row-reverse;

                img {
                  position: relative;
                  margin-left: -10px;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style >
.product_item .el-card__body {
  padding: 0;
  /* background-color: red; */
}
</style>
