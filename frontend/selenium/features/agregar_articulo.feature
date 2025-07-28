@agregararticulo
Feature: Agregar artículo
  Como usuario registrado
  Quiero poder acceder al sistema 
  Para registrar un nuevo producto

  Background:
    Given el usuario se encuentra autenticado y esta en la lista de articulos
    
  @agregararticuloexitosamente
  Scenario Outline: Usuario registra un producto de manera exitosa
    When el usuario ingresa a Crear un Nuevo Artículo
    And ingresa los datos del nuevo producto con: "<codigosku>", "<descripcion>", "<stock>", "<costo>", "<precio>", "<tipoum>"
    Then el articulo "<codigosku>" es agregado y aparece en listado de articulos

    Examples:
      | codigosku              | descripcion  | stock    | costo   | precio  | tipoum     |
      | SKU-I16                | Iphone 16    | 2540     | 3245    | 4890    | Unidad     | 
      | SKU-1                  | Válido       | 5        | 0,23    | 0,53    | Unidad     |
      | SKU-2                  | Válido       | 10       | 5,24    | 9,54    | Kg          | 
      | SKU-3                  | Válido       | 100      | 57000,25 | 100000,00 | Caja       |
      | SKU-maximos            | Producto con Stock  | 2147483647 | 9999999999999,99 | 9999999999999,99 | Kg         | 
      | SKU-S-C-P-0s           | Producto con Stock, Costo y Precio de Venta en cero       | 0          | 0,00             | 0,00             | Unidad     |
      | SKU-negativos          | Producto con Stock, Costo y Precio de Venta negativos     | -1         | -1,01            | -1,02            | Kg         |    
      | SKU-con-Desc-garabatos | #$%&/?¿¡°¬   | 5          | 1,23             | 2,34             | Kg         |    
      | #$%&/?¿¡°¬             | SKU-con-Codigo-garabatos | 2          | 2,24             | 2,35             | Unidad     |
