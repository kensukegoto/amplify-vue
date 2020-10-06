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
import { API } from 'aws-amplify'
export default {
  name: 'home',
  data: () => {
    return {
      name: "ken",
      info : null,
      apiName: 'sampleapigateway',
      // API Gatewayの設定パス
      path: '/sample',
    }
  },
  mounted(){
    const path = this.path;
    // オプション
    const myInit = {
      headers: {},
      response: true,
    };
    // データ取得
    API.get(this.apiName, path, myInit).then(response => {
        // テーブル表示
        console.log(response)
    }).catch(error => {
        // テーブルリセット
        console.error(error)
    });
  }
}
</script>