<script setup lang="ts">

</script>

<template>
  <div class="text-center mx-auto">
    <div class="header">
      <img class="logo mx-auto" src="../../assets/LOGOTIPOV2.jpg" alt="Logotipo de Mi Sitio Web">
      <h2>Registro</h2>
    </div>
    <form>
      <label for="username">Nombre de usuario:</label>
      <input type="text" id="username" name="username">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password">
      <input type="submit" value="Registrarse">
    </form>
    <p>Ya tienes una cuenta?
      <RouterLink to="/login">Inicia sesión aquí</RouterLink>
    </p>
  </div>
</template>

<style scoped>

h2 {
  color: #000;
  padding: 20px 0;
}
form {
  background-color: #dac0fe;
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px #060049
}
label {
  display: block;
  margin-top: 10px;
}
input[type="text"],
input[type="password"] {
  width: 90%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #7D51DF;
  border-radius: 5px;
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
</style>