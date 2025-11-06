import { log } from "console";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

interface ScannerProps {
  scanStartOn: boolean;
}

const Scanner = (scanStartOn) => {
  let scanning = false;

  const stopButton = document.getElementById("stop-btn");
  const cleatBtn = document.getElementById("clear-btn");
  const resultList = document.getElementById('result-list');

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

      html5QrCode
        .start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
        .then(() => {
          scanning = true;
          scanStartOn.disabled = false;
          stopButton.disabled = true;
          console.log("スキャンを停止しました");
        })
        .catch((err) => {
          console.error("スキャン停止エラー:", err);
        });
    });

    cleatBtn?.addEventListener('click', function(){
      if(resultList){
      resultList.innerHTML = '';
      }
    });

    function addResultItem(codeType, codeData) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString();

      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      resultItem.innerHTML = `
      <div className = "code-type">${codeType}</div>
      <div className = "code-data">${codeData}</div>
      <div className = "timestamp">${timeStr}</div>
      `;

      resultList?.insertBefore(resultItem, resultList.firstChild);

      playVibrate();
    }
    function playVibrate(){
    window.addEventListener("load", scanStart(){
      wondow.navigator.vibrate([200, 200, 200]);
    })};

    window.addEventListener('beforeunload', () => {
      if(html5QrCode.getState() === Html5QrcodeScannerState.SCANNING){
        html5QrCode.stop().then(() => {
          console.log("ページ離脱中にスキャンを停止しました");
        }).catch(err => {
          console.error("ページ離脱時の停止エラー:", err);
        });
      }
    });
  };
  return (
    <>
      <div id="reader"></div>

      <div id="controls">
        <button id="stop-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
            />
          </svg>
        </button>
        <button id="clear-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>

      <div id="result">
        <div id="result-list"></div>
      </div>
    </>
  );
};

export default Scanner;
