const API_URL = "http://192.168.56.1:3333";

const deletarUsuario = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar usuário: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deletarUsuario;
