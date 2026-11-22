if (location.protocol === "blob:") {
  chrome.runtime.onMessage.addListener((message, sender, respond) => {
    if (sender.id !== chrome.runtime.id || message.type !== "copy-image-content") return;
    copyImage(message.source).then(
      () => respond({ ok: true }),
      error => respond({ ok: false, error: String(error) })
    );
    return true;
  });
}
