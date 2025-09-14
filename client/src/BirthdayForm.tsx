
import './App.css'
import {DatePickerDemo} from "./components/ui/date-picker.tsx";


function BirthdayForm() {

  return (
    <>
      <div className={"flex h-[100vh] items-center justify-center"}>
        <div className={"bg-white border-amber-400 border-2 rounded-md flex p-10 justify-center flex-col w-[700px]"}>
          <div className={"font-bold mb-3 py-2"}>Shop by Anna - Birthday form</div>
          <form className={"flex items-center gap-3 flex-col"}>
              <input type={"text"} className={"border w-[400px] rounded-md p-2"} placeholder={"Enter your Username"}/>
              <input type={"email"} className={"border w-[400px] rounded-md p-2"} placeholder={"Enter your Email"}/>
              <DatePickerDemo/>
              <button className={"bg-amber-400 cursor-pointer p-2 rounded-md text-white"}>Set birthday</button>
          </form>

        </div>
      </div>
    </>
  )
}

export default BirthdayForm
