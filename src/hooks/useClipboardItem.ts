import { useState } from "react";

export function useClipboardItem() {
  const [image, setImage] = useState<string | null>(null);
  const [supported, setSupported] = useState(
    !!navigator.clipboard && !!window.ClipboardItem
  );

async function copyImage(url: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const img = new Image();
    img.src = URL.createObjectURL(blob);
    await img.decode();

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    const pngBlob: Blob = await new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b!), 'image/png');
    });

    const item = new ClipboardItem({ 'image/png': pngBlob });
    await navigator.clipboard.write([item]);

    URL.revokeObjectURL(img.src);
  } catch (e) {
    console.error('Copy failed:', e);
  }
}

async function pasteImage() {
  try {
    console.log('Attempting to read clipboard...');

    const permission = await navigator.permissions.query({
      // @ts-ignore
      name: 'clipboard-read' as PermissionName,
    });

    console.log('Clipboard permission:', permission.state);

    if (permission.state === 'denied') {
      alert('Permission denied.');
      return;
    }

    const clipboardItems = await navigator.clipboard.read();
    console.log('Clipboard items:', clipboardItems.length);

    for (const item of clipboardItems) {
      console.log('Item types:', item.types);

      const imageType = item.types.find(t => t.startsWith('image/'));
      if (!imageType) continue;

      console.log('Found image type:', imageType);

      const blob = await item.getType(imageType);
      console.log('Blob:', blob, 'size:', blob.size, 'type:', blob.type);

      if (blob.size === 0) {
        console.warn('Blob is empty');
        continue;
      }

      const url = URL.createObjectURL(blob);
      console.log('Created object URL:', url);

      setImage(url);
      return;
    }

    console.log('No image found in clipboard');
  } catch (e: any) {
    console.error('Paste error:', e);
    if (e.name === 'NotAllowedError') {
      alert('Clipboard access denied.');
    } else {
      alert('Error: ' + e.message);
    }
  }
}

  return { supported, image, copyImage, pasteImage };
}