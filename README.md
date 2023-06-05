# 環境構築

## ローカルかつ Docker を使えない場合

`git clone git@github.com:ih14c-13-14/artist-backend.git --recursive`  
`git submodule update --init`  
`yarn`  
`yarn dev`

## devContainer を使う場合

`git clone git@github.com:ih14c-13-14/artist-backend.git --recursive`  
`git submodule update --init`  
VSCode を起動します。  
推奨された拡張機能全部入れます。  
devContainer を起動します。（下は例で、画面左下の><みたいなマーク押したら出ます
![画像](https://media.discordapp.net/attachments/1097775746870685746/1114664830801027173/image.png?width=2436&height=1000)  
以上です。

# API スキーマの管理

## 概要

- サブモジュールを利用して行います。
- [API スキーマのリポジトリ](git@github.com:ih14c-13-14/schema.git)
- 書き込みは backend repo からではなく、schema repo を開いてそちらから出すようにしましょう。PR とレビュー依頼もしてください。

## スキーマ更新時のハンドリング

### スキーマ追従作業をする人

以下のコマンドを実行してください。
`yarn submodule-update`

### 他の人がスキーマ更新したのを取り込む人

最新の main を取り込んだ上で、以下のコマンドを実行してください。
`git submodule update --init`
