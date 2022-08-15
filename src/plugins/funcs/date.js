export const convertTimeStampToDateTime = function (timeStamp) {
    const milliseconds = timeStamp * 1000
    const dateObject = new Date(milliseconds)
    const dateTime = dateObject.toLocaleString()
    return dateTime
}
