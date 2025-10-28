import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PageDefault from "../../../components/PageDefault";
import useForm from "../../../hooks/useForm";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
// import videosRepository from "../../../repositories/videos"; <--- Não é necessário para Local Storage
// import categoriasRepository from "../../../repositories/categorias"; <--- Não é necessário para Local Storage
import { show } from "node-snackbar";

const LOCAL_STORAGE_KEY = "vejoflixData";

function DeleteVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values } = useForm({
    url: "https://www.youtube.com/watch?v=Bh1398ddGDw",
    categoria: "Front End",
  });

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setCategorias(parsedData);
          return;
        }
      }
    } catch (error) {
      console.error("❌ Erro ao carregar dados do Local Storage:", error);
    }
  }, []);

  function handleDeleteSubmission(event) {
    event.preventDefault();

    const urlToDelete = values.url;
    const categoriaTitulo = values.categoria;

    if (!urlToDelete || !categoriaTitulo) {
      show("Preencha a URL e a Categoria para deletar o vídeo.", {
        style: "warning",
      });
      return;
    }

    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (!storedData) {
        show("Erro: Dados não encontrados no Local Storage.", {
          style: "error",
        });
        return;
      }

      let dados = JSON.parse(storedData);

      const categoriaToUpdate = dados.find(
        (cat) => cat.titulo === categoriaTitulo
      );

      if (!categoriaToUpdate) {
        show(`Erro: Categoria '${categoriaTitulo}' não encontrada.`, {
          style: "error",
        });
        return;
      }

      const videoIndex = categoriaToUpdate.videos.findIndex(
        (video) => video.url === urlToDelete
      );

      if (videoIndex === -1) {
        show(
          `Erro: Vídeo com URL '${urlToDelete}' não encontrado na categoria '${categoriaTitulo}'.`,
          { style: "warning" }
        );
        return;
      }

      categoriaToUpdate.videos.splice(videoIndex, 1);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dados));

      show(`✅ Vídeo deletado com sucesso!`, { style: "success" });
      history.push("/");
    } catch (error) {
      console.error("Erro ao deletar vídeo do Local Storage:", error);
      show("Ocorreu um erro ao deletar o vídeo.", { style: "error" });
    }
  }

  return (
    <PageDefault>
      <h1>Deletar Video</h1>

      <form onSubmit={handleDeleteSubmission}>
        <FormField
          label="URL do Vídeo"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
          type="select"
        />

        <Button type="submit">Deletar Video</Button>
      </form>
    </PageDefault>
  );
}
export default DeleteVideo;
