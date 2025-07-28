@login
Feature: Inicio de sesión
  Como usuario registrado 
  Quiero iniciar sesion 
  Para ingresar al sistema
  
  @loginvalido
  Scenario Outline: Usuario registrado accede con credenciales válidas
    Given el usuario está en la página de login
    When inicia sesión con el email "<usuario>" y la clave "<clave>"
    Then se valida el mensaje "<mensaje>"

    Examples:
      | usuario           | clave            | mensaje                                   |
      | tester@adl.com    | testerEngineer   | Bienvenido al sistema ERP.                |

    