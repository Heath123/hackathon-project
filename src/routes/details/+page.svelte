<script lang="ts">
  import { faCheck, faPencil } from "@fortawesome/free-solid-svg-icons"
  import IconButton from "../IconButton.svelte"
  import Sidebar from '../Sidebar.svelte'

  export let data

  let editing = false
  let saved = true
</script>

<Sidebar>
  <h1>Event details</h1>

  <IconButton icon={editing ? faCheck : faPencil} on:click={() => {
    if (editing) {
      editing = false
      saved = false
      fetch('https://7d313ce5-6b39-42e9-87ff-826492480de7-00-3iy3t0hqahqc7.kirk.repl.co/update_data', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_id: data.event_id,
          event_name: data.content.Event_Name,
          start_date: data.content.Start_Date,
          end_date: data.content.End_Date,
          attendees: data.content.Attendees
        })
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        saved = true
      })
    } else {
      editing = true
    }
  }} disabled={!saved} />

  {#if !editing && saved}
    Saved
  {:else if !editing && !saved}
    Saving...
  {/if}
  <br><br>
  <label>
    Event name:
    <br>
    {#if editing}
      <input type="text" bind:value={data.content.Event_Name} />
    {:else}
      <b>{data.content.Event_Name}</b>
    {/if}
  </label>
  <br><br>
  <label>
    Attendees:
    <br>
    {#if editing}
      <input type="number" bind:value={data.content.Attendees} />
    {:else}
      <b>{data.content.Attendees}</b>
    {/if}
  </label>
  <br><br>
  <label>
    Start date:
    <br>
    <input type="date" bind:value={data.content.Start_Date} disabled={!editing} />
  </label>
  <br><br>
  <label>
    End date:
    <br>
    <input type="date" bind:value={data.content.End_Date} disabled={!editing} />
  </label>
</Sidebar>
