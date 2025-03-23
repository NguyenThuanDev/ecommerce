const User = require("../models/user");
const Order = require("../models/order");
const asyncHandler = require("express-async-handler");
const Coupon = require("../models/coupon")

const deleteCart = async (uid) => {
    const deleteCart = await User.findByIdAndUpdate(uid, { cart: [] });

}
const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { coupon } = req.body;
    const cartOrder = await User.findById(_id).select("-cart._id").populate({
        path: "cart.product",
        select: "price"
    });


    if (cartOrder.cart.length == 0) {
        throw new Error("Cart is empty")
    }
    else {
        const { cart } = cartOrder;
        const couponApplied = await Coupon.findOne({
            title: coupon
        })
        console.log(couponApplied["expired"])
        const products = cart.map(item => {
            return {
                product: item.product._id,
                quantity: item.quantity,
                variant: item.variant,
            }
        })
        if (!coupon || !couponApplied || couponApplied.expired < Date.now()) {

            let total = cart.reduce((total, item) => {
                return total += item.product.price * item.quantity
            }, 0);
            let totalDiscount = 0;
            let response = await Order.create({
                orderBy: _id,
                products,
                total,
                totalDiscount,
            })
            deleteCart(_id);
            res.status(200).json({
                success: response ? true : false,
                response

            })


        }
        else {
            const { type, productApplied, valueDiscount, isAppliedAll } = couponApplied

            if (type == "Discount X percentage" && !isAppliedAll) {
                console.log(cartOrder)
                const productwithDiscount = cart.map(item => {
                    if (productApplied.indexOf(item.product._id) != -1) {
                        return {
                            product: item.product._id,
                            quantity: item.quantity,
                            variant: item.variant,
                            price: item.product.price,
                            finalprice: item.product.price * (1 - valueDiscount / 100)
                        }
                    }
                    else {
                        return {
                            product: item.product._id,
                            quantity: item.quantity,
                            variant: item.variant,
                            price: item.product.price,
                            finalprice: item.product.price
                        }
                    }



                }


                )

                let total = cart.reduce((total, item) => {
                    return total += item.product.price * item.quantity
                }, 0);

                totalDiscount = productwithDiscount.reduce((total, item) => {
                    return total = total + item.quantity * (item.price - item.finalprice)

                }, 0);
                response = await Order.create({
                    orderBy: _id,
                    products,
                    total,
                    totalDiscount,
                })
                deleteCart(_id);
                res.status(200).json({
                    success: response ? true : false,
                    response

                })

            }




        }
    }





});

module.exports = {
    createOrder



}