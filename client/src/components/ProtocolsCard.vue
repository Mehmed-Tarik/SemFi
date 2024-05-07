<template>
    <div v-for="protocol in protocols" :key="protocol.id">
        <ProtocolCard  :protocol="protocol" @chosenProtocol="$emit('chosenProtocol', protocol.name)"/>
    </div>
</template>

<script>
import ProtocolCard from './ProtocolCard.vue'

export default {
    name: "ProtocolsCard",
    components: {
        ProtocolCard
    },
    props: {
        protocols: Array
    },
    emits: ['chosenProtocol']
}
</script>
