<script lang="ts">
  import { Fa } from "svelte-fa"
  import type { IconDefinition } from "@fortawesome/free-solid-svg-icons"

  export let icon: IconDefinition
  export let style: string = ""
  export let disabled: boolean = false
</script>

<button class="icon-button" style={style} disabled={disabled} on:click>
  <Fa icon={icon} />
</button>

<style>
  .icon-button {
    font-size: 100%;
    border: none;
    background: #eee;
    border-radius: 5px;
    padding: 6px;
    /* margin-left: 8px; */
    width: 30px;
  }

  .icon-button:hover {
    background: #bbb;
  }
</style>
