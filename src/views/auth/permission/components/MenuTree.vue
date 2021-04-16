<template>
  <div class="menu-tree">
    <el-dialog
      title="初始化的菜单列表"
      :visible.sync="dialog"
      width="40%"
      @close="handleClose"
    >
      <el-alert
        title="请谨慎操作! 初始化菜单会覆盖之前记录!"
        type="warning"
      />
      <el-tree ref="tree" style="margin-top:30px;" :data="menuTree" node-key="id" :props="defaultProps" />

      <span slot="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="doSaveInitMenus">保存</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import { asyncRoutes } from '@/router/index'
import permissionApi from '@/api/auth/permission'
import _ from 'lodash'
export default {
    name: 'MenuTree',
    data() {
        return {
            asyncRoutes,
            dialog: false,
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            menuTree: []
        }
    },
    computed: {

    },
    created() {
        var routes = _.cloneDeep(this.asyncRoutes)
        this.reBuildMenuTree(routes)
        this.menuTree = routes
    },
    methods: {
        openDialog() {
            this.dialog = true
        },
        handleClose() {
            this.dialog = false
        },
        doSaveInitMenus() {
        //    1. 构建menus
        // 说明:  增删改查可以在后台构建,默认必须有
            var routes = _.cloneDeep(this.asyncRoutes)
            var menus = this.reBuildMenuData(routes)
            permissionApi.saveInitMenus(menus)
                .then(res => {
                    if (res.success) {
                        this.$message.success('保存成功!')
                        this.handleClose()
                        this.$emit('refresh')
                    } else {
                        this.$message.error(res.message)
                    }
                })
        },
        reBuildMenuData(routes) {
            for (var i = 0; i < routes.length; i++) {
                var route = routes[i]
                if (route.meta) {
                    route.label = route.meta.title
                    // 替换component
                    route.component = route.meta.componentUrl
                    route.title = route.meta.title
                    route.icon = route.meta.icon
                    // 序列化meta
                    route.meta = JSON.stringify(route.meta)
                } else {
                    // 如果没有meta 可以跳过
                    continue
                }
                if (route.children && route.children.length > 0) {
                    this.reBuildMenuData(route.children)
                }
            }
            return routes
        },
        // 递归 遍历构建树结构 添加id和label
        reBuildMenuTree(routes) {
            for (var i = 0; i < routes.length; i++) {
                var route = routes[i]
                route.id = route.name
                if (route.meta) {
                    route.label = route.meta.title
                    // 替换component
                    route.component = route.meta.componentUrl
                } else {
                // 如果没有meta 可以跳过
                    continue
                }
                if (route.children && route.children.length > 0) {
                    this.reBuildMenuTree(route.children)
                } else {
                // 添加增删改查操作按钮
                    route.children = [
                        {
                            id: route.id + '.list',
                            label: '查询'
                        }, {
                            id: route.id + '.add',
                            label: '新增'
                        }, {
                            id: route.id + '.edit',
                            label: '编辑'
                        }, {
                            id: route.id + '.del',
                            label: '删除'
                        }
                    ]
                }
            }
        }
    }

}
</script>

<style lang="scss" scoped>

</style>
