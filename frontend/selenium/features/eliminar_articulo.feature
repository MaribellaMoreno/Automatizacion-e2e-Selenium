@eliminar
Feature: Eliminación de artículo
  Como usuario registrado
  Quiero eliminar un producto
  Para mantener actualizado el inventario

  Background:
    Given el usuario se encuentra autenticado y esta en la lista de articulos

  @eliminar_articulo
  Scenario: Usuario elimina un artículo existente de la lista
    When el usuario busca el artículo con nombre "<descripcion>" y accede a su eliminación
    Then se valida el mensaje de éxito "<mensaje>" para el artículo "<descripcion>"

  Examples:
    | descripcion        | mensaje                       |
    | Iphone 16 Pro Max  | Artículo eliminado con éxito. |