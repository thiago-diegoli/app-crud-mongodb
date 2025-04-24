const API_URL = "http://192.168.56.1:3333";

const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro ao remover usuário: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Falha na requisição:", error);
    throw error;
  }
};

export default deleteUser;
