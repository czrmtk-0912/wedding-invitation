# 結婚式 Web 招待状（GitHub Pages 版）

Spring Boot 版のデザインを静的サイトにしたものです。  
**出欠回答は Google フォーム**で受け付けます。

## 公開手順（GitHub Pages）

### 1. リポジトリを用意

GitHub にリポジトリを作成し、`web` フォルダごと、または **`docs` フォルダだけ** を push します。

**おすすめ**: リポジトリのルートに `docs` の中身を置くか、Settings で **`/docs` フォルダ** を指定します。

### 2. GitHub Pages を有効化

1. GitHub リポジトリ → **Settings** → **Pages**
2. **Build and deployment** → Source: **Deploy from a branch**
3. Branch: `main`（または `master`）、Folder: **`/docs`**
4. **Save**

数分後、`https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます。

### 3. 画像を配置

`docs/images/` に次を置いてください（未配置でも和柄背景のみ表示されます）。

| ファイル | 用途 |
|---------|------|
| `hero.jpg`（または hero-1〜3） | ヒーロー |
| `groom.jpg` / `bride.jpg` | プロフィール |
| `story-1.jpg` 〜 `story-3.jpg` | フォトストーリー |
| `pattern-red.png` | 和柄背景 |

パスは `config.js` の `heroImages` などで変更できます。

### 4. 文言・フォーム URL の編集

`docs/config.js` を編集します。

- `googleFormUrl` … [Googleフォーム](https://docs.google.com/forms/d/e/1FAIpQLSf8_QOyrLT44Djb2MBHI6s-vE8bi6hlSvAj6drOg33y9aHtEQ/viewform) の URL
- 名前・日付・会場・挨拶文など

## ローカル確認

```powershell
cd docs
python -m http.server 8080
```

ブラウザで `http://localhost:8080/` を開きます。

## Google フォームとの対応

| フォーム項目 | 招待状での案内 |
|-------------|----------------|
| 名前 | RSVP セクションのボタンからフォームへ |
| 参加されますか？ | 同上 |
| 参加人数 | 同上 |
| お持ちいただける料理 | 同上 |
| アレルギー | 同上 |
| メール | 同上 |

回答一覧は **Google スプレッドシート**（フォームの「回答」タブ）で確認します。  
Spring Boot の `/admin` は GitHub Pages 版では使いません。

## Spring Boot 版との違い

| 項目 | Spring Boot（`web/`） | GitHub Pages（`docs/`） |
|------|----------------------|-------------------------|
| 出欠回答 | `/rsvp`（DB保存） | Google フォーム |
| 管理画面 | `/admin/login` | なし（スプレッドシート） |
| サーバー | Java + MySQL 必須 | 不要（静的のみ） |
