<template>
  <div>
    <h2>タスク一覧</h2>
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <input type="checkbox" v-bind:checked="task.done"
          v-on:change="toggleTaskStatus(task)">
        {{ task.name }}
      </li>
    </ul>

    <form v-on:submit.prevent="addTask">
      <input type="text" v-model="newTaskName" placeholder="新しいタスク">
    </form>
  </div>
</template>

<script>
 export default {
   data: function() {
     return {
       newTaskName: '',
     }
   },
  computed: {
    tasks: function () {
      return this.$store.state.tasks
    },
  },
  methods: {
    // タスクの追加
    addTask: function() {
      // 'addTask'mutationをコミット
      this.$store.commit('addTask', {
        name: this.newTaskName,
      })
      this.newTaskName = ''
    },
    // タスク完了状態の更新
    toggleTaskStatus: function(task) {
      // 'toggleTaskStatus'mutationをコミット
      this.$store.commit('toggleTaskStatus', {
        id: task.id
      })
    },
  },
 }
</script>
