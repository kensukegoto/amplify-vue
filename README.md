https://qiita.com/yone_suke/items/b2a0334b36ac5de4f4f8
https://day-journal.com/memo/try-024/#router-js

# 認証を付ける(cognito)

インストール後、下記コマンドでアプリのインポート

```
import Amplify, * as AmplifyModules from 'aws-amplify'
~ 略 ~
Vue.use(AmplifyPlugin, AmplifyModules)
```

routerで認証の設定をする。つまり、App.vueなどvueファイル内では何もしない。詳しくは`router/index.js`の記述を参照。

# 作業履歴

```
追加：axiosをインストールしajaxのテスト
```