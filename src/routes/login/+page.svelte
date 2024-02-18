<script>
  export let form
</script>

<div style="
    text-align: center;
    width: 100%;
    margin-top: 200px;
    font-family:'Courier New', Courier, monospace;
  ">
    <h1>CodingInTheBath: Event Manager</h1>
    <form method="post">
      <label style="font-size: 20px;">
        Username:
        <input name="User" type="text" placeholder="e.g. LDNComicCon" required style="
        height: 25px;
        width: 200px;
        ">
      </label>
      <br>
      <label style="font-size: 20px;">Password:
        <input name="Pass" type="password" placeholder="e.g. 5p1derMAN" required style="
            height: 25px;
            width: 200px;
            margin-top: 10px;
        ">
      </label>
      <br>
      <div style="margin-top: 15px; ">
          <input type="submit" value="Login" style="
              font-size: 15px;
          ">
          <a style="
              text-decoration: none;
              font-weight: bold;
              margin-left: 20px;
          " href="/register">Register an Event</a>
      </div>
    </form>
    {#if form?.error}
        <p style="color: red;">{form.error}</p>
    {/if}
</div>
