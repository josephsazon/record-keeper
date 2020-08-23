const groupProducts = (rawProducts) => {
  const classifications = [
    ...new Set(rawProducts.map((product) => product.classification)),
  ];

  const groupedProducts = classifications.map((classification) => {
    const items = rawProducts.filter(
      (product) => product.classification === classification
    );

    return {
      classification,
      items,
    };
  });

  return groupedProducts;
};

export default groupProducts;
