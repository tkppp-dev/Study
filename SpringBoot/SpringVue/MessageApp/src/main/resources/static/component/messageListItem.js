import lifecycleLogger from '../mixins/mixin_lifecycle-logger.js'
export default {
    name : 'MessageListItem',
    mixins : [lifecycleLogger],
    template : `<li>
    {{ item.text }} - {{ item.createdAt | datetime }}
    <button v-on:click="deleteClicked">X</button>
    </li>`,
    props :{
        item : {
            type : Object,
            require : true,
        }
    },
    methods : {
        deleteClicked(){
            this.$emit('delete')
        }
    }
}