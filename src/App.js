// *****************************************
// App.js
// *****************************************

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// importar componentes
import Tabela from './Tabela';
import Formulario from './Formulario'

/**
 * função que irá ler os dados (fotografias) da API
 */
async function getFotos() {

  // ler os dados da API
  // https://create-react-app.dev/docs/proxying-api-requests-in-development/
  let resposta = await fetch("api/FotosAPI");

  if (!resposta.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos ler os dados da API. Código: " + resposta.status);
  }
  return await resposta.json();
}

async function getFotosById(idFoto) {

  // ler os dados da API
  // https://create-react-app.dev/docs/proxying-api-requests-in-development/
  let resposta = await fetch("api/FotosAPI/"+idFoto);

  if (!resposta.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos ler os dados da API. Código: " + resposta.status);
  }
  return await resposta.json();
}


/**
 * função que irá ler os dados (cães) da API
 */
async function getQuartos() {

  // ler os dados da API
  // https://create-react-app.dev/docs/proxying-api-requests-in-development/
  let resposta = await fetch("api/QuartosAPI");

  if (!resposta.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos ler os dados da API. Código: " + resposta.status);
  }
  return await resposta.json();
}

/**
 * Função para enviar os dados da nova fotografia para a API
 * @param {} novaFoto 
 */
async function adicionaFoto(novaFoto) {
  // https://developer.mozilla.org/pt-BR/docs/Web/API/FormData
  // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
  let formData = new FormData();
  formData.append("Fotografia", novaFoto.nomeFoto);
  formData.append("Data", novaFoto.dataFoto);
  formData.append("QuartoFK", novaFoto.nomeQuarto);

  let resposta = await fetch("api/FotosAPI/", {
    method: "POST",
    body: formData
  });

  if (!resposta.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos escrever os dados na API. Código: " + resposta.status);
  }
  return await resposta.json();
}

async function deleteFoto(IdFoto) {
  let resposta = await fetch("/api/FotosAPI/"+IdFoto, 
  { method: 'DELETE' });

  if (!resposta.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos apagar os dados. Código: " + resposta.status);
  }
  return await resposta.json();
}


/**
 * Componente principal do meu projeto
 */
class App extends React.Component {
  /**
   * Construtor da classe -> tem sempre este nome
   */
  constructor(props) {
    super(props); // <--- esta É SEMPRE a primeira instrução

    this.state = {
      /**
       * array que irá conter os dados das Fotos, vindas da API
       */
      fotos: [],
      /**
       * array, que irá conter a lista de quartos, vindos da API,
       * a representar no Formulário
       */
      quartos: [],
      /**
       * variável para conter o 'estado' da app, 
       * no carregamento dos dados das Fotografias, da API
       * @type {"carregando dados" | "sucesso" | "erro"}
       */
      loadState: "",
      /**
       * guarda a mensagem de erro, se algo correr mal
       */
      errorMessage: null
    }
  }

  /**
   * Quando o objeto é criado, executa o código aqui escrito
   * Vamos usá-lo para carregar os dados da API
   */
  componentDidMount() {
    this.LoadFotos();
    this.LoadQuartos();
  }

  /**
   * Carrega as fotos da API e adiciona-as ao array 'fotos'
   */
  async LoadFotos() {
    /* Tarefas:
     *   1. Ler os dados da API (fetch)
         2. atualizar os dados na var. state
     */
    try {
      // 1.
      this.setState({ loadState: "carregando dados" });

      let fotosVindosDaAPI = await getFotos();

      // 2.
      // esta não é a forma correta: this.state.fotos = fotosVindosDaAPI;
      this.setState({
        fotos: fotosVindosDaAPI,
        loadState: "sucesso"
      });
    } catch (erro) {
      this.setState({
        loadState: "erro",
        errorMessage: erro.toString()
      });
      console.error("Erro na leitura das fotos da API", erro);
    }
  }


  /**
   * Carrega os dados dos Caes da API e adiciona-os ao array 'caes'
   */
  async LoadQuartos() {
    /* Tarefas:
     *   1. Ler os dados da API (fetch)
         2. atualizar os dados na var. state
     */
    try {
      // 1.
      this.setState({ loadState: "carregando dados" });

      let quartosVindosDaAPI = await getQuartos();

      // 2.
      this.setState({
        quartos: quartosVindosDaAPI,
        loadState: "sucesso"
      });
    } catch (erro) {
      this.setState({
        loadState: "erro",
        errorMessage: erro.toString()
      });
      console.error("Erro na leitura dos dados dos quartos da API", erro);
    }
  }


  /**
   * Recebe os dados do Formulário e envio-os para a API
   * @param {*} dadosDaFotoACarregar - dados recebidos
   */
  handlerGuardaFoto = async (dadosDaFotoACarregar) => {
    // Tarefas
    // 1. gerar os dados a exportar
    // 2. enviá-los para a API
    // 3. efetuar o Reload da tabela

    // 1. - já está feito. É o parâmetro de entrada nesta função

    try {
      // 2. 
      await adicionaFoto(dadosDaFotoACarregar);

      // 3.
      await this.LoadFotos();

      /* 
        // em alternativa ao ponto 2. e 3. poderia ser executado este código
        // contudo, neste exemplo não iria funcionar bem, porque a API
        // não está a devolver UMA fotografia com a mesma estrutura de dados
        // com que devolve a LISTA, fazendo com que a atualização do STATE seja 
        // efetuada de forma incorreta

        let fotoCriada = await adicionaFoto(dadosDaFotoACarregar);

        // atualizar o STATE
        this.setState({
          fotos: [...this.state.fotos, fotoCriada]
        });
      */
    } catch (erro) {
      console.error("não consegui inserir os dados da fotografia", erro);
    }
  }

  handlerApagaFoto = async (IdFotoAApagar) => {
    // Tarefas
    // 1. gerar os dados a exportar
    // 2. enviá-los para a API
    // 3. efetuar o Reload da tabela

    // 1. - já está feito. É o parâmetro de entrada nesta função

    try {
      // 2. 
      await deleteFoto(IdFotoAApagar);

      // 3.
      await this.LoadFotos();

      /* 
        // em alternativa ao ponto 2. e 3. poderia ser executado este código
        // contudo, neste exemplo não iria funcionar bem, porque a API
        // não está a devolver UMA fotografia com a mesma estrutura de dados
        // com que devolve a LISTA, fazendo com que a atualização do STATE seja 
        // efetuada de forma incorreta

        let fotoCriada = await adicionaFoto(dadosDaFotoACarregar);

        // atualizar o STATE
        this.setState({
          fotos: [...this.state.fotos, fotoCriada]
        });
      */
    } catch (erro) {
      console.error("não consegui inserir os dados da fotografia", erro);
    }
  }

  render() {
    // recuperar os dados do 'state' para usar dentro deste método
    const { fotos, quartos } = this.state;

    // determinar o comportamento do 'componente',
    // em função do seu estado
    switch (this.state.loadState) {
      case "carregando dados":
        return <p>A carregar dados. Aguarde, por favor...</p>
      case "erro":
        return <p>Ocorreu um erro:
                {this.state.errorMessage + '.' ?? "Não sabemos qual..."}</p>
      case "sucesso":
        return (
          <div className="container">
            {/* adição do Formulário que há-de recolher os dados da nova fotografia
                   - dadosCaes: parâmetro de Entrada no componente
                   - dadosRecolhidos: parâmetro de Saída (exportação) do componente
            */}
            <h4>Inserir uma nova foto:</h4>
            <Formulario dadosQuartos={quartos}
              dadosRecolhidos={this.handlerGuardaFoto}
            />
            <hr />

            {/* este componente - Tabela - irá apresentar os dados das 'fotos' no ecrã
            as 'fotos' devem ser lidas na API */}
            <Tabela dadosFotos={fotos}
              deleteFoto={this.handlerApagaFoto}
            />
          </div>)
      default:
        return null;
    }

  }
}

export default App;
