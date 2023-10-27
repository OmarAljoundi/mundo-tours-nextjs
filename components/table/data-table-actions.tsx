'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { ModalProps, useModal } from '@/hooks/use-modal'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { FunctionKeys } from '@/lib/utils'
import { Button, Tooltip } from '@nextui-org/react'
import { Edit, LucideIcon, Trash } from 'lucide-react'

interface DateTableActionProps<TData> {
  row: Row<TData>
  actions: {
    label: string
    action?: FunctionKeys<ModalProps> | (() => Promise<{ success: boolean; message: string }>)
    link?: string
    type?: 'Link' | 'Promise' | 'Trigger'
    icon: LucideIcon
  }[]
}

export function DataTableAction<TData>({ row, actions }: DateTableActionProps<TData>) {
  const route = useRouter()
  const modal = useModal()
  return (
    <DropdownMenu>
      <div className="flex flex-auto gap-x-2 ">
        {actions?.map((i) => {
          switch (i.type) {
            case 'Link':
              return (
                <Tooltip content={i.label}>
                  <Button size="sm" variant="ghost" as={Link} isIconOnly href={i.link!} key={i.label}>
                    <i.icon className="w-4 h-4" />
                  </Button>
                </Tooltip>
              )
            case 'Promise':
              return (
                <Tooltip content={i.label}>
                  <Button
                    size="sm"
                    variant="ghost"
                    key={i.label}
                    isIconOnly
                    onPress={async () => {
                      //@ts-ignore
                      toast.promise(i.action()!, {
                        error(error) {
                          return error
                        },
                        loading: 'in progress..',
                        success(data) {
                          route.refresh()
                          return (data as any).message!
                        },
                      })
                    }}
                  >
                    <i.icon className="w-4 h-4" />
                  </Button>
                </Tooltip>
              )
            case 'Trigger':
              return (
                <Button
                  key={i.label}
                  size="sm"
                  variant="ghost"
                  isIconOnly
                  //@ts-ignore
                  onClick={() => modal[i.action as string](row.original)}
                >
                  <i.icon className="w-4 h-4" />
                </Button>
              )
          }
        })}
      </div>
    </DropdownMenu>
  )
}
