import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodList from "./components/FoodList";

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMockData = (query) => {
    const mockProducts = {
      milk: [
        {
          code: '001',
          product_name: 'Whole Milk',
          brands: 'Organic Farm',
          image_small_url: 'https://via.placeholder.com/150?text=Milk',
          nutriments: {
            'energy-kcal_100g': 64,
            proteins_100g: 3.2,
            carbohydrates_100g: 4.8,
            fat_100g: 3.6
          }
        },
        {
          code: '002',
          product_name: 'Low Fat Milk',
          brands: 'Dairy Gold',
          image_small_url: 'https://via.placeholder.com/150?text=LowFatMilk',
          nutriments: {
            'energy-kcal_100g': 49,
            proteins_100g: 3.3,
            carbohydrates_100g: 4.7,
            fat_100g: 1.5
          }
        }
      ],
      banana: [
        {
          code: '003',
          product_name: 'Fresh Banana',
          brands: 'Tropical Fresh',
          image_small_url: 'https://via.placeholder.com/150?text=Banana',
          nutriments: {
            'energy-kcal_100g': 89,
            proteins_100g: 1.1,
            carbohydrates_100g: 23,
            fat_100g: 0.3
          }
        }
      ],
      apple: [
        {
          code: '004',
          product_name: 'Red Apple',
          brands: 'Farm Fresh',
          image_small_url: 'https://via.placeholder.com/150?text=Apple',
          nutriments: {
            'energy-kcal_100g': 52,
            proteins_100g: 0.3,
            carbohydrates_100g: 14,
            fat_100g: 0.2
          }
        }
      ]
    };
    
    const lowerQuery = query.toLowerCase();
    return mockProducts[lowerQuery] || [];
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      // Use mock data for demonstration
      const mockResults = getMockData(query);
      
      if (mockResults.length > 0) {
        setResults(mockResults);
      } else {
        // Try real API if mock doesn't have the data
        const encodedQuery = encodeURIComponent(query);
        const apiUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodedQuery}&search_simple=1&action=process&format=json&pagesize=20`;
        
        try {
          const response = await fetch(apiUrl, {
            mode: 'cors',
            credentials: 'omit'
          });
          
          if (response.ok) {
            const data = await response.json();
            const filteredProducts = (data.products || []).filter(
              (p) => p.product_name && p.product_name.trim() !== ''
            );
            setResults(filteredProducts);
          } else {
            setResults([]);
          }
        } catch (apiError) {
          console.log('Real API unavailable, showing mock data or empty results');
          setResults([]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>FoodFacts</h1>
        <p>Search for any food and discover its nutrition data</p>
      </header>

      <main className="app-main">
        <SearchBar onSearch={handleSearch} />

        {loading && <div className="loading-state">Loading...</div>}

        {!loading && results.length === 0 && (
          <div className="empty-state">
            <p>No results yet. Start by searching for a food!</p>
          </div>
        )}

        {results.length > 0 && <FoodList products={results} />}
      </main>
    </div>
  );
}
