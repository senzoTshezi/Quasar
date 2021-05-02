export default{
    methods :{
        submitForm(){
            // console.log("SUBMIT")
            this.$refs.modalTaskName.$refs.name.validate();
            // this.$refs.modalTargetNumber.$refs.targetNumber.validate()
            // this.$refs.modalCurrentQuantity.$refs.currentQuantity.validate()
            if(!this.$refs.modalTaskName.$refs.name.hasError  ){
                this.submitTask();
            }
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
    }
}