'use client'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, Avatar, Divider } from '@nextui-org/react'
export function UserNav() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly>
          <Avatar className="w-8 h-8" radius="full" src="" name="AD" />
        </Button>
      </DropdownTrigger>
      <DropdownSection className="w-56">
        <Divider className="my-4" />
        <DropdownMenu>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Billing</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>New Team</DropdownItem>
          <DropdownItem>Log out</DropdownItem>
        </DropdownMenu>
      </DropdownSection>
    </Dropdown>
  )
}
