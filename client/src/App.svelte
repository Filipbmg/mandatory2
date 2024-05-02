<script>
   import { Router, Route, Link } from 'svelte-routing';

   import Login from "./pages/Login.svelte";
   import Home from "./pages/Home.svelte";

</script>

<main>
  <Router>
    <Route path="/" component={Login} />
  </Router>
</main>
