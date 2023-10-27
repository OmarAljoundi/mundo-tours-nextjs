'use client'
import { MenuButtonProps, MenuItems } from '@/lib/constants'
import { Dot, Plus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { FunctionComponent, useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Tooltip } from '@nextui-org/react'
import { useModal } from '@/hooks/use-modal'

interface SubSidebarNavProps {}

const SubSidebarNav: FunctionComponent<SubSidebarNavProps> = () => {
  const pathname = usePathname()
  const [subItems, setSubItems] = useState<MenuButtonProps[]>([])
  const [title, setTitle] = useState<string | undefined>()
  const modal = useModal()
  useEffect(() => {
    const activeMenu = MenuItems.find((x) => pathname.includes(x.href))

    if (!activeMenu?.subMenu?.find((x) => x.href === pathname)) {
      setSubItems([])
    } else if (activeMenu && activeMenu.subMenu) {
      setSubItems(activeMenu.subMenu ?? [])
      setTitle(activeMenu.label)
    }
    return () => {
      setSubItems([])
      setTitle(undefined)
    }
  }, [pathname])

  if (subItems.length == 0) return null

  return (
    <div className="hide-scrollbar flex w-64 flex-col border-r bg-scale-200 dark:border-dark ">
      <div className="dark:border-dark flex max-h-12 items-center border-b px-6" style={{ minHeight: '3rem' }}>
        <h4 className="text-lg">{title}</h4>
      </div>
      <div className="flex-grow overflow-y-auto" style={{ maxHeight: 'calc(100vh - 96px)' }}>
        <div className="flex flex-col space-y-8 overflow-y-auto">
          <nav role="menu" aria-label="Sidebar" aria-orientation="vertical" aria-labelledby="options-menu">
            <ul>
              <div>
                <div className="my-6 space-y-8">
                  <div className="mx-3">
                    <div className="space-y-3">
                      {subItems?.map((item) => (
                        <Link href={item.href} key={item.label} className=" block">
                          <li role="menuitem" className="outline-none">
                            <a
                              className={cn(
                                `cursor-pointer flex space-x-3 items-center outline-none focus-visible:ring-1
                              focus-visible:z-10 group px-3 py-1   
                             font-semibold  z-10 rounded-md `,
                                pathname === item.href
                                  ? 'bg-slate-300 ring-scale-1200 dark:bg-scale-300 text-scale-900'
                                  : 'hover:bg-slate-100 dark:hover:bg-scale-300',
                              )}
                              aria-current="page"
                            >
                              <span className="transition truncate text-sm w-full text-scale-1200 font-semibold">
                                <div className="flex w-full items-center justify-between gap-1">
                                  <div title="Tables" className="flex items-center justify-between gap-2 truncate w-full ">
                                    <span className="truncate">{item.label}</span>
                                    {item.button && (
                                      <Tooltip key={item.label} placement={'right'} content={item.button.label}>
                                        {item.button.type == 'trigger' ? (
                                          <Plus
                                            onClick={() =>
                                              //@ts-ignore
                                              modal[item.button?.action]()
                                            }
                                          />
                                        ) : (
                                          <Link href={item.button.href!}>
                                            <Plus />
                                          </Link>
                                        )}
                                      </Tooltip>
                                    )}
                                  </div>
                                </div>
                              </span>
                            </a>
                          </li>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default SubSidebarNav
