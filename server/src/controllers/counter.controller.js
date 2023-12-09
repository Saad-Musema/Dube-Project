const Counter = require('../model/counter.mongo')

async function getNextOrderNumber() {
    
    const counter = await Counter.findOneAndUpdate(
      { name: 'orderNumber' },
      { $inc: { value: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true  }
    );
  

    if (counter.value === 1) {
        await Counter.findOneAndUpdate(
          { name: 'orderNumber' },
          { $set: { value: 1000 } },
          { new: true }
        );
      }

    return counter.value;
  };
  

module.exports = getNextOrderNumber;