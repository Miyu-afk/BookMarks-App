const Scanner = () => {
  let scanning = false;
  const scanStart = (startButton) => {
    startButton.addEventListener('click' , function() {
      if(scanning) return;

      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        const codeType = decodedResult.result.format.formatName;
        addResultItem(codeType, decodedText);
      }


    })
  }
  return (
    <>
      <div id="reader"></div>

      <div id="controls">
        
      </div>
    </>
  );
};
