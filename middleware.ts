import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/bookings/:path*',
  '/checkout/:path*',
  '/favorites/:path*',
  '/profile/:path*',
  '/rentals/:path*',
  '/reviews/:path*',
])


export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect()
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}