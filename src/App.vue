<template>
  <div>
    <h2>タスク一覧</h2>
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <input type="checkbox" v-bind:checked="task.done"
          v-on:change="toggleTaskStatus(task)">
        {{ task.name }}

        <span v-for="id in task.labelIds" v-bind:key="id">
          {{ getLabelText(id) }}
        </span>        
      </li>
    </ul>

    <form v-on:submit.prevent="addTask">
      <input type="text" v-model="newTaskName" placeholder="新しいタスク">
    </form>

    <h2>ラベル一覧</h2>
    <ul>
      <li v-for="label in labels" v-bind:key="label.id">
        <input type="checkbox" v-bind:value="label.id"
          v-model="newTaskLabelIds">
        {{ label.text }}
      </li>
    </ul>

    <form v-on:submit.prevent="addLabel">
      <input type="text" v-model="newLabelText" placeholder="新しいラベル">
    </form>

    <h2>ラベルでフィルター</h2>
    <ul>
      <li v-for="label in labels" v-bind:key="label.id">
        <input type="radio" v-bind:checked="label.id === filter" v-on:change="changeFilter(label.id)">
        {{ label.text }}
      </li>
      <li>
        <input type="radio" v-bind:checked="!filter" v-on:change="changeFilter(null)">
        フィルタしない
      </li>
    </ul>

    <h2>保存と復元</h2>
    <button type="button" v-on:click="save">保存</button>
    <button type="button" v-on:click="restore">復元</button>    
  </div>
</template>

<script>
 export default {
   data: function() {
     return {
      // 入力中の新しいタスク名を一時保持
      newTaskName: '',
      // 新しいタスクに紐付くラベルを一時保持
      newTaskLabelIds: [],
      // 入力中の新しいラベルを一時保持
      newLabelText: ''
     }
   },
  computed: {
    tasks: function() {
      return this.$store.getters.filteredTasks
    },
    labels: function() {
      return this.$store.state.labels
    },
    filter: function() {
      return this.$store.state.filter
    }
  },
  methods: {
    // タスクの追加
    addTask: function() {
      // 'addTask'mutationをコミット
      this.$store.commit('addTask', {
        name: this.newTaskName,
        labelIds: this.newTaskLabelIds,
      })
      this.newTaskName = '';
      this.newTaskLabelIds = [];
    },
    // タスク完了状態の更新
    toggleTaskStatus: function(task) {
      // 'toggleTaskStatus'mutationをコミット
      this.$store.commit('toggleTaskStatus', {
        id: task.id
      })
    },
    // ラベルを追加する
    addLabel: function() {
      // 'addLabel'mutationをコミット
      this.$store.commit('addLabel', {
        text: this.newLabelText,
      })
      this.newLabelText = ''
    },
    // ラベルのidから、そのラベルのテキストを返す
    getLabelText: function(id) {
      const label = this.labels.filter(label => label.id === id)[0]
      return label ? label.text : ''
    },
    // フィルタする対象のラベルを変更
    changeFilter: function(labelId) {
      // 'changeFilter'mutationをコミット
      this.$store.commit('changeFilter', {
        filter: labelId
      })
    },
    save: function() {
      // 'sava'actionをコミット
      this.$store.dispatch('save')
    },
    restore: function() {
      // 'restore'actionをコミット
      this.$store.dispatch('restore')
    },
  },
 }
</script>