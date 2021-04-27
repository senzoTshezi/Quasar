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
import { mapActions } from 'vuex'
export default {
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
        submitForm(){
            // console.log("SUBMIT")
            this.$refs.modalTaskName.$refs.name.validate();
            // this.$refs.modalTargetNumber.$refs.targetNumber.validate()
            // this.$refs.modalCurrentQuantity.$refs.currentQuantity.validate()
            if(!this.$refs.modalTaskName.$refs.name.hasError  ){
                this.submitTask();
            }
        },
        submitTask() {
            this.updateTask({
                id : this.id,
                updates: this.taskToSubmit
                
            })
            this.$emit('close');
            console.log('Senzo Tshezi ');
        }
    },
    components:{
        'modal-header':require('components/Tasks/Modals/Shared/ModalHeader.vue').default,
        'modal-task-name':require('components/Tasks/Modals/Shared/ModalTaskName.vue').default,
        'modal-due-date':require('components/Tasks/Modals/Shared/ModalDueDate.vue').default,
        'modal-due-time':require('components/Tasks/Modals/Shared/ModalDueTime.vue').default,
        'modal-target-number':require('components/Tasks/Modals/Shared/ModalTargetNumber.vue').default,
        'modal-current-quantity':require('components/Tasks/Modals/Shared/ModalCurrentQuantity.vue').default,
        'modal-buttons':require('components/Tasks/Modals/Shared/ModalButtons.vue').default
    },
    mounted(){
        this.taskToSubmit = Object.assign({},this.task)
    }
}
</script>

<style >

</style>