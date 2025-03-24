import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PageDefault from "../../../components/PageDefault";
import useForm from "../../../hooks/useForm";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import videosRepository from "../../../repositories/videos";
import categoriasRepository from "../../../repositories/categorias";
import { show } from "node-snackbar";

function DeleteVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values } = useForm({
    url: "https://www.youtube.com/watch?v=Bh1398ddGDw",
    categoria: "Front End",
  });

  useEffect(() => {
    categoriasRepository.getAll().then((categoriasFromServer) => {
      setCategorias(categoriasFromServer);
    });
  }, []);

  return (
    <PageDefault>
      <h1>Deletar Video</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          // alert('Video Cadastrado com sucesso!!!1!');
          // const categoriaEscolhida = categorias.find((categoria) => {
          //     return categoria.titulo === values.categoria;

          // });

          categoriasRepository
            .getAllWithVideos()
            .then((categoriasComVideos) => {
              categoriasComVideos.forEach((categoria) => {
                categoria.videos.forEach((video) => {
                  if (
                    video.url === values.url &&
                    categoria.titulo === values.categoria
                  ) {
                    //acha o id do video pela url e titulo
                    //console.log('achei o id:',video.id);
                    videosRepository
                      .deleteVideo({
                        id: video.id,
                      })
                      .then(() => {
                        console.log("Deletou com sucesso!");
                        history.push("/");
                      });
                  } else {
                    console.log("deu ruim", values.url, values.categoria);
                    show("test");
                  }
                });
              });
            })
            .catch((err) => {
              console.log(err.message);
            });
        }}
      >
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

        <Button type="submit">Deletar Video</Button>
      </form>
    </PageDefault>
  );
}
export default DeleteVideo;
