const pool = require("../database");
const queries = require("../queries");

const getInventoryById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getInventoryById, [id], (error, result) => {
    if (error) throw error;
    return res.json(result.rows);
  });
};

const random = () => { 
  let rateGacha = Math.floor(Math.random() * 100);
  let rate
  let item
  if (rateGacha < 51) {
    rate = 0
    item = Math.floor(Math.random() * 3);  
  } 
  
  else if (rateGacha < 80) {
    rate = 1
    item = Math.floor(Math.random() * 4);  
  } 
  
  else {
    rate = 2
    item = Math.floor(Math.random() * 3);
   }
   return {
     rewardRate : rate,
     rewardItem : item 
   }
}

const addReward = async (req,res) => {
  try {
    let currentCoin
    let currentAmount = 0
    let addOnAmount = 1
    let coin = -50
    let machineImg = ["m_common.svg","m_rare.svg","m_ultra.svg"]
    let rateImg = ["common.svg","rare.svg","ultra.svg"]
    let rateText = ["Common item : ","Rare item : ","UltraRare item : "]
    const owner_id = parseInt(req.params.id)
    const {rewardRate,rewardItem} = random()
    let rewardList = 
    [[
        { id: 1, name: "Coin+20", img: "coin20.png"},
        { id: 2, name: "Hat", img: "hat.png"},
        { id: 3, name: "T-shirt", img: "shirt.png"},
      ],[
        { id: 1, name: "Coin+50", img: "coin50.png"},
        { id: 4, name: "Hoddie", img: "hoddie.png"},
        { id: 5, name: "View Solution Quota (+)", img: "solutionQuota.png"},
        { id: 6, name: "Discount coupon 30% off (Monthly)", img: "dis30.png"},
      ],[
        { id: 1, name: "Coin+100", img: "coin100.png"},
        { id: 7, name: "Exam Quota (+)", img: "examQuota.png"},
        { id: 8, name: "Discount coupon 50% off (Yearly)", img: "dis50.png"},
    ]]
    let reward = rewardList[rewardRate][rewardItem]
    if (rewardItem === 0) {
      switch (rewardRate) {
        case 0:
          coin += 20
          addOnAmount = 20
          break;
        case 1:
          coin += 50
          addOnAmount = 50
          break;
        case 2:
          coin += 100
          addOnAmount = 100
          break;
        default:
          break;
      }  
    } 
    const fetchCoin = await pool.query(queries.checkItem,[owner_id,1])
    currentCoin = fetchCoin.rows[0].amount
    await pool.query(queries.updateItem,[currentCoin - 50, owner_id, 1]) // minus coin

    const alreadyHaveItem = await pool.query(queries.checkItem,[owner_id,reward.id])
      if (alreadyHaveItem.rows.length != 0) {
        currentAmount += alreadyHaveItem.rows[0].amount 
      }
      else{
        await pool.query(queries.addNewItem,[owner_id, reward.id, 0])
      }
    await pool.query(queries.updateItem,[currentAmount + addOnAmount, owner_id, reward.id])
    
    return res.json({
      message : 'Successfully rewarded',
      img : reward.img,
      text : rateText[rewardRate]+reward.name,
      slotImg : machineImg[rewardRate],
      slotRateImg : rateImg[rewardRate],
      earnedCoins : coin
    })
  }
   catch (error) {
    console.error(error)
    return res.json({
      message : 'something went wrong'
    })
  }
}

const addNewPlayerCoin = async (req,res) => {
  try {
    const owner_id = parseInt(req.params.id)
    pool.query(queries.addNewItem,[owner_id, 1, 1000])
    return res.json({
      message : 'Successfully add coin for new player',
    })
  }
   catch (error) {
    console.error(error)
    return res.json({
      message : 'something went wrong'
    })
  }
}
module.exports = {
  getInventoryById,
  addReward,
  addNewPlayerCoin
};
