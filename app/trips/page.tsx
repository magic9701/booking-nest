import TripsCard from "@/components/trips/TripsCard"
import EmptyContent from "@/components/common/EmptyContent"
import { fetchTrips } from "@/utils/action"

async function TripsPage() {
  const tripData = await fetchTrips()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingTrips = tripData.filter(trip => new Date(trip.checkOut) >= today)
  const completedTrips = tripData.filter(trip => new Date(trip.checkOut) < today)

  return (
    <>
      {/* 即將到來的旅程 */}
      <section className="mt-2">
        <h2 className="text-3xl font-bold">即將到來的旅程</h2>
        <div className="mt-4 flex flex-col gap-2">
          {upcomingTrips.length > 0 ? (
            upcomingTrips.map((trip) => {
              return (
                <TripsCard
                  key={trip.id}
                  propertyId={trip.property.id}
                  bookingId={trip.id}
                  src={trip.property.image}
                  name={trip.property.name}
                  county={trip.property.county}
                  city={trip.property.city}
                  from={trip.checkIn}
                  to={trip.checkOut}
                  totalPrice={trip.orderTotal}
                  isCancelled={trip.isCancelled}
                  isDone={false}
                />
              )
            })
          ) : (
            <EmptyContent
              heading='目前沒有即將到來的旅程'
              btnText='前往首頁尋找住宿'
              routerPush='/'
              imageSrc='/images/no-Search-result.png'
              imgSize='medium'
            />
          )}
        </div>
      </section>

      {/* 已結束的旅程 */}
      {completedTrips.length > 0 && (
        <section className="mt-8 mb-8">
          <h2 className="text-3xl font-bold">已結束的旅程</h2>
          <div className="mt-4 flex flex-col gap-2">
            {completedTrips.map((trip) => {
              return (
                <TripsCard
                  key={trip.id}
                  propertyId={trip.property.id}
                  bookingId={trip.id}
                  src={trip.property.image}
                  name={trip.property.name}
                  county={trip.property.county}
                  city={trip.property.city}
                  from={trip.checkIn}
                  to={trip.checkOut}
                  totalPrice={trip.orderTotal}
                  isCancelled={trip.isCancelled}
                  isDone={true}
                />
              )
            })}
          </div>
        </section>
      )}
      
    </>
  )
}

export default TripsPage
