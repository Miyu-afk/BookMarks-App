import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface ScannerProps {
  scanStartOn: boolean;
  onClose: () => void;
  scanType: "want" | "read" | null;
  setGetIsbn: Dispatch<SetStateAction<string | null>>;
}

const Scanner = ({ scanStartOn, onClose, setGetIsbn }: ScannerProps) => {
  const [isbn, setIsbn] = useState<string | null>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (!scanStartOn || !readerRef.current) return;

    const html5QrCode = new Html5Qrcode(readerRef.current.id);
    html5QrCodeRef.current = html5QrCode;

    const config = {
      fps: 1,
      qrbox: { width: 250, height: 125 },
      formatsToSupport: [
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.CODE_128,
      ],
    };

    const qrCodeSuccessCallback = (decodedText: string) => {
      console.log("ISBN検出:", decodedText);
      setIsbn(decodedText);
      setGetIsbn(decodedText);
      html5QrCode.stop().catch((e) => console.warn("stop error:", e));
    };

    const qrCodeErrorCallback = (errorMessage: string) => {
      console.debug("QR error:", errorMessage);
    };

    const cameraConfig = { facingMode: "environment" } as any;
    html5QrCode
      .start(cameraConfig, config, qrCodeSuccessCallback, qrCodeErrorCallback)
      .catch((err) => console.error("スキャン開始エラー:", err));

    return () => {
      html5QrCode.stop().catch(() => {});
      html5QrCode.clear();
    };
  }, [scanStartOn]);

  return (
    <div className="fixed inset-0 bg-white flex-col items-center justify-center">
      <div id="reader" ref={readerRef} style={{ objectFit: "cover" }}></div>

      {isbn ? (
        <div className="mt-4 text-center">
          <p>スキャン結果: {isbn}</p>
          <button
            onClick={onClose}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            閉じる
          </button>
        </div>
      ) : (
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          キャンセル
        </button>
      )}
    </div>
  );
};

export default Scanner;
