<template>
  <div class="permission-main">
    <div class="container card">
      <el-card shadow="never">
        <div slot="header">
          <el-button
            type="warning"
            size="small"
            @click="goInitMenus"
          >初始化菜单</el-button>
          <el-button
            style="margin-left: 30px"
            type="primary"
            size="small"
            @click="goAddMenu"
          >新增菜单</el-button>
        </div>
        <el-table
          v-loading="loading"
          :cell-style="{ background: '#fff' }"
          :data="menuList"
          border
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column label="菜单名称" width="200" fixed>
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span><svg-icon v-if="scope.row.hidden" title="隐藏,不可见" icon-class="hidden" class-name="custom-class" />

            </template>
          </el-table-column>
          <el-table-column label="图标" width="100">
            <template slot-scope="scope">
              <template v-if="scope.row.icon">
                <i v-if="/^el-/.test(scope.row.icon)" :class="scope.row.icon" />
                <svg-icon v-else :icon-class="scope.row.icon" class-name="icon" />
              </template>

            </template>
          </el-table-column>
          <el-table-column label="等级" prop="level" width="100" />
          <el-table-column label="排序" prop="sort" width="100" />
          <el-table-column
            label="权限标识"
            prop="permissionValue"
            width="200"
          />
          <el-table-column label="路由" prop="path" width="200" />
          <el-table-column label="组建路径" prop="component" width="200" />
          <el-table-column label="是否可用" prop="status" width="100" />
          <el-table-column label="创建时间" prop="createTime" width="200" />
        </el-table>
      </el-card>
    </div>
    <MenuTree ref="menuTree" @refresh="getMenuList" />
    <MenuForm ref="menuForm" :options="menuList" />
  </div>
</template>

<script>
import permissionApi from '@/api/auth/permission'
import MenuTree from './components/MenuTree'
import MenuForm from './components/MenuFrom'
export default {
    name: 'Permission',
    components: {
        MenuTree,
        MenuForm
    },
    data() {
        return {
            loading: false,
            dialog: false,
            menuList: []
        }
    },
    created() {
        this.getMenuList()
    },
    methods: {
        getMenuList() {
            this.loading = true
            permissionApi.findAllPermissions().then((res) => {
                if (res.success) {
                    this.menuList = res.data.menus
                } else {
                    this.$message.error('获取数据失败!')
                }
                this.loading = false
            })
        },
        // 一键初始化菜单
        goInitMenus() {
            this.$refs.menuTree.openDialog()
        },
        goAddMenu() {
            this.$refs.menuForm.openDialog()
        }
    }
}
</script>
<style lang="scss" scoped>
.permission-main {
  .container {
    width: 100%;
  }
  .card {
    padding: 30px;
  }
  .hidden-color{
    color:#999;

  }
}
</style>
