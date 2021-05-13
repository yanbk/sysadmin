import { login } from '@/api/user'
import router from '@/router/index'
import { setStorage, removeStorage } from '@/utils/storage'

export const user = {
    namespaced: true,
    state: {
        userInfo: {
            uuid: "",
            nickName: "",
            headerImg: "",
            authority: "",
        },
        token: "",
        permission_tree: null,
        roles: []
    },
    mutations: {
        setUserInfo(state, userInfo) {
            // 这里的 `state` 对象是模块的局部状态
            state.userInfo = userInfo
        },
        setToken(state, token) {
            // 这里的 `state` 对象是模块的局部状态
            state.token = token
        },
        NeedInit(state){
            state.userInfo = {}
            state.token = ""
            sessionStorage.clear()
            router.push({ name: 'init', replace: true })
        },
        LoginOut(state) {
            state.userInfo = {}
            state.token = ""
            sessionStorage.clear()
            removeStorage('sys_token')
            router.push({ name: 'login', replace: true })
            window.location.reload()
        },
        ResetUserInfo(state, userInfo = {}) {
            state.userInfo = {...state.userInfo,
                ...userInfo
            }
        },
        setRoles(state, data) {
            state.roles = data
        }
    },
    actions: {
        async LoginIn({ commit, dispatch, rootGetters }, loginInfo) {
            const res = await login(loginInfo)
            console.log(res)
            if (res.code == 0) {
                commit('setUserInfo', res.data.user_data)
                commit('setToken', res.data.token)
                commit('setRoles', res.data.user_data.permissions)
                if (res.data.permission_tree.length > 0) {
                    setStorage('permission_tree', JSON.stringify(res.data.permission_tree))
                }
                await dispatch('router/SetAsyncRouter', {}, { root: true })
                const asyncRouters = rootGetters['router/asyncRouters']
                // console.log(asyncRouters)
                router.addRoutes(asyncRouters)
                // // const redirect = router.history.current.query.redirect
                // // console.log(redirect)
                // // if (redirect) {
                // //     router.push({ path: redirect })
                // // } else {
                router.push({ name: 'Dashboard' })
                // // }
                // return true
            }
        },
        async LoginOut({ commit }) {
            commit("LoginOut")
        }
    },
    getters: {
        userInfo(state) {
            return state.userInfo
        },
        token(state) {
            return state.token
        },

    }
}