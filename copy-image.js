async function copyImage(source) {
  let original;
  try {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    original = await response.blob();
  } catch (error) {
    const rendered = Array.from(document.images).find(
      image => image.currentSrc === source && image.naturalWidth > 0
    );
    if (!rendered) throw error;
    original = rendered;
  }

  let png = original;
  if (original.type !== "image/png") {
    const bitmap = await createImageBitmap(original);
    try {
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
      canvas.getContext("2d").drawImage(bitmap, 0, 0);
      png = await canvas.convertToBlob({ type: "image/png" });
    } finally {
      bitmap.close();
    }
  }
  await navigator.clipboard.write([new ClipboardItem({ "image/png": png })]);
  return true;
}
