<script lang="ts">
  import Fa from 'svelte-fa'
  import { faPencil, faTrash, faCheck, faPlus, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
  import IconButton from '../IconButton.svelte'
  import Sidebar from '../Sidebar.svelte'
  import { apiReq } from '$lib'

  export let data

  type ResponseItem = {
    IID: number
    Item_Cost: number
    Item_Description: string | null
    Item_Name: string
  }

  let costs = data.content.map((item: ResponseItem) => {
    return {
      name: item.Item_Name,
      id: item.IID,
      cost: item.Item_Cost
    }
  })

  async function deleteCost(i: number) {
    const sure = confirm(`Are you sure you want to delete ${costs[i].name}?`)
    if (!sure) return

    saved = false

    const itemID = costs[i].id
    costs = costs.filter((_: any, j: number) => j !== i)
    if (editingIndex === i) {
      editingIndex = -1
      editingIsNew = false
    }
    if (editingIndex > i) editingIndex--

    const resp = await apiReq('delete_item', {
      event_id: data.event_id,
      item_id: itemID,
    })
    if (!resp.ok) {
      throw new Error('Failed to save')
    }
    saved = true
  }

  function findError(i: number, costs: { name: string, cost: number }[]) {
    if (i === -1) return null

    const cost = costs[i].cost
    if (cost === null) {
      return "Please enter a valid cost"
    }
    if (cost < 0) {
      return "Cost cannot be negative"
    }
    // Multiple of 0.01
    if (cost * 100 % 1 !== 0) {
      return "Cost must be a multiple of 0.01"
    }

    if (costs[i].name === "") {
      return "Please enter a name"
    }
    
    return null
  }

  let editingIsNew = false
  let editingIndex = -1
  let saved = true

  $: currentError = findError(editingIndex, costs)
</script>

<Sidebar>
  <div class="costs-list">
    <div class="header">
      <h1>Costs</h1>

      <div>
        <span class="save-status">
          {#if (editingIndex === -1) && saved}
            <Fa icon={faCheck} />
            Saved
          {:else if (editingIndex === -1) && !saved}
            Saving...
          {/if}
        </span>
        <IconButton on:click={() => {
          costs.push({ name: "", cost: 0 })
          editingIndex = costs.length - 1
          editingIsNew = true
        }} icon={faPlus} disabled={!saved} />
      </div>
    </div>
    
    {#each costs as cost, i (cost.id)}
      <div class="cost-item">
        <div class="container">
          <div class="left">
            {#if i === editingIndex}
              <input type="text" bind:value={cost.name} />
            {:else}
              <span class="name">{cost.name}</span>
            {/if}
          </div>
          <div class="right">
            {#if i === editingIndex}
              <input type="number" step="0.01" min="0" style="width: 90px;" bind:value={cost.cost} />
            {:else}
              <span class="cost">£{Math.floor(cost.cost) === cost.cost ? cost.cost : cost.cost.toFixed(2)}</span>
            {/if}

            <IconButton style="margin-left: 8px;" icon={(() => {
              if (editingIndex === i) {
                if (currentError) {
                  return faTriangleExclamation
                } else {
                  return faCheck
                }
              } else {
                return faPencil
              }
            })()} on:click={async () => {
              if (currentError) return

              if (editingIndex === i) {
                editingIndex = -1
                saved = false
                if (editingIsNew) {
                  editingIsNew = false
                  const resp = await apiReq('new_item', {
                    event_id: data.event_id,
                    item_name: cost.name,
                    item_cost: cost.cost,
                    item_description: ''
                  })
                  if (!resp.ok) {
                    throw new Error('Failed to save')
                  }
                  saved = true
                } else {
                  const resp = await apiReq('update_items', {
                    item_id: cost.id,
                    item_name: cost.name,
                    item_cost: cost.cost,
                    item_description: ''
                  })
                  if (!resp.ok) {
                    throw new Error('Failed to save')
                  }
                  saved = true
                }
              } else {
                editingIndex = i
                editingIsNew = false
              }
            }} disabled={!!currentError || !saved} />
            <IconButton style="margin-left: 8px;" icon={faTrash} on:click={() => deleteCost(i)} disabled={!saved} />
          </div>
        </div>
        {#if editingIndex === i && currentError}
          <span class="validation-error">
            {currentError}
          </span>
        {/if}
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
    }

    .container {
      display: flex;
      justify-content: space-between;
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

    .save-status {
      margin-right: 8px;
    }

    .validation-error {
      color: red;
    }
  </style>
</Sidebar>
