<template>
  <nav class="pokemonRegions">
    <router-link to="/">All</router-link> |
    <router-link to="/kanto">Kanto</router-link> |
    <router-link to="/johto">Johto</router-link> |
    <router-link to="/hoenn">Hoenn</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 20px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
