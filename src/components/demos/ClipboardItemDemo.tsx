import { useClipboardItem } from "../../hooks/useClipboardItem";

export default function ClipboardItemDemo() {
  const { supported, image, copyImage, pasteImage } = useClipboardItem();
  const sample = "https://picsum.photos/200";

  if (!supported)
    return <p className="text-yellow-400">ClipboardItem not supported 😅</p>;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <img
        src={sample}
        alt="sample"
        className="w-32 h-32 object-cover rounded-xl shadow-md"
      />
      <div className="flex gap-2">
        <button
          onClick={() => copyImage(sample)}
          className="px-3 py-1 bg-green-600 rounded-xl hover:bg-green-700 transition"
        >
          Copy 🖼️
        </button>
        <button
          onClick={pasteImage}
          className="px-3 py-1 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
        >
          Paste 📋
        </button>
      </div>
      {image && (
        <div className="mt-2">
          <p className="text-white/70">Pasted Image:</p>
          <img
            src={image}
            alt="from clipboard"
            className="w-32 h-32 object-cover rounded-xl border border-white/20"
          />
        </div>
      )}
    </div>
  );
}
