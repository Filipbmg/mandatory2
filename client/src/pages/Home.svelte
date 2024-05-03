<script>
    import { user } from "../stores/user.js";
    import { navigate } from "svelte-routing";
    
    $user
    let name = $user.user.name;

    async function logOut() {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to logout");
      }
      navigate("/");
      $user = null;
    } catch (err) {
      console.error("Logout Error: ", err.message);
    }
  }
</script>

<main>
    <div class="container">
        <h1>Hello {name}</h1>
        <h2>Hurray, you're authorized to see this page!</h2>
        <button class="logout-button" on:click={logOut}>Log Out</button>
    </div>
</main>

<style>
    .logout-button {
        background-color: red;
    }
    .logout-button:hover {
        background-color: darkred;
    }
</style>
  
