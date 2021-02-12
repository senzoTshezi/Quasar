<template>
            <!-- (task, key) key is the object name  -->
    <q-item @click="updateTask({id:id , updates: {completed : ! task.completed}})" tag="label" v-ripple  clickable :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'" >
        <q-item-section side top>
            <q-checkbox :value="task.completed" class="no-pointer-events" />
        </q-item-section>

        <q-item-section>
            <q-item-label :class="{'text-strike' : task.completed}">{{task.name}} </q-item-label>
        </q-item-section>

        <q-item-section>
            <q-item-label>Target : {{task.target}} </q-item-label>
        </q-item-section>

        <q-item-section>
            <q-item-label>Current : {{task.current}}</q-item-label>
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
            <q-btn flat round color="red" dense icon="delete" @click.stop="promptToDelete(id)"/>
        </q-item-section>
    </q-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: ['task','id'],
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
    }
    
}
</script>

<style >

</style>