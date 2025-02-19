class ImageConverter{

    async base64ToFile(base64: string): Promise<File> {
        const fileName = "image.png";
        const fileType = "image/png";
        const base64Data = base64.includes('base64,') ? base64.split(',')[1] : base64;
        if (!/^[A-Za-z0-9+/=]+$/.test(base64Data)) {
            throw new Error("Invalid base64 string");
        }
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset++) {
            byteArrays.push(byteCharacters.charCodeAt(offset));
        }
        const byteArray = new Uint8Array(byteArrays);
        const file = new File([byteArray], fileName, { type: fileType });

        return file;
    }
}
const Img_convert = new ImageConverter();
export default Img_convert;