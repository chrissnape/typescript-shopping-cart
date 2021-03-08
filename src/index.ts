type Offer = {
  price: number,
  amount: number,
}

type Product = {
  id: string,
  name: string,
  price: number,
  offer: Offer | null,
}

const products: Array<Product> = [
  {id: 'A99', name: 'Apple', price: 50, offer: {price: 130, amount: 3}},
  {id: 'B15', name: 'Banana', price: 30, offer: {price: 45, amount: 2}},
  {id: 'C40', name: 'Cherry', price: 60, offer: null},
  {id: 'T34', name: 'Tangerine', price: 99, offer: null},
];

export const checkout = (itemIds: Array<string>): number => {
  let total: number = 0;
  const talliedIds: Array<Array<string>> = (
    products.map((product: Product): Array<string> => (
      itemIds.filter((item: string): boolean => item === product.id)
    ))
  );

  talliedIds.forEach((talliedId: Array<string>) => {
    let tally: number = 0;
    talliedId.forEach((id: string, i: number) => {
      const product: Product | undefined = products.find((p: Product) => p.id === id);
      if (product) {
        const { offer, price } = product;
        if (offer) {
          const { price: offerPrice, amount } = offer;
          if (tally < amount - 1) {
            tally ++;
            if (i === talliedId.length -1) {
              total += tally * price;
            }
          } else {
            tally = 0;
            total += offerPrice;
          }
        } else {
          total += price;
        }
      }
    });
  });

  return total;
};

export const getFullTotal = (itemIds: Array<string>): number => (
  itemIds.map((id: string) => {
    const product: Product | undefined = products.find((p: Product) => p.id === id);
    return product ? product.price : 0;
  }).reduce((a: number, b: number) => a + b, 0)
);

export const getTotal = () => {
  const itemIds: Array<string> = process.argv.slice(1);
  itemIds.forEach((id: string) => {
    const product: Product | undefined = products.find((p: Product) => p.id === id);
    console.log(product ? `${product.name}: ${product.price}` : `Product ${id} not found`);
  });
  const checkoutTotal = checkout(itemIds);
  const savedAmount = getFullTotal(itemIds) - checkoutTotal;
  console.log(`The total is ${checkoutTotal}${savedAmount ? `, you saved ${savedAmount} today.` : `.`}`);
};
