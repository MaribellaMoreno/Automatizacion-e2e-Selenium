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
      | codigosku  | descripcion  | stock    | costo  | precio  | tipoum     |
      | SKU-I16    | Iphone 16    | 2540     | 3245   | 4890    | Unidad     | 
      | SKU-1      | Válido       | 5        | 0,23   | 0,53    | Unidad     |
    
    
      

