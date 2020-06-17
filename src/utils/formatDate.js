import format from 'date-fns/format';

const formatDate = (date) => format(new Date(date), 'dd MMM y');

export default formatDate;
