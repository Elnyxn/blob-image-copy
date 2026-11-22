importScripts("copy-image.js");

const menuId = "copy-image-content";

async function registerMenu() {
  await chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
    id: menuId,
    title: chrome.i18n.getMessage("copyMenu"),
    contexts: ["image"]
  });
}

chrome.runtime.onInstalled.addListener(registerMenu);
chrome.runtime.onStartup.addListener(registerMenu);

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== menuId || !info.srcUrl || tab?.id == null) return;
  try {
    if ((info.frameId ?? 0) === 0 && info.pageUrl?.startsWith("blob:")) {
      const reply = await chrome.tabs.sendMessage(tab.id, {
        type: menuId,
        source: info.srcUrl
      }, { frameId: 0 });
      if (!reply?.ok) throw new Error(reply?.error ?? "Clipboard write did not complete");
      return;
    }
    const [execution] = await chrome.scripting.executeScript({
      target: { tabId: tab.id, frameIds: [info.frameId ?? 0] },
      func: copyImage,
      args: [info.srcUrl]
    });
    if (execution?.result !== true) throw new Error("Clipboard write did not complete");
  } catch (error) {
    console.error("复制图片失败", error);
  }
});
