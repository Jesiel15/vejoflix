import React from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';

function CadastroCategoria() {
    return (
      <PageDefault>
        <h1>Cadastrar Categoria</h1>
        <form>
          <label>
            Nome da Categoria:
            <input 
              type="text"
            />
          </label>
        </form>

        <Link to="/">
           Ir para home
        </Link>
      </PageDefault>
    )
  }

  export default CadastroCategoria;