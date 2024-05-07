<template>
    <div class="protocol-card" @click="chose(protocol.name)">
      <h3>
        {{protocol.name}}
      </h3> 
    </div>
</template>

<script>
export default {
    name: "ProtocolCard",
    props: {
        protocol: Object
    },
    methods: {
        chose(name) {
            this.$emit('chosenProtocol', name)
        }
    },
}
</script>

<style lang="scss" scoped>
.protocol-card {
  display: table;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  margin: 20px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 200px;
  height: 80px;
  h3 {
    display: table-cell;
    vertical-align: middle;
    font-size: 18px;
    letter-spacing: 1px;
    color: #074a60;
  }
  &:hover {
    box-shadow: #719ECE 0px 5px 15px;
  }
}
// .protocol-card {
  // display: inline-block;
  // padding: 20px;
  // background-color: rgba(255, 255, 255, 0.8);
  // padding: 20px;
  // font-size: 30px;
  // text-align: center;
  // margin: 20px;
  // cursor: pointer;
  // border-radius: 10px;
  // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  // width: 200px;
  // height: 80px;
//   h3 {
//     display: table-cell;
//     vertical-align: middle;
//     font-size: 18px;
//     letter-spacing: 1px;
//     color: #074a60;
//   }
// }
</style>