export const CommonExt = {
    getChunckArry: (arryVal, chunkSize) => {
        var chunkArry = [];
        for (var i = 0; i < arryVal.length; i += chunkSize)
        chunkArry.push(arryVal.slice(i, i + chunkSize));

        return chunkArry;
    }
}