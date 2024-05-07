import { createRouter, createWebHistory } from 'vue-router'
import Protocols from "@/views/Protocols.vue"
import Nurse from '@/views/Nurse.vue'
import Reports from '@/views/Reports.vue'
import Patient from '@/views/Patient.vue'
import Overview from '@/views/Overview.vue'
import Contact from '@/views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Protocols',
    component: Protocols
  },
  {
    path: '/nurse',
    name: 'Nurse',
    component: Nurse
  },
  {
    path: '/reports',
    name: 'Report',
    component: Reports
  },
  {
    path: '/patient',
    name: 'Patient',
    component: Patient
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
