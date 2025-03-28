import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageDefault from "../../../components/PageDefault";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import useForm from "../../../hooks/useForm.js";

function CadastroCategoria() {
  const valoresIniciais = {
    nome: "",
    descricao: "",
    cor: "",
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const URL_TOP = window.location.hostname.includes("localhost")
      ? "http://localhost:8080/categorias"
      : "https://ec2-3-18-102-247.us-east-2.compute.amazonaws.com:443/categorias";

    fetch(URL_TOP).then(async (respostaDoServidor) => {
      const resposta = await respostaDoServidor.json();
      setCategorias([...resposta]);
    });

    // setTimeout(() => {
    //   setCategorias([
    //     ...categorias,
    //     {
    //       id: 1,
    //       nome: 'Front End',
    //       descricao: 'Uma categoria bacanudassa',
    //       cor: '#cbd1ff',
    //     },
    //     {
    //       id: 2,
    //       nome: 'Back End',
    //       descricao: 'Outra categoria bacanudassa',
    //       cor: '#cbd1ff',
    //     },
    //   ]);
    // }, 4 * 1000);
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>

      <form
        onSubmit={function handleSubmit(infosDoEvento) {
          infosDoEvento.preventDefault();

          const novaCategoria = {
            id: categorias.length + 1, // ou deixe o backend gerar
            titulo: values.nome,
            descricao: values.descricao,
            cor: values.cor,
            link_extra: {
              text: "",
              url: "",
            },
          };

          const URL_TOP = window.location.hostname.includes("localhost")
            ? "http://localhost:8082"
            : "https://ec2-3-18-102-247.us-east-2.compute.amazonaws.com:443";

          fetch(URL_TOP, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(novaCategoria),
          }).then(async (respostaDoServidor) => {
            if (respostaDoServidor.ok) {
              const categoriaCriada = await respostaDoServidor.json();

              setCategorias([...categorias, categoriaCriada]);

              clearForm();
            } else {
              alert("Erro ao cadastrar categoria!");
            }
          });
        }}
      >
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

      {categorias.length === 0 && (
        <div>
          {/* Cargando... */}
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria, index) => (
          <li key={`${categoria.titulo}-${index}`}>{categoria.titulo}</li>
        ))}
      </ul>

      <Link to="/">Ir para home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
