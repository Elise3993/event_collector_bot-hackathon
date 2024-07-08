# event_collector_bot-hackathon

2024年7月の技育ハッカソンvol.8の提出作品

## 概要

- Discord Botを使ってイベント情報を収集する
- 収集した情報をDBに保存し、フロントエンドで表示する

イベント情報の発信を気軽に行えるようにすることで、情報発信を活発にする。

## 環境構築

- WSLのインストール
- VS Codeに[dev container](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)をインストール
- このリポジトリをクローン

### Discord Bot/DB

1. `./backend`をVS Codeで開く
2. `./backend/src/config.json`内の`DISCORD_BOT_TOKEN`にDiscord Botのトークンを設定
3. `yarn`
4. `yarn dev`

### Frontend

1. `./frontend`をVS Codeで開く
2. `yarn`
3. `yarn dev`

### 全体を走らせるとき

1. `./`をVS Codeで開く
2. WSLを起動
3. `docker compose up --build`
