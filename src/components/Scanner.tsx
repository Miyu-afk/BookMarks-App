interface ScannerProps {
  scanStartOn: boolean;
}

const Scanner = (scanStartOn) => {

  let scanning = false;

  const scanStart = (startButton) => {
    startButton.addEventListener("click", function () {
      if (scanning) return;

      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        const codeType = decodedResult.result.format.formatName;
        addResultItem(codeType, decodedText);
      };

      const config = {
        fps: 1,
        qrbox: { width: 250, height: 250 },
        formatsToSupport: [
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.CODE_93,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.ITF,
          // 2次元コード
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.DATA_MATRIX,
          Html5QrcodeSupportedFormats.AZTEC,
          Html5QrcodeSupportedFormats.PDF_417,
        ],
      };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback
      ).then(() => {
        scanning = true;
        scanStartOn.disabled = true;
        
      })
    });
  };
  return (
    <>
      <div id="reader"></div>

      <div id="controls"></div>
    </>
  );
};

export default Scanner;
