import Vue from 'vue'
import {uid} from 'quasar'
// Here we have a list of objects that does different things 

// This is where we will store our Data 
const state = {

      tasks :{
        // 'ID1': {
        //         id : 1,
        //         name : "Buy Calves",
        //         target: 50,
        //         current: 20,
        //         dueDate: '2021/12/01',
        //         dueTime: "12:00",
        //         completed : false
        //       },
        // 'ID2': {
        //         id : 1,
        //         name : "Buy Calves",
        //         target: 50,
        //         current: 20,
        //         dueDate: '2021/12/01',
        //         dueTime: "12:00",
        //         completed : false
        //   },
      }

    // In the real world we will be using Firebase and Firebase is using Objects , not arrays 
    // tasks : [
    //     {
    //       id : 1,
    //       name : "Buy Calves",
    //       target: 50,
    //       current: 20,
    //       dueDate: '2021/12/01',
    //       dueTime: "12:00",
    //       completed : false
    //     },
    //     {
    //       id : 2,
    //       name : "Buy Pigs",
    //       target: 100,
    //       current: 0,
    //       dueDate: '2021/12/01',
    //       dueTime: "12:00",
    //       completed : false
    //     }
    //   ]
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
  }
}

//This one can be asyncronus, that can go tu server update then commit to mutation then adds that data to the state 
const actions = {
  // Acttions always expect objects and data that you are sending from the component 
  updateTask({commit}, payload) {
    // console.log("PAYLOAD : ", payload)
    commit('updateTask', payload)
  },

  deleteTask({commit},id){
    commit('deleteTask',id)
  },
  addTask({commit }, task){
    // We are generating a new Uid and include that Uid to task 
    let taskId = uid();
    let payload = {
      id : taskId,
      task : task
    }
    commit('addTask', payload)
  }
}

// Get data from the state and that data can be used by components 
//But in this part you can also manipulate that data, bufe used by components 
const getters ={
    // arrow function that get data fro the state 
    tasks : (state) => {
        return state.tasks
    }

}

export default {
    namespaced : true,
    state,
    mutations,
    actions,
    getters
}