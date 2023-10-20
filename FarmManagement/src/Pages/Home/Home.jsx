import React from 'react'
import { Button } from "@/components/ui/button"
import { MdAgriculture } from 'react-icons/md';
import { Mail } from "lucide-react"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
function Home() {
  return (
    <div>
      home
      <Button variant="secondary" size="sm">
        <Mail className='h-4' /> Livestock list
      </Button>
      <Button variant="ghost" size="sm">
        <Mail className='h-4' /> Livestock list
      </Button>
     
    </div>
  )
}

export default Home