export   const currentDateNumberMinusOneDay = Math.abs((new Date(new Date().toJSON().slice(0,10))) - 86400000);
export  const currentDate = new Date().toJSON().slice(0,10);
export  const currentDateMinusOne = new Date(currentDateNumberMinusOneDay).toJSON().slice(0,10);
