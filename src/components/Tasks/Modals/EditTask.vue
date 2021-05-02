<template>
    <q-card>
        <!-- Header Title and Close button -->
       <modal-header>Edit Task</modal-header> 

        <!-- FORM  -->
        <q-form @submit="submitForm">
            <!-- SECTION IS A CARD THAT CONTAINS ALL FIELS  -->
            <q-card-section class="q-pt-none">

                <!-- TASK NAME TexBox -->
                <modal-task-name :name.sync="taskToSubmit.name" ref="modalTaskName"/>


                <!-- TASK TARGET TexBox Number-->
                <modal-target-number :targetNumber.sync="taskToSubmit.targetNumber"/>

                <!-- TASK CURRENT  TexBox Number-->
                <modal-current-quantity :currentQuantity.sync="taskToSubmit.currentQuantity"/>

                <!-- DUE DATE PICKER  -->
                <modal-due-date :dueDate.sync="taskToSubmit.dueDate"/>

                <!-- TIME PICKER    -->
                <modal-due-time :dueTime.sync="taskToSubmit.dueTime" v-if="taskToSubmit.dueDate"/>

            </q-card-section>

            <!-- BUTTON SUBMIT  -->
            <modal-buttons/>


        </q-form>
        
    </q-card>
</template>

<script>
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'
import { mapActions } from 'vuex'
export default {
    mixins: [mixinAddEditTask],
    props:['task','id'],
    data() {
        return{
            taskToSubmit : {
            }
        }
    },
    methods: {
        // this action is now maped to this component 
        ...mapActions('tasks',['updateTask']),
        submitTask() {
            this.updateTask({
                id : this.id,
                updates: this.taskToSubmit
                
            })
            this.$emit('close');
            console.log('Senzo Tshezi ');
        }
    },

    mounted(){
        this.taskToSubmit = Object.assign({},this.task)
    }
}
</script>

<style >

</style>