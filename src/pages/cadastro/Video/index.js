import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PageDefault from "../../../components/PageDefault";
import useForm from "../../../hooks/useForm";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
const LOCAL_STORAGE_KEY = "vejoflixData";

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values, clearForm } = useForm({
    titulo: "Video padrão",
    url: "https://www.youtube.com/watch?v=iKRZ9j9leZw",
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
  function handleVideoSubmission(event) {
    event.preventDefault();

    const newVideo = {
      titulo: values.titulo,
      url: values.url,
      categoriaTitulo: values.categoria,
    };

    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (!storedData) {
        alert(
          "Erro: Dados iniciais não encontrados no Local Storage. Visite a Home primeiro para carregar o JSON."
        );
        return;
      }

      let dados = JSON.parse(storedData);

      const categoryToUpdate = dados.find(
        (cat) => cat.titulo === newVideo.categoriaTitulo
      );

      if (categoryToUpdate) {
        if (!categoryToUpdate.videos) {
          categoryToUpdate.videos = [];
        }

        categoryToUpdate.videos.push({
          titulo: newVideo.titulo,
          url: newVideo.url,
        });

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dados));

        clearForm();
        history.push("/");
      } else {
        alert(`Erro: Categoria '${newVideo.categoriaTitulo}' não encontrada.`);
      }
    } catch (error) {
      console.error("Erro ao salvar dados no Local Storage:", error);
      alert("Ocorreu um erro ao salvar o vídeo no Local Storage.");
    }
  }

  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>

      <form onSubmit={handleVideoSubmission}>
        <FormField
          label="Título do Vídeo"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
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

        <Button type="submit">Cadastrar</Button>
      </form>

      <br />
      <br />

      <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
    </PageDefault>
  );
}

export default CadastroVideo;
