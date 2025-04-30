const API_URL = "http://192.168.56.1:3333";

const atualizarUsuario = async (id, dadosUsuarios) => {
  try {
    const response = await fetch(`${API_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosUsuarios),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar usuário: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default atualizarUsuario;
