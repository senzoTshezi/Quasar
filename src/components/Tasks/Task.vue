<template>
            <!-- (task, key) key is the object name  -->
    <!-- <q-item @click="updateTask({id:id , updates: {completed : ! task.completed}})" tag="label" v-ripple  clickable :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'" > -->
        <q-item @click="updateTask({ id: id, updates: { completed: !task.completed } })"  tag="label" v-ripple  clickable :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'" >
        <q-item-section side top>
            <q-checkbox :value="task.completed" class="no-pointer-events" />
        </q-item-section>

        <q-item-section>
            <q-item-label :class="{'text-strike' : task.completed}">{{task.name}} </q-item-label>
        </q-item-section>

        <q-item-section>
            <q-item-label>Target Number : {{task.targetNumber}} </q-item-label>
        </q-item-section>

        <q-item-section>
            <q-item-label>Current Quantity : {{task.currentQuantity}}</q-item-label>
        </q-item-section>

        <q-item-section v-if="task.dueDate" side >
            <div class="row">
            <q-icon name="event"/>
                <div class="column">
                <q-item-label caption>{{task.dueDate}}</q-item-label>
                <small> <q-item-label caption>{{task.dueTime}}</q-item-label></small> 
                </div>
            </div>
        </q-item-section>

        <!-- Now we want to mark Tasks as completed  -->
        <q-item-section side >
            <div class="row">
                <q-btn flat round color="primary" dense icon="edit" @click.stop="showEditTask=true"/>
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
import { mapActions } from 'vuex'
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

    // METHOD PROPERTY 
    methods: {
        ...mapActions('tasks', ['updateTask', 'deleteTask']),
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

    // COMPONENTS 
    components:{
        'edit-task' : require('components/Tasks/Modals/EditTask.vue').default
    }
    
}
</script>

<style >

</style>