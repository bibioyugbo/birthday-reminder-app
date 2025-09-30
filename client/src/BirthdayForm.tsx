import './App.css'
import {DatePickerDemo} from "./components/ui/date-picker.tsx";
import {useState} from "react";
import {FadeLoader} from "react-spinners";
import BASE_URL from "../apiConfig.ts";

interface FormData {
    userName: string;
    email: string;
    birthday: Date | undefined;
}

function BirthdayForm() {
    const [loader, setLoader] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        userName: '',
        email: '',
        birthday: undefined
    })

    const handleInputChange = (field: keyof FormData, value: string | Date | undefined) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if(!formData.userName || !formData.email || !formData.birthday) {
            alert("Fill in all fields including birthday")
            return
        }

        try {
            setLoader(true)

            // Format date for API (YYYY-MM-DD)
            const formattedBirthday = formData.birthday.toISOString().split('T')[0];

            const response = await fetch(`${BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: formData.userName,
                    email: formData.email,
                    birthday: formattedBirthday // This will be in YYYY-MM-DD format
                })
            })

            const result = await response.json()
            console.log('API Response:', result)
            console.log('Formatted birthday sent:', formattedBirthday)

            if (result.responseCode === "00") {
                alert("Signup successful!")
                setFormData({ userName: '', email: '', birthday: undefined })
            } else {
                alert(result.responseMessage || "Signup failed")
            }

        } catch (error) {
            console.error("Signup error:", error)
            alert("Network error occurred")
        } finally {
            setLoader(false)
        }
    }

    return (
        <>
            <div className={"flex h-[100vh] items-center justify-center"}>
                <div className={"bg-white border-amber-400 border-2 rounded-md flex p-10 justify-center flex-col w-[700px]"}>
                    <div className={"font-bold mb-3 py-2"}>Shop by Anna - Birthday form</div>
                    <form className={"flex items-center gap-3 flex-col"}>
                        <input
                            type="text"
                            className={"border w-[400px] rounded-md p-2"}
                            placeholder={"Enter your Username"}
                            value={formData.userName}
                            onChange={(e) => handleInputChange('userName', e.target.value)}
                            disabled={loader}
                        />
                        <input
                            type="email"
                            className={"border w-[400px] rounded-md p-2"}
                            placeholder={"Enter your Email"}
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            disabled={loader}
                        />
                        <DatePickerDemo
                            value={formData.birthday}
                            onChange={(date) => handleInputChange('birthday', date)}
                        />
                        {loader?
                            <FadeLoader/>:
                            <button
                                onClick={handleSignup}
                                disabled={loader}
                                className={"bg-amber-400 cursor-pointer active:scale-105 p-2 transition-transform rounded-md text-white w-[200px] flex items-center justify-center"}
                            >
                                Set birthday
                            </button>
                        }

                    </form>
                </div>
            </div>
        </>
    )
}

export default BirthdayForm