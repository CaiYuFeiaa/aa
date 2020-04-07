import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        imgId:''
    },
    mutations: {
        setImgId(state,obj){
            state.imgId = obj;
        }
    },
    actions: {
    },
    modules: {
    }
})
