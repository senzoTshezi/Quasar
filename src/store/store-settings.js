import { LocalStorage, SessionStorage} from 'quasar'

const state = {
    settings : {
        show12HourTimeFormat: false,
        showTasksInOneList: false
    }
}

const mutations = {
    setShow12HourTimeFormat(state, value){
        state.settings.show12HourTimeFormat = value
    },
    setShowTasksInOneList(state, value){
        state.settings.showTasksInOneList = value
    },
    //OBJECT ASSIGNMENT
    setSettings(state,settings){
        Object.assign(state.settings, settings);
    }
}

const actions = {
    setShow12HourTimeFormat({commit , dispatch},value){
        commit('setShow12HourTimeFormat', value)
        //IN ODER TO TRIGET THE SAVESETTING WE NEED DISPACH
        dispatch('saveSettings')

    },
    setShowTasksInOneList({commit, dispatch},value){
        commit('setShowTasksInOneList', value)
        dispatch('saveSettings')
    },
    // WE ARE SAVING ON LOCAL STORAGE 
    saveSettings({state}){
        LocalStorage.set('settings',state.settings)
    },
    // NOW WE NEED TO GET THE VALUES FROM LOCAL STORAGE TO OUR PAGE 
    getSettings({commit}){
        let settings = LocalStorage.getItem('settings');
        if(settings){
            commit('setSettings', settings)
        }
    }
}
//Getter that greps all of our settings 
const getters ={
    settings: state => {
        return state.settings
    }
}

export default {
    namespaced : true,
    state,
    mutations,
    actions,
    getters
}