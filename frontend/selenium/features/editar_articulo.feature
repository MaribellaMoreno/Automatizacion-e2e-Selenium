@editararticulo
Feature: Editar artículo
  Como usuario registrado
  Quiero poder acceder al sistema
  Para actualizar los datos de un producto existente

  Background:
    Given el usuario se encuentra autenticado y esta en la lista de articulos

  @editararticuloexitosamente
  Scenario Outline: Usuario edita el producto "<descripcionAnterior>" por "<descripcionNueva>"
    When el usuario busca el artículo con nombre "<descripcionAnterior>" y accede a su edición
    And actualiza los datos del artículo por: "<codigosku>", "<descripcionNueva>", "<stock>", "<costo>", "<precio>", "<tipoum>"
    Then el artículo actualizado con datos "<codigosku>", "<descripcionNueva>", "<stock>", "<costo>", "<precio>", "<tipoum>" aparece en el listado

    Examples:
      | descripcionAnterior | codigosku | descripcionNueva   | stock | costo | precio | tipoum |
      | Iphone 16           | SKU-I16PM | Iphone 16 Pro Max  | 999   | 799   | 999    | Unidad | 