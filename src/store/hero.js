export default {
  namespaced: true, //モジュールとして登録できる
  state: {
    selectedHeros: []
  },
  getters: {
    // コンポーネントから使用するときは基本getterで拾う。（stateは非推奨）
    selectedHeros: state => state.selectedHeros // 戻り値返す
  },
  mutations: {
    selectedHeros(state, val) {
      state.selectedHeros = val;
    }
  },
  actions: {
    toggleHeros({ commit, state }, { heroId, limit }) {
      if (state.selectedHeros.includes(heroId)) {
        var newVal = state.selectedHeros.filter(selectedId => selectedId !== heroId);
      } else {
        if (state.selectedHeros.length === this.limit) {
          alert("これ以上選べません");
        } else {
          console.log("aaaaa", heroId);
          var newVal = state.selectedHeros.filter(selectedId => true);
          newVal.push(heroId);
        }
      }
      console.log("newval =>", newVal);
      commit("selectedHeros", newVal);
    },
    async isSelected({ commit, state }, heroId) {
      console.log("called isSlected=>", heroId);
      console.log("called isSlected=>", state.selectedHeros.includes(heroId));
      var result = state.selectedHeros.includes(heroId);
      return result;
    }
  }
};
