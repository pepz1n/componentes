"use client";
import React from 'react'; 
import Link from 'next/link';
import { FiAlignJustify, FiChevronRight, FiCornerDownRight } from 'react-icons/fi';
import { MdTableChart, MdMeetingRoom, MdApps } from 'react-icons/md';
import { BsArrowReturnRight } from "react-icons/bs";



function Sidebar({ groups = [], itemsNoTree = [], open, setOpen }) {
  const [openGroups, setOpenGroups] = React.useState(() => groups.map(() => false));

  React.useEffect(() => {
    setOpenGroups(groups.map(() => false));
  }, [groups]);

  const toggleGroup = (idx) => {
    setOpenGroups(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <aside className={`fixed top-2 left-0 bottom-0 transition-all duration-200 ${open ? 'w-72 border-r border-(--color-borda-input)' : 'w-0 border-transparent'} z-40 overflow-hidden`} style={{ backgroundColor: '#C4D0E5' }}>
      <nav className="py-2">
        {groups.map((group, gi) => (
          <div key={gi}>
            {open && (
              <div>
                <button
                  type="button"
                  onClick={() => toggleGroup(gi)}
                  className="w-full h-15 flex items-center px-4 py-2 text-(--color-textos) font-semibold hover:bg-(--color-input-bg)"
                >
                  <FiChevronRight className={`text-gray-600 mr-3 transition-transform duration-150 ${openGroups[gi] ? 'rotate-90' : 'rotate-0'}`} />
                  <span className="truncate font-semibold">{group.nomeGrupoChave}</span>
                </button>
              </div>
            )}

            {open && openGroups[gi] && (group.programas || []).map((prog, pi) => {
              const iconName = (prog.icone || '').toLowerCase();
              let IconComp = FiCornerDownRight;
              if (iconName.includes('table') || iconName.includes('table_chart')) IconComp = MdTableChart;
              else if (iconName.includes('meeting') || iconName.includes('meeting_room')) IconComp = MdMeetingRoom;
              else if (iconName.includes('apps')) IconComp = MdApps;

              return (
                <Link key={pi} href={prog.caminho || '#'} className="flex items-center gap-4 pl-10 pr-4 py-2 text-(--color-textos) hover:bg-(--color-input-bg)">
                  <IconComp className="text-gray-600" size={18} />
                  <span className="truncate">{prog.aliasPrograma}</span>
                </Link>
              )
            })}
          </div>
        ))}

        {itemsNoTree.length > 0 && open && (
          <div className="px-3 py-1 mt-4 font-semibold text-(--color-textos)">Atalhos</div>
        )}
        {itemsNoTree.map((item, i) => (
          <Link key={i} href={item.caminho || '#'} className="flex items-center gap-4 px-4 py-2 text-(--color-textos) hover:bg-(--color-input-bg)">
            <span className='text-(--color-azul-unochapeco)'>
              <BsArrowReturnRight />
            </span>
            {open && <span className="truncate">{item.aliasPrograma}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

function Header({ setOpen, open }) {
  const [showMenu, setShowMenu] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    function onDocClick(e) {
      if (showMenu && ref.current && !ref.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [showMenu]);


  return (
    <header className="fixed top-0 right-0 h-16 border-b border-(--color-borda-input) z-30 flex items-center px-3 transition-all duration-200 bg-interface" style={{ left: open ? '18rem' : '0' }}>
          <button onClick={() => setOpen(prev => !prev)} className="p-2 rounded">
            <FiAlignJustify color="#ffffff" size={20} />
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none hidden sm:block">
            <img
              src="/dasdasd.png"
              alt="Unochapecó"
              style={{ height: '3rem', display: 'block' }}
            />
          </div>
    </header>
  )
}

export default function ClientLayout({ children }) {
  const [open, setOpen] = React.useState(false);

  const [groups, setGroups] = React.useState([]);
  const [itemsNoTree, setItemsNoTree] = React.useState([
    {
      caminho: '/tarefas',
      aliasPrograma: 'Tarefas'
    }
  ]);

  return (
    <div className="overflow-x-hidden w-full min-h-screen flex flex-col">
      {open && (
        <div className="fixed top-0 left-0 h-16 z-20" style={{ width: '18rem', backgroundColor: '#C4D0E5' }} />
      )}
      <Header setOpen={setOpen}  open={open}  />
      <Sidebar groups={groups} itemsNoTree={itemsNoTree} open={open} setOpen={setOpen} />
      <main className={`pt-16 grow transition-all duration-200 ${open ? 'pl-72' : 'pl-0'}`}>
          {children}
      </main>

      <footer
          className={`bg-interface flex justify-center items-center text-white transition-all duration-200 ${open ? 'ml-72' : 'ml-0'}`}
        >
          <div className="py-3 text-sm">
            &copy; 2010 - {new Date().getFullYear()} 
          </div>
        </footer>
    </div>
  );
}