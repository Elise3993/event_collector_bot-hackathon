# This Co報

2024年7月の技育ハッカソンvol.8の提出作品

## 概要

- Discord Botを使い、サーバーを跨いでイベント情報を収集する
  - `/add`コマンドでイベント情報を登録できる
  - `/list`コマンドで登録したデータを閲覧できる
  - `/delete`コマンドで登録したデータを削除できる
- 収集した情報をDBに保存し、Webページで表示する 

## 目的
イベント情報の発信を気軽に行えるようにすることで、情報発信を活発にする。

## 使用技術
- Next.js
- Discord.js
- MySQL

## 環境構築

- WSLのインストール
- VS Codeに[dev container](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)をインストール
- このリポジトリをクローン

### Discord Bot/DB

1. `./backend`をVS Codeでdev containerで開く
2. `./backend/.env`を作成し、`./backend/.env.sample`を参考に記述
3. `./backend`で`yarn`を実行
4. `./backend`で`yarn dev`を実行

### Frontend

1. `./frontend`をVS Codeでdev containerで開く
2. `./backend`で`yarn`を実行
3. `./backend`で`yarn dev`を実行

### 全体を走らせるとき（本番環境or全体テスト）

1. `./`をVS Codeで開く
2. WSLを起動
3. `./.env`を作成し、`./.env.sample`を参考に記述
4. `docker compose up --build`

### メモ

- `MYSQL_CONTAINER_NAME`に半角英数字1文字を指定するとエラーが出る
- [Discord Bot/DB](#discord-botdb)や[Frontend](#frontend)と[全体を走らせるとき](#全体を走らせるとき本番環境or全体テスト)はコンテナー名が衝突する
  - コンテナー名が衝突したら削除する
  - `docker ps -aq | xargs docker rm`ですべてのコンテナーを削除する
