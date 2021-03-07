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

export const checkout = (items: Array<string>): number => {
  let total: number = 0;
  const sortedProducts: Array<Array<string>> = (
    products.map((product: Product): Array<string> => (
      items.filter((item: string) => item === product.id)
    ))
  );

  sortedProducts.forEach((sortedItems: Array<string>) => {
    let tally: number = 0;
    sortedItems.forEach((item: string, i: number) => {
      const product = products.find((p: Product) => p.id === item);
      if (product) {
        const { offer, price } = product;
        if (offer) {
          const { price: offerPrice, amount } = offer;
          if (tally < amount - 1) {
            tally ++;
            if (i === sortedItems.length -1) {
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
