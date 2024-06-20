'use client'

import React, { useEffect, useRef, useState } from 'react'
import Calendar from '@toast-ui/react-calendar'
import {
  Box,
  Heading,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
  Button,
  Divider,
  Grid,
  GridItem,
  Text
} from '@chakra-ui/react'

const ToastCalendar = () => {
  const calendarRef = useRef(null)
  const [calendarInstance, setCalendarInstance] = useState(null)
  const [calendarView, setCalendarView] = useState('month')
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'My Event 1',
      start: new Date(),
      end: new Date(),
      location: 'Meeting Room A',
      category: 'time',
      isAllday: false
    },
    {
      id: '2',
      title: 'My Event 2',
      start: new Date().setDate(new Date().getDate() + 1),
      end: new Date().setDate(new Date().getDate() + 1),
      location: 'Meeting Room A',
      category: 'time',
      isAllday: false
    }
  ])

  useEffect(() => {
    setCalendarInstance(calendarRef?.current?.getInstance())

    console.log(calendarInstance)
  }, [])

  useEffect(() => {
    console.log(calendarInstance)
  }, [calendarInstance])

  function handleToday() {
    calendarInstance?.today()
  }

  function handleNext() {
    calendarInstance?.next()
  }

  function handlePrev() {
    calendarInstance?.prev()
  }

  function handleCreateEvent(event: any) {
    const newEvent = {
      id: Date.now().toString() as string,
      title: event.title as string,
      start: new Date(event.start).toISOString(),
      end: new Date(event.end).toISOString(),
      location: event.location as string,
      category: event.category as string,
      isAllday: event.isAllday as boolean
    }
    setEvents([...events, newEvent])
  }

  function handleUpdateEvent({ event, changes }: any) {
    const newEvent = {
      id: event.id as string,
      title: (changes.title || event.title) as string,
      start: changes.start ? new Date(changes.start) : event.start,
      end: changes.end ? new Date(changes.end) : event.end,
      location: (changes.location || event.location) as string,
      category: (changes.category || event.category) as string,
      isAllday: (changes.isAllday || event.isAllday) as boolean
    }

    const otherEvents = events.filter((e) => e.id !== event.id)
    setEvents([...otherEvents, newEvent])
  }

  function handleDeleteEvent(event: any) {
    setEvents([...events.filter((e) => e.id !== event.id)])
  }

  return (
    <section>
      <Box mb="8" p="4" rounded="xl" border="gray.500" borderWidth={1} bg="white">
        <Heading size="md" mb={4}>
          Config
        </Heading>
        <VStack w="100%" spacing={4} align="start">
          <HStack w="100%" spacing={4} align="start">
            <FormControl>
              <FormLabel>Calendar View</FormLabel>
              <Select value={calendarView} onChange={(e) => setCalendarView(e.target.value)}>
                <option value="month">Month</option>
                <option value="week">Week</option>
              </Select>
            </FormControl>
          </HStack>
        </VStack>
      </Box>

      <Box borderWidth={1} borderColor="gray.200" p={4} rounded="xl">
        <HStack mb={4} justify="space-between">
          <Button onClick={handleToday}>Today</Button>
          <Heading size="md" className="navbar--range"></Heading>
          <HStack spacing={4}>
            <Button onClick={handlePrev}>Prev</Button>
            <Button onClick={handleNext}>Next</Button>
          </HStack>
        </HStack>
        <Calendar
          ref={calendarRef}
          height="900px"
          view={calendarView}
          events={events}
          usageStatistics={false}
          useFormPopup={true}
          useDetailPopup={true}
          useCreationPopup={true}
          onBeforeCreateEvent={handleCreateEvent}
          onBeforeUpdateEvent={handleUpdateEvent}
          onBeforeDeleteEvent={handleDeleteEvent}
        />
      </Box>

      <Box mt="8" p="4" rounded="xl" border="gray.500" borderWidth={1} bg="white">
        <Heading size="md" mb={4}>
          Summary
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <Text>Pros</Text>
            <VStack align="start">
              <Text>+ 100% Free</Text>
              <Text>+ The UI is quite good out of the box</Text>
              <Text>+ Support for React</Text>
              <Text>+ Support for Month, Week, and Time Grid view</Text>
            </VStack>
          </GridItem>
          <GridItem>
            <Text>Cons</Text>
            <VStack align="start">
              <Text>
                - The Docs are super bad! it lacks examples and hard to find the right information
              </Text>
              <Text>- Typescript didn't work for this library for some reason</Text>
              <Text>- We need to make our own toolbar just for next and prev calendar</Text>
              <Text>- Overriding the default CSS require a lot of effort</Text>
              <Text>
                - The default Pop Up for editing and showing events is bad! The text is hard to read
              </Text>
              <Text>
                - Didn't find a way to show disabled dates! No mention about it in the docs
              </Text>
              <Text>
                - Just showing current month and week is a lot of effort! I can't find a way to make
                the calendar date reactive
              </Text>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </section>
  )
}

export default ToastCalendar
