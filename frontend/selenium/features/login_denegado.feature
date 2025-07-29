@login
Feature: Restricción de acceso al sistema
  Como usuario no registrado
  Quiero validar que no puedo acceder al sistema
  Para mantener la seguridad de la plataforma

  @logininvalido
  Scenario Outline: Usuario no registrado intenta iniciar sesión con credenciales inválidas
    Given el usuario está en la página de login
    When intenta iniciar sesión con el email "<usuario>" y la clave "<clave>"
    Then se valida el mensaje de error "<mensaje>"

    Examples:
      | usuario                | clave              | mensaje                                          |
      | usuario@noexiste.com   | claveIncorrecta    | Las credenciales proporcionadas son incorrectas. |