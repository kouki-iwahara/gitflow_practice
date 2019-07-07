import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // タスク初期のstate
    tasks: [
      {
        id: 1,
        name: '牛乳を買う',
        done: false
      },
      {
        id: 2,
        name: 'vueの本を買う',
        done: true
      }
    ],
    // 次に追加するタスク　今回は決め打ち
    nextTaskId: 3,
  },
  mutations: {
    // タスクの追加
    addTask: function(state, { name }) {
      state.tasks.push({
        id: state.nextTaskId,
        name,
        done: false
      })
      // 次に追加されるタスクに追加されるidを更新
      state.nextTaskId++
    },
    // タスクの完了状態を更新
    toggleTaskStatus: function(state, { id }){
      const filtered = state.tasks.filter(task => {
        return task.id === id
      })
      filtered.forEach(task => {
        task.done = !task.done
      })
    },
  },
})

