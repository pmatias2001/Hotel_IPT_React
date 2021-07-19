// Formulario.js
// este ficheiro irá conter o código para
// representar o formulário no ecrã
// ***************************************************

import React from 'react'

/**
 * mostrar os dados dos cães
 * e escolher um deles
 */
const EscolheQuarto = (props) => {
    // itera todos os quartos, da lista de quartos, e produz as 'options' necessárias à <select></select>
    const opcoes = props.listaQuartos.map((opcao) => {
        return (<option key={opcao.idQuarto} value={opcao.idQuarto}>{opcao.nomeQuarto}</option>)
    })

    // criação do objeto <SELECT></SELECT>
    // este mesmo objeto, também tem de ser capaz de exportar os dados escolhidos pelo utilizador
    // o parâmetro 'idQuartoEscolhido' irá receber o ID do quarto que foi escolhido
    return (
        <select required className="form-select" onChange={props.idQuartoEscolhido}>
            <option value="">Escolha um quarto</option>
            {opcoes}
        </select>
    )
}



/**
 * Formulário para adicionar (fazer upload) uma Fotografia
 */
class Formulario extends React.Component {

    constructor(props) {
        super(props);

        // variáveis para guardar os dados introduzidos pelo utilizador, no Formulário
        this.state = {
            nomeDaFoto: null,
            dataDaFoto: "",
            idDoQuarto: ""
        }
    }

    /**
     * handler para manipular os dados escritos pelo
     * utilizador na textbox do nome do ficheiro
     * @param {*} evento - contém o dado (nome da Foto) escrito pelo utilizador
     */
    handlerFotoChange = (evento) => {
        this.setState({ nomeDaFoto: evento.target.files[0] });
    }


    /**
     * handler para manipular os dados escritos pelo
     * utilizador na textbox do nome do ficheiro
     * @param {*} evento - contém o dado (data da Foto) escrito pelo utilizador
     */
    handlerDataChange = (evento) => {
        // eventuais validações dos dados podem ser aqui escritas...


        // atribuição ao STATE os dados lidos
        this.setState({ dataDaFoto: evento.target.value });
    }
    

    /**
    * handler para manipular os dados escolhidos pelo
    * utilizador na dropdown do nome do ficheiro
    * @param {*} evento - contém o id do quarto escolhido pelo utilizador
    */
    handlerQuartoChange = (evento) => {
        this.setState({ idDoQuarto: evento.target.value });
    }

    /**
     * função que irá exportar os dados para fora do Formulário
     */
    handlerSubmitForm = (evento) => {
        // impede que o Browser efetue o submit do formulário
        // essa tarefa será efetuada pelo React
        evento.preventDefault();

        // preparar os dados a serem enviados para a API
        let dadosForm = {
            nomeFoto: this.state.nomeDaFoto,
            dataFoto: this.state.dataDaFoto,
            nomeQuarto: this.state.idDoQuarto
        };

        // exportar os dados recolhidos para fora do componente 'Formulario'
        // para serem lidos pelo objeto que o invocou 
        // cria-se um parâmetro que os irá exportar
        this.props.dadosRecolhidos(dadosForm);
    }


    render() {
        // estamos a ler os dados que são recebidos pelo componente
        const { dadosQuartos } = this.props

        return (
            // o 'return' só consegue devolver UM objeto
            <form onSubmit={this.handlerSubmitForm} encType="multipart/form-data">
                <div className="row">
                    <div className="col-md-4">
                        Fotografia: <input type="file"
                            required
                            accept=".jpg,.png"
                            className="form-control"
                            onChange={this.handlerFotoChange} /><br />
                    </div>
                    <div className="col-md-4">
                    Data da Foto: <input type="date"
                            required
                            max={new Date().toISOString().split("T")[0]}
                            value={this.state.dataDaFoto}
                            className="form-control"
                            onChange={this.handlerDataChange} /><br />
                        {/* o componente 'EscolheQuarto' irá ter dois parâmetros:
                        - listaQuartos: serve para introduzir no componente a lista dos quartos a representar na dropdown
                        - idQuartoEscolhido: serve para retirar do componente o ID do quarto que o utilizador escolheu,
                                          que será entregue ao 'handlerQuartoChange' */}
                Quarto: <EscolheQuarto listaQuartos={dadosQuartos}
                            idQuartoEscolhido={this.handlerQuartoChange}
                        /><br />
                    </div>
                </div>
                <input type="submit" value="Adicionar foto" className="btn btn-outline-primary" />
            </form>
        )
    }
}
export default Formulario;