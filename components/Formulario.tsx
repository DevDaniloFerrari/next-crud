import Cliente from "@/core/Cliente";
import Entrada from "./Entrada";
import { useState } from "react";
import Botao from "./Botao";

interface FormularioProps {
  cliente: Cliente;
  clienteMudou?: (cliente: Cliente) => void;
  cancelado?: () => void;
}

export default function Formulario(props: FormularioProps) {
  const id = props.cliente?.id;
  const [nome, setNome] = useState<string>(props.cliente?.nome ?? "");
  const [idade, setIdade] = useState<number>(props.cliente?.idade ?? 0);

  return (
    <div>
      {id && <Entrada texto="Código" valor={id} />}
      <Entrada
        texto="Nome"
        valor={nome}
        valorMudou={setNome}
        className="mb-5"
      />
      <Entrada
        texto="Idade"
        tipo="number"
        valor={idade}
        valorMudou={setIdade}
        className="mb-5"
      />
      <div className="mt-7 flex justify-end gap-2">
        <Botao
          cor="blue"
          onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id))}
        >
          {id ? "Alterar" : "Salvar"}
        </Botao>
        <Botao onClick={props.cancelado}>Cancelar</Botao>
      </div>
    </div>
  );
}
