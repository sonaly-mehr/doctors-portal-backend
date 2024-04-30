/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'

import { specializationRoutes } from '../modules/Specializations/specializations.routes.js'
import { doctorRoutes } from '../modules/Doctors/doctors.routes.js'
import { patientRoutes } from '../modules/Patients/patients.routes.js'
import { medicalProfileRoutes } from '../modules/MedicalProfiles/medicalProfiles.routes.js'
import { appointmentRoutes } from '../modules/Appointments/appointments.routes.js'
import { paymentRoutes } from '../modules/Payments/payments.routes.js'
import { availableServiceRoutes } from '../modules/AvailableServices/availableServices.routes.js'
import { serviceRoutes } from '../modules/Services/services.routes.js'
import { timeSlotsRoutes } from '../modules/TimeSlots/timeSlots.routes.js'
import { availableDoctorRoutes } from '../modules/AvailableDoctors/availableDoctors.routes.js'
import { authRoutes } from '../modules/Auth/auth.route.js'
import { adminRoutes } from '../modules/Admins/admins.routes.js'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/specializations',
    route: specializationRoutes,
  },
  {
    path: '/doctors',
    route: doctorRoutes,
  },
  {
    path: '/patients',
    route: patientRoutes,
  },
  {
    path: '/medical-profiles',
    route: medicalProfileRoutes,
  },
  {
    path: '/appointments',
    route: appointmentRoutes,
  },
  {
    path: '/available-doctors',
    route: availableDoctorRoutes,
  },
  {
    path: '/available-services',
    route: availableServiceRoutes,
  },
  {
    path: '/services',
    route: serviceRoutes,
  },
  {
    path: '/time-slots',
    route: timeSlotsRoutes,
  },
  {
    path: '/payments',
    route: paymentRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
