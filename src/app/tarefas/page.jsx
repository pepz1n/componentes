'use client'
import { useState } from 'react'
import TableComponent from '@/components/TableComponent';


export default function TarefasPage() {
  const statusLabel = {
    pendente: 'Pendente',
    em_andamento: 'Em andamento',
    concluida: 'Concluída',
  }

  const formularioVazio = { titulo: '', descricao: '', status: 'pendente' }
  
  const [tarefas, setTarefas] = useState([
    { id: 1, titulo: 'Configurar ambiente', descricao: 'Instalar dependências do projeto', status: 'concluida' },
    { id: 2, titulo: 'Criar tela de login', descricao: 'Formulário com validação', status: 'em_andamento' },
    { id: 3, titulo: 'Escrever testes', descricao: 'Cobertura mínima de 80%', status: 'pendente' },
  ])
  const [dialogAberto, setDialogAberto] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState(formularioVazio)
  
  function abrirNova() {
    setEditando(null)
    setForm(formularioVazio)
    setDialogAberto(true)
  }

  function abrirEdicao(tarefa) {
    setEditando(tarefa.id)
    setForm({ titulo: tarefa.titulo, descricao: tarefa.descricao, status: tarefa.status })
    setDialogAberto(true)
  }

  function fecharDialog() {
    setDialogAberto(false)
  }

  function salvar() {
    if (!form.titulo.trim()) return
    if (editando !== null) {
      setTarefas((prev) =>
        prev.map((t) => (t.id === editando ? { ...t, ...form } : t))
      )
    } else {
      const novoId = Date.now()
      setTarefas((prev) => [...prev, { id: novoId, ...form }])
    }
    fecharDialog()
  }

  function excluir(id) {
    setTarefas((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto">

      <TableComponent
        dados={tarefas}
        funcaoCriar={abrirNova}
        funcaoEditar={abrirEdicao}
        funcaoExcluir={excluir}
        titulo={"Tarefas"}
      />  

      {dialogAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold text-zinc-800 mb-4">
              {editando !== null ? 'Editar Tarefa' : 'Nova Tarefa'}
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-titulo-input mb-1">Título *</label>
                <input
                  type="text"
                  value={form.titulo}
                  onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm bg-input-bg text-escrita-input focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome da tarefa"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-titulo-input mb-1">Descrição</label>
                <textarea
                  value={form.descricao}
                  onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
                  rows={3}
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm bg-input-bg text-escrita-input focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Detalhe a tarefa..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-titulo-input mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm bg-input-bg text-escrita-input focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(statusLabel).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={fecharDialog}
                className="px-4 py-2 text-sm rounded-md border bg-botao-cancelar text-white hover:bg-orange-700 font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={salvar}
                disabled={!form.titulo.trim()}
                className="px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
