<template>
            <!-- (task, key) key is the object name  -->
    <!-- <q-item @click="updateTask({id:id , updates: {completed : ! task.completed}})" tag="label" v-ripple  clickable :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'" > -->
        <q-item @click="updateTask({ id: id, updates: { completed: !task.completed } })" v-touch-hold:1000.mouse="showEditTaskModal"  tag="label" v-ripple  clickable :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'" >
        <q-item-section side top>
            <q-checkbox :value="task.completed" class="no-pointer-events hidden" />
        </q-item-section>

        <q-item-section style="padding-right: 70px;">
            <q-item-label :class="{'text-strike' : task.completed}" v-html="$options.filters.searchHighlight(task.name, search)"> </q-item-label>
        </q-item-section>

        <q-item-section style="padding-right: 70px;">
            <q-item-label>Target Number : {{task.targetNumber}} </q-item-label>
        </q-item-section>

        <q-item-section style="padding-right: 70px;">
            <q-item-label>Current Quantity : {{task.currentQuantity}}</q-item-label>
        </q-item-section>

        <q-item-section v-if="task.dueDate" side >
            <div class="row">
            <q-icon name="event"/>
                <div class="column">
                <q-item-label caption>{{ task.dueDate | niceDate}}</q-item-label>
                <small> <q-item-label caption>{{taskDueTime}}</q-item-label></small> 
                </div>
            </div>
        </q-item-section>

        <!-- Now we want to mark Tasks as completed  -->
        <q-item-section side >
            <div class="row">
                <q-btn flat round color="primary" dense icon="edit" @click.stop="showEditTaskModal"/>
                <q-btn flat round color="red" dense icon="delete" @click.stop="promptToDelete(id)"/>
           </div>
        </q-item-section>

        <!-- EDIT BUTTON  -->
        <q-dialog v-model="showEditTask">
            <edit-task @click="showEditTask = true "  :task="task" :id="id"/>
        </q-dialog>

    </q-item>
</template>

<script>
import { date } from 'quasar'
// const {formatDate } = date;
import { mapState, mapActions, mapGetters } from 'vuex'
import AddTask from './Modals/AddTask.vue'

export default {
  components: { AddTask },
    // PROPS 
    props: ['task','id'],

    // DATA PROPERTY 
    data (){
        return {
            showEditTask : false
        }
    },
    //COMPUTED PROPERTY
    computed:{
        ...mapState('tasks',['search']),
        ...mapGetters('settings', ['settings']),
        taskDueTime() {
            if(this.settings.show12HourTimeFormat){
                // return this.task.dueTime + '💪'
                return date.formatDate(this.task.dueDate + " " + this.task.dueTime ,  'h:mmA')
            }
            return this.task.dueTime
        }
    },

    // METHOD PROPERTY 
    methods: {
        ...mapActions('tasks', ['updateTask', 'deleteTask']),
        showEditTaskModal(){
            this.showEditTask = true;
        },
        promptToDelete(id){
            this.$q.dialog({
                title: 'Confirm',
                message: 'Really Delete ',
                cancel: true,
                persistent: true
            }).onOk(() => {
                this.deleteTask(id);
            })
        }
    },
    //FILTER 
    filters:{
        niceDate(value){
            return date.formatDate(value ,  'MMM D YYYY')
        },
        searchHighlight(value, search){
            if(search){
                let searchRegExp = new RegExp(search, 'ig')
                return value.replace(searchRegExp ,(match) =>{
                    return '<span class="bg-yellow-6">' + search + '</span>'
                })
            }
            return value;  
        }
    },

    // COMPONENTS 
    components:{
        'edit-task' : require('components/Tasks/Modals/EditTask.vue').default
    }
    
}
</script>

<style >

</style>