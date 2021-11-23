<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name:'App',
  watch:{
    $route(to,from){
      //console.log(to);
      if (to.path!=='/login') {
        let obj ={
          name:to.name,
          title:to.meta.title
        }
        this.$store.commit('addTab',obj)
      }
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  height: 100%;
  margin: 0px;
  padding: 0px;
}

#nav {
 
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

  body {
    margin: 0;
    padding: 0;
}
</style>
