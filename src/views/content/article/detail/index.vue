<template >
  <div>
    <el-card shadow="never" class="card">
      <div slot="header">
        <span>新增文章</span>
      </div>

      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="120px"
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="作者" prop="author">
              <el-input
                v-model="ruleForm.author"
                placeholder="作者"
                label-width="120px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标题" prop="title">
              <el-input
                v-model="ruleForm.title"
                placeholder="标题"
                label-width="120px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否显示">
              <el-switch
                v-model="ruleForm.isShow"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="摘要" prop="summary">
              <el-input
                type="textarea"
                v-model="ruleForm.summary"
                placeholder="摘要"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="封面图片">
              <!-- uploadUrl 和uploadHeaders 在mixin里引入 -->
              <el-upload
                ref="uploadAtricle"
                class="upload-demo"
                :action="uploadUrl1"
                :headers="uploadHeaders"
                multiple
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
              >
                <el-button size="small" type="primary">点击上传素材</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
              <img style="height: 150px" :src="ruleForm.coverImg" alt="" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="切换副文本类型">
              <el-radio-group v-model="ruleForm.editorType">
                <el-radio :label="0">富文本</el-radio>
                <el-radio :label="1">markDown</el-radio>
              </el-radio-group>
              <span class="warin">
                <i class="el-icon-warning" />
                注意!切换编辑器会清空编辑内容
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div v-if="ruleForm.editorType == 0">
              <!-- 给富文本新增图片 -->
              <el-upload
                ref="innerUpload"
                class="upload-demo"
                :action="uploadUrl1"
                :headers="uploadHeaders"
                multiple
                :on-success="handleInnerImg"
                :show-file-list="false"
              >
                <el-button
                  style="margin-bottom: 5px"
                  type="primary"
                  size="small"
                  >插入图片↓</el-button
                >
              </el-upload>
              <TEditor ref="Ti" />
            </div>
            <div v-if="ruleForm.editorType == 1">
              <MdEditor ref="Md" />
            </div>
          </el-col>

          <el-col align="center">
            <el-form-item>
              <el-button
                class="btn"
                type="primary"
                @click="add('ruleForm')"
                :loading="loading"
                >{{ id ? "立即修改" : "立即新增" }}</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import mixin from "@/mixins/index";
import { addArticle, productArticle ,updateArticle} from "@/api/content/article";
import TEditor from "@/components/Tinymce/index";
import MdEditor from "@/components/MarkdownEditor";
export default {
  mixins: [mixin],
  components: {
    TEditor, // 富文本框组件
    MdEditor, // md编辑器
  },
  data() {
    return {
      loading: false,
      ruleForm: {
        title: "",
        author: "", // 作者
        coverImg: "",
        summary: "",
        editorType: 0, // 默认选中富文本
        isShow: 1,
        // desc:''
      },
      id: "",
      // 验证规则
      rules: {
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      },
    };
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id) {
      this.getArticleDetail();
    }
  },
  methods: {
    //    显示文章明细
    getArticleDetail() {
      productArticle(this.id).then((res) => {
        console.log(res);
        if (res.success) {
          this.ruleForm = res.data.productArticle;
          console.log(this.ruleForm);
          this.$nextTick(() => {
            if (this.ruleForm.editorType === 0) {
              this.$refs.Ti.setContent(this.ruleForm.content1);
            } else if(this.ruleForm.editorType === 1) {
              this.$refs.Md.setValue(this.ruleForm.content1);
            }else{
                return
            }
          });
        } else {
          this.$message.error("获取文章内容失败");
        }
      });
    },
    //   上传图片
    handleAvatarSuccess(res) {
      //   console.log(res);
      this.$refs.uploadAtricle.clearFiles();
      this.ruleForm.coverImg = res.data.fileUrl;
    },
    // 给富文本添加图片
    handleInnerImg(res) {
      // console.log(res);
      if (res.success) {
        this.$refs.innerUpload.clearFiles();
        this.$refs.Ti.imageSuccessCBK(res.data.fileUrl);
      } else {
        this.$message.error("素材上传失败");
      }
    },
    //   新增
    add(ruleForm) {
      var content1 = "";
      if (this.ruleForm.editorType === 0) {
        content1 = this.$refs.Ti.getContent();
      } else if(this.ruleForm.editorType === 1) {
        content1 = this.$refs.Md.getValue();
      }
      var datas = {
        ...this.ruleForm,
        content1,
      };
      this.loading = true;
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          //    新增文章
          if (!this.id) {
            //新增
            addArticle(datas).then((res) => {
            //   console.log(res);
              if (res.success) {
                this.$message.success("添加文章成功");
                this.$router.push({ path: "/content/article" });
              } else {
                this.$message.error("添加文章失败");
              }
              this.loading = false;
            });
          } else {
            //修改
            updateArticle(datas).then((res) => {
              if (res.success) {
                this.$message.success("修改文章成功");
                this.$router.push({ path: "/content/article" });
              } else {
                this.$message.error("修改文章失败");
              }
              this.loading = false;
            });
          }
        } else {
          this.loading = false;
          this.$message.warning("请按要求填写表单");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/myScss.scss";
.warin {
  margin-left: 40px;
  color: rgb(230, 162, 60);
}
.btn {
  margin-top: 20px;
}
</style>