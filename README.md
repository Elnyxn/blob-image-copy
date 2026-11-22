<img src="icon-128.png" width="64" height="64" alt="">

# Blob 图片复制 · Blob Image Copy

**复制图片，不复制链接。** Copy the image, not the link.

[下载扩展 ZIP](https://github.com/Elnyxn/blob-image-copy/releases/latest) · [English](README.en.md)

支持网页内的 Blob 图片，也支持单独打开的 `blob:` 图片标签页。右键选择 **blob复制**，然后直接粘贴。图片以 PNG 写入剪贴板，保留原像素尺寸，不保留原文件格式或元数据。

## 安装

1. 下载并解压 Release 中的扩展 ZIP。
2. 在 Chrome 119+ 打开 `chrome://extensions`，开启「开发者模式」。
3. 点击「加载已解压的扩展程序」，选择包含 `manifest.json` 的目录。

菜单跟随 Chrome 界面语言：简体中文显示 **blob复制**，繁体中文显示 **blob複製**，其他语言显示 **Copy Blob**。

## 隐私

扩展需要网站访问权限来读取单独打开的 Blob 图片。仅在点击菜单时读取所选图片并写入剪贴板，不上传图片、不收集数据。

[MIT License](LICENSE)
