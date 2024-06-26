<script>
    import { navigate } from "svelte-routing";
    import toast, { Toaster } from "svelte-french-toast";
    

    let showLoginForm = true;
    let email = "";
    let password = "";
    let name = "";

    function toggle() {
        showLoginForm = !showLoginForm;
    }

    async function login() {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password}),
            credentials: "include",
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Login Failed");
        }
        setTimeout(() => {
            navigate("/Home");
        }, 2000);
    }

    async function handleLoginToast() {
        await toast.promise(
            login(),
            {
                loading: "Logging in...",
                success: "Success!",
                error: "Login failed - Check credentials",
            },
            {
                duration: 2000,
            },
        );
    }

    async function signUp() {
        const response = await fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name, email, password}),
        });
        const result = await response.json();
        if (!response.ok) {
            if (response.status === 409) {
                throw new Error("Email is already in use");
            } else {
                throw new Error(result.message || "Failed to sign up");
            }
        }
        toggle();
        sendWelcomeMail();
    }

    async function handleSignUpToast() {
        await toast.promise(
            signUp(),
            {
                loading: "Signing up...",
                success: "Success!",
                error: (err) => `${err.toString()}`,
            },
            {
                duration: 2000,
            },
        );
    }

    async function sendWelcomeMail() {
        const response = await fetch("http://localhost:8080/signupMail", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name }),
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Failed to send welcome email");
        }
    } 
</script>

<Toaster/>

<div class="container">
    {#if showLoginForm}
        <form on:submit|preventDefault={handleLoginToast} class="form">
            <label for="email">Email</label>
            <input type="email" bind:value={email} id="email" required placeholder="Email"/>

            <label for="password">Password</label>
            <input type="password" bind:value={password} id="password" required placeholder="Password"/>

            <button type="submit" class="submit-button">Log In</button>
            <button class="toggle-button" on:click={toggle}>Sign Up</button>
        </form>
    {:else}
        <form on:submit|preventDefault={handleSignUpToast} class="form">
            <label for="name">Name</label>
            <input type="text" bind:value={name} id="name" required placeholder="Name"/>

            <label for="email">Email</label>
            <input type="email" bind:value={email} id="email" required placeholder="Email"/>

            <label for="password">Password</label>
            <input type="password" bind:value={password} id="password" required placeholder="Password"/>

            <button type="submit" class="submit-button">Sign Up</button>
            <button class="toggle-button" on:click={toggle}>Log In</button>
        </form>
    {/if}
</div>

<style>
    .container {
        max-width: 365px;
        margin: auto;
        padding: 20px 20px;
        background-color: lightgrey;
        border-radius: 8px;
        text-align: center;
    }
    .form {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .form input {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        width: 100%;
        box-sizing: border-box;
    }

    .submit-button {
        margin-top: 10px;
        margin-bottom: 5px;
        padding: 10px;
        width: 100%;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background-color: #1877f2;;
    }

    .submit-button:hover {
        background-color: #166fe5;
    }

    .toggle-button {
        padding: 10px;
        width: 70%;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background-color: #42b72a;;
        margin: auto;
    }

    .toggle-button:hover {
        background-color: #36a420;
    }
</style>