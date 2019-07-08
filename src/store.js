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
        labelIds: [1,2],
        done: false
      },
      {
        id: 2,
        name: 'vueの本を買う',
        labelIds: [1, 3],
        done: true
      }
    ],
    // ラベルの初期state
    labels: [
      {
        id: 1,
        text: '買い物',
      },
      {
        id: 2,
        text: '食料',
      },
      {
        id: 3,
        text: '本',
      }
    ],
    // 次に追加するタスク、ラベルid 今回は決め打ち
    nextTaskId: 3,
    nextLabelId: 4,
    // フィルターするラベルid
    filter: null,
  },
  getters: {
    filteredTasks(state) {
      // ラベルが選択されていなければそのまま一覧を返す
      if(!state.filter) {
        return state.tasks
      }
      // 選択されているタスクでフィルタリングする
      return state.tasks.filter(task => {
        return task.labelIds.indexOf(state.filter) >= 0
      })
    }
  },
  mutations: {
    // タスクの追加
    addTask: function(state, { name, labelIds }) {
      state.tasks.push({
        id: state.nextTaskId,
        name,
        labelIds,
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
    // ラベルの追加
    addLabel: function(state, { text }) {
      state.labels.push({
        id: state.nextLabelId,
        text
      })
      state.nextLabelId++
    },
    // フィルタリング対象のラベルを変更する
    changeFilter: function(state, { filter }) {
      state.filter = filter
    }
  },
})