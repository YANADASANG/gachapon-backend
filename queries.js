const checkUser = "SELECT u FROM account u WHERE u.user_name= $1";
const addNewUser = "INSERT INTO account (user_name, user_password) VALUES ($1, $2)";
const getUserByName = "SELECT user_id,user_name FROM account WHERE user_name = $1 AND user_password = $2";

const checkItem = "SELECT item_id, amount FROM inventory  WHERE owner_id = $1 AND item_id = $2";
const addNewItem = "INSERT INTO inventory (owner_id, item_id, amount) VALUES ($1, $2, $3)";
const updateItem = "UPDATE inventory SET amount = $1 WHERE owner_id = $2 and item_id = $3";
const getInventoryById = "SELECT a.user_name,json_agg(json_build_object('itemname', i.item_name, 'amount', amount, 'img',i.item_img)) AS user_inventory FROM public.inventory iv INNER JOIN item i ON i.item_id = iv.item_id INNER JOIN account a ON a.user_id = iv.owner_id WHERE a.user_id = $1 GROUP BY a.user_name";

module.exports = {
    checkUser,
    addNewUser,
    getUserByName,

    checkItem,
    addNewItem,
    updateItem,
    getInventoryById,
}