# Vueble (0.1.3)
Responsive and smart **vue** datatable component
![](https://image.ibb.co/nFmyJa/On_Paste_20170905_132247.png)
### Ventajas:
+ filas y columnas editables
+ busqueda inteligente
+ render optimizado
+ UI en base a bootstap

### Instalación
Necesitas importar bootstrap en tu archivo ```.html``` (usa la versión que desees)
```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
```

Abre tu consola preferida en la ruta principal de tu proyecto vue2 y escribe el sigiente comando:

```npm
$ npm install vueble --save
```
luego importalo a tu proyecto vue
```javascript
import vueble from 'vueble'

Vue.use(vueble)
```
##  Propiedades

| Propiedad | Tipo de dato |Descripcion |Requerido |
| ------------- | ------------- |------------- |------------- |
| ```items```| JSON Array  | data que se renderizara en el datatable | si |
| ```lang```  | String | lenguaje de textos del componente. Opciones disponibles ```en ```,  es . por defecto está en inglés. | no |
| ```page-length```  | Number | número de botones que se mostraran en el paginador. por defecto se muestran 7 | no  |
| ```searcheable-props```  | Array | define en un arreglo las propiedades de los items que se tomaran en cuenta para el input de busqueda  | no  |
# Usos:
#### items (Requerido)
Solo necesitas pasar el Json con la data que quieres renderizar en el datatable, ```vueble``` se encarga de todo el trabajo ya que automaticamente toma el primer item para detectar los nombre de las cabeceras del datatable.
```html
<vueble :items="[
    {name:'jhon doe',age:'25'},
    {name:'July doe',age:'21'},
  ]"></vueble>
```
#### lang
```html
<vueble :items="JsonData" lang="es"></vueble>
```
#### page length
```html
<vueble :items="JsonData" :page-length="3"></vueble>
```
Resultado:

![](https://image.ibb.co/jDhxda/On_Paste_20170905_134523.png)
#### searcheable props
Esta opción permite restringir o parametrizar el filtro de busqueda, se puede acceder a propiedades anidadas o subpropiedades con el operador ```.```
```html
<vueble :items="JsonData" :searcheable-props="[
    'Person.firstName',
    'Person.LastName'
]"></vueble>
```
##  Personalización
### Columnas
Esta cualidad te permitira editar visualmente tus cabeceras y agregarles funcionalidad con la potencia de ```vue```
```html
<vueble :items="JsonData">
    <tr slot="colums">
        <!-- Aqui puedes editar el contenido de tus cabeceras -->
        <th><i class="fa fa-user"> </i> Frist Name</th>
        <th><i class="fa fa-user"> </i> Last Name</th>
        <th><i class="fa fa-user"> </i> Username</th>
        <th>@ Email</th>
        <!-- -->
    </tr>
</vueble>
```
### Filas
Para poder acceder a las propiedades o subpropiedades del ```item``` de nuestro ```JsonData``` lo haremos utilizando como raiz ```item.scope```. Esta cualidad te permitira editar visualmente las filas del componente y agregar funcionalidad a ellas sin depender de la programacion interna de ```vueble```
```html
<vueble :items="JsonData">
    <template slot="row" scope="item">
        <tr >
            <td>{{item.scope.Person.firstName}}</td>
            <td>{{item.scope.Person.lastName}}</td>
            <td>{{item.scope.username}}</td>
            <td>{{item.scope.email}}</td>
        </tr>
    </template>
</vueble>
```

## License
[MIT](LICENSE.txt) License