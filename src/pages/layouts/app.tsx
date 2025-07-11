import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { useProfile } from "@/http/use-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "@/lib/auth";

export function AppLayout() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const { data, isLoading } = useProfile()

  const user = data?.user

  function handleSignOut() {
    signOut()
    navigate('/', {
      replace: true,
    })

  }

  return (
    <div className="min-h-screen space-y-4">

      <div className="w-full border-b border-zinc-600">
        <header
          className="max-w-4xl mx-auto flex items-center justify-between px-2 py-4"
        >
          <h1 className="font-bold text-lg">LetMeAsk</h1>

          <DropdownMenu
            onOpenChange={(open) => {
              setOpen(open)
            }}
          >
            <DropdownMenuTrigger asChild>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="w-36 h-5" />
                  <Skeleton className="w-36 h-3" />
                </div>
              ) : (
                <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex flex-col items-end">
                  <span className="font-bold text-lg">{user?.name}</span>
                  <p className="text-xs text-zinc-500">{user?.email}</p>
                </div>
                {open ? <ChevronUp className="size-6" /> : <ChevronDown className="size-6" />}
              </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
              onClick={handleSignOut}
              >
                Sair
                <LogOut className="size-4" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      </div>

      <Outlet />
    </div>
  )
}