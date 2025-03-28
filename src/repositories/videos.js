import config from "../config";

const URL_VIDEOS = `${config.URL_BACKEND_TOP}/videos`;

function create(objetoDoVideo) {
  return fetch(`${URL_VIDEOS}?_embed=videos`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(objetoDoVideo),
  }).then(async (respostaDoServidor) => {
    if (respostaDoServidor.ok) {
      const resposta = await respostaDoServidor.json();
      return resposta;
    }

    throw new Error("Não foi possível cadastrar os dados :(");
  });
}

function deleteVideo(objetoDoVideo) {
  return fetch(
    `http://ec2-3-18-102-247.us-east-2.compute.amazonaws.com:8082/videos/${objetoDoVideo.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(objetoDoVideo),
    }
  ).then(async (respostaDoServidor) => {
    if (respostaDoServidor.ok) {
      const resposta = await respostaDoServidor.json();
      return resposta;
    }

    throw new Error("Não foi possível deletar o video :(");
  });
}

export default {
  create,
  deleteVideo,
};
