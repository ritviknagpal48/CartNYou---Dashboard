const ProductData = [
  {
    id: "1",
    sku: "DYOGP32615",
    name: "Computer Table",
    description: "Product Description comes here.",
    "long-description":
      "Long Product Description comes here. If this is not defined, the default description will be used instead.",
    price: 523.99,
    stock: 65,
    category: "Mobile & Laptop",
    supplier: "Supplier-Net",
    info: {
      "pack-of": "Single",
      "product-type": "Study Table",
      weight: "850 gms",
      dimensions: "80 cm x 17 cm x 50 cm",
    },

    images: [
      {
        url:
          "https://images.unsplash.com/photo-1590192746144-b92a837f8ddf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
    ],
  },

  {
    id: "2",
    sku: "DYO221615",
    name: "Man's Sports Watch",
    description: "Product Description comes here.",
    "long-description":
      "Long Product Description comes here. If this is not defined, the default description will be used instead.",
    price: 999.00,
    stock: 65,
    category: "Man's Watches",
    supplier: "Supplier-Net",
    info: {
      "pack-of": "Single",
      "product-type": "Wrist Watch",
      weight: "450 gms",
      dimensions: "8 cm x 7 cm x 10 cm",
    },
    variants: [
      {
        name: "Variant 1",
        sku: "SKU-V-34234",
        quantity: 43,
        price: 153.25,
      },
      {
        name: "Variant 2",
        sku: "SKU-V-23423",
        quantity: 87,
        price: 136.75,
      },
    ],
    images: [
      {
        url:
          "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1059&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
    ],
  },
  {
    id: "3",
    sku: "DYOGP32235",
    name: "Man's Formal Suit",
    description: "Product Description comes here.",
    "long-description":
      "Long Product Description comes here. If this is not defined, the default description will be used instead.",
    price: 2499.99,
    stock: 65,
    category: "Man's Clothing",
    supplier: "Raymonds",
    info: {
      "pack-of": "Single",
      "product-type": "Man's Clothing",
      weight: "450 gms",
      dimensions: "8 cm x 7 cm x 10 cm",
    },
    variants: [
      {
        name: "Variant 1",
        sku: "SKU-V-34234",
        quantity: 43,
        price: 153.25,
      },
    ],
    images: [
      {
        url:
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
    ],
  },
  {
    id: "4",
    sku: "GROGP22615",
    name: "Men Formal Watch",
    description: "Product Description comes here.",
    "long-description":
      "Long Product Description comes here. If this is not defined, the default description will be used instead.",
    price: 5999,
    stock: 65,
    category: "Man's Watch",
    supplier: "Raymonds",
    info: {
      "pack-of": "Single",
      "product-type": "Man's Watch",
      weight: "450 gms",
      dimensions: "8 cm x 7 cm x 10 cm",
    },
    variants: [
      {
        name: "Variant 1",
        sku: "SKU-V-34234",
        quantity: 43,
        price: 153.25,
      },
    ],
    images: [
      {
        url:
          "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
    ],
  },
  {
    id: "5",
    sku: "M90GP22615",
    name: "Neauthy Skin Cream",
    description: "Product Description comes here.",
    "long-description":
      "Long Product Description comes here. If this is not defined, the default description will be used instead.",
    price: 5999,
    stock: 65,
    category: "Health & Cate",
    supplier: "Neauthy",
    info: {
      "pack-of": "Single",
      "product-type": "Skin Cream",
      weight: "450 gms",
      dimensions: "8 cm x 7 cm x 10 cm",
    },
    variants: [
      {
        name: "Variant 1",
        sku: "SKU-V-34234",
        quantity: 43,
        price: 153.25,
      },
    ],
    images: [
      {
        url:
          "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
    ],
  },
  {
    id: "6",
    sku: "GR23522615",
    name: "Light Pink Skit Dress",
    description: "Product Description comes here.",
    "long-description":
      "Long Product Description comes here. If this is not defined, the default description will be used instead.",
    price: 2000,
    stock: 65,
    category: "Women;s Clothing",
    supplier: "Raymonds",
    info: {
      "pack-of": "Single",
      "product-type": "Man's Watch",
      weight: "450 gms",
      dimensions: "8 cm x 7 cm x 10 cm",
    },
    variants: [
      {
        name: "Variant 1",
        sku: "SKU-V-34234",
        quantity: 43,
        price: 153.25,
      },
    ],
    images: [
      {
        url:
          "https://images.unsplash.com/photo-1494578379344-d6c710782a3d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
    ],
  },
  {
    id: "7",
    sku: "SUNGP22615",
    name: "Sunglasses",
    description: "Product Description comes here.",
    "long-description":
      "Long Product Description comes here. If this is not defined, the default description will be used instead.",
    price: 1590,
    stock: 65,
    category: "Man's WAccessories",
    supplier: "Raymonds",
    info: {
      "pack-of": "Single",
      "product-type": "Man's Sunglasses",
      weight: "450 gms",
      dimensions: "8 cm x 7 cm x 10 cm",
    },
    variants: [
      {
        name: "Variant 1",
        sku: "SKU-V-34234",
        quantity: 43,
        price: 153.25,
      },
    ],
    images: [
      {
        url:
          "https://images.unsplash.com/photo-1610904329458-2512c4748c8d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
    ],
  },
  {
    id: "8",
    sku: "DERGP22615",
    name: "Printed Red Dress",
    description: "Product Description comes here.",
    "long-description":
      "Long Product Description comes here. If this is not defined, the default description will be used instead.",
    price: 4250,
    stock: 65,
    category: "Women's Clothing",
    supplier: "Raymonds",
    info: {
      "pack-of": "Single",
      "product-type": "Red Dress",
      weight: "450 gms",
      dimensions: "8 cm x 7 cm x 10 cm",
    },
    variants: [
      {
        name: "Variant 1",
        sku: "SKU-V-34234",
        quantity: 43,
        price: 153.25,
      },
    ],
    images: [
      {
        url:
          "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
    ],
  },
  {
    id: "9",
    sku: "U46GP22615",
    name: "Designer Form Glass",
    description: "Product Description comes here.",
    "long-description":
      "Long Product Description comes here. If this is not defined, the default description will be used instead.",
    price: 1059,
    stock: 65,
    category: "Home & Kitchen",
    supplier: "Raymonds",
    info: {
      "pack-of": "Single",
      "product-type": "Home Glass",
      weight: "450 gms",
      dimensions: "8 cm x 7 cm x 10 cm",
    },
    variants: [
      {
        name: "Variant 1",
        sku: "SKU-V-34234",
        quantity: 43,
        price: 153.25,
      },
    ],
    images: [
      {
        url:
          "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
    ],
  },
  {
    id: "10",
    sku: "GRO2f2615",
    name: "Smart Utensils",
    description: "Product Description comes here.",
    "long-description":
      "Long Product Description comes here. If this is not defined, the default description will be used instead.",
    price: 599,
    stock: 65,
    category: "Home & Kitchen",
    supplier: "Raymonds",
    info: {
      "pack-of": "Single",
      "product-type": "Kitchen Utensils",
      weight: "450 gms",
      dimensions: "8 cm x 7 cm x 10 cm",
    },
    variants: [
      {
        name: "Variant 1",
        sku: "SKU-V-34234",
        quantity: 43,
        price: 153.25,
      },
    ],
    images: [
      {
        url:
          "https://images.unsplash.com/photo-1533787761082-492a5b83e614?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        alt: "Alternate Text for the Image",
      },
      {
        url:
          "https://images.unsplash.com/photo-1598662972299-5408ddb8a3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        alt: "Alternate Text for the Image",
      },
    ],
  },
];

export default ProductData;