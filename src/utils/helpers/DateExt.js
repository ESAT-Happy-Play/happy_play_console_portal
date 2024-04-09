export const DateExt = {
    readableDate: (stringDate) => {
        let dt = (new Date(stringDate));
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return dt.toLocaleDateString('en-us', options);
    },
    readableDateShort: (stringDate) => {
        let dt = (new Date(stringDate));
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return dt.toLocaleDateString('en-us', options);
    },
    todaysDate: (format = 0) => {
        let dt = (new Date());
        var mm = ('0' + (dt.getMonth()+1)).slice(-2);
        var dd = ('0' + (dt.getDate())).slice(-2);
        var yy = dt.getFullYear();

        // 0 = YYYY-MM-DD
        // 1 = MM-DD-YYYY
        return (format === 0) ? (yy + '-' + mm + '-' + dd) : (mm + '-' + dd + '-' + yy);
    },
    formatDate: (stringDate, format = 0) => {
        let dt = (new Date(stringDate));
        var mm = ('0' + (dt.getMonth()+1)).slice(-2);
        var dd = ('0' + (dt.getDate())).slice(-2);
        var yy = dt.getFullYear();

        // 0 = YYYY-MM-DD
        // 1 = MM-DD-YYYY
        return (format === 0) ? (yy + '-' + mm + '-' + dd) : (mm + '-' + dd + '-' + yy);
    },
    formatDateTime: (stringDate, format = 0) => {
        let dt = (new Date(stringDate));
        var mm = ('0' + (dt.getMonth()+1)).slice(-2);
        var dd = ('0' + (dt.getDate())).slice(-2);
        var hr = ('0' + (dt.getHours())).slice(-2);
        var min = ('0' + (dt.getMinutes())).slice(-2);

        // date.toLocaleTimeString('en-US', { hour12: true });
        var yy = dt.getFullYear();

        // 0 = YYYY-MM-DD
        // 1 = MM-DD-YYYY
        return (format === 0) 
            ? (yy + '-' + mm + '-' + dd + ' ' + hr + ':' + min ) 
            : (mm + '-' + dd + '-' + yy + ' ' + hr + ':' + min );
    },
    formatTime: (time) => {
        if(time !== null) {
            time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

            if (time.length > 1) {
            time = time.slice (1);
            time[5] = +time[0] < 12 ? ' AM' : ' PM';
            time[0] = +time[0] % 12 || 12;
            }
            return time.join ('');
        }
        return "N/A"
    }
}