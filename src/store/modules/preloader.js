// initial state
const state = {
    activeElems: [],
    timerStart: false
}

// getters
const getters = {
    isPreloading: state => state.activeElems.length !== 0
}

// actions
const actions = {
    startPreloading ({ commit, state }, elem) {
        commit('START_PRELOADING', elem)
    },
    stopPreloading ({ commit, state }, elem) {
        let remainingElems = state.activeElems.filter((el) => { return el !== elem })

        if (remainingElems.length > 0) {
            commit('UPDATE_PRELOADING', remainingElems)
        } else {
            let timeSpent = Date.now() - state.timerStart

            if (timeSpent <= env.PRELOADER_MIN_DELAY) {
                setTimeout(() => {
                    commit('UPDATE_PRELOADING', remainingElems)
                }, env.PRELOADER_MIN_DELAY - timeSpent)
            } else {
                commit('UPDATE_PRELOADING', remainingElems)
            }
        }
    }
}

// mutations
const mutations = {
    /* eslint-disable no-useless-computed-key */
    ['START_PRELOADING'] (state, elems) {
        state.timerStart = Date.now()
        state.activeElems = elems
    },
    /* eslint-disable no-useless-computed-key */
    ['UPDATE_PRELOADING'] (state, elems) {
        state.activeElems = elems
    }
}

// export the store module
export default {
    state,
    getters,
    actions,
    mutations
}
