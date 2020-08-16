# kght6123.page

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Road Map

- [x] 画像の差し替えとHostingへ追加
- [x] アイキャッチ画像の表示
- [ ] 全体のmetaタグの見直しとページ別の設定
- [ ] プロフィールページの作成
- [ ] 過去記事（Markdown）を移行
- [ ] Googleアナリティクスを設定
- [ ] Adsを設定
- [ ] 全文検索をできるようにする？？（非AMP）

## メモ

```sh
~/develop % yarn create nuxt-app kght6123.page
yarn create v1.19.2
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Installed "create-nuxt-app@3.2.0" with binaries:
      - create-nuxt-app

create-nuxt-app v3.2.0
✨  Generating Nuxt.js project in kght6123.page
? Project name: kght6123.page
? Programming language: JavaScript
? Package manager: Yarn
? UI framework: Tailwind CSS
? Nuxt.js modules: Progressive Web App (PWA), Content
? Linting tools: Prettier
? Testing framework: None
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Static (Static/JAMStack hosting)
? Development tools: jsconfig.json (Recommended for VS Code if you're not using typescript)
```

「Static/JAMStack hosting」とは？
https://github.com/nuxt/create-nuxt-app

「Nuxt AMP Module」とは？
https://github.com/nuxt-community/amp-module

```sh
yarn add @nuxtjs/amp
# nuxt.config.jsのmoduleに追加する
yarn dev # 動作確認
yarn generate # 静的ファイル作成
```

firebaseに新しいプロジェクトを作成(kght6123.page)

```sh
yarn global add firebase-tools
echo "export PATH=\"\$PATH:\`yarn global bin\`\"" >> ~/.zshrc
source ~/.zshrc
firebase login # 表示されたURLをブラウザで開いて、FirebaseのプロジェクトにアクセスできるGoogleアカウントでログインする
firebase init
# Hostingを選択する
# Firebaseプロジェクトを選択する（あらかじめ作っておいたので、既存のFirebaseぷろじぇくとから選ぶ「 Use an existing project」をせんたく
# 
~/develop/kght6123.page % firebase init

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /home/kght6123/develop/kght6123.page

? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confi
rm your choices. Hosting: Configure and deploy Firebase Hosting sites

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: kght6123-page (kght6123-page)
i  Using project kght6123-page (kght6123-page)

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? No
✔  Wrote dist/404.html
? File dist/index.html already exists. Overwrite? No
i  Skipping write of dist/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
# デプロイする！
firebase deploy
Hosting URL: https://kght6123-page.web.app
# さいごに表示されるHosting URLにブラウザでアクセス！
```

Google Domainsで購入したドメインでアクセスできるようにする

Firebase ConsoleのHostingを開いて、カスタムドメインを追加をクリック

購入したドメイン（kght6123.page）を入力する、「次へ」をクリック

「クイックセットアップ」になっていることを確認して「終了」

Google Domainsを表示して、ひとつのAレコードにIPアドレス（２つ）を追加する

（カスタムドメインのステータスが「設定が必要です」になっているので、「表示」をクリックするとIPアドレスが表示される）

## AMP Validator

https://validator.amp.dev/#url=https%3A%2F%2Fkght6123.page%2F

## AMP Documentation

https://amp.dev/documentation/?format=websites

## AMP ads

```
<amp-ad width="300" height="250"
  type="adsense"
  data-ad-client="ca-pub-????????"
  data-ad-slot="???????">
</amp-ad>
```

## AMP Access

ログインとかサブスクリプション型のコンテンツとか、支払いとかできるみたい
https://github.com/ampproject/amphtml/blob/master/extensions/amp-access/amp-access.md

## AMP Form

https://amp.dev/documentation/components/amp-form/

## amp-google-document-embed

https://amp.dev/documentation/components/amp-google-document-embed/

## amp-layout

https://amp.dev/documentation/components/amp-layout/

## amp-live-list

https://amp.dev/documentation/components/amp-live-list/

## amp-next-page

https://amp.dev/documentation/components/amp-next-page/

## amp-pan-zoom

https://amp.dev/documentation/components/amp-pan-zoom/

## amp-recaptcha-input

https://amp.dev/documentation/components/amp-recaptcha-input

