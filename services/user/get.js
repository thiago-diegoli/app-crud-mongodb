const API_URL = "http://192.168.56.1:3333";

const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Falha na requisição:", error);
    throw error;
  }
};

export default getAllUsers;
