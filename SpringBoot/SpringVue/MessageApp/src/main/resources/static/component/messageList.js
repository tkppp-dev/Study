import MessageListItem from './messageListItem.js'
import lifecycleLogger from '../mixins/mixin_lifecycle-logger.js'
export default {
    name : 'MessageList',
    mixins : [lifecycleLogger],
    template : `
    <ul><message-list-item v-for="item in items" v-bind:item="item" v-bind:key="item.id" v-on:delete="deleteMessage(item)">
    </message-list-item></ul>`,
    // props의 데이터는 읽기 전용으로 컴포넌트에서 조작을 시도하면 안된다.
    // 따라서 v-bind를 통해 computed나 data 프로퍼티의 값을 연결해야하는 것이다.
    props :{
        items : {
            type : Array,
            required : true,
        }
    },
    components :{
        MessageListItem
    },
    methods :{
        deleteMessage(message){
            this.$emit('delete', message)
        }
    }
}