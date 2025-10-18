import axios from "axios"

export type LoginData = {
  username: string,
  password: string,
}

const login = async (data: LoginData): Promise<string | null> => {
  try {
    const response = await axios.post("api/user/login", data)
    
    if (response.status !== 200) {
      return null
    }
    
    return response.data
  }
  catch {
    return null
  }
}

const register = async (data: LoginData): Promise<string | null> => {
  try {

    const response = await axios.post("api/user/register", data)
    
    if (response.status !== 201) {
      return null
    }
    
    return response.data
  }
  catch {
    return null
  }
}

export default { login, register }
