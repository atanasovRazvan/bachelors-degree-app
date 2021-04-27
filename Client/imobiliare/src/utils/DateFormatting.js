// From UNIX Timestamp to dd MM yyyy
const formatDate = (timestamp) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(timestamp * 1000).toLocaleDateString('ro-RO', options);
};
export default formatDate;
