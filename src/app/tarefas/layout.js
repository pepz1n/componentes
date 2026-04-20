'use client'
import LayoutTarefa from '@/layouts/layoutTarefa'

export default function TarefasLayout({ children }) {

  return (
    <LayoutTarefa>
      <main className="flex-1 p-6">{children}</main>
    </LayoutTarefa>
  )
}
