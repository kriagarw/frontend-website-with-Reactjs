import { DISHES } from '../Data/dishes';

export const Dishes = (state = DISHES, action) => {
    switch(action.type) {
        default:
            return state;
    }
}