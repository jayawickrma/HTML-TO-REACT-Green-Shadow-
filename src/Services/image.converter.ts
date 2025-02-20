class ImageConverter {
    async base64ToFile(base64: string): Promise<File> {
        const fileName = "image.png";
        const fileType = "image/png";

        try {
            const base64Data = base64.includes('base64,') ? base64.split(',')[1] : base64;
            if (!/^[A-Za-z0-9+/=]+$/.test(base64Data)) {
                throw new Error("Invalid base64 string");
            }

            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            return new File([byteArray], fileName, { type: fileType });

        } catch (err) {
            console.error("Base64 conversion failed:", err);
            throw err;
        }
    }
}

const Img_convert = new ImageConverter();
export default Img_convert;
