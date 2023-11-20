// api.js
const BASE_URL = 'https://adorable-tan-wear.cyclic.app/';

export const fetchData = async () => {
  const response = await fetch(`${BASE_URL}q/`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};

export const deleteData = async (id) => {
  const response = await fetch(`${BASE_URL}q/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};

export const postData = async (data) => {
  const response = await fetch(`${BASE_URL}q/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};

export const updateData = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}q/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const fetchQuestionById = async (id) => {
  const url = `${BASE_URL}q/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching question by ID:', error);
  }
};

export const fetchQnaData = () => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}qna/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        console.error('Error fetching Q&A data:', error);
        reject(error);
      });
  });
};
