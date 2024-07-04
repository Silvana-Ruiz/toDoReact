export function formatDate(inputDate) {
    const splitDate = inputDate.split('-');
    const year = splitDate[0];
    const month = splitDate[1];
    const day = splitDate[2];
  
    const date = new Date(year, month - 1, day); // month is zero-indexed in Date object
  

    const formattedYear = date.getFullYear();
    const formattedMonth = ('0' + (date.getMonth() + 1)).slice(-2); // Adding leading zero if single digit
    const formattedDay = ('0' + date.getDate()).slice(-2); // Adding leading zero if single digit
  
    // Return date in YYYY/MM/DD format
    return `${formattedYear}/${formattedMonth}/${formattedDay}`;
  }