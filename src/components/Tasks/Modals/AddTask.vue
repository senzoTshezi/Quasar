<template>
    <q-card>
        <q-card-section class="row">
          <div class="text-h6">Add Task</div>
          <q-space/>
          <q-btn flat round dense icon="close" v-close-popup/>
        </q-card-section>

        <!-- FORM  -->
        <q-form @submit="submitForm">
            <!-- SECTION IS A CARD THAT CONTAINS ALL FIELS  -->
            <q-card-section class="q-pt-none">

                <!-- TASK NAME  -->
                <div class="row q-mb-sm">
                    <q-input clearable autofocus outlined v-model="taskToSubmit.name" label="Task Name" class="col" :rules="[val => !!val || 'Field is required']" ref="name"/>  
                </div>

                <!-- TASK TARGET -->
                <div v-if="taskToSubmit.name"  class="row q-mb-sm">
                    <q-input clearable type="number" outlined v-model="taskToSubmit.target" label="Task Target" class="col" :rules="[val => !!val || 'Field is required']" ref="target"/> 
                </div> 

                <!-- TASK CURRENT  -->
                <div v-if="taskToSubmit.target"  class="row q-mb-sm">
                    <q-input type="number" outlined v-model="taskToSubmit.current" label="Task Current" class="col" :rules="[val => !!val || 'Field is required']" ref="current"/> 
                </div>  

                <!-- DUE DATE PICKER  -->
                <div  v-if="taskToSubmit.current"  class="row q-mb-sm">
                    <q-input clearable outlined v-model="taskToSubmit.dueDate"  label="Due Date">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date v-model="taskToSubmit.dueDate">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>  
                </div>

                <!-- TIME PICKER    -->
                <div v-if="taskToSubmit.dueDate" class="row q-mb-sm">
                    <q-input clearable outlined v-model="taskToSubmit.dueTime" label="Due Time" class="col">
                        <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-time v-model="taskToSubmit.dueTime">
                                <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                            </q-time>
                            </q-popup-proxy>
                        </q-icon>
                        </template>
                    </q-input>
                </div>
            </q-card-section>

            <!-- BUTTON SUBMIT  -->
            <q-card-actions align="right">
                <q-btn  label="Save" color="green"  type="submit"/>
            </q-card-actions>

        </q-form>
        
    </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return{
            taskToSubmit : {
                name : '',
                target: null,
                current: null,
                dueDate: '',
                dueTime: '',
                completed : false
            }
        }
    },
    methods: {
        // this action is now maped to this component 
        ...mapActions('tasks',['addTask']),
        submitForm(){
            // console.log("SUBMIT")
            this.$refs.name.validate(),
            this.$refs.target.validate(),
            this.$refs.current.validate()
            if(!this.$refs.name.hasError || !this.$refs.target.hasError || !this.$refs.current.hasError  ){
                this.submitTask();
            }
        },
        submitTask() {
            console.log("DATE",this.taskToSubmit.dueDate )
            console.log("Time",this.taskToSubmit.dueTime)
            console.log("completed",this.taskToSubmit.completed )
            this.addTask(this.taskToSubmit)

            this.$emit('close')
        }
    }
}
</script>

<style >

</style>