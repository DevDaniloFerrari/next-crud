"use client";
import Cliente from "@/core/Cliente";
import { IconeEdicao, IconeExcluir } from "./Icones";

interface TabelaProps {
  clientes: Cliente[];
  clienteSelecionado?: (cliente: Cliente) => void;
  clienteExcluido?: (cliente: Cliente) => void;
}

export default function Tabela(props: TabelaProps) {
  const exibirAcoes = props.clienteSelecionado || props.clienteExcluido;
  function renderizarCabecalho() {
    return (
      <tr>
        <th className="text-left p-4">Código</th>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Idade</th>
        {exibirAcoes && <th className="p-4">Ações</th>}
      </tr>
    );
  }

  function renderizarDados() {
    return props.clientes?.map((cliente, i) => {
      return (
        <tr
          key={cliente.id}
          className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}
        >
          <td className="text-left p-4">{cliente.id}</td>
          <td className="text-left p-4">{cliente.nome}</td>
          <td className="text-left p-4">{cliente.idade}</td>
          {exibirAcoes && renderizarAcoes(cliente)}
        </tr>
      );
    });
  }

  function renderizarAcoes(cliente: Cliente) {
    return (
      <td className="text-center">
        {props.clienteSelecionado && (
          <button
            onClick={() => props.clienteSelecionado?.(cliente)}
            className={`
            text-green-600 rounded-full p-2 
            hover:bg-purple-50`}
          >
            {IconeEdicao}
          </button>
        )}
        {props.clienteExcluido && (
          <button
            onClick={() => props.clienteExcluido?.(cliente)}
            className={`
            text-red-500 rounded-full p-2 
            hover:bg-purple-50`}
          >
            {IconeExcluir}
          </button>
        )}
      </td>
    );
  }

  return (
    <table className="w-full rounded-lg overflow-hidden">
      <thead
        className={`
        text-gray-100
        bg-gradient-to-r from bg-purple-500 to-purple-800
      `}
      >
        {renderizarCabecalho()}
      </thead>
      <tbody>{renderizarDados()}</tbody>
    </table>
  );
}
