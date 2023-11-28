async function deleteProduct(productId) {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
  
    if (confirmDelete) {
        try {
            const response = await fetch(`/products/delete/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
  
            if (response.ok) {
                // Optional: Reload the page or update the UI after successful deletion
                window.location.reload(); // Reload the page
            } else {
                console.error('Failed to delete product');
                // Handle error scenario
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            // Handle error scenario
        }
    }
  }