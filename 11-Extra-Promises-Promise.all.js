// Item.findById(id) // => Promise(for an Item)
const ids = ["60080b46a637695e826b54a9","60080b46a637695e826b54aa"];

// Item.findById(id) // => Promise(for an Item)
async function resolveItems( ids ){
  const arrayOfPromises = ids.map( id => Item.findById(id) );
  const arrayOfItems    = await Promise.all(arrayOfPromises);
  return arrayOfItems;
}

function resolveItemsPromise( ids ){
  const arrayOfPromises = ids.map( id => Item.findById(id) );
  return Promise.all(arrayOfPromises);
}

async function useAsyncResolve(){
  const items = await resolveItemsAsync(ids);
  console.log(items);
}

resolveItemsPromise(ids)
.then( items => console.log(items) )



function resolveItemsAndTransform( ids ){
  const arrayOfPromises = ids.map( async id => {
    const item = await Item.findById(id);
    return { id, price: item.currentPrice };
  });
  return Promise.all(arrayOfPromises);
}

function resolveItemsAndTransformPromise( ids ){
  const arrayOfPromises = ids.map( async id => {
    Item.findById(id)
    .then( item => ({ id, price: item.currentPrice }))
  });
  return Promise.all(arrayOfPromises);
}

async function resolveItemsAndTransformPromise( ids ){
  const arrayOfPromises = ids.map( async id => {
    Item.findById(id)
    .then( item => ({ id, price: item.currentPrice }))
  });
  const items = await Promise.all(arrayOfPromises);
  const prices = items.map( item => item.price )
  return prices;
}