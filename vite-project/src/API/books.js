export const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return response.json();
    } catch (error) {
      throw new Error(`Error fetching books: ${error.message}`);
    }
  };
  