画像の配置場所（src/main/resources/static/images/）
================================================

【ヒーロー（3枚フェード）】
- hero-1.jpg
- hero-2.jpg
- hero-3.jpg

【プロフィール】
- groom.jpg
- bride.jpg

【フォトストーリー】
- story-1.jpg
- story-2.jpg
- story-3.jpg

【従来の表紙1枚】
- hero.jpg（hero-1〜3 が未設定のときの代替としても利用可）

【和柄パターン（背景）】
- pattern-red.png … 深紅の青海波風柄（ローダー・RSVP・フッター等の背景）

未配置でもレイアウトは崩れません（単色の深紅が表示されます）。
差し替え後はブラウザを再読み込みしてください。

パスは application.properties の wedding.hero.image* / wedding.profile.*.image / wedding.story.image* で変更できます。
