import { QRCodeSVG } from 'qrcode.react';

export const Qr = () => {
    const styles = {
        container: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5", // Optional background color
        },
      };
    
      return (
        <div style={styles.container}>
          <QRCodeSVG
          // bgColor"
            value="https://demo-ui-ocr.vercel.app/Upload"
            size={250} // Adjust size as needed
          />
        </div>
      );
}
