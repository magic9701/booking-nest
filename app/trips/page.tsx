import TripsCard from "@/components/trips/TripsCard"
import EmptyContent from "@/components/common/EmptyContent"
import { fetchTrips } from "@/utils/action"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

async function TripsPage({ searchParams }: { searchParams: { tab?: string } }) {

  const tab = searchParams.tab === "completed" ? "completed" : "upcoming"
  const tripData = await fetchTrips()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingTrips = tripData.filter(trip => new Date(trip.checkOut) >= today)
  const completedTrips = tripData.filter(trip => new Date(trip.checkOut) < today)

  return (
    <>
      <Tabs defaultValue={tab} className="w-full ">
        <TabsList className="grid w-full grid-cols-2 bg-gray-200 gap-1 h-11 rounded-lg">
          <TabsTrigger
            value="upcoming"
            className="w-full text-lg flex justify-center items-center h-9 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition"
          >
            即將到來
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="w-full text-lg flex justify-center items-center h-9 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition"
          >
            已結束
          </TabsTrigger>
        </TabsList>
          {/* 即將到來的旅程 */}
          <TabsContent value="upcoming">
            <section className="mt-4 mb-8">
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
          </TabsContent>

          {/* 已結束的旅程 */}
          <TabsContent value="completed">
            {completedTrips.length > 0 && (
              <section className="mt-4 mb-8">
                <h2 className="text-3xl font-bold">已結束的旅程</h2>
                <div className="mt-4 flex flex-col gap-2">
                  {completedTrips.length > 0 ? (
                    completedTrips.map((trip) => {
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
                        review={trip.review}
                      />
                    )
                  })
                ) : (
                  <EmptyContent
                    heading='還沒有完成的住宿哦'
                    imageSrc='/images/no-Search-result.png'
                    imgSize='medium'
                  />
                )}
                </div>
              </section>
            )}
          </TabsContent>
      </Tabs>
    </>
  )
}

export default TripsPage
