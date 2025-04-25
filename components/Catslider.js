import { useState, useEffect } from 'react';
import CatSlider1 from '../components/Catslider1';

const YourComponent = () => {
  const [allTemp2, setAllTemps2] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredSubs, setFilteredSubs] = useState([]);
  const [activeRowIndex, setActiveRowIndex] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        setAllTemps2(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await fetch("/api/sub");
        const data = await res.json();
        setSubcategories(data);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    };
    fetchSubcategories();
  }, []);

  const handleCategoryClick = (catName, rowIndex) => {
    setSelectedCategory(catName);
    setActiveRowIndex(rowIndex);
    const filtered = subcategories.filter((sub) => sub.category === catName);
    setFilteredSubs(filtered);
  };

  // Chunk categories into rows of 2
  const chunkedCategories = [];
  for (let i = 0; i < allTemp2?.length; i += 2) {
    chunkedCategories.push(allTemp2.slice(i, i + 2));
  }

  return (
    <div className="px-4 mt-10 mb-10">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .car-card {
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 10px;
              transition: all 0.3s ease;
            }
            .car-card:hover {
              background-color: #f9f9f9;
            }
            .car-card__image {
              width: 100px;
              height: 100px;
              object-fit: cover;
              border-radius: 8px;
            }
            .car-card__title {
              margin-top: 10px;
              font-size: 0.9em;
              font-weight: bold;
              text-align: center;
              text-transform: uppercase;
            }
          `,
        }}
      />

      {chunkedCategories?.length > 0 ? (
        <>
          {chunkedCategories.map((row, rowIndex) => (
            <div key={rowIndex}>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-4">
                {row.map((temp) => (
                  <div
                    key={temp.id}
                    className="car-card"
                    onClick={() => handleCategoryClick(temp.name, rowIndex)}
                  >
                    <img src={temp.img} alt={temp.name} className="car-card__image" />
                    <div className="car-card__title">{temp.name}</div>
                  </div>
                ))}
              </div>

              {/* Inject subcategories after the selected row */}
              {activeRowIndex === rowIndex && filteredSubs?.length > 0 && (
                <div className="mb-4">
                  <CatSlider1 subcategories={filteredSubs} />
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-black text-xl font-bold">No Products Found</h2>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
