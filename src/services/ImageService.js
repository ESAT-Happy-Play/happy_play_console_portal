import axios from 'axios';
// import https from 'https';

export const ImageService = {
    uploadImage: async (image) => {
        const imageBuffer = image.buffer;
        const response = await axios.post(`https://files.esat-apps.com/image.php`, imageBuffer, {
            headers: {
            'Content-Type': 'application/octet-stream',
            },
            // httpsAgent: new https.Agent({
            //     rejectUnauthorized: false,
            // }),
        });
        return response.data;
    }
}