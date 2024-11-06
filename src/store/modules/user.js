import { login, logout, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import router, { resetRouter } from '@/router';

const state = {
  token: getToken(),
  name: '',
  roles: [],
  user_code: '',
  introduction: '',
  avatar: ' ',
};
console.log(state);
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLE_NAME: (state, name) => {
    state.name = name;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_USER_CODE: (state, user_code) => {
    state.user_code = user_code;
  },
  SET_introduction: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_avatar: (state, avatar) => {
    state.avatar = avatar;
  }
};
var introduction = "hello world";
var avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif';
console.log(mutations);
const actions = {
  // user login
  login({ commit }, userInfo) {
    const { user_code, password, code, mac } = userInfo;
    console.log(userInfo.user_code, userInfo.password, userInfo.code, userInfo.mac)
    return new Promise((resolve, reject) => {
      login({ user_code: user_code.trim(), password: password, code: code.toString(), mac: mac, })
        .then(response => {
          const { data } = response;
          // if (data && data.token && data.userInfo) {
          commit('SET_TOKEN', data.token);
          commit('SET_ROLE_NAME', data.userInfo.name);
          commit('SET_ROLES', data.userInfo.ruleArr);
          commit('SET_USER_CODE', data.userInfo.user_code);
          commit('SET_introduction', introduction);
          commit('SET_avatar', avatar);
          // commit('SET_TOKEN', '');
          // commit('SET_ROLES', []);
          // removeToken();
          setToken(data.token)
          resolve();
          // } else {
          //   reject('Invalid response from login API');
          // }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        removeToken();
        resetRouter();
        dispatch('tagsView/delAllViews', null, { root: true });
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      resolve();
    });
  },
  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token';

    commit('SET_TOKEN', token);
    setToken(token);

    // const { roles } = await dispatch('getInfo');

    resetRouter();
    const accessRoutes = await dispatch('permission/generateRoutes', store.getters.roles, { root: true });
    router.addRoutes(accessRoutes);

    dispatch('tagsView/delAllViews', null, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
