const Counter = require('../model/counter.mongo')

async function getNextOrderNumber(session) {
  const counter = await Counter.findOneAndUpdate(
    { name: 'orderNumber' },
    { $inc: { value: 1 } },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      session: session, 
    }
  );

  if (counter.value === 1) {
    await Counter.findOneAndUpdate(
      { name: 'orderNumber' },
      { $set: { value: 1000 } },
      { new: true, session: session } 
    );
  }

  return counter.value;
}


module.exports = getNextOrderNumber;