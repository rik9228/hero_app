export default {
  namespaced: true, //モジュールとして登録できる
  state: {
    selectedHeros: [],
    selectedVillains: [],
  },
  getters: {
    // コンポーネントから使用するときは基本getterで拾う。（stateは非推奨）
    selectedHeros: state => state.selectedHeros ,// 戻り値返す
    selectedVillains: state => state.selectedVillains ,// 戻り値返す
    isSelected: state => id => state.selectedHeros.map(hero => hero.id).includes(id),
    isSelected2: state => id => state.selectedVillains.map(hero => hero.id).includes(id),
  },
  mutations: {
    selectedHeros(state, val) {
      state.selectedHeros = val;
    },
    selectedVillains(state, val) {
      state.selectedVillains = val;
    }
  },
  actions: {
    toggleHeros({ commit, state, getters }, { hero, limit }) {
      if (getters.isSelected(hero.id)) {
        var newVal = state.selectedHeros.filter(selectedHero => selectedHero.id !== hero.id);
      } else {
        if (state.selectedHeros.length >= limit) {
          alert("これ以上選べません");
          return;
        } else {
          var newVal = state.selectedHeros.filter(selectedHero => true);
          newVal.push(hero);
        }
      }
      commit("selectedHeros", newVal);
    },
    toggleVillains({ commit, state, getters }, { hero, limit }) {
      if (getters.isSelected2(hero.id)) {
        var newVal = state.selectedVillains.filter(selectedHero => selectedHero.id !== hero.id);
      } else {
        if (state.selectedVillains.length >= limit) {
          alert("これ以上選べません");
          return;
        } else {
          var newVal = state.selectedVillains.filter(selectedHero => true);
          newVal.push(hero);
        }
      }
      commit("selectedVillains", newVal);
    },
    // async isSelected({ commit, state }, heroId) {
    //   console.log("called isSlected=>", heroId);
    //   console.log("called isSlected=>", state.selectedHeros.includes(heroId));
    //   var result = state.selectedHeros.includes(heroId);
    //   return result;
    // }
  }
};
