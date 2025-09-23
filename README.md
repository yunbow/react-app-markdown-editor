# マークダウンエディタ (TypeScript + React + Storybook)

React 18とTypeScriptで構築されたリアルタイムマークダウンエディタです。機能別のモジュラーアーキテクチャを採用しています。

## デモプレイ
https://yunbow.github.io/react-app-markdown-editor/demo/

## 主要機能

### エディタ機能
- リアルタイムマークダウンプレビュー
- シンタックスハイライト対応
- ツールバーによる書式設定支援
- ローカルストレージでの自動保存・復元

### エクスポート機能
- Markdownファイル (.md) として保存
- HTMLファイル (.html) として保存
- スタイル付きHTML出力

### 操作方法
- **ツールバーボタン**: 書式設定を簡単挿入
- **太字**: 選択テキストを **太字** に変換
- **斜体**: 選択テキストを *斜体* に変換
- **見出し**: ## 見出し を挿入
- **リンク**: [リンクテキスト](URL) を挿入
- **画像**: ![代替テキスト](画像URL) を挿入
- **コード**: インライン `コード` またはコードブロックを挿入
- **保存**: .md と .html の両形式でダウンロード
- **クリア**: エディタ内容を全消去

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - プログラミング言語
- **Storybook 7** - コンポーネント開発・ドキュメント
- **CSS Modules** - スタイリング
- **Vite** - ビルドツール
- **marked.js** - マークダウンパーサー
- **highlight.js** - シンタックスハイライト

## プロジェクト構造

```
src/
├── features/                   # 機能別モジュール
│   └── markdown-editor/        # マークダウンエディタ機能
│       ├── components/         # 機能専用コンポーネント
│       │   ├── Toolbar/        # ツールバー
│       │   ├── EditorPanel/    # エディタパネル
│       │   └── PreviewPanel/   # プレビューパネル
│       ├── MarkdownEditorApp/  # 機能ルートコンポーネント
│       ├── useMarkdownEditor.ts # エディタロジックフック
│       └── types.ts            # 機能固有の型定義
├── components/                 # 共通UIコンポーネント
│   ├── Button/                 # 汎用ボタン
│   ├── TextArea/               # テキスト入力エリア
│   └── Text/                   # テキスト表示
├── stories/                    # Storybook用ストーリー
├── utils/                      # ユーティリティ関数
├── App.tsx                     # メインアプリ
└── main.tsx                    # エントリーポイント
```

## スクリプト

```bash
# セットアップ
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# Storybook起動
npm run storybook

# Storybook ビルド
npm run build-storybook
```

## ライセンス

MIT License
