import { Order } from "../models/order.model.js";


export const addOrder = async (req, res) => {
    try {
        const data = new Order(req.body);
        const saveData = await data.save();
        res.status(200).json({
            msg: "Data Saved",
            saveData
        })

    } catch (error) {
        console.error(error)
    }
}

export const searchOrder = async (req, res) => {
    try {
        const { search = '', page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const list = await Order.aggregate([
            {
                $addFields: {
                    customer_name: {
                        $concat: [
                            "$first_name", " ", "$last_name"
                        ]
                    }
                }
            },
            {
                $match: {
                    $or: [
                        { order_unique_id: { $regex: search, $options: "i" } },
                        { customer_name: { $regex: search, $options: "i" } }
                    ]
                }
            },
            {
                $facet: {
                    metadata: [
                        { $count: "count" }
                    ],
                    data: [
                        {
                            $project: {
                                order_unique_id: 1,
                                customer_name: 1,
                                total_amount: 1,
                                createdAt: 1
                            }
                        },
                        { $skip: skip },
                        { $limit: parseInt(limit) }
                    ]
                }
            },



        ])

        res.status(200).json({
            list,
            limit,
            skip,
            totalResults: list[0]?.metadata[0]?.count || 0,

        })
    } catch (error) {
        console.error(error)
    }
}