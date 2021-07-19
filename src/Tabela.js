// Tabela.js
// ****************************************************** 

import React from 'react'
import { Table, Button, Alert } from 'react-bootstrap';
import App from './App'
import Formulario from './Formulario';
import EditFoto from './EditFoto';

// função que devolve o Cabeçalho da tabela
function CabecalhoTabela() {
    return (
        <thead>
            <tr>
                <th>Nome do Quarto</th>
                <th>Foto</th>
                <th>Data</th>
            </tr>
        </thead>
    )
}

// definição da função que devolve o Corpo da tabela
// faz exatamente o mesmo da linha 7
const CorpoTabela = (props) => {
    // esta função 'interna' irá ler e processar todos
    // os objetos definidos dentro do array 'dadosDasFotos'
    const rows = props.dadosDasFotos.map((row) => {
        return (
            <tr key={row.idFoto}>
                <td>{row.nomeQuarto}</td>
                <td><img src={'fotos/' + row.nomeFoto}
                    alt={'foto do ' + row.nomeQuarto}
                    height="50" />
                </td>
                <td>{row.dataFoto}</td>
                <td>      
                    <Button variant="warning" >Edit</Button>         
                    <Button variant="danger" onClick={() => props.deleteFoto(row.idFoto)} >Delete</Button>
                </td>
            </tr>
        )
    })

    // valor devolvido pela função 'CorpoTabela'
    return (<tbody>{rows}</tbody>)
}

// componente que junta os dois sub-componentes, 
// formando um novo 'componente'
class Tabela extends React.Component {
    render() {

        // estamos a ler os dados que são recebidos pelo componente
        // <=> this.props.dadosAlunos
        const { dadosFotos, deleteFoto } = this.props

        return (
            <table className="table table-striped">
                <CabecalhoTabela />
                {/* o parâmetro 'dadosFotos' irá receber
                    os dados que vêm da componente 'mãe' */}
                <CorpoTabela dadosDasFotos={dadosFotos} 
                deleteFoto={deleteFoto}
                />
            </table>
        )
    }
}


export default Tabela