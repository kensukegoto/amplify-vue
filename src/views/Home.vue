<template>
  <div class="home">
    <h1>ログイン済</h1>
    {{ info }}
    <hr>
    <!--ログアウトコンポーネント-->
    <amplify-sign-out></amplify-sign-out>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'home',
  data: () => {
    return {
      name: "ken",
      info : null
    }
  },
  mounted(){
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        console.log(response.data)
        this.info = response.data
      })
  }
}
</script>