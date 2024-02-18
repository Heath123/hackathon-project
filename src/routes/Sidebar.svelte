
<div class="sidebar">
  <div class="sidebar-item">
    <a href="/logout">Log out</a>
  </div>
  <hr>
  <div class="sidebar-item">
    <a href="/details">Details</a>
  </div>
  <div class="sidebar-item">
    <a href="/costs">Costs</a>
  </div>
</div>

<div class="content">
  <slot></slot>
</div>

<style>
  .sidebar {
    height: 100%;
    position: fixed;
    width: 100px;
    position: fixed;
    background: #ddd;
    padding: 8px;
  }

  .content {
    margin-left: 100px;
    padding: 8px 32px;
  }

  .sidebar-item {
    width: 100%;
    text-align: center;
    font-size: large;
  }
</style>
