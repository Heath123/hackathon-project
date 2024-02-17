<script lang="ts">
  import Fa from 'svelte-fa'
  import { faPencil, faTrash, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'

  let costs = [
    { name: "Venue (Innovation Centre)", cost: 200000 },
    { name: "Meal", cost: 120000 },
    { name: "Advertising poster", cost: 4000 }
  ]

  function deleteCost(i: number) {
    const sure = confirm(`Are you sure you want to delete ${costs[i].name}?`)
    if (!sure) return
    costs = costs.filter((_, j) => j !== i)
    if (editingIndex === i) editingIndex = -1
    if (editingIndex > i) editingIndex--
  }

  let editingIndex = -1
</script>

<div class="costs-list">
  <div class="header">
    <h1>Costs</h1>

    <button class="icon-button" on:click={() => {
      costs = [...costs, { name: "", cost: 0 }]
      editingIndex = costs.length - 1
    }}>
      <Fa icon={faPlus} />
    </button>
  </div>
  
  {#each costs as cost, i}
    <div class="cost-item">
      <div class="left">
        {#if i === editingIndex}
          <input type="text" bind:value={cost.name} />
        {:else}
          <span class="name">{cost.name}</span>
        {/if}
      </div>
      <div class="right">
        <!-- <span class="cost">£{(cost.cost % 100) ? (cost.cost / 100).toFixed(2) : cost.cost / 100}</span> -->
        {#if i === editingIndex}
          <input type="number" style="width: 90px;" bind:value={cost.cost} />
        {:else}
          <span class="cost">£{(cost.cost % 100) ? (cost.cost / 100).toFixed(2) : cost.cost / 100}</span>
        {/if}

        <button class="icon-button" on:click={() => editingIndex === i ? editingIndex = -1 : editingIndex = i}>
          <Fa icon={editingIndex === i ? faCheck : faPencil} />
        </button>
        <button class="icon-button" on:click={() => deleteCost(i)}>
          <Fa icon={faTrash} />
        </button>
      </div>
    </div>
  {/each}
</div>

<style>
  .costs-list {
    width: 400px;
  }

  .cost-item {
    width: 100%;
    margin-bottom: 8px;
    padding: 16px;
    background: #eee;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
  }

  .icon-button {
    font-size: 100%;
    border: none;
    background: #eee;
    border-radius: 5px;
    padding: 6px;
    margin-left: 8px;
  }

  .icon-button:hover {
    background: #bbb;
  }

  .left {
    display: flex;
    flex-grow: 1;
  }

  .right {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
  }

  .left, .right {
    align-items: center;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
