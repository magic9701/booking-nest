import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function DashBoardCard({ title, subtitle, addtion }: { title: string; subtitle: string | number; addtion?: string }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{subtitle}</p>
        <p className="text-xs text-muted-foreground min-h-[20px]">
          {addtion}
        </p>
      </CardContent>
    </Card>
  )
}

export default DashBoardCard