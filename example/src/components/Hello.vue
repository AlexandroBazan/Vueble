<template>
  <div class="hello">
    
    <div class="content-box">
        <div class="content-box-panel">
          <vueble 
            :items="json"
            page-length="3"
          ></vueble>
        </div>
      
    </div>
  </div>
</template>

<script>

import mock from './mock.js'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Vueble',
      json: mock
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.content-box{
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.content-box-panel {
  width: 70%;
}
@media only screen and (max-width: 500px) {
    .content-box-panel {
          width: 100% !important;
    }
}
</style>
