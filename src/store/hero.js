export default {
  namespaced: true, // モジュールとして登録できる
  state: {
    selectedHeros: []
  },
  getters: {
    // コンポーネントから使用するときは基本getterで拾う。（stateは非推奨）
    selectedHeros: state => state.selectedHeros, // 戻り値返す
    selectedHerosFromCharacterType: state => type =>
      state.selectedHeros.filter(hero => hero.characterType === type), // 戻り値返す
    // キャラクタータイプを引数にとって、指定のキャラクタータイプのヒーローがselectedHerosに何体いるかのカウントを返す
    getHeroCount: state => type =>
      state.selectedHeros.filter(hero => hero.characterType === type).length,
    isSelected: state => ({ hero, type }) =>
      state.selectedHeros.some(
        selectedHero => selectedHero.id === hero.id && selectedHero.characterType === type
      )
    // gettersでは引数を取れない。（isSelected は関数を返している）
  },
  mutations: {
    selectedHeros(state, val) {
      state.selectedHeros = val;
    }
  },
  actions: {
    initialize({ commit }) {
      commit("selectedHeros", []);
    },
    toggleHeros({ commit, state, getters }, { hero, limit }) {
      console.log("■■■■■■■■■■■■■■■■■■■■■");
      console.log("called toggleHeros", hero);
      console.log("■■■■■■■■■■■■■■■■■■■■■");
      if (getters.isSelected({ hero, type: hero.characterType })) {
        // 抜く
        var indx = state.selectedHeros.findIndex(
          selectedHero =>
            selectedHero.id === hero.id && selectedHero.characterType === hero.characterType
        );
        console.log("■■■■■■■■■■■■■■■■■■■■■");
        console.log("index", indx);
        console.log("■■■■■■■■■■■■■■■■■■■■■");
        var newVal = state.selectedHeros.slice(0, state.selectedHeros.length); // 配列のコピー 0番目から最後のindexまでをコピー
        newVal.splice(indx, 1); // BAD：直に配列に干渉するかsliceを使う
      } else {
        if (state.selectedHeros.length >= limit) {
          alert("これ以上選べません");
          return;
        } else {
          var newVal = state.selectedHeros.filter(selectedHero => true);
          console.log("push!!", JSON.stringify(hero));
          newVal.push(hero);
        }
      }
      commit("selectedHeros", newVal);
    }
  }
};
