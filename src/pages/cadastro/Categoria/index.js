import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageDefault from "../../../components/PageDefault";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import useForm from "../../../hooks/useForm.js";
import dadosIniciaisJson from "../../../assets/DadosIniciais/dados-iniciais.json";

const LOCAL_STORAGE_KEY = "vejoflixData";

function CadastroCategoria() {
  const valoresIniciais = {
    nome: "",
    descricao: "",
    cor: "",
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [dadosIniciais, setDadosIniciais] = useState([]);

  const categorias = dadosIniciais;

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setDadosIniciais(parsedData);
          return;
        }
      }

      setDadosIniciais(dadosIniciaisJson);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(dadosIniciaisJson)
      );
    } catch (error) {
      console.error("❌ Erro ao carregar dados do Local Storage:", error);
      setDadosIniciais(dadosIniciaisJson);
    }
  }, []);

  function handleNewCategorySubmission(infosDoEvento) {
    infosDoEvento.preventDefault();

    const maxId = dadosIniciais.reduce((max, categoria) => {
      const currentId = Number(categoria.id);
      if (!isNaN(currentId) && currentId > max) {
        return currentId;
      }
      return max;
    }, 0);

    const novoId = maxId + 1;

    const novaCategoria = {
      id: novoId,
      titulo: values.nome,
      descricao: values.descricao,
      cor: values.cor,
      videos: [],
      link_extra: {
        text: values.nome,
        url: "",
      },
    };

    const novosDados = [...dadosIniciais, novaCategoria];

    setDadosIniciais(novosDados);

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(novosDados));
      clearForm();
    } catch (error) {
      console.error("❌ Erro ao salvar categoria no Local Storage:", error);
      alert("Erro ao salvar a categoria no Local Storage.");
    }
  }

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria: **{values.nome}**
      </h1>

      <form onSubmit={handleNewCategorySubmission}>
        <FormField
          label="Nome da Categoria"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>Cadastrar</Button>
      </form>

      {categorias.length === 0 && <div>Loading...</div>}

      <h3>Categorias cadastradas:</h3>
      <ul>
        {categorias.map((categoria, index) => (
          <li
            key={`${categoria.titulo}-${index}`}
            style={{ color: categoria.cor }}
          >
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Link to="/">Ir para home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;