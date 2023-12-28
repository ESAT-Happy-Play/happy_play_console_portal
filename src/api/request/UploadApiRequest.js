import { FileTypes } from "../../helper/Objects";

export async function UploadFile(accountObjectId, fileType, file, validId) 
{
    let response = {
        status: false,
        message: ""
    }

    try {
        if(file.size > 1024 * 1024 * 2) {
            response.message = "File must be smaller than 2MB";
            return response;
        }

        let url = null;

        switch(fileType) {
            case 1:
                url = `${process.env.REACT_APP_API_URL}/api/Files?AccountInfoId=${accountObjectId}&FileTypeId=${FileTypes().ProfileImage}&ValidID=${validId}`;
                break;
            case 2:
                url = `${process.env.REACT_APP_API_URL}/api/Files?AccountInfoId=${accountObjectId}&FileTypeId=${FileTypes().FrontID}&ValidID=${validId}`;
                break;
            case 3:
                url = `${process.env.REACT_APP_API_URL}/api/Files?AccountInfoId=${accountObjectId}&FileTypeId=${FileTypes().BackID}&ValidID=${validId}`;
                break;
            case 4:
                url = `${process.env.REACT_APP_API_URL}/api/Files?AccountInfoId=${accountObjectId}&FileTypeId=${FileTypes().Signature}&ValidID=${validId}`;
                break;
            default:
                url = `${process.env.REACT_APP_API_URL}/api/Files?AccountInfoId=${accountObjectId}&FileTypeId=${FileTypes().ProfileImage}&ValidID=${validId}`;
                break;
        }

        // We compress the file by 50%
        const compressedFile = await compressImage(file, {
            // 0: is maximum compression
            // 1: is no compression
            quality: 0.5,
            // We want a JPEG file
            type: file.type,
        });

        console.log(url);
        console.log(compressedFile);

        var formData = new FormData();
        // formData.append("file", file);
        formData.append("file", compressedFile, file.name);

        await fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            response.message = data;
            response.status = true;
        })
        .catch(error => {
            response.message = error;
            return response;
        })

        return response;
    }
    catch(err) {
        response.message = "Please select a file.";
        return response;
    }
}

const compressImage = async (file, { quality = 1, type = file.type }) => {
    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);

    // Turn into Blob
    return await new Promise((resolve) =>
        canvas.toBlob(resolve, type, quality)
    );
};