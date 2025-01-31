import React, { useEffect, useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import {
  decrementQuantity,
  fetchCart,
  getCartTotalPrice,
  getCartTotalQuantity,
  getCartTotalSavings,
  incrementQuantity,
  removeProduct,
} from "../features/cartSlice";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Order_Summary from "../components/Order_Summary";

const Cart_Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    cartProducts,
    status,
    error,
    cartTotalPrice,
    cartTotalQuantity,
    cartTotalSavings,
  } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.userLogIn);

  // const cartTotalQuantity = () => {
  //   let total = 0;
  //   cartProducts?.forEach((item) => {
  //     total += item.quantity;
  //   });
  //   return total;
  // };

  // const getTotal = () => {
  //   let totalQuantity = 0;
  //   let totalPrice = 0;
  //   cartProducts?.forEach((item) => {
  //     totalQuantity += item.quantity;
  //     totalPrice +=
  //       (
  //         item?.productId?.price -
  //         (item?.productId?.price * item?.productId?.discount) / 100
  //       ).toFixed(2) * item.quantity;
  //   });
  //   return { totalPrice, totalQuantity };
  // };
  // const getTotalDiscount = () => {
  //   let totalQuantityProd = 0;
  //   let totalDiscountPrice = 0;
  //   cartProducts?.forEach((item) => {
  //     totalQuantityProd += item.quantity;
  //     totalDiscountPrice +=
  //       ((item?.productId?.price * item?.productId?.discount) / 100).toFixed(
  //         2
  //       ) * item.quantity;
  //   });
  //   return { totalQuantityProd, totalDiscountPrice };
  // };

  const checkoutHandler = () => {
    if (cartProducts.length != 0) {
      navigate("/cart/checkout");
    }
  };
  const removeProductHandler = (productId) => {
    const data = {
      userId: user?.user?._id,
      productId: productId,
    };
    dispatch(removeProduct(data));
  };
  useEffect(() => {
    dispatch(getCartTotalPrice());
    dispatch(getCartTotalQuantity());
    dispatch(getCartTotalSavings());
  });
  useEffect(() => {
    dispatch(fetchCart(user?.user?._id));
  }, [dispatch]);
  return (
    <>
      <section className="bg-white mt-16 md:mt-20  antialiased dark:bg-gray-900 mb-7">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-center md:text-3xl text-2xl font-medium text-gray-700 py-2">
            Cart Items
          </h2>
          {status === "loading" && <p>Loading...</p>}
          {status === "error" && <p>{error}</p>}
          <div className="mt-3 md:mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                  {status === "success" &&
                    cartProducts?.map((item) => (
                      <div
                        key={item._id}
                        className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 mb-4 md:space-y-0"
                      >
                        <Link
                          to={`/products/${item?.productId?._id}`}
                          className="shrink-0 md:order-1"
                        >
                          <img
                            className="h-20 w-20 dark:hidden"
                            src={`https://i.pinimg.com/${item?.productId?.image}`}
                            alt="imac image"
                          />
                        </Link>

                        <label htmlFor="counter-input" className="sr-only">
                          Choose quantity:
                        </label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => {
                                dispatch(
                                  incrementQuantity(item?.productId._id)
                                );
                              }}
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <FiPlus />
                            </button>
                            <p className="px-3">{item?.quantity}</p>
                            <button
                              type="button"
                              onClick={() => {
                                dispatch(
                                  decrementQuantity(item?.productId._id)
                                );
                              }}
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <FiMinus />
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              {(
                                item?.productId?.price -
                                (item?.productId?.price *
                                  item?.productId?.discount) /
                                  100
                              ).toFixed(2) * item?.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <Link
                            to={`/products/${item?.productId?._id}`}
                            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                          >
                            {item?.productId?.name}
                          </Link>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                            >
                              <IoHeartSharp size={20} />
                              Add to Favorites
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                removeProductHandler(item?.productId?._id)
                              }
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              <RxCross2 size={20} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <Order_Summary />
              <button
                className="flex w-full items-center justify-center rounded-lg text-white bg-blue-700 px-5 py-2.5 text-sm font-medium  hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart_Page;
