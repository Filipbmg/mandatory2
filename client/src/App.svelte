<script>
  import { Router, Route } from 'svelte-routing';
  import Login from "./pages/Login.svelte";
  import Home from "./pages/Home.svelte";
  import PrivateRouteGuard from './component/PrivateRouteGuard.svelte';

</script>

<main>
  <Router>
    <Route path="/" component={Login} />
    <Route path="/Home">
      <PrivateRouteGuard>
        <Home/>
      </PrivateRouteGuard>
    </Route>
  </Router>
</main>
