
export const fetchFoodItems = async () => {
  try {
    const response = await fetch('http://192.168.1.11:5002/api/foods');
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const searchItems = async (query, type = null) => {
  try {
    // In a real app, this would be a filtered API call
    // For now, we'll simulate it with the existing endpoint
    const response = await fetch('http://192.168.1.11:5002/api/foods');
    let data = await response.json();
    
    // Filter by search term
    if (query && query.trim() !== '') {
      const searchTerm = query.toLowerCase();
      data = data.filter(item => 
        item.name_food.toLowerCase().includes(searchTerm) || 
        item.description_food.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by type if specified
    if (type) {
      data = data.filter(item => item.type_food === type);
    }
    
    return data.map(item => ({
      id: item.id_food,
      title: item.name_food,
      description: item.description_food,
      type: item.type_food || 'meal', // Default to 'meal' if type is not specified
      imageUrl: `http://192.168.1.11:5002/api/${item.images[0]}`,
      distance: '0.8 km', // This would come from a real distance calculation
      tags: [item.type_food], // Using type as a tag
    }));
  } catch (err) {
    console.error('Search error:', err);
    throw new Error(err.message);
  }
};
