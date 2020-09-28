import { DISHES } from '../Data/dishes';
import { COMMENTS } from '../Data/comments';
import { LEADERS } from '../Data/leader';
import { PROMOTIONS } from '../Data/promotions';

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    leaders: LEADERS,
    promotions: PROMOTIONS
}

export const Reducer = (state = initialState, action) => {
    return state
}
