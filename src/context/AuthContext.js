import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)

    const [show, setShow] = useState(false)
    const [alertType, setAlertType] = useState('')
    const[alertMsg, setAlertMsg] = useState('')

    const [spinnerLoading, setSpinnerLoading] = useState(true)

    // const baseUrl = 'http://127.0.0.1:8000'

    const baseUrl = 'https://abdulla5.pythonanywhere.com/'

    const navigate = useNavigate()

    const loginUser = async e => {
        e.preventDefault()
        const response = await fetch(`${baseUrl}/api/token/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        const data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            setAlertType('success')
            setAlertMsg(`Welcome ${jwt_decode(data.access).username}`)
            handleVisibility()
            navigate('/questions')
        }
        else{
            setAlertType('danger')
            setAlertMsg('Wrong credentials')
            handleVisibility()
        }
    }


    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        setAlertType('info')
        setAlertMsg('You have been logged out')
        handleVisibility()
        navigate('/login')
    }

    const handleVisibility = () => {
        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 2000);
    }


    const viewsFormatter = num => {
        if (num >= 1000000) {
           return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
           return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
   }


   const strFormatter = str => {
        if(str.length >= 175){
            let newStr = str.substring(0, 176)
            return `${newStr}...`
        }
        else{
            return str
        }
    }


    const contextData = {
        user: user,
        setUser: setUser,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        show: show,
        setShow: setShow,
        alertType: alertType,
        setAlertType: setAlertType,
        alertMsg: alertMsg,
        setAlertMsg: setAlertMsg,
        handleVisibility: handleVisibility,
        viewsFormatter: viewsFormatter,
        baseUrl: baseUrl,
        strFormatter: strFormatter,
        spinnerLoading: spinnerLoading,
        setSpinnerLoading: setSpinnerLoading
    }


    useEffect(()=> {

        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }

        setLoading(false)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}