import { Button } from "@/components/ui/button"

function LoginAndRegist() {
  return (
    <div className="flex gap-4">
      <Button>登入</Button>
      <Button variant="secondary">註冊</Button>
    </div>
  )
}

export default LoginAndRegist