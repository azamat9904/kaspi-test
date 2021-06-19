import Vue from 'vue'
import Vuex from 'vuex'
import cards from "@/mock/cards.json";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        cards: [],
    },
    mutations: {
        setCards(state, cards) {
            state.cards = cards;
        }
    },
    getters: {
        cards: state => state.cards
    },
    actions: {
        async fetchCards({ commit }) {
            const { jobs } = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(cards);
                }, 3000);
            });
            commit('setCards', jobs);
        }
    }
});

