'use client'

import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  Text,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  VStack,
  Grid,
  GridItem
} from '@chakra-ui/react'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { EventDropArg } from '@fullcalendar/core/index.js'

const Fullcalendar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [calendarView, setCalendarView] = useState('dayGrid')
  const headerToolbar =
    calendarView === 'dayGrid' ? 'dayGridMonth,dayGridWeek' : 'timeGridWeek,timeGridDay'

  const [theme, setTheme] = useState('standard')
  const [disabledDate, setDisabledDate] = useState('')
  const [events, setEvents] = useState([
    { title: 'My Event 1', date: '2024-06-19' },
    { title: 'My Event 2', date: '2024-06-20' }
  ])
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: ''
  })

  function addEvent() {
    setEvents([...events, { title: newEvent.title, date: newEvent.date }])
    setNewEvent({ title: '', date: '' })
    onClose()
  }

  function handleDrop(info: EventDropArg) {
    if (info.event.startStr === disabledDate) {
      info.revert()
      alert('You can not drop event on disabled date')
    } else {
      const newEvents = events.filter((event) => event.title !== info.event.title)
      setEvents([...newEvents, { title: info.event.title, date: info.event.startStr }])
    }
  }

  useEffect(() => {
    if (calendarView === 'dayGrid') {
      const dateElements = document.querySelectorAll('[data-date]')
      const dateToDisable = document.querySelector(`[data-date='${disabledDate}']`)
      dateElements.forEach((element) => {
        element.classList.remove('fc-day-disabled')
        if (element === dateToDisable) {
          element.classList.add('fc-day-disabled')
        }
      })
    }
  }, [disabledDate, calendarView])

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
                <option value="dayGrid">Day Grid</option>
                <option value="timeGrid">Time Grid</option>
              </Select>
              <FormHelperText>Click the right toolbar to change view</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Change Theme</FormLabel>
              <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="standard">Standard</option>
                <option value="bootstrap5">Bootstrap 5</option>
              </Select>
            </FormControl>
          </HStack>

          <HStack w="100%" spacing={4} align="start">
            <FormControl>
              <FormLabel>Disable Date</FormLabel>
              <Input
                type="date"
                value={disabledDate}
                onChange={(e) => setDisabledDate(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Events</FormLabel>
              <Button onClick={onOpen}>Add Event</Button>
            </FormControl>
          </HStack>

          <Divider />
          <Box w="100%" p="4" rounded="xl" border="gray.500" borderWidth={1} bg="white">
            <Heading size="md" mb={4}>
              Events
            </Heading>
            {events.map((event) => (
              <Text key={event.title}>{JSON.stringify(event)}</Text>
            ))}
          </Box>
        </VStack>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Event</ModalHeader>
            <ModalBody>
              <form action="">
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Event Name</FormLabel>
                    <Input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Event Date</FormLabel>
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      required
                    />
                  </FormControl>
                </VStack>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={addEvent}>
                Add Event
              </Button>
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
        initialView="dayGridMonth"
        themeSystem={theme}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: headerToolbar
        }}
        events={events}
        editable={true}
        eventClick={(info) => {
          alert(info.event.title)
        }}
        eventDrop={(info) => {
          handleDrop(info)
        }}
      />

      <Box mt="8" p="4" rounded="xl" border="gray.500" borderWidth={1} bg="white">
        <Heading size="md" mb={4}>
          Summary
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <Text>Pros</Text>
          </GridItem>
          <GridItem>
            <Text>Cons</Text>
          </GridItem>
        </Grid>
      </Box>
    </section>
  )
}

export default Fullcalendar
