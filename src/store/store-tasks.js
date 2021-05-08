import Vue from 'vue'
import {uid} from 'quasar'
//Now the firebaseDB API is now available in this store module
import { firebaseDB , firebaseAuth, firebaseDb} from 'boot/firebase'
// Here we have a list of objects that does different things 

// This is where we will store our Data 
const state = {

      tasks :{
        // 'ID1': {
        //         id : 1,
        //         name : " Calves",
        //         targetNumber: 50,
        //         currentQuantity: 20,
        //         dueDate: '2021/12/01',
        //         dueTime: "12:00",
        //         completed : false
        //       },
        // 'ID2': {
        //         id : 1,
        //         name : "Pigs ",
        //         targetNumber: 100,
        //         currentQuantity: 10,
        //         dueDate: '2021/12/02',
        //         dueTime: "12:00",
        //         completed : false
        //   },
        //   'ID3': {
        //     id : 1,
        //     name : "Goats ",
        //     targetNumber: 22,
        //     currentQuantity: 77,
        //     dueDate: '2021/12/03',
        //     dueTime: "12:00",
        //     completed : false
        //   }
      },
      search : '',
      sort:'name'

}

// This is where we will create our Methods that manipulate the state 
// These methods can't not be asyncronus, these methods will be manipulating the state directory 
const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },

  deleteTask(state,id){
    Vue.delete(state.tasks, id)
  },

  addTask(state, payload){
    Vue.set(state.tasks, payload.id, payload.task)
  },
  setSearch(state, value){
    state.search =value
  },
  setSort(state, value){
    state.sort =value
  },
  
}

//This one can be asyncronus, that can go tu server update then commit to mutation then adds that data to the state 
const actions = {
  // Acttions always expect objects and data that you are sending from the component 
  updateTask({dispatch}, payload) {
    // console.log("PAYLOAD : ", payload)
    dispatch('fbUpdateTask', payload)
  },

  deleteTask({dispatch},id){
    dispatch('fbDeleteTask',id)
  },
  addTask({dispatch }, task){
    // We are generating a new Uid and include that Uid to task 
    let taskId = uid();
    let payload = {
      id : taskId,
      task : task
    }
    dispatch('fbAddTask', payload)
  },
  setSearch({commit}, value){
    commit('setSearch', value)
  },
  setSort({commit}, value){
    commit('setSort', value)
  },
  //FIREBASE READ DATA
  fbReadData({ commit }){
    let userId = firebaseAuth.currentUser.uid
    let userTasks = firebaseDb.ref('tasks/'+ userId)

    //Child added When there is a new Task Added on DB it shows on web sametime
    userTasks.on('child_added', snapshot =>{
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        task: task
      }
      commit('addTask', payload)
    })

    //Child Changed when updating something on DB must also update the View 
    userTasks.on('child_changed', snapshot =>{
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task
      }
      commit('updateTask', payload)
    })

    //Child Remove
    userTasks.on('child_removed', snapshot =>{
      let taskId = snapshot.key
      commit('deleteTask', taskId)
    })

  },
  fbAddTask({}, payload){
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.set(payload.task)
  },
  fbUpdateTask({}, payload){
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.update(payload.updates)
  },
  fbDeleteTask({}, taskId){
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + taskId)
    taskRef.remove()
  }

}

// Get data from the state and that data can be used by components 
//But in this part you can also manipulate that data, bufe used by components 
const getters ={
  //SORT 
  tasksSorted: (state)=>{
    let tasksSorted = {},
        keysOrdered = Object.keys(state.tasks);

        // A and B are first and second key
        keysOrdered.sort((a,b) => {
          let taskAProp = state.tasks[a][state.sort].toLowerCase(),
              taskBProp = state.tasks[b][state.sort].toLowerCase();

            if(taskAProp > taskBProp) return 1
            else if (taskAProp < taskBProp) return -1
            else return 0
        })
        keysOrdered.forEach((key) => {
          tasksSorted[key] = state.tasks[key]
        })
        return tasksSorted
  },
   // SEARCH GETTER 
    tasksFiltered:(state, getters) => {
      let tasksSorted = getters.tasksSorted,
       tasksFiltered = {}
      if(state.search){
        //Populate empty object
        Object.keys(tasksSorted).forEach(function(key){
          let task = tasksSorted[key]
          if(task.name.toLowerCase().includes(state.search.toLowerCase())){
            tasksFiltered[key] = task
          }

        })
        return tasksFiltered
      }
      return tasksSorted
    },

    // Get only todo Task
    tasksTodo : (state, getters) => {
      let tasksFiltered = getters.tasksFiltered
      let tasks ={}
      Object.keys(tasksFiltered).forEach(function(key){
        let task = tasksFiltered[key];
         if(!task.completed){
           tasks[key] = task
         }
      })
        return tasks
    },
    // Get Only completed Tasks 
    tasksCompleted : (state,getters) => {
      let tasksFiltered = getters.tasksFiltered
      let tasks ={}
      Object.keys(tasksFiltered).forEach(function(key){
        let task = tasksFiltered[key];
         if(task.completed){
           tasks[key] = task
         }
      })
        return tasks
    },

}

export default {
    namespaced : true,
    state,
    mutations,
    actions,
    getters
}