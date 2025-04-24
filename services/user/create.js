const API_URL = "http://192.168.56.1:3333";

const createUser = async (name, idade, sexo) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, idade, sexo }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao adicionar usuário: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Falha na requisição:", error);
    throw error;
  }
};

export default createUser;