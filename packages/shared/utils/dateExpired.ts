// Check if the service date is less than today and if so mark as expired
export const dateExpired = (serviceDate: string) => {

  const today = new Date();
  today.setHours(0,0,0,0);

  const dateToCheck = new Date(serviceDate.replace(/-/g, '/'));
  dateToCheck.setHours(0,0,0,0);

  return dateToCheck < today;
}