import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartitems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;

            const existItem = state.cartItems.find(
                (x) => x.product === item.product
            );

            if (existItem) {
                return {
                    ...state,
                    cartItemms: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                return { ...state, cartItems: [...state.cartItemms, item] };
            }

        default:
            return state;
    }
};
