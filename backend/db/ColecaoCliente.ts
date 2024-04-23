import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase";
export default class ColecaoCliente implements ClienteRepositorio {
  #conversor = {
    toFirestore(cliente: Cliente): DocumentData {
      return {
        nome: cliente.nome,
        idade: cliente.idade,
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Cliente {
      const dados = snapshot.data(options);
      return new Cliente(dados.nome, dados.idade, snapshot.id);
    },
  };

  async salvar(cliente: Cliente): Promise<Cliente> {
    if (cliente?.id) await setDoc(this.#doc(cliente?.id), cliente);
    else await addDoc(this.#collection(), cliente);
    return cliente;
  }

  async excluir(cliente: Cliente): Promise<void> {
    await deleteDoc(this.#doc(cliente.id));
  }

  async obterTodos(): Promise<Cliente[]> {
    const query = await getDocs(this.#collection());
    return query.docs.map((doc) => doc.data()) ?? [];
  }

  #doc(id: string) {
    return doc(this.#collection(), id);
  }

  #collection() {
    return collection(firestore, "clientes").withConverter(this.#conversor);
  }
}
