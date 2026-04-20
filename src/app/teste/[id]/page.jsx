'use client'
import { useParams, useSearchParams } from "next/navigation";
import Link from 'next/link'
import { FaNodeJs } from "react-icons/fa";

export default function TestePage() {
  const parametros = useParams();
  const parametrosQuery = useSearchParams();

  return (
    <div className="flex justify-center">
      <h1>
        http://localhost:3001/teste/bernardo?nome=oahjda
        <br />
        <Link href={'/'}>va para home</Link>
        {parametros.id} - {parametrosQuery.get('legal')}
      </h1>
      <FaNodeJs/>
    </div>
  )
}