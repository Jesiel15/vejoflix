import config from "../config";

const URL_CATEGORIES = `${config.URL_BACKEND_TOP}/categorias`;

function getAll() {
  return fetch(`${URL_CATEGORIES}`).then(async (respostaDoServidor) => {
    console.log("getAll", respostaDoServidor);
    if (respostaDoServidor.ok) {
      const resposta = await respostaDoServidor.json();
      return resposta;
    }

    throw new Error("Não foi possível pegar os dados :(");
  });
}

function getAllWithVideos() {
  return fetch(`${URL_CATEGORIES}?_embed=videos`)
    .then(async (respostaDoServidor) => {
      console.log("getAllWithVideos", respostaDoServidor);

      if (respostaDoServidor.ok) {
        // Lê o corpo da resposta como JSON
        const resposta = await respostaDoServidor.json();
        console.log("Dados recebidos:", resposta); // Verifique a estrutura dos dados
        if (resposta && Array.isArray(resposta) && resposta.length > 0) {
          return resposta; // Retorna os dados se forem um array e não estiverem vazios
        }
        throw new Error("Nenhum dado encontrado!");
      }
      throw new Error("Não foi possível pegar os dados :(");
    })
    .catch((erro) => {
      console.error("Erro ao fazer a requisição:", erro);
      throw erro; // Lança o erro para que seja tratado em outro lugar, se necessário
    });
}

export default {
  getAllWithVideos,
  getAll,
};
