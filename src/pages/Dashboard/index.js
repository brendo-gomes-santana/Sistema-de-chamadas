import React, { useEffect, useState } from "react";
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import Header from "../../components/Header/Header";
import "./style.css";
import {
  collection,
  getDocs,
  orderBy,
  limit,
  startAfter,
  query,
} from "firebase/firestore";
import { db } from "../../services/fireabaseConnection";
import { format } from "date-fns";
import { async } from "@firebase/util";

const listRef = collection(db, "chamados");

export default function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsempy] = useState(false);

  const [lastDocs, setLastDocs] = useState();
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    (async () => {
      const q = query(listRef, orderBy("created", "desc"), limit(5));

      const querySnapshot = await getDocs(q);
      setChamados([]);

      await updateState(querySnapshot);
      setLoading(false);
    })();

    return () => {};
  }, []);
  async function updateState(querySnapshot) {
    const isCollectionEmpty = querySnapshot.size === 0;
    if (!isCollectionEmpty) {
      let lista = [];
      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().Assunto,
          cliente: doc.data().cliente,
          userId: doc.data().userId,
          created: doc.data().created,
          status: doc.data().status,
          createdFormat: format(doc.data().created.toDate(), "dd/mm/yyyy"),
          complemento: doc.data().complemento,
        });
      });
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]; // pegando o ultimo item

      setChamados((chamados) => [...chamados, ...lista]);
      setLastDocs(lastDoc);
    } else {
      setIsempy(true);
    }
    setLoadingMore(false);
  }

  async function handleMore() {
      setLoadingMore(true)

      const q = query(listRef, orderBy("created", 'desc'), startAfter(lastDocs), limit(5))
      const querySnapshot = await getDocs(q)
      await updateState(querySnapshot)

      
    }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="content">
          <Title name="Tickets">
            <FiMessageSquare size={25} />
          </Title>
          <div className="container dashboard">
            <span>Buscando chamados</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Header />
      <div className="content">
        <Title name="Tickets">
          <FiMessageSquare />
        </Title>
        {chamados.length === 0 ? (
          <div className="container dashboard">
            <p>Nenhum chamado encontrado</p>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#fff" />
              Novo chamado
            </Link>
          </div>
        ) : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#fff" />
              Novo chamado
            </Link>
            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              {chamados.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td data-label="Cliente">{item.cliente}</td>
                      <td data-label="Assunto">{item.assunto}</td>
                      <td data-label="Status">
                        <span
                          className="badge"
                          style={{
                            backgroundColor: item.status === 'Aberto' ? '#5cb85c' : "#999",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td data-label="Cadastrado">{item.createdFormat}</td>
                      <td data-label="#">
                        <button
                          className="action"
                          style={{
                            backgroundColor: "#3583f6",
                          }}
                        >
                          <FiSearch color="#fff" size={17} />
                        </button>
                        <button
                          className="action"
                          style={{
                            backgroundColor: "#f6a935",
                          }}
                        >
                          <FiEdit2 color="#fff" size={17} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
            {loadingMore && <h3>Buscando mais chamados...</h3>}
            {!loadingMore && !isEmpty && <button onClick={handleMore} className='btn-more'>Buscar mais</button>} 
            
          </>
        )}
      </div>
    </>
  );
}
