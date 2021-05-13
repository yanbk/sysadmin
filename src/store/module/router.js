import { asyncRouterHandle } from '@/utils/asyncRouter';
import { getStorage } from '@/utils/storage'

const routerList = []
const formatRouter = (routes) => {
    routes && routes.map(item => {
        if ((!item.children || item.children.every(ch => ch.hidden)) && item.name != '404') {
            routerList.push({ label: item.meta.title, value: item.name })
        }
        if (item.children && item.children.length > 0) {
            formatRouter(item.children)
        }
    })
    routes.sort((a, b) => {
        if (!a.sort) a.sort = 0
        if (!b.sort) b.sort = 0
        return b.sort - a.sort
    })
}

const formatRoutes = (routes) => {
    routes && routes.map(item => {
        item.path = item.front_url_path
        item.name = item.front_url_name
        item.meta = {
            // closeTab: item.is_close_tab,
            icon: item.image,
            keepAlive: item.is_keep_alive,
            title: item.describe
        }
        item.component = item.file_path
        item.hidden = item.is_show

        if (item.children && item.children.length > 0) {
            formatRoutes(item.children)
        }
    })
}


export const router = {
    namespaced: true,
    state: {
        asyncRouters: [],
        routerList: routerList,
    },
    mutations: {
        setRouterList(state, routerList) {
            state.routerList = routerList
        },
        // 设置动态路由
        setAsyncRouter(state, asyncRouters) {
            state.asyncRouters = asyncRouters
        },
    },
    actions: {
        // 从后台获取动态路由
        async SetAsyncRouter({ commit }) {
            const baseRouter = [{
                path: '/layout',
                name: 'layout',
                component: "view/layout/index.vue",
                meta: {
                    title: "底层layout"
                },
                children: []
            }]
            const asyncRouter = getStorage('permission_tree') ? JSON.parse(getStorage('permission_tree')) : []
            // console.log(asyncRouter)
            formatRoutes(asyncRouter)
            // console.log(asyncRouter)
            asyncRouter.push({
                path: "404",
                name: "404",
                hidden: true,
                meta: {
                    title: "迷路了*。*",
                },
                component: 'view/error/index.vue'
            })
            asyncRouter.push({
                path: "dashboard",
                name: "Dashboard",
                hidden: false,
                sort: 99999,
                meta: {
                    title: "首页",
                    icon: 'dashboard',
                    keepAlive: true
                },
                component: 'view/dashboard/index.vue'
            })
            const example = {
                path: "example",
                name: "Example",
                hidden: false,
                sort: 99999,
                meta: {
                    title: "实例",
                    icon: 'documentation',
                    keepAlive: true
                },
                component: 'view/routerHolder.vue',
                children: [
                    {
                        path: "index",
                        name: "Index",
                        hidden: false,
                        sort: 9999,
                        meta: {
                            title: "例子",
                            icon: 'component',
                            keepAlive: true
                        },
                        component: 'view/example/index.vue'
                    },
                    {
                        path: "richtext",
                        name: "Richtext",
                        hidden: false,
                        sort: 9999,
                        meta: {
                            title: "富文本",
                            icon: 'component',
                            keepAlive: true
                        },
                        component: 'view/example/editor-example.vue'
                    },
                    {
                        path: "table",
                        name: "Table",
                        hidden: false,
                        sort: 9999,
                        meta: {
                            title: "表格",
                            icon: 'component',
                            keepAlive: true
                        },
                        component: 'view/example/table.vue'
                    },
                    {
                        path: "upload",
                        name: "Upload",
                        hidden: false,
                        sort: 9999,
                        meta: {
                            title: "上传",
                            icon: 'component',
                            keepAlive: true
                        },
                        component: 'view/example/upload.vue'
                    }
                ]
            }
            asyncRouter.push(example)
            formatRouter(asyncRouter)
            baseRouter[0].children = asyncRouter
            baseRouter.push({
                path: '*',
                redirect: '/layout/404'
            })
            asyncRouterHandle(baseRouter)
            commit('setAsyncRouter', baseRouter)
            commit('setRouterList', routerList)
            return true
        }
    },
    getters: {
        // 获取动态路由
        asyncRouters(state) {
            return state.asyncRouters
        },
        routerList(state) {
            return state.routerList
        },
        defaultRouter(state) {
            return state.defaultRouter
        }
    }
}