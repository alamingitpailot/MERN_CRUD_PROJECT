import { format } from 'date-fns';

export const dateFormat = (date) => {
    return format(new Date(date), "MMMM d, yyyy");
}