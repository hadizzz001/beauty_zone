'use client';
import React, { useEffect, useState } from 'react';

export default function ProductComparison() {
  const [products, setProducts] = useState([]);
  const [firstProductId, setFirstProductId] = useState('');
  const [secondProductId, setSecondProductId] = useState('');
  const [firstProduct, setFirstProduct] = useState(null);
  const [secondProduct, setSecondProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products'); // Adjust the API route as needed
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setFirstProduct(products.find(p => p._id === firstProductId));
    setSecondProduct(products.find(p => p._id === secondProductId));
  }, [firstProductId, secondProductId, products]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Compare Products</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={firstProductId}
          onChange={(e) => setFirstProductId(e.target.value)}
        >
          <option value="">Select First Product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.title}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={secondProductId}
          onChange={(e) => setSecondProductId(e.target.value)}
        >
          <option value="">Select Second Product</option>
          {products
            .filter(p => p._id !== firstProductId)
            .map((product) => (
              <option key={product._id} value={product._id}>
                {product.title}
              </option>
            ))}
        </select>
      </div>

      {firstProduct && secondProduct && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-3">Attribute</th>
                <th className="border border-gray-300 p-3">{firstProduct.title}</th>
                <th className="border border-gray-300 p-3">{secondProduct.title}</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: 'Image',
                  value: (p) => <img src={p.img[0]} alt="" className="w-24 h-24 object-cover" />,
                },
                {
                  label: 'Description',
                  value: (p) => (
                    <p
                      className="myNewC"
                      dangerouslySetInnerHTML={{ __html: p.description }}
                    />
                  ),
                },
                {
                  label: 'Discount',
                  value: (p) => `${p.discount}`,
                },
                {
                  label: 'Category',
                  value: (p) => p.category,
                },
                {
                  label: 'Subcategory',
                  value: (p) => p.subcategory,
                },
                {
                  label: 'Brand',
                  value: (p) => p.brand,
                },
                {
                  label: 'Colors',
                  value: (p) => (
                    <div className="flex flex-col gap-1">
                      {p.colors?.map((c, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <img
                            src={c.img[0]}
                            alt={c.code}
                            className="w-8 h-8 rounded-full border"
                          />
                          <span className="text-sm">{c.code}</span>
                        </div>
                      ))}
                    </div>
                  ),
                },
                
                {
                  label: 'Sizes',
                  value: (p) => (
                    <div className="flex flex-col gap-1">
                      {p.sizes?.map((size, i) => (
                        <div key={i}>{size}</div>
                      ))}
                    </div>
                  ),
                },
                
              ].map((row, idx) => (
                <tr
                  key={row.label}
                  className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="border border-gray-300 p-3 font-medium">{row.label}</td>
                  <td className="border border-gray-300 p-3">{row.value(firstProduct)}</td>
                  <td className="border border-gray-300 p-3">{row.value(secondProduct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
