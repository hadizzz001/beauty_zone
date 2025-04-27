'use client';
import { useEffect, useState } from 'react';

export default function Quiz() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [concern, setConcern] = useState('');
  const [budget, setBudget] = useState('');
  const [products, setProducts] = useState([]);
  const [matchedProduct, setMatchedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      findProduct();
    }
  };

  const findProduct = () => {
    const budgetNum = parseFloat(budget);

    const result = products.find(p =>
      p.category.trim().toLowerCase() === category.trim().toLowerCase() &&
      parseFloat(p.discount) <= budgetNum
    );

    setMatchedProduct(result || null);
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-20">
      <h2 className="text-2xl font-bold mb-4">Product Quiz</h2>

      {step === 1 && (
        <>
          <label className="block mb-2" id='button111'>Your business area:</label>
          <select
            className="w-full border p-2"
            value={category}
            onChange={e => setCategory(e.target.value)}
            id='button111'
          >
            <option value="">Select category</option>
            <option value="Beauty & Skin care">Beauty & Skin care</option>
            <option value="Skin care products">Skin care products</option>
            <option value="Nails">Nails</option>
            <option value="Tattoo">Tattoo</option>
            <option value="Perma blend & Tina Davies">Perma blend & Tina Davies</option>
            <option value="piercing">piercing</option>
          </select>
        </>
      )}

      {step === 2 && (
        <>
          <label className="block mb-2 mt-4" id='button111'>Your concern (optional):</label>
          <select
            className="w-full border p-2"
            value={concern}
            onChange={e => setConcern(e.target.value)}
            id='button111'
          >
            <option value="">Select concern</option>
            {/* Example static options, adjust freely */}
            <option value="machines">Machines</option>
            <option value="UV Gel">UV Gel</option>
            <option value="Spa Products">Spa Products</option>
            <option value="Body Ink">Body Ink</option>
            <option value="Eyebrow Ink">Eyebrow & Lips Ink</option>
            <option value="Accessories">Accessories</option>
            <option value="Skin Serum">Skin Serum</option>
            <option value="Perma Blend">Perma Blend</option>
          </select>
        </>
      )}

      {step === 3 && (
        <>
          <label className="block mb-2 mt-4" id='button111'>Your budget ($):</label>
          <input
            type="number"
            className="w-full border p-2"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            id='button111'
          />
        </>
      )}

      <button
        onClick={handleNext}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {step < 3 ? 'Next' : 'Find Product'}
      </button>

      {matchedProduct && (
        <a href={`/product?id=${matchedProduct._id}&&imgg=${encodeURIComponent(matchedProduct.img?.[0]?.replace('/upload/', '/upload/w_500/q_auto/f_auto/') || '')}`}>
        <div className="mt-6 p-4 border rounded bg-green-50">
          <h3 className="text-lg font-semibold mb-2" id='button111'>Recommended Product</h3>
          <p id='button111'><strong>{matchedProduct.title}</strong></p>
          <p id='button111'>Category: {matchedProduct.category}</p>
          <p id='button111'>Price: ${matchedProduct.discount}</p>
          <img
            src={matchedProduct.img[0]}
            alt={matchedProduct.title}
            className="mt-2 w-full max-h-60 object-contain"
          />
        </div>
        </a>
      )}

      {step === 3 && !matchedProduct && (
        <p className="mt-4 text-red-600">No product found for your budget and category.</p>
      )}
    </div>
  );
}
