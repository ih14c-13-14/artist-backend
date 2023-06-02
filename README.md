# 環境構築

TODO
`git clone git@github.com:ih14c-13-14/artist-backend.git --recursive`
`git submodule update --init`
`yarn`
`yarn dev`

# APIスキーマの管理

## 概要

- サブモジュールを利用して行います。
- [APIスキーマのリポジトリ](git@github.com:ih14c-13-14/schema.git)
- 書き込みはbackend repoからではなく、schema repoを開いてそちらから出すようにしましょう。PRとレビュー依頼もしてください。

## スキーマ更新時のハンドリング

### スキーマ追従作業をする人

以下のコマンドを実行してください。
`yarn submodule-update`

### 他の人がスキーマ更新したのを取り込む人

最新のmainを取り込んだ上で、以下のコマンドを実行してください。
`git submodule update --init`
