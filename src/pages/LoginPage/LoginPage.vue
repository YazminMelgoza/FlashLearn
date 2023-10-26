<script setup lang="ts">

</script>

<template>

  <div class="login-container text-center">
    <div class="header">
      <img class="logo mx-auto" src="../../assets/LOGOTIPOV2.jpg" alt="Logotipo de Mi Sitio Web">
      <h2>Inicio de sesion</h2>
    </div>
    <form id="login-form">
      <input type="text" id="username" placeholder="Nombre de usuario">
      <input type="password" id="password" placeholder="Contraseña">
      <input type="submit" value="Iniciar sesión">
    </form>
    <p class="mt-4">¿No tienes una cuenta?
    </p>
      <RouterLink to="/register">Registrate aqui</RouterLink>
  </div>

</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
.login-container {
  width: 300px;
  margin: 0 auto;
  padding-top: 100px;
}
.login-container form {
  display: flex;
  flex-direction: column;
}
.login-container input[type="text"],
.login-container input[type="password"] {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #7D51DF;
  background-color: #dac0fe;
}
input[type="submit"] {
  background-color: #10026c;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.header {

  text-align: center;
  padding: 20px; /* Espaciado interior del encabezado */
}

.logo {
  width: 150px; /* Tamaño del logotipo */
  height: auto;
}

h2 {
  margin: 10px 0; /* Ajuste del margen superior e inferior del título */
}
body {
  background-color: #ffffff;
}
</style>