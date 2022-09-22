<script lang="ts">
  import Client from './lib/Client.svelte';
  import Server from './lib/Server.svelte';
  import { isServer } from './lib/utils';
</script>

<main>
  <div>
    {#if isServer()}
      <Server />
    {:else}
      <Client />
    {/if}
  </div>
</main>

<style>
</style>
