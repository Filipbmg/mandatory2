<script>
	import { navigate } from "svelte-routing";
	import { user } from "../stores/user.js";
    import { onMount } from "svelte";
    import verifySession from "../util/verifySession.js";
   

    onMount(async () => {
        const userData = await verifySession();
        if (!userData) {
            navigate("/", { replace: true });
        } else {
            user.set(userData);
        }
    });
</script>

{#if $user}
    <slot />
{/if}
