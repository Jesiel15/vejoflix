import React, { useEffect, useState } from "react";
import BannerMain from "../../components/BannerMain";
import Carousel from "../../components/Carousel";
import PageDefault from "../../components/PageDefault";
import dadosIniciaisJson from "../../assets/DadosIniciais/dados-iniciais.json";

const LOCAL_STORAGE_KEY = "vejoflixData";

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    loadDadosIniciais();
  }, []);

  function loadDadosIniciais() {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (storedData) {
        console.log("🔄 Carregando categorias do Local Storage...");
        const parsedData = JSON.parse(storedData);

        if (Array.isArray(parsedData)) {
          setDadosIniciais(parsedData);
        } else {
          console.warn(
            "⚠️ Dados inválidos no Local Storage, recarregando JSON..."
          );
          loadFromJson();
        }
      } else {
        loadFromJson();
      }
    } catch (error) {
      console.error("❌ Erro ao ler dados do Local Storage:", error);
      loadFromJson();
    }
  }

  function loadFromJson() {
    console.log(
      "📦 Carregando categorias do arquivo JSON e salvando no Local Storage..."
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dadosIniciaisJson));
    setDadosIniciais(dadosIniciaisJson);
  }

  return (
    <PageDefault paddingAll={0}>
      {dadosIniciais.length === 0 && <div>Loading...</div>}

      {Array.isArray(dadosIniciais) &&
        dadosIniciais.map((categoria, indice) => {
          if (!categoria?.videos || categoria.videos.length === 0) {
            return null;
          }

          if (indice === 0) {
            return (
              <div key={categoria.id}>
                <BannerMain
                  videoTitle={categoria.videos[0].titulo || "Vídeo sem título"}
                  url={categoria.videos[0].url}
                  videoDescription={categoria.videos[0].descricao || ""}
                />
                <Carousel ignoreFirstVideo category={categoria} />
              </div>
            );
          }

          return <Carousel key={categoria.id} category={categoria} />;
        })}
    </PageDefault>
  );
}

export default Home;
