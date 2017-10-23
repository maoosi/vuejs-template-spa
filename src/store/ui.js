// initial state
const state = {
    menuOpen: false
}

// getters
const getters = {
    isMenuOpen: state => state.menuOpen
}

// actions
const actions = {
    openMenu ({ commit, state }) {
        commit('UPDATE_MENU_OPEN', true)
    },
    closeMenu ({ commit, state }) {
        commit('UPDATE_MENU_OPEN', false)
    },
    toggleMenu ({ commit, state }) {
        commit('UPDATE_MENU_OPEN', !state.menuOpen)
    }
}

// mutations
const mutations = {
    /* eslint-disable no-useless-computed-key */
    ['UPDATE_MENU_OPEN'] (state, menuOpen) {
        state.menuOpen = menuOpen
    }
}

// export the store module
export default {
    state,
    getters,
    actions,
    mutations
}
