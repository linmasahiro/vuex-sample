/**
 * A Simple Vuex Sample
 * 
 * @date   2020/03/20
 * @author Lin Masahiro(k80092@hotmail.com)
 */

// Module A
const moduleA = {
    namespaced: true,
    state: {
        count: 0
    },
    // remenber, mutations is always synchronous
    mutations: {
        increment: state => state.count++,
    },
    // if i need count something, use getters
    getters: {
        getCountPlusTwo: state => {
            return state.count + 2
        }
    },
    // if i need asynchronous, use actions
    actions: {
        asyncIncrement({
            commit
        }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('increment')
                    resolve()
                }, 1000)
            })
        }
    }
}

// Module A
const moduleB = {
    namespaced: true,
    state: {
        count: 0
    },
    // remenber, mutations is always synchronous
    mutations: {
        increment: state => state.count++,
    },
    // if i need count something, use getters
    getters: {
        getCountPlusTwo: state => {
            return state.count + 2
        }
    },
    // if i need asynchronous, use actions
    actions: {
        asyncIncrement({
            commit
        }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('increment')
                    resolve()
                }, 1000)
            })
        }
    }
}

// Store
const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB,
    }
})

// Init
const app = new Vue({
    el: '#app',
    store,
    data: function () {
        return {
            // Local State
            localCount: 1,
        }
    },
    computed: Object.assign({},
        // If can not use Object Spread...
        new Vuex.mapState("a", {
            // Arrow Func Type
            countA: state => state.count,
            // Alias type
            countAAA: 'count',
            // Classic Func Type
            countPlusLocalStateA(state) {
                return state.count + this.localCount
            }
        }),
        new Vuex.mapState("b", {
            countB: state => state.count,
            countBBB: 'count',
            countPlusLocalStateB(state) {
                return state.count + this.localCount
            }
        }),
        // if i need get something counted result, add getters
        new Vuex.mapGetters({
            getCountPlusTwoA: 'a/getCountPlusTwo',
            getCountPlusTwoB: 'b/getCountPlusTwo',
        }),
    ),
    methods: {
        incrementA() {
            this.$store.commit('a/increment')
        },
        incrementB() {
            this.$store.commit('b/increment')
        },
        asyncIncrementA() {
            this.$store.dispatch('a/asyncIncrement')
        },
        asyncIncrementB() {
            this.$store.dispatch('b/asyncIncrement')
        },
    },
    template: `
      <div>
        <table>
          <tr>
            <th>Module A</th>
            <th>Module B</th>
          </tr>
          <tr>
            <td>count: {{ countA }}</td>
            <td>count: {{ countB }}</td>
          </tr>
          <tr>
            <td>countPlusLocalState: {{ countPlusLocalStateA }}</td>
            <td>countPlusLocalState: {{ countPlusLocalStateB }}</td>
          </tr>
          <tr>
            <td>getCountPlusTwoA: {{ getCountPlusTwoA }}</td>
            <td>getCountPlusTwoB: {{ getCountPlusTwoB }}</td>
          </tr>
          <tr>
            <td>
              <button @click="incrementA">increment</button><br/>
              <button @click="asyncIncrementA">asyncIncrement</button><br/>
            </td>
            <td>
              <button @click="incrementB">increment</button><br/>
              <button @click="asyncIncrementB">asyncIncrement</button><br/>
            </td>
          </tr>
        </table>
      </div>
    `
})