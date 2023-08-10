import React, { useState, useEffect, useContext } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import Title from "../../components/Title";

import { AuthContext } from "../../contexts/auth";
import { db } from "../../services/fireabaseConnection";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import "./style.css";
import { toast } from "react-toastify";

const listRef = collection(db, "customer");

export default function New() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loadCustomers, setLoadCustomers] = useState(true);

  const [custome, setCustome] = useState("");

  const [complemento, setComplemento] = useState("");
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");

  const [idCustomer, setIdCustomer] = useState(false);

  function handleOptionChange(e) {
    setStatus(e.target.value);
    console.log(e.target.value);
  }

  async function loadId(lista) {
    const docRef = doc(db, "chamados", id);
    await getDoc(docRef)
      .then((snapshot) => {
        setCustome(snapshot.data().cliente);
        setAssunto(snapshot.data().Assunto);
        setStatus(snapshot.data().status);
        setComplemento(snapshot.data().complemento);

        setIdCustomer(true);
      })
      .catch((err) => {
        console.log(err);
        setIdCustomer(false);
      });
  }

  useEffect(() => {
    (async () => {
      await getDocs(listRef)
        .then((snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            });
          });
          if (snapshot.docs.size === 0) {
            console.log("NENHUMA EMPRESA ECONTARDA");
            setCustomers([{ id: 1, nomeFantasia: "Freela" }]);
            setLoadCustomers(false);
            return;
          }

          setCustomers(lista);
          setLoadCustomers(false);

          if (id) {
            loadId(lista);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoadCustomers(false);
          setCustomers([{ id: 1, nomeFantasia: "Freela" }]);
        });
    })();
  }, [id]);

  async function handleRegister(e) {
    e.preventDefault();

    if (idCustomer) {
      //atualiando chamado
      const docRef = doc(db, "chamados", id);
      await updateDoc(docRef, {
        cliente: custome,
        Assunto: assunto,
        complemento: complemento,
        status: status,
        userId: user.nome,
      }).then(() => {
        toast.info("Chamado atualizando com sucesso");
        navigate('/dashboard')
      }).catch((err) => {
        toast.error('Ops erro ao atualizar esse chamado!')
        console.log(err)
      })
      return;
    }
    //registar um chamado
    await addDoc(collection(db, "chamados"), {
      created: new Date(),
      cliente: custome,
      Assunto: assunto,
      complemento: complemento,
      status: status,
      userId: user.nome,
    })
      .then(() => {
        alert("Cadastrado");
        setComplemento("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header />
      <main className="content">
        <Title name={id ? 'Editando chamado' : 'Novo Chamado'}>
          <FiPlusCircle size={25} />
        </Title>
        <section className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Cliente</label>
            {loadCustomers ? (
              <input type="text" value="Carregando...." disabled={true} />
            ) : (
              <select
                value={custome}
                onChange={(v) => setCustome(v.target.value)}
              >
                <option> Selecione o cliente </option>
                {customers.map((cliente) => {
                  return (
                    <option key={cliente.id} value={cliente.nomeFantasia}>
                      {cliente.nomeFantasia}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assunto</label>
            <select
              value={assunto}
              onChange={(v) => setAssunto(v.target.value)}
            >
              <option value="Suporte">Suporte</option>
              <option value="Visita tecnica">Visita tecnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>

            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />{" "}
              <span>Em aberto</span>
              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />{" "}
              <span>Progresso</span>
              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
              />{" "}
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreava seu problema (opcional)."
              value={complemento}
              onChange={(v) => setComplemento(v.target.value)}
            />
            <button type="submit">Registrar</button>
          </form>
        </section>
      </main>
    </>
  );
}
