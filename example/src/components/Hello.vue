<template>
  <div class="hello">
    
    <div class="content-box">
        <div class="content-box-panel">
          <vueble 
            :page-length="3"
            :items="json"
            
          >
                  <!--tr slot="colums">
              <th><i class="fa fa-truck"> </i> Ruta</th>
              <th><i class="fa fa-user"> </i> RUC / DNI</th>
              <th><i class="fa fa-user"> </i> Vendedor</th>
              <th style="width:150px"><i class="fa fa-shopping-cart"> </i> Cta. Surtido</th>
              <th style="width:150px"><i class="fa fa-users"> </i> Cta. Cobertura</th>
            </tr>

            <template slot="row" scope="item">
              <tr >
                <td>{{item.scope.ruta.Codigo}}</td>
                <td>{{item.scope.persona.DocIdentidad}}</td>
                <td>{{item.scope.persona.Nombre}}</td>

                <td style="text-align: right;">
                  {{item.scope.CuotaSurtidos}}
                </td>
                
                <td style="text-align: right;">
                        
                      {{item.scope.CuotaCobertura}}
                </td>
              </tr>
            </template-->
          </vueble>
        </div>
      
    </div>
  </div>
</template>

<script>

import mock from './mock2.js'
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
