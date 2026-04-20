import { TiPlus } from "react-icons/ti";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { useState, useMemo } from 'react'

export default function TableComponent({
  dados,
  funcaoCriar,
  botaocriar = true,
  funcaoEditar,
  funcaoExcluir,
  titulo
}) {
  const statusLabel = {
    pendente: 'Pendente',
    em_andamento: 'Em andamento',
    concluida: 'Concluída',
  }
  
  const statusColor = {
    pendente: 'bg-yellow-100 text-yellow-800',
    em_andamento: 'bg-blue-100 text-blue-800',
    concluida: 'bg-green-100 text-green-800',
  }

  const [busca, setBusca] = useState('')
  const [pagina, setPagina] = useState(1)
  const itensPorPagina = 5

  const tarefasFiltradas = useMemo(() => {
      const termo = busca.toLowerCase()
      return dados.filter(
        (t) =>
          t.titulo.toLowerCase().includes(termo) ||
          t.descricao.toLowerCase().includes(termo)
      )
    }, [dados, busca])
  
    const totalPaginas = Math.max(1, Math.ceil(tarefasFiltradas.length / itensPorPagina))
    const dadosPagina = tarefasFiltradas.slice(
      (pagina - 1) * itensPorPagina,
      pagina * itensPorPagina
    )
  
    function buscar(e) {
      setBusca(e.target.value)
      setPagina(1)
    }
  

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">{titulo}</h1>
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
          <div className="relative flex-1">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={busca}
              onChange={buscar}
              placeholder="Pesquisar itens..."
              className="w-full border border-zinc-300 rounded-md pl-9 pr-3 py-2 text-sm bg-white text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {botaocriar && <button
            onClick={funcaoCriar}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors flex items-center gap-1"
          >
            <TiPlus />
          </button>}
        </div>
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-textos uppercase text-xs">
            <tr className='border-b border-gray-200'>
              <th className="px-4 py-3 text-left">Título</th>
              <th className="px-4 py-3 text-left">Descrição</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {dadosPagina.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-400">
                  {busca ? 'Nenhum dado encontrado.' : 'Nenhum dado cadastrado.'}
                </td>
              </tr>
            )}
            {dadosPagina.map((item) => (
              <tr key={item.id} className=" hover:bg-zinc-50 transition-colors border-b border-gray-200">
                <td className="px-4 py-3 text-zinc-800">{item.titulo}</td>
                <td className="px-4 py-3 text-zinc-500">{item.descricao}</td>
                <td className="px-4 py-3">
                  {item.status && <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[item.status]}`}>
                    {statusLabel[item.status]}
                  </span>}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => funcaoEditar(item)}
                    className="hover:text-blue-800 bg-blue-600 hover:bg-blue-200 text-white text-sm font-medium px-3 py-1 rounded-md transition-colors"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => funcaoExcluir(tarefa.id)}
                    className="hover:bg-red-200 bg-red-500 hover:text-red-700  text-white text-sm font-medium px-3 py-1 rounded-md transition-colors"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 text-sm text-zinc-500">
          <span>
            {tarefasFiltradas.length === 0
              ? 'Nenhum resultado'
              : `${(pagina - 1) * itensPorPagina + 1}–${Math.min(pagina * itensPorPagina, tarefasFiltradas.length)} de ${tarefasFiltradas.length}`}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="px-3 py-1 rounded-md border border-zinc-300 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ‹
            </button>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPagina(n)}
                className={`px-3 py-1 rounded-md border transition-colors ${
                  n === pagina
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-zinc-300 hover:bg-zinc-100'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              className="px-3 py-1 rounded-md border border-zinc-300 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}