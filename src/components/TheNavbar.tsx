'use client'

import React from 'react'
import { HStack, Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

const TheNavbar = () => {
  const router = useRouter()
  return (
    <header className="max-w-screen-sm mx-auto">
      <HStack p={8} justify="center">
        <Button onClick={() => router.push('/full-calendar')} colorScheme="blue">
          Full Calendar
        </Button>
        <Button onClick={() => router.push('/toast-calendar')} colorScheme="blue">
          Toast Calendar
        </Button>
        <Button onClick={() => router.push('/full-calendar')} colorScheme="blue">
          Other Calendar
        </Button>
      </HStack>
    </header>
  )
}

export default TheNavbar
